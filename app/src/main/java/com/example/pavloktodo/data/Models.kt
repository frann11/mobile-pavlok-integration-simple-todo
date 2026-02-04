package com.example.pavloktodo.data

import java.time.Instant
import java.time.LocalDate
import java.util.UUID

data class Pact(
    val id: String = UUID.randomUUID().toString(),
    val title: String,
    val notes: String = "",
    val createdAt: Instant = Instant.now(),
    val isActive: Boolean = true,
    val intensity: Int = 50,
    val time: String? = null,
    val status: String = "pending", // "pending", "signed", "broken"
    val frequency: String = "Diario",
    val scheduledDays: List<Int> = emptyList(),
    val category: String = "GENERAL"
)

data class DailyTaskCompletion(
    val id: String = UUID.randomUUID().toString(),
    val taskId: String,
    val date: LocalDate,
    val isCompleted: Boolean,
    val completedAt: Instant? = null
)

data class DailySummary(
    val date: LocalDate,
    val totalTasks: Int,
    val completedTasks: Int,
    val completionRate: Double,
    val zapSent: Boolean = false,
    val streak: Int = 0 // Added: Days since last zap
)

data class ZapRecord(
    val id: String = UUID.randomUUID().toString(),
    val timestamp: Instant = Instant.now(),
    val type: String,
    val intensity: Int,
    val reason: String
)

data class ZapHistory(
    val id: String = UUID.randomUUID().toString(),
    val date: LocalDate,
    val intensity: Int,
    val durationMs: Int,
    val reason: String,
    val status: ZapStatus,
    val createdAt: Instant = Instant.now()
)

enum class ZapStatus {
    PENDING,
    SENT,
    FAILED
}
