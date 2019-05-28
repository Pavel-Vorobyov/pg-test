package com.pavel.monitoring.request.insert

import com.pavel.monitoring.request.AbstractRequestStarter
import com.pavel.monitoring.app.state.StateStorage
import com.pavel.monitoring.task.Task
import com.pavel.monitoring.task.TaskRepository
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import java.util.*
import java.util.concurrent.atomic.AtomicInteger

@Component
class InsertRequestProcess(
        appState: StateStorage,
        private val taskRepository: TaskRepository
) : AbstractRequestStarter(appState) {
    override fun processRequest(rejected: AtomicInteger) {
        try {
            taskRepository.save(Task(null, "task " + UUID.randomUUID()))
        } catch (e: Exception) {
            rejected.incrementAndGet()
        }
    }
}