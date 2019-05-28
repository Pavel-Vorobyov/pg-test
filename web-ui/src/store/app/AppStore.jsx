import {actionsConst} from './AppStoreActions';

export default (() => {
    let initialState = {
        threadsCount: 0,
        requestsPerSecond: 0,
        requestsDelay: 0,
        isTestStarted: false,
        data: [
            {"thtCount": "10","ms": 40},
            {"thtCount": "10","ms": 36},
            {"thtCount": "10","ms": 37},
            {"thtCount": "10","ms": 36},
            {"thtCount": "10","ms": 272}
        ]
    };

    let updateData = (state, action) => ({
        ...state,
        data: action.value
    });

    let updateThreadsCount = (state, action) => ({
        ...state,
        threadsCount: action.value
    });

    let updateRequestsPerSecond = (state, action) => ({
        ...state,
        requestsPerSecond: action.value
    });

    let updateRequestsDelay = (state, action) => ({
        ...state,
        requestsDelay: action.value
    });

    let updateIsTestStarted = (state, action) => ({
        ...state,
        isTestStarted: action.value
    });

    return (state = initialState, action) => {
        switch (action.type) {
            case actionsConst.UPDATE_REQUEST_INFO:
                return updateData(state, action);
            case actionsConst.UPDATE_THREADS_COUNT:
                return updateThreadsCount(state, action);
            case actionsConst.UPDATE_REQUESTS_PER_SECOND:
                return updateRequestsPerSecond(state, action);
            case actionsConst.UPDATE_REQUESTS_DELAY:
                return updateRequestsDelay(state, action);
            case actionsConst.UPDATE_IS_TEST_STARTED:
                return updateIsTestStarted(state, action);

            default:
                return state;
        }
    };
})()