import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import {Button, Paper, TextField} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import {connect} from "react-redux";
import {actions, actionsConst} from '../../store/app/AppStoreActions';
import AppStateService from '../../service/AppStateService';

const styles = theme => ({
    stateWrapper: {
        padding: '10px',
        minWidth: '300px',
        minHeight: '220px',
        color: 'black'
    },
    stateInfoWrapper: {
        textAlign: 'left'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: '20px',
        width: 130,
        float: 'right'
    },
    button: {
        padding: '5px 20px',
        marginLeft: '36px'
    }
});

class State extends React.Component {

    handleChange = name => event => {
        let {updateThreadsCount, updateRequestPerSecond, updateRequestDelay, updateIsTestStarted} = this.props;
        let {value} = event.target;

        console.log(event.target)

        switch (name) {
            case actionsConst.UPDATE_THREADS_COUNT:
                updateThreadsCount(value);
                break;
            case actionsConst.UPDATE_REQUESTS_DELAY:
                updateRequestDelay(value);
                break;
            case actionsConst.UPDATE_REQUESTS_PER_SECOND:
                updateRequestPerSecond(value);
                break;
            case actionsConst.UPDATE_IS_TEST_STARTED:
                updateIsTestStarted(event.target.checked);
        }
    };

    handleUpdate = () => {
        let {threadsCount, requestsDelay, requestsPerSecond, isTestStarted} = this.props;

        AppStateService.updateIsTestStarted(isTestStarted);
        AppStateService.updateRequestsDelay(requestsDelay);
        AppStateService.updateRequestsPerSecond(requestsPerSecond);
        AppStateService.updateThreadsCount(threadsCount);
    };

    render() {
        let {classes, threadsCount, requestsDelay, requestsPerSecond, isTestStarted} = this.props;

        return (
            <div style={{
                paddingBottom: '10px'
            }}>
                <Draggable
                    handle=".cursor"
                    grid={[10, 10]}
                >
                    <Paper className={classes.stateWrapper}>
                        <div className="cursor" style={{
                            backgroundColor: '#cfd8dc',
                            borderRadius: '5px',
                            paddingTop: '3px',
                            paddingBottom: '3px',
                            cursor: 'move'
                        }}>
                            State
                        </div>
                        <div className={classes.stateInfoWrapper}>
                            <TextField
                                id="standard-threadsCount"
                                label="Threads Count"
                                value={threadsCount}
                                onChange={this.handleChange(actionsConst.UPDATE_THREADS_COUNT)}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <TextField
                                id="standard-requestsDelay"
                                label="Requests Delay, ml"
                                value={requestsDelay}
                                onChange={this.handleChange(actionsConst.UPDATE_REQUESTS_DELAY)}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <TextField
                                id="standard-requestsPerSecond"
                                label="Requests Per Second"
                                value={requestsPerSecond}
                                onChange={this.handleChange(actionsConst.UPDATE_REQUESTS_PER_SECOND)}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <div>
                                <Checkbox
                                    checked={isTestStarted}
                                    onChange={this.handleChange(actionsConst.UPDATE_IS_TEST_STARTED)}
                                />
                                Started
                            </div>
                            <Button
                                className={classes.button}
                                onClick={() => this.handleUpdate()}
                            >
                                Apply
                            </Button>
                        </div>
                    </Paper>
                </Draggable>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    threadsCount: state.appStore.threadsCount,
    requestsPerSecond: state.appStore.requestsPerSecond,
    requestsDelay: state.appStore.requestsDelay,
    isTestStarted: state.appStore.isTestStarted,
});

const mapToState = dispatch => ({
    updateThreadsCount: value => dispatch(actions.updateThreadsCount(value)),
    updateRequestPerSecond: value => dispatch(actions.updateRequestsPerSecond(value)),
    updateRequestDelay: value => dispatch(actions.updateRequestsDelay(value)),
    updateIsTestStarted: value => dispatch(actions.updateIsTestStarted(value))
});

export default connect(mapStateToProps, mapToState)(withStyles(styles)(State));