package com.pavel.monitoring.common

import com.pavel.monitoring.app.state.QueryOptimisationType
import com.pavel.monitoring.request.RequestInfoHolder
import com.pavel.monitoring.app.state.StateStorage
import com.pavel.monitoring.request.insert.InsertRequestProcess
import com.pavel.monitoring.task.Task
import com.pavel.monitoring.task.TaskRepository
import org.springframework.boot.context.event.ApplicationStartedEvent
import org.springframework.context.ApplicationListener
import org.springframework.stereotype.Component
import java.lang.Thread.sleep
import java.util.*
import java.util.concurrent.CountDownLatch
import java.util.concurrent.atomic.AtomicInteger
import java.util.stream.Collectors
import java.util.stream.Stream

@Component
class AppMainJob(
        private val stateStorage: StateStorage,
        private val requestInfoHolder: RequestInfoHolder,
        private val insertRequestProcess: InsertRequestProcess,
        private val taskRepository: TaskRepository
) : ApplicationListener<ApplicationStartedEvent> {
    override fun onApplicationEvent(event: ApplicationStartedEvent) {
        while (true) {
            if (stateStorage.isTestStarted.get()) {
                executeThreads()
            }

            /*if (stateStorage.requestsDelay.get().toLong() > requestInfoHolder.getLast().getExecutionTime()) {
                sleep(stateStorage.requestsDelay.get().toLong() - requestInfoHolder.getLast().getExecutionTime())
            }*/
            sleep(stateStorage.requestsDelay.get().toLong())
        }
    }

    private fun executeThreads() {
        val complete = CountDownLatch(stateStorage.threadsCount.get())
        val rejected = AtomicInteger(0)

        val list = Stream.generate {
            Thread {
                when (stateStorage.queryOptimisationType) {
                    QueryOptimisationType.EN_MANAGER_SAVE ->
                        processSave(rejected)
                    QueryOptimisationType.EN_MANAGER_BATCH ->
                        processBatch()
                    QueryOptimisationType.SQL_OPTIMISATION ->
                        processSql()
                }

                complete.countDown()
            }
        }
                .limit(stateStorage.threadsCount.get().toLong())

        val startTime = System.currentTimeMillis()
        list.forEach { it.start() }

        complete.await()
        this.log(startTime, rejected.get())
    }

    private fun processSave(rejected: AtomicInteger) =
            rejected.set(rejected.get() + insertRequestProcess.startRequests())

    private fun processBatch() {
        val insertEntityList = Stream.generate {
            Task(null, "name " + UUID.randomUUID())
        }
                .limit(stateStorage.getTotalRequests().toLong())
                .collect(Collectors.toList())

        taskRepository.saveAll(insertEntityList)
    }

    private fun processSql() {

    }

    private fun log(startTime: Long, rejected: Int) {
        requestInfoHolder.info.push(
                RequestInfoHolder.AppInfoItem(
                        stateStorage.threadsCount.get(),
                        stateStorage.requestsPerSecond.get(),
                        startTime,
                        System.currentTimeMillis()
                )
        )

        println(
                "Completed: threads -> ${stateStorage.threadsCount.get()}," +
                        " per second -> ${stateStorage.requestsPerSecond.get()}" +
                        " total -> ${stateStorage.getTotalRequests()}," +
                        " success -> ${stateStorage.getTotalRequests() - rejected}" +
                        " reject -> $rejected" +
                        " time -> ${System.currentTimeMillis() - startTime} ml"
        )
    }
}