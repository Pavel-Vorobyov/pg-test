import api from '../axios';

export default {
    getRequestInfo: () => new Promise(resolve => {
        api.get('/app/state/requestInfo')
            .then(result => resolve(result.data))
            .catch(err => {});
    }),

    getInfo: () => new Promise(resolve => {
       api.get('/app/state/info')
           .then(result => resolve(result.data))
           .catch(err => {})
    }),

    updateThreadsCount: value => new Promise(resolve => {
        api.post('/app/state/threadCount?threadCount=' + value)
            .then(result => resolve(result))
            .catch(err => {})
    }),

    updateRequestsPerSecond: value => new Promise(resolve => {
        api.post('/app/state/requestPerSecond?requestPerSecond=' + value)
            .then(result => resolve(result))
            .catch(err => {})
    }),

    updateRequestsDelay: value => new Promise(resolve => {
        api.post('/app/state/requestDelay?requestDelay=' + value)
            .then(result => resolve(result))
            .catch(err => {})
    }),

    updateIsTestStarted: value => new Promise(resolve => {
        api.post('/app/state/isTestStarted?isTestStarted=' + value)
            .then(result => resolve(result))
            .catch(err => {})
    })
}