import React from 'react';
import {Paper} from "@material-ui/core";
import Draggable, {DraggableCore} from 'react-draggable';

import Chart from '../components/chart/chart';
import Options from '../components/options/queryOptions';
import State from '../components/state/state';

import AppStateService from '../service/AppStateService';

import {startGettingInfo} from '../job/MainJob';
import {actions} from "../store/app/AppStoreActions";
import {connect} from "react-redux";

class Main extends React.Component {
    componentDidMount() {
        let {updateThreadsCount, updateRequestsPerSecond, updateRequestsDelay, updateIsTestStarted} = this.props;
        startGettingInfo();

        AppStateService.getInfo()
            .then(data => {
                updateIsTestStarted(data.testStarted);
                updateRequestsDelay(data.requestsDelay);
                updateRequestsPerSecond(data.requestsPerSecond);
                updateThreadsCount(data.threadsCount);
            });
    };

    render() {
        return (
            <React.Fragment>
                <div style={{
                    width: '321px',
                    padding: '35px'
                }}>
                    <State/>
                    <Options/>
                </div>
                <Chart/>
                {/*<Draggable handle="strong">
                    <Paper>
                        <div className="box no-cursor">
                            <strong className="cursor">
                                <div>Drag here</div>
                            </strong>
                            <div>You must click my handle to drag me</div>
                        </div>
                    </Paper>
                </Draggable>*/}
            </React.Fragment>
        );
    }
}

const mapToState = dispatch => ({
    updateThreadsCount: value => dispatch(actions.updateThreadsCount(value)),
    updateRequestsPerSecond: value => dispatch(actions.updateRequestsPerSecond(value)),
    updateRequestsDelay: value => dispatch(actions.updateRequestsDelay(value)),
    updateIsTestStarted: value => dispatch(actions.updateIsTestStarted(value))
});

export default connect(null, mapToState)(Main);