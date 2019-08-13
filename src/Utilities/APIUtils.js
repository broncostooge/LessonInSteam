import passwordHash from 'password-hash';
import { store } from '../Store/store.js';

export async function CreateUser(){
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

    await fetch('https://lessoninsteamservices.azurewebsites.net/Register', {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers
    })
}

export async function DeleteUser(){
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

  await fetch('https://lessoninsteamservices.azurewebsites.net/Register', {
    method: "POST",
    body: JSON.stringify(data),
    headers: headers
  })
}

export async function UpdateUser(){
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

  await fetch('https://lessoninsteamservices.azurewebsites.net/Register', {
    method: "POST",
    body: JSON.stringify(data),
    headers: headers
  })
}

export async function LoginUser(){
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

export async function GetUserSteamGamesFromDB(){
  const username = document.getElementById("username").value;

  const data = {
    userName: username
  }

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');

  await fetch('https://lessoninsteamservices.azurewebsites.net/GetUserSteamGameInfoFromDB', {
    method: "PUT",
    body: JSON.stringify(data),
    headers: headers
  })
  .then(response => response.json())
  .then(json => console.log(json));
}

export async function GetUserSteamGamesFromSteamAPI(state){
  const username = document.getElementById("username").value;

  const data = {
    userName: username
  }

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');

  await fetch(' http://localhost:57766/GetUserSteamGameInfoFromSteamAPI', {
    method: "PUT",
    body: JSON.stringify(data),
    headers: headers
  })
  .then(response => response.json())
  .then(json => console.log(json));

}

export async function VerifySteamUserName(){

  const username = document.getElementById("username").value;

  const data = {
    userName: username
  }

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  
  await fetch(' https://lessoninsteamservices.azurewebsites.net/VerifySteamUserName', {
    method: "PUT",
    body: JSON.stringify(data),
    headers: headers
  })
  .then(response => response.json())
  .then(json => console.log(json.response));
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

  console.log(store.getState());

}

export async function UpdateAndLoadGameInfoFromSteamAPI(){

  const userName = document.getElementById("username").value;

  const data = {
    username: userName
  }

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');

  await fetch('https://lessoninsteamservices.azurewebsites.net/UpdateAndLoadUserSteamInfo', {
    method: "PUT",
    body: JSON.stringify(data),
    headers: headers
  })
  .then(response => response.json())
  .then(json => {
    
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
  }
  );

  if(document.getElementById("gameList").length > 0){
      document.getElementById("gameList").selectedIndex = "0";
  }
  document.getElementById("root").style.backgroundImage = 'url(https://images3.alphacoders.com/693/693872.jpg)';

  UpdateGameTitleAndTime();
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