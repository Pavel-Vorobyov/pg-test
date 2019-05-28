package com.pavel.monitoring.app.state

import org.springframework.stereotype.Component
import java.util.concurrent.atomic.AtomicBoolean
import java.util.concurrent.atomic.AtomicInteger

@Component
class StateStorage(
        var threadsCount: AtomicInteger = AtomicInteger(1),
        var requestsPerSecond: AtomicInteger = AtomicInteger(500),
        var requestsDelay: AtomicInteger = AtomicInteger(1000),
        var isTestStarted: AtomicBoolean = AtomicBoolean(true),
        var queryOptimisationType: QueryOptimisationType = QueryOptimisationType.EN_MANAGER_BATCH
) {

    fun getTotalRequests() = threadsCount.get() * requestsPerSecond.get()

    fun getInfo() =
            "threadsCount: $threadsCount, " +
            "requestsPerSecond: $requestsPerSecond, " +
            "requestsDelay: $requestsDelay, " +
            "isTestStarted: $isTestStarted, " +
            "queryOptimisationType: $queryOptimisationType"
}