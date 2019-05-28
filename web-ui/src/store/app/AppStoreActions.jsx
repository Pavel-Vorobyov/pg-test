export const actionsConst = {
    UPDATE_REQUEST_INFO: 0,
    UPDATE_THREADS_COUNT: 1,
    UPDATE_REQUESTS_PER_SECOND: 2,
    UPDATE_REQUESTS_DELAY: 3,
    UPDATE_IS_TEST_STARTED: 4
};

export const actions = {
    updateRequestInfo: data => ({type: actionsConst.UPDATE_REQUEST_INFO, value: data}),
    updateThreadsCount: value => ({type: actionsConst.UPDATE_THREADS_COUNT, value: value}),
    updateRequestsPerSecond: value => ({type: actionsConst.UPDATE_REQUESTS_PER_SECOND, value: value}),
    updateRequestsDelay: value => ({type: actionsConst.UPDATE_REQUESTS_DELAY, value: value}),
    updateIsTestStarted: value => ({type: actionsConst.UPDATE_IS_TEST_STARTED, value: value})
};
