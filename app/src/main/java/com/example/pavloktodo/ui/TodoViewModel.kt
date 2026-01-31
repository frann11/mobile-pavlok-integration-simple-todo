package com.example.pavloktodo.ui

import androidx.lifecycle.ViewModel
import com.example.pavloktodo.data.InMemoryTodoRepository
import com.example.pavloktodo.data.TodoRepository

class TodoViewModel(
    private val repository: TodoRepository = InMemoryTodoRepository()
) : ViewModel() {
    val tasks = repository.tasks
    val todaySummary = repository.todaySummary

    fun addTask(title: String) {
        repository.addTask(title)
    }

    fun toggleTask(taskId: String) {
        repository.toggleTask(taskId)
    }

    fun removeTask(taskId: String) {
        repository.removeTask(taskId)
    }
}
