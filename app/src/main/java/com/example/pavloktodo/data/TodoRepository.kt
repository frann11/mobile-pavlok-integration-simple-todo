package com.example.pavloktodo.data

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import java.time.LocalDate

interface TodoRepository {
    val tasks: StateFlow<List<Task>>
    val todaySummary: StateFlow<DailySummary>

    fun addTask(title: String, notes: String = "")
    fun toggleTask(taskId: String)
    fun removeTask(taskId: String)
    fun markZapSent(date: LocalDate)
}

class InMemoryTodoRepository : TodoRepository {
    private val _tasks = MutableStateFlow<List<Task>>(emptyList())
    private val _todaySummary = MutableStateFlow(
        DailySummary(
            date = LocalDate.now(),
            totalTasks = 0,
            completedTasks = 0,
            completionRate = 0.0
        )
    )

    override val tasks: StateFlow<List<Task>> = _tasks
    override val todaySummary: StateFlow<DailySummary> = _todaySummary

    override fun addTask(title: String, notes: String) {
        val updated = _tasks.value + Task(title = title, notes = notes)
        _tasks.value = updated
        recomputeSummary(updated)
    }

    override fun toggleTask(taskId: String) {
        val updated = _tasks.value.map { task ->
            if (task.id == taskId) {
                task.copy(isActive = !task.isActive)
            } else {
                task
            }
        }
        _tasks.value = updated
        recomputeSummary(updated)
    }

    override fun removeTask(taskId: String) {
        val updated = _tasks.value.filterNot { it.id == taskId }
        _tasks.value = updated
        recomputeSummary(updated)
    }

    override fun markZapSent(date: LocalDate) {
        val summary = _todaySummary.value
        if (summary.date == date) {
            _todaySummary.value = summary.copy(zapSent = true)
        }
    }

    private fun recomputeSummary(tasks: List<Task>) {
        val total = tasks.size
        val completed = tasks.count { !it.isActive }
        val rate = if (total == 0) 0.0 else completed.toDouble() / total
        _todaySummary.value = _todaySummary.value.copy(
            totalTasks = total,
            completedTasks = completed,
            completionRate = rate
        )
    }
}
