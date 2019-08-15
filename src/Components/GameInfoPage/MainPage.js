import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../../Content/CSS/MainPage.css';
import UpdateAndLoadGameInfo from './UpdateAndLoadGameInfo'
import ListOfSteamGames from './ListOfSteamGames'

class MaLeinPage extends Component {
    render(){

        return(
            <div>
                <Grid container spacing={0}>
                    <Grid className='InnerGrid' item xs={4}>
                    </Grid>
                    <Grid className='InnerGridInput' item xs={2}>
                        <UpdateAndLoadGameInfo />
                    </Grid>
                    <Grid className='InnerGridInput' item xs={2}>
                        <ListOfSteamGames />
                    </Grid>
                    <Grid className='InnerGrid' item xs={4}>
                    </Grid>
                    
                    <Grid className='InnerGrid' item xs={4}>
                    </Grid>
                    <Grid className='InnerGridMainParent' item xs={4}>
                    </Grid>
                    <Grid className='InnerGrid' item xs={4}>
                    </Grid>

                    <Grid className='InnerGrid' item xs={4}>
                    </Grid>
                    <Grid className='InnerGrid' item xs={4}>
                    </Grid>
                    <Grid className='InnerGrid' item xs={4}>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default MainPage;