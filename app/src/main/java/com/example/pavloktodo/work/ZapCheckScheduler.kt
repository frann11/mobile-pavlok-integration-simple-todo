package com.example.pavloktodo.work

import android.content.Context
import androidx.work.ExistingWorkPolicy
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import java.time.Duration
import java.time.LocalDateTime
import java.time.LocalTime

object ZapCheckScheduler {
    private const val WORK_NAME = "daily-zap-check"

    fun scheduleDailyCheck(context: Context, endOfDay: LocalTime = LocalTime.of(21, 0)) {
        val now = LocalDateTime.now()
        val target = if (now.toLocalTime().isBefore(endOfDay)) {
            now.toLocalDate().atTime(endOfDay)
        } else {
            now.toLocalDate().plusDays(1).atTime(endOfDay)
        }

        val delay = Duration.between(now, target)
        val request = OneTimeWorkRequestBuilder<ZapCheckWorker>()
            .setInitialDelay(delay)
            .build()

        WorkManager.getInstance(context).enqueueUniqueWork(
            WORK_NAME,
            ExistingWorkPolicy.REPLACE,
            request
        )
    }
}
