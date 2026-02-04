package com.example.pavloktodo.ui

import android.content.Context
import androidx.lifecycle.ViewModel
import com.example.pavloktodo.data.InMemoryTodoRepository
import com.example.pavloktodo.data.Pact
import com.example.pavloktodo.data.TodoRepository
import java.time.LocalTime

class TodoViewModel(
    private val repository: TodoRepository = InMemoryTodoRepository
) : ViewModel() {
    val tasks = repository.tasks
    val todaySummary = repository.todaySummary
    val scheduledTime = repository.scheduledTime
    val zapHistory = repository.zapHistory
    val currentThreatLevel = repository.currentThreatLevel

    fun addTask(pact: Pact) {
        repository.addTask(pact)
    }

    fun updateTaskStatus(taskId: String, status: String) {
        repository.updateTaskStatus(taskId, status)
    }

    fun removeTask(taskId: String) {
        repository.removeTask(taskId)
    }

    fun updateScheduledTime(context: Context, hour: Int, minute: Int) {
        repository.updateScheduledTime(context, LocalTime.of(hour, minute))
    }
}
