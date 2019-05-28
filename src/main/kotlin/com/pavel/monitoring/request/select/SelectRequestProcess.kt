package com.pavel.monitoring.request.select

import com.pavel.monitoring.app.state.StateStorage
import com.pavel.monitoring.request.AbstractRequestStarter
import org.springframework.stereotype.Component
import java.util.concurrent.atomic.AtomicInteger

@Component
class SelectRequestProcess(
        appState: StateStorage
) : AbstractRequestStarter(appState) {
    override fun processRequest(rejected: AtomicInteger) {
        try {

        } catch (e: Exception) {
            rejected.incrementAndGet()
        }
    }
}