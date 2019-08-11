import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../../Content/CSS/MainPage.css';

class MainPage extends Component {
    render(){
        
        const styles = {
            height: '33vh'
        }

        return(
            <div>
                <Grid container spacing={0}>
                    <Grid className='InnerGrid' item xs={4}>
                        <Paper className='InnerGrid'>Star Wars</Paper>
                    </Grid>
                    <Grid className='InnerGridInput' item xs={2}>
                        <Paper className='InnerGridInput'>Input & Button</Paper>
                    </Grid>
                    <Grid className='InnerGridInput' item xs={2}>
                        <Paper className='InnerGridInput'>Game List Select</Paper>
                    </Grid>
                    <Grid className='InnerGrid' item xs={4}>
                        <Paper className='InnerGrid'>Years and Days</Paper>
                    </Grid>
                    
                    <Grid className='InnerGrid' item xs={4}>
                        <Paper className='InnerGrid'>Trip Across America</Paper>
                    </Grid>
                    <Grid className='InnerGridMainParent' item xs={4}>
                        <Paper className='InnerGridMain'>Game Name and Info</Paper>
                    </Grid>
                    <Grid className='InnerGrid' item xs={4}>
                        <Paper className='InnerGrid'>Mile Time</Paper>
                    </Grid>

                    <Grid className='InnerGrid' item xs={4}>
                        <Paper className='InnerGrid'>Football</Paper>
                    </Grid>
                    <Grid className='InnerGrid' item xs={4}>
                        <Paper className='InnerGrid'>Apoll 11</Paper>
                    </Grid>
                    <Grid className='InnerGrid' item xs={4}>
                        <Paper className='InnerGrid'>Top 5</Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default MainPage;