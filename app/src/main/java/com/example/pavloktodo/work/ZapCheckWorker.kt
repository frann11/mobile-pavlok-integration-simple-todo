package com.example.pavloktodo.work

import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import java.time.LocalDate

class ZapCheckWorker(
    appContext: Context,
    params: WorkerParameters
) : CoroutineWorker(appContext, params) {
    override suspend fun doWork(): Result {
        // TODO: Hook into repository + backend to compute completion and trigger zap.
        val today = LocalDate.now()
        return Result.success(
            androidx.work.Data.Builder()
                .putString("date", today.toString())
                .build()
        )
    }
}
