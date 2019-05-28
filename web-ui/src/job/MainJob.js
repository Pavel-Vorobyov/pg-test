import appStateService from '../service/AppStateService';
import {store} from "../index";
import {actions} from "../store/app/AppStoreActions";

export const startGettingInfo = () =>
    setInterval(() => {
    appStateService.getRequestInfo()
        .then(data => {
            let avg = data.reduce((sum, it) => sum + it.ms, 0) / data.length;
            let withAvg = data.map(it => ({
                ...it,
                avg: avg
            }));

            store.dispatch(actions.updateRequestInfo(withAvg))
        });
}, 1000);