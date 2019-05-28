import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Draggable, {DraggableCore} from 'react-draggable';
import {Paper} from "@material-ui/core";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {connect} from "react-redux";

const styles = theme => ({
    chart: {
        padding: '10px',
        paddingLeft: '0',
        minWidth: '700px',
        minHeight: '300px',
        color: 'black'
    }
});

const Chart = props =>
    <div style={{
    }}>
        <Draggable
            grid={[10, 10]}
        >
            <Paper className={props.classes.chart}>
                <div className="cursor" style={{
                    backgroundColor: '#cfd8dc',
                    borderRadius: '5px',
                    paddingTop: '3px',
                    paddingBottom: '3px',
                    cursor: 'move',
                    marginLeft: '10px',
                    marginBottom: '10px'
                }}>
                    Chart
                </div>
                <LineChart
                    width={700}
                    height={430}
                    data={props.data}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <XAxis dataKey="name" />
                    <YAxis dataKey="ms" />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <Line isAnimationActive={false} type="linear" dataKey="ms" stroke="#ff7300" yAxisId={0} />
                    <Line isAnimationActive={false} type="linear" dataKey="avg" stroke="#80cbc4" yAxisId={0} />
                </LineChart>
            </Paper>
        </Draggable>
    </div>;

const mapStateToProps = state => ({
    data: state.appStore.data
});

export default connect(mapStateToProps, null)(withStyles(styles)(Chart));