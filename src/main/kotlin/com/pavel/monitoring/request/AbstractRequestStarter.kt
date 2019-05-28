package com.pavel.monitoring.request

import com.pavel.monitoring.app.state.StateStorage
import java.util.concurrent.CountDownLatch
import java.util.concurrent.atomic.AtomicInteger
import java.util.stream.Stream

abstract class AbstractRequestStarter(
        private val stateStorage: StateStorage
) {
    fun startRequests(): Int {
        val readyThreads = CountDownLatch(stateStorage.getTotalRequests())
        val completedThreads = CountDownLatch(stateStorage.getTotalRequests())
        val rejected = AtomicInteger(0)

        val list = Stream
                .generate {
                    Thread {
                        readyThreads.countDown()
                        try {
                            readyThreads.await()

                            processRequest(rejected)

                            completedThreads.countDown()
                        } finally {
                            completedThreads.countDown()
                        }
                    }
                }
                .limit(stateStorage.getTotalRequests().toLong())

        list.forEach { it.start() }

        completedThreads.await()


        return rejected.get()
    }

    abstract fun processRequest(rejected: AtomicInteger)
}