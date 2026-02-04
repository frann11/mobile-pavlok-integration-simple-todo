package com.example.pavloktodo.data

import android.content.Context
import com.example.pavloktodo.work.ZapCheckScheduler
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import java.time.LocalDate
import java.time.LocalTime

interface TodoRepository {
    val tasks: StateFlow<List<Pact>>
    val todaySummary: StateFlow<DailySummary>
    val scheduledTime: StateFlow<LocalTime>
    val zapHistory: StateFlow<List<ZapRecord>>
    val currentThreatLevel: StateFlow<Int>
    val integrityScore: StateFlow<Int> // 0 to 100

    fun initialize(context: Context)
    fun addTask(task: Pact)
    fun updateTaskStatus(taskId: String, status: String)
    fun removeTask(taskId: String)
    fun markZapSent(date: LocalDate, intensity: Int)
    fun updateScheduledTime(context: Context, time: LocalTime)
    fun recordZap(type: String, intensity: Int, reason: String)
}

object InMemoryTodoRepository : TodoRepository {
    private var prefs: android.content.SharedPreferences? = null
    private val gson = com.google.gson.Gson()

    private val _tasks = MutableStateFlow<List<Pact>>(emptyList())
    private val _zapHistory = MutableStateFlow<List<ZapRecord>>(emptyList())
    private val _todaySummary = MutableStateFlow(
        DailySummary(
            date = LocalDate.now(),
            totalTasks = 0,
            completedTasks = 0,
            completionRate = 0.0,
            streak = 0
        )
    )
    private val _scheduledTime = MutableStateFlow(LocalTime.of(21, 0))
    private val _currentThreatLevel = MutableStateFlow(40) // Base level
    private val _integrityScore = MutableStateFlow(100)

    override val tasks: StateFlow<List<Pact>> = _tasks
    override val todaySummary: StateFlow<DailySummary> = _todaySummary
    override val scheduledTime: StateFlow<LocalTime> = _scheduledTime
    override val zapHistory: StateFlow<List<ZapRecord>> = _zapHistory
    override val currentThreatLevel: StateFlow<Int> = _currentThreatLevel
    override val integrityScore: StateFlow<Int> = _integrityScore

    override fun initialize(context: Context) {
        prefs = context.getSharedPreferences("voluntad_repository_prefs", Context.MODE_PRIVATE)
        loadFromDisk()
        checkNewDay()
    }

    private fun loadFromDisk() {
        prefs?.let { p ->
            val tasksJson = p.getString("tasks_json", null)
            if (tasksJson != null) {
                val type = object : com.google.gson.reflect.TypeToken<List<Pact>>() {}.type
                _tasks.value = gson.fromJson(tasksJson, type)
            }

            val zapHistoryJson = p.getString("zap_history_json", null)
            if (zapHistoryJson != null) {
                val type = object : com.google.gson.reflect.TypeToken<List<ZapRecord>>() {}.type
                _zapHistory.value = gson.fromJson(zapHistoryJson, type)
            }

            val summaryJson = p.getString("today_summary_json", null)
            if (summaryJson != null) {
                _todaySummary.value = gson.fromJson(summaryJson, DailySummary::class.java)
            }

            _integrityScore.value = p.getInt("integrity_score", 100)

            val hour = p.getInt("scheduled_hour", 21)
            val minute = p.getInt("scheduled_minute", 0)
            _scheduledTime.value = LocalTime.of(hour, minute)

            recalculateThreatLevel()
        }
    }

    private fun saveToDisk() {
        prefs?.edit()?.apply {
            putString("tasks_json", gson.toJson(_tasks.value))
            putString("zap_history_json", gson.toJson(_zapHistory.value))
            putString("today_summary_json", gson.toJson(_todaySummary.value))
            putInt("integrity_score", _integrityScore.value)
            putInt("scheduled_hour", _scheduledTime.value.hour)
            putInt("scheduled_minute", _scheduledTime.value.minute)
            apply()
        }
    }

    private fun checkNewDay() {
        val today = LocalDate.now()
        val lastDate = _todaySummary.value.date
        if (today.isAfter(lastDate)) {
            // Check for Atrophy: If yesterday had 0 active tasks, lose 2% integrity
            if (_todaySummary.value.totalTasks == 0) {
                _integrityScore.value = (_integrityScore.value - 2).coerceAtLeast(0)
            }
            
            // It's a new day! Reset daily tasks
            val resetTasks = _tasks.value.map { pact ->
                if (pact.frequency == "Diario") {
                    pact.copy(status = "pending", isActive = true)
                } else {
                    pact
                }
            }
            _tasks.value = resetTasks
            _todaySummary.value = DailySummary(
                date = today,
                totalTasks = resetTasks.size,
                completedTasks = 0,
                completionRate = 0.0,
                streak = _todaySummary.value.streak,
                zapSent = false
            )
            saveToDisk()
        }
    }

    override fun addTask(task: Pact) {
        val updated = _tasks.value + task
        _tasks.value = updated
        recomputeSummary(updated)
        saveToDisk()
    }

    override fun updateTaskStatus(taskId: String, status: String) {
        val updated = _tasks.value.map { task ->
            if (task.id == taskId) {
                task.copy(
                    status = status,
                    isActive = status == "pending"
                )
            } else {
                task
            }
        }
        _tasks.value = updated
        recomputeSummary(updated)
        saveToDisk()
    }

    override fun removeTask(taskId: String) {
        val updated = _tasks.value.filterNot { it.id == taskId }
        _tasks.value = updated
        recomputeSummary(updated)
        saveToDisk()
    }

    override fun markZapSent(date: LocalDate, intensity: Int) {
        val summary = _todaySummary.value
        if (summary.date == date) {
            _todaySummary.value = summary.copy(zapSent = true, streak = 0)
            recordZap("zap", intensity, "Tasks incomplete for today (Auto)")
            recalculateThreatLevel() // Recalculate after a zap
            saveToDisk()
        }
    }

    override fun recordZap(type: String, intensity: Int, reason: String) {
        val record = ZapRecord(type = type, intensity = intensity, reason = reason)
        _zapHistory.value = _zapHistory.value + record
        recalculateThreatLevel()
        saveToDisk()
    }

    override fun updateScheduledTime(context: Context, time: LocalTime) {
        _scheduledTime.value = time
        ZapCheckScheduler.scheduleDailyCheck(context, time.hour, time.minute)
        saveToDisk()
    }

    private fun recalculateThreatLevel() {
        // Logic: Base 40 + (Consecutive Failures * 20)
        // A "Failure" is defined as a day where a Zap was sent with reason "Auto"
        // We need to count how many consecutive days *back from today* had a Zap.
        
        val history = _zapHistory.value.sortedByDescending { it.timestamp }
        var failures = 0
        var checkDate = LocalDate.now()
        
        // Check today first (if zapSent flag is true, assume it was Auto since that flag resets on new day)
        if (_todaySummary.value.zapSent) {
            failures++
            checkDate = checkDate.minusDays(1)
        }

        // Check previous days from history
        // Note: This matches zaps to dates. Simple approximation for now.
        while (true) {
            val dateTarget = checkDate
            val hasAutoZapOnDate = history.any { 
                // Convert Instant to LocalDate (system zone)
                it.timestamp.atZone(java.time.ZoneId.systemDefault()).toLocalDate() == dateTarget 
                && it.type == "zap"
                && it.reason.contains("Auto") // Only count automated system punishments
            }
            
            if (hasAutoZapOnDate) {
                failures++
                checkDate = checkDate.minusDays(1)
            } else {
                // If we didn't zap today (yet) and didn't zap yesterday, streak is 0.
                break
            }
        }

        // Base 40. Each failure adds 20.
        val base = 40
        val newLevel = (base + (failures * 20)).coerceAtMost(100)
        _currentThreatLevel.value = newLevel
    }

    private fun recomputeSummary(tasks: List<Pact>) {
        val total = tasks.size
        val completed = tasks.count { !it.isActive }
        val rate = if (total == 0) 0.0 else completed.toDouble() / total
        
        // Simple streak logic: if total tasks > 0 and everything completed, or if it's already a streak
        // (In a real app, this would be computed against historical data)
        val currentStreak = _todaySummary.value.streak
        val newStreak = if (total > 0 && completed == total && !_todaySummary.value.zapSent) {
            if (currentStreak == 0) 1 else currentStreak
        } else {
            currentStreak
        }

        _todaySummary.value = _todaySummary.value.copy(
            totalTasks = total,
            completedTasks = completed,
            completionRate = rate,
            streak = newStreak
        )
    }
}
