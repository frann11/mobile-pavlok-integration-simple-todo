package com.example.pavloktodo.work

import android.content.Context
import androidx.work.ExistingWorkPolicy
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.workDataOf
import android.util.Log
import java.time.Duration
import java.time.LocalDateTime
import java.time.LocalTime

object ZapCheckScheduler {
    private const val TAG = "PavlokScheduler"
    private const val WORK_NAME = "daily-zap-check"

    fun scheduleDailyCheck(context: Context, hour: Int = 21, minute: Int = 0) {
        val endOfDay = LocalTime.of(hour, minute)
        val now = LocalDateTime.now()
        val target = if (now.toLocalTime().isBefore(endOfDay)) {
            now.toLocalDate().atTime(endOfDay)
        } else {
            now.toLocalDate().plusDays(1).atTime(endOfDay)
        }

        val delay = Duration.between(now, target)
        Log.d(TAG, "Scheduling check for $target (in ${delay.toMinutes()} minutes)")
        val request = OneTimeWorkRequestBuilder<ZapCheckWorker>()
            .setInitialDelay(delay)
            .setInputData(workDataOf("isAutoCheck" to true, "type" to "zap"))
            .build()

        WorkManager.getInstance(context).enqueueUniqueWork(
            WORK_NAME,
            ExistingWorkPolicy.REPLACE,
            request
        )
    }
}
