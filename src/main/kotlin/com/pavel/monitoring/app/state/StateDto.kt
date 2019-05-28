package com.pavel.monitoring.app.state

class StateDto(
        val threadsCount: Int,
        val requestsPerSecond: Int,
        val requestsDelay: Int,
        val isTestStarted: Boolean
)