package com.example.pavloktodo.work

import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import androidx.work.ListenableWorker
import com.example.pavloktodo.data.AppConfig
import com.example.pavloktodo.data.PavlokApi
import com.example.pavloktodo.data.Stimulus
import com.example.pavloktodo.data.StimulusRequest
import android.util.Log
import com.example.pavloktodo.data.TodoRepository
import com.example.pavloktodo.data.InMemoryTodoRepository
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.time.LocalDate

class ZapCheckWorker(
    appContext: Context,
    params: WorkerParameters
) : CoroutineWorker(appContext, params) {

    private val TAG = "PavlokWorker"
    private val repository: TodoRepository = InMemoryTodoRepository

    private val pavlokApi: PavlokApi by lazy {
        Retrofit.Builder()
            .baseUrl(AppConfig.backendBaseUrl)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(PavlokApi::class.java)
    }

    override suspend fun doWork(): Result {
        val type = inputData.getString("type") ?: "vibe"
        val value = inputData.getInt("value", 10)
        val reason = inputData.getString("reason") ?: "Manual stimulus test (Android)"
        val isAutoCheck = inputData.getBoolean("isAutoCheck", false)

        Log.d(TAG, "Worker started. Type: $type, Value: $value, Auto: $isAutoCheck")

        // If it's the automatic daily check, verify if there are pending tasks first
        if (isAutoCheck) {
            val tasks = repository.tasks.value
            val activePacts = tasks.filter { it.status == "pending" }
            val summary = repository.todaySummary.value
            
            Log.d(TAG, "Checking pacts: Total=${tasks.size}, Active=${activePacts.size}, ZapSent=${summary.zapSent}")
            
            if (tasks.isNotEmpty() && activePacts.isEmpty()) {
                Log.d(TAG, "All pacts completed. Skipping stimulus.")
                return ListenableWorker.Result.success()
            }
            if (tasks.isEmpty()) {
                Log.d(TAG, "No pacts for today. Skipping stimulus.")
                return ListenableWorker.Result.success()
            }

            val isDev = com.example.pavloktodo.data.AppConfig.flavor.contains("dev")
            if (summary.zapSent && !isDev) {
                Log.d(TAG, "Zap already sent today. Skipping stimulus.")
                return ListenableWorker.Result.success()
            }

            // System-determined intensity (The "Escalator")
            val baseThreat = repository.currentThreatLevel.value
            
            // 1. Random Jitter (+/- 5%)
            val jitter = kotlin.random.Random.nextInt(-5, 6)
            
            // 2. Critical Zap Chance (10% chance for 1.2x damage)
            val isCritical = kotlin.random.Random.nextDouble() < 0.10
            val critMultiplier = if (isCritical) 1.2 else 1.0
            
            // Calculate final intensity
            var finalIntensity = ((baseThreat + jitter) * critMultiplier).toInt()
            finalIntensity = finalIntensity.coerceIn(10, 100) // Ensure bounds
            
            val logMsg = "System Escalation: Base=$baseThreat, Jitter=$jitter, Crit=$isCritical. Final=$finalIntensity"
            Log.d(TAG, logMsg)
            
            return sendToPavlok(type, finalIntensity, "Auto: Tasks incomplete ($logMsg)", true)
        }

        return sendToPavlok(type, value, reason, false)
    }

    private suspend fun sendToPavlok(type: String, value: Int, reason: String, isAuto: Boolean): Result {
        return try {
            Log.d(TAG, "Sending $type ($value) to Pavlok Cloud...")
            val response = pavlokApi.sendStimulus(
                token = "Bearer ${AppConfig.pavlokAccessToken}",
                request = StimulusRequest(
                    stimulus = Stimulus(
                        stimulusType = type,
                        stimulusValue = value,
                        reason = reason
                    )
                )
            )

            if (response.isSuccessful) {
                Log.i(TAG, "Stimulus SUCCESS! Response: ${response.code()}")
                if (isAuto) {
                    repository.markZapSent(LocalDate.now(), value)
                } else {
                    repository.recordZap(type, value, reason)
                }
                ListenableWorker.Result.success()
            } else {
                Log.e(TAG, "Stimulus FAILED. Code: ${response.code()}, Body: ${response.errorBody()?.string()}")
                ListenableWorker.Result.retry()
            }
        } catch (e: Exception) {
            Log.e(TAG, "Stimulus EXCEPTION", e)
            ListenableWorker.Result.failure()
        }
    }
}
