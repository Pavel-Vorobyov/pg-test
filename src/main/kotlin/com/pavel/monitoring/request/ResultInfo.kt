package com.pavel.monitoring.request

import java.util.concurrent.atomic.AtomicInteger

class ResultInfo(
    var total: Int? = 0,
    val success: AtomicInteger? = AtomicInteger(0),
    val reject: AtomicInteger? = AtomicInteger(0)
) {
    fun merge(resultInfo: ResultInfo): ResultInfo {
        total = resultInfo.total
        success!!.set(success.get() + resultInfo.success!!.get())
        reject!!.set(reject.get() + resultInfo.reject!!.get())

        return this
    }
}