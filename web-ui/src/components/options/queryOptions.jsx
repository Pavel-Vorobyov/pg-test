import React from 'react';
import Draggable from 'react-draggable';
import {withStyles} from '@material-ui/core/styles';
import {Button, Paper} from "@material-ui/core";
import {connect} from "react-redux";

import {actions, actionsConst} from '../../store/app/AppStoreActions';
import Checkbox from "@material-ui/core/Checkbox";

const style = theme => ({
        option: {
            padding: '10px',
            minWidth: '300px',
            minHeight: '220px',
            color: 'black'
        },
        checkBoxWrapper: {
            padding: '8px',
            textAlign: 'left',
            width: '-webkit - fill - available'
        }
    })
;

const QueryOptions = props =>
    <div>
        <Draggable
            handle='.cursor'
            grid={[10, 10]}
        >
            <Paper className={props.classes.option}>
                <div className="cursor" style={{
                    backgroundColor: '#cfd8dc',
                    borderRadius: '5px',
                    paddingTop: '3px',
                    paddingBottom: '3px',
                    cursor: 'move'
                }}>
                    Query Options
                </div>
                <div className={props.classes.checkBoxWrapper}>
                    <Checkbox
                        checked={false}
                        onChange={() => {
                        }}
                    />
                    EntityManager -> save
                </div>
                <div className={props.classes.checkBoxWrapper}>
                    <Checkbox
                        checked={false}
                        onChange={() => {
                        }}
                    />
                    EntityManager -> batch
                </div>
                <div className={props.classes.checkBoxWrapper}>
                    <Checkbox
                        checked={false}
                        onChange={() => {
                        }}
                    />
                    SQL optimisation
                </div>
            </Paper>
        </Draggable>
    </div>;

const mapStateToProps = state => ({
    data: state.appStore.data
});

const mapDispatchToProps = dispatch => ({
    updateData: data => dispatch(actions.updateRequestInfo(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(QueryOptions));

