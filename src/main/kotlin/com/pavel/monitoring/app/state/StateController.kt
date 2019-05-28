package com.pavel.monitoring.app.state

import com.pavel.monitoring.request.RequestInfoDto
import com.pavel.monitoring.request.RequestInfoHolder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/api/app/state")
class StateController(
        private val stateStorage: StateStorage,
        private val requestInfoHolder: RequestInfoHolder
) {

    @PostMapping("/threadCount")
    fun setThreadCount(@RequestParam threadCount: Int) = stateStorage.threadsCount.set(threadCount)

    @PostMapping("/requestPerSecond")
    fun requestPerSecond(@RequestParam requestPerSecond: Int) = stateStorage.requestsPerSecond.set(requestPerSecond)

    @PostMapping("/requestDelay")
    fun requestDelay(@RequestParam requestDelay: Int) = stateStorage.requestsDelay.set(requestDelay)

    @PostMapping("/isTestStarted")
    fun isTestStarted(@RequestParam isTestStarted: Boolean) = stateStorage.isTestStarted.set(isTestStarted)

    @RequestMapping("/info")
    fun getInfo() = StateDto(
            stateStorage.threadsCount.get(),
            stateStorage.requestsPerSecond.get(),
            stateStorage.requestsDelay.get(),
            stateStorage.isTestStarted.get()
    )

    @RequestMapping("/requestInfo")
    fun getRequestInfo() = requestInfoHolder.getInfo(30)
            .map { RequestInfoDto(it.requestsPerSecond * it.threadsCount, it.end - it.start) }
}