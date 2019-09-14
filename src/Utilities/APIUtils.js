import passwordHash from 'password-hash';
import { store } from '../Store/store.js';

export async function AuthenticateUser(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const hashedPassword = passwordHash.generate(password);

  const data = {
    username: username,
    password: hashedPassword
  }

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');

  await fetch('https://lessoninsteamservices.azurewebsites.net/Register', {
    method: "POST",
    body: JSON.stringify(data),
    headers: headers
  })
}

export async function VerifySteamUserName(){

  const username = document.getElementById("username");
  const verifySteamNameButton = document.getElementById("VerifySteamNameButton");
  const steamNameVerifyInfo = document.getElementById("SteamNamveVerifyInfo");

  const data = {
    userName: username.value
  }

  if(username.value.length > 0){
    verifySteamNameButton.style.display = '';
  }
  else{
    verifySteamNameButton.style.display = 'none';
  }
  const rules = RegExp('[0-9]{17}');
  //Check if txt is steamID or username
  if(!rules.test(data.userName)){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    
    await fetch('http://localhost:57766/VerifySteamUserName', {
      method: "PUT",
      body: JSON.stringify(data),
      headers: headers
    })
    .then(response => response.json())
    .then(json => {

      if(json.response.success === 1){
        username.classList.add("success");
        username.classList.remove("fail");
        verifySteamNameButton.classList.remove("Mui-disabled");
        verifySteamNameButton.disabled = false;
        steamNameVerifyInfo.innerHTML = "That name checks out!";
      }
      else{
        username.classList.add("fail");
        username.classList.remove("success");
        verifySteamNameButton.classList.add("Mui-disabled");
        verifySteamNameButton.disabled = true;
        steamNameVerifyInfo.innerHTML = "That name doesn't look correct!";
      }
    });
  }
  else{
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    
    await fetch('http://localhost:57766/VerifySteam64ID', {
      method: "PUT",
      body: JSON.stringify(data),
      headers: headers
    })
    .then(response => response.json())
    .then(json => {
      if(json){
        username.classList.add("success");
        username.classList.remove("fail");
        verifySteamNameButton.classList.remove("Mui-disabled");
        verifySteamNameButton.disabled = false;
        steamNameVerifyInfo.innerHTML = "That name checks out!";
      }
      else{
        username.classList.add("fail");
        username.classList.remove("success");
        verifySteamNameButton.classList.add("Mui-disabled");
        verifySteamNameButton.disabled = true;
        steamNameVerifyInfo.innerHTML = "That name doesn't look correct!";
      }
    });
  }
}

export function SetBackgroundImage(){
  const backgroundImageSourceURLbegin = "https://steamcdn-a.akamaihd.net/steam/apps/";
  const backgroundImageSourceURLend = "/page_bg_generated_v6b.jpg"
  const selectObject = document.getElementById("gameList");

  let elementById_root = document.getElementById("root");
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

  UpdateGameTitleAndTime();
}

export function UpdateGameTitleAndTime(){
        
  const selectObject = document.getElementById("gameList");

  let selectedGameTitle = selectObject.options[selectObject.selectedIndex].getAttribute('gamename');
  let selectedGameTime = selectObject.options[selectObject.selectedIndex].getAttribute('time');
  
  store.dispatch({ type: 'SET_SELECTED_GAME_TITLE', gameTitle: selectedGameTitle })
  store.dispatch({ type: 'SET_SELECTED_GAME_TIME', gameTime: selectedGameTime })

  const gameList = store.getState().gameList;
  
  gameList.filter((game, index) => {
    if(game.name === selectedGameTitle){
      store.dispatch({ type: 'SET_SELECTED_GAME_APP_ID', selectedGameAppID: gameList[index].appid});
      store.dispatch({ type: 'SET_SELECTED_GAME_LOGO_URL', selectedGameLogoURL: gameList[index].img_logo_url});
    }
    return true;
  })
}

export async function UpdateAndLoadGameInfoFromSteamAPI(props){
  const userName = document.getElementById("username").value;
  const steamNameVerifyInfo = document.getElementById("SteamNamveVerifyInfo");

  const data = {
    username: userName
  }
  const rules = RegExp('[0-9]{17}');
  //Check if txt is steamID or username
  debugger;
  if(!rules.test(data.username)){
      
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
    .then(json => {
      if(json.length > 0){
        props.history.push('/LessonInSteam');
        const gamesSortedByGameName = json.sort((a, b) => SortByGameName(a, b));
        const gamesSortedByTime = json.sort((a, b) => b.playtime_forever - a.playtime_forever);
        let topFiveGames = [];
        
        for (var i = 0; i < 5; i++){
          topFiveGames[i] = gamesSortedByTime[i];
        }

        store.dispatch({ type: 'SET_GAME_LIST', gameList: gamesSortedByGameName });
        store.dispatch({ type: 'SET_TOP_FIVE_GAMES', topFiveGames: topFiveGames});
        store.dispatch({ type: 'SET_SELECTED_GAME_TITLE', gameTitle: "All" });
        store.dispatch({ type: 'SET_SELECTED_GAME_TIME', gameTime: 0 });
      

        if(document.getElementById("gameList").length > 0){
            document.getElementById("gameList").selectedIndex = "0";
        }
        document.getElementById("root").style.backgroundImage = 'url(https://images3.alphacoders.com/693/693872.jpg)';

        UpdateGameTitleAndTime();
      }
      else{
        steamNameVerifyInfo.innerHTML = "Uh Oh. Make sure you have your steam profile set to Public so I can can show you your games!"
      }
    });
  }
  else{
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    await fetch(' http://localhost:57766/UpdateAndLoadUserSteamInfoFrom64ID', {
      method: "PUT",
      body: JSON.stringify(data),
      headers: headers
    })
    .then(response => response.json())
    .then(json => {
      if(json.length > 0){
        props.history.push('/LessonInSteam');
        const gamesSortedByGameName = json.sort((a, b) => SortByGameName(a, b));
        const gamesSortedByTime = json.sort((a, b) => b.playtime_forever - a.playtime_forever);
        let topFiveGames = [];
        
        for (var i = 0; i < 5; i++){
          topFiveGames[i] = gamesSortedByTime[i];
        }

        store.dispatch({ type: 'SET_GAME_LIST', gameList: gamesSortedByGameName });
        store.dispatch({ type: 'SET_TOP_FIVE_GAMES', topFiveGames: topFiveGames});
        store.dispatch({ type: 'SET_SELECTED_GAME_TITLE', gameTitle: "All" });
        store.dispatch({ type: 'SET_SELECTED_GAME_TIME', gameTime: 0 });
      

        if(document.getElementById("gameList").length > 0){
            document.getElementById("gameList").selectedIndex = "0";
        }
        document.getElementById("root").style.backgroundImage = 'url(https://images3.alphacoders.com/693/693872.jpg)';

        UpdateGameTitleAndTime();
      }
      else{
        steamNameVerifyInfo.innerHTML = "Uh Oh. Make sure you have your steam profile set to Public so I can can show you your games!"
      }
    });
  }
}

function SortByGameName(a, b){
  if(a.name < b.name){
    return -1;
  }
  else if(a.name > b.name){
    return 1;
  }
  else{
    return 0;
  }
}
