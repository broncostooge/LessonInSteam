import React, { Component } from 'react';
import '../index.css';

class UpdateAndLoadGameInfo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            gameList: [],
            selectedGameTitle: "",
            selectedGameTime: 0
        }

        document.getElementById("root").style.backgroundImage = 'url(https://images3.alphacoders.com/693/693872.jpg)';
        document.getElementById("root").style.backgroundSize = 'cover';

        this.UpdateAndLoadGameInfo = this.UpdateAndLoadGameInfo.bind(this);
        this.HandleEvent = this.HandleEvent.bind(this);
        this.UpdateGameTitleAndTime = this.UpdateGameTitleAndTime.bind(this);
    }

    
    HandleEvent(){
        const backgroundImageSourceURLbegin = "https://steamcdn-a.akamaihd.net/steam/apps/";
        const backgroundImageSourceURLend = "/page_bg_generated_v6b.jpg"
        let elementById_root = document.getElementById("root");
        
        const selectObject = document.getElementById("gameList");
        let selectedOptionValue = null;

        if(selectObject.selectedIndex > -1)
        {
            selectedOptionValue = selectObject.options[selectObject.selectedIndex].value;  
        }

        if(selectedOptionValue !== "All"){
            elementById_root.style.backgroundImage = 'url(' + backgroundImageSourceURLbegin + selectedOptionValue + backgroundImageSourceURLend + ')';
        }
        else{
            elementById_root.style.backgroundImage = 'url(https://images3.alphacoders.com/693/693872.jpg)';
        }
        elementById_root.style.backgroundSize = 'cover';

        this.UpdateGameTitleAndTime();
    }

    UpdateGameTitleAndTime(){
        
        let selectedOptionValue = null;
        const selectObject = document.getElementById("gameList");

        if(selectObject.selectedIndex > -1)
        {
            selectedOptionValue = selectObject.options[selectObject.selectedIndex].value;  
        }
        
        this.setState((state, props) => {
            return {selectedGameTitle: selectObject.options[selectObject.selectedIndex].getAttribute('gamename'),
            selectedGameTime: selectObject.options[selectObject.selectedIndex].getAttribute('time')}
        })

    }

    async UpdateAndLoadGameInfo(){

        const userName = document.getElementById("username").value;

        const data = {
          username: userName
        }
      
        let headers = new Headers();
      
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        await fetch(' http://localhost:57766/UpdateAndLoadUserSteamInfo', {
          method: "PUT",
          body: JSON.stringify(data),
          headers: headers
        })
        .then(response => response.json())
        .then(json => this.setState((state, props) => {
            return {gameList: json};
        }));

        this.setState((state, props) => {
            return {selectedGameTitle: 'All',
            selectedGameTime: 94327}
        })
        if(document.getElementById("gameList").length > 0){
            document.getElementById("gameList").selectedIndex = "0";
        }
        document.getElementById("root").style.backgroundImage = 'url(https://images3.alphacoders.com/693/693872.jpg)';
    }

    render(){

        let gameList = null;
        let allOption = null;
        let selectStyles = {
            display: "none"
        }

        if(this.state.gameList.length > 0){

            let totalPlaytimeForever = 0;

            gameList = this.state.gameList.map((element, index) => {
                totalPlaytimeForever += element.playtime_forever;
                return <option key={index} value={element.appid} gamename={element.name} time={element.playtime_forever}>{element.name} - {element.playtime_forever}</option>;
            });

            allOption = <option key="All" value="All" gamename="All" time={totalPlaytimeForever}>All - {totalPlaytimeForever} mins</option>;

            selectStyles = {
                display: ""
            }
            
        }

        return(
            <div>
                <input id="username" placeholder="Username" type="text"></input>
                <button onClick={this.UpdateAndLoadGameInfo}>UpdateAndLoadGameInfo</button>
                <select onChange={this.HandleEvent} id="gameList" style={selectStyles}>{allOption}{gameList}</select>
                <h1 style={selectStyles}>{this.state.selectedGameTitle}</h1>
                <h2 style={selectStyles}>{this.state.selectedGameTime} mins</h2>
            </div>
        )
    }
}

export default UpdateAndLoadGameInfo;