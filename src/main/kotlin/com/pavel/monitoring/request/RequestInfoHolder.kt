package com.pavel.monitoring.request

import org.springframework.stereotype.Component
import java.util.*

@Component
class RequestInfoHolder {
    val info = LinkedList<AppInfoItem>()

    fun getInfo(elementsSize: Int): List<AppInfoItem> =
        if (info.size - elementsSize < 0) info.subList(0, info.size)
        else info.asReversed().subList(info.size - elementsSize, info.size)

    fun getLast(): AppInfoItem = info.last

    class AppInfoItem(
        val threadsCount: Int,
        val requestsPerSecond: Int,
        val start: Long,
        val end: Long
    ) {
        fun getExecutionTime() = end - start
    }
}