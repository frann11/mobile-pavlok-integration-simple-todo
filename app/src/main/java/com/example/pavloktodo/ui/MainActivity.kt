package com.example.pavloktodo.ui

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Done
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.pavloktodo.work.ZapCheckScheduler

class MainActivity : ComponentActivity() {
    private val viewModel: TodoViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        ZapCheckScheduler.scheduleDailyCheck(this)
        setContent {
            MaterialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    TodoScreen(viewModel)
                }
            }
        }
    }
}

@Composable
private fun TodoScreen(viewModel: TodoViewModel) {
    val tasks by viewModel.tasks.collectAsState()
    val summary by viewModel.todaySummary.collectAsState()
    var newTaskTitle by remember { mutableStateOf("") }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text(
            text = "Today's tasks",
            style = MaterialTheme.typography.headlineSmall,
            fontWeight = FontWeight.Bold
        )
        Text(
            text = "${summary.completedTasks}/${summary.totalTasks} completed",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 4.dp, bottom = 16.dp)
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedTextField(
                value = newTaskTitle,
                onValueChange = { newTaskTitle = it },
                modifier = Modifier.weight(1f),
                label = { Text("New task") }
            )
            Button(
                onClick = {
                    if (newTaskTitle.isNotBlank()) {
                        viewModel.addTask(newTaskTitle.trim())
                        newTaskTitle = ""
                    }
                },
                modifier = Modifier.padding(start = 8.dp)
            ) {
                Text("Add")
            }
        }

        LazyColumn(
            modifier = Modifier.fillMaxSize().padding(top = 16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(tasks) { task ->
                Card(modifier = Modifier.fillMaxWidth()) {
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(12.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = task.title,
                                style = MaterialTheme.typography.titleMedium
                            )
                            if (task.notes.isNotBlank()) {
                                Text(
                                    text = task.notes,
                                    style = MaterialTheme.typography.bodySmall
                                )
                            }
                        }
                        IconButton(onClick = { viewModel.toggleTask(task.id) }) {
                            Icon(
                                imageVector = Icons.Default.Done,
                                contentDescription = "Toggle complete"
                            )
                        }
                        IconButton(onClick = { viewModel.removeTask(task.id) }) {
                            Icon(
                                imageVector = Icons.Default.Delete,
                                contentDescription = "Delete task"
                            )
                        }
                    }
                }
            }
        }
    }
}
