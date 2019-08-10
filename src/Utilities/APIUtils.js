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
/*
  await fetch('https://lessoninsteamservices.azurewebsites.net/GetUserSteamGameInfoFromSteamAPI', {
    method: "PUT",
    body: JSON.stringify(data),
    headers: headers
  })
  .then(response => response.json())
  .then(json => console.log(json));
  */
  await fetch(' http://localhost:57766/GetUserSteamGameInfoFromSteamAPI', {
    method: "PUT",
    body: JSON.stringify(data),
    headers: headers
  })
  .then(response => response.json())
  .then(json => console.log(json));

}

export function UpdateGameTitleAndTime(){
        
  const selectObject = document.getElementById("gameList");
  let selectedGameTitle = selectObject.options[selectObject.selectedIndex].getAttribute('gamename');
  let selectedGameTime = selectObject.options[selectObject.selectedIndex].getAttribute('time');
  
  store.dispatch({ type: 'SET_SELECTED_GAME_TITLE', gameTitle: selectedGameTitle })
  store.dispatch({ type: 'SET_SELECTED_GAME_TIME', gameTime: selectedGameTime })

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

  await fetch(' http://localhost:57766/UpdateAndLoadUserSteamInfo', {
    method: "PUT",
    body: JSON.stringify(data),
    headers: headers
  })
  .then(response => response.json())
  .then(json => {
      store.dispatch({ type: 'SET_GAME_LIST', gameList: json })
      store.dispatch({ type: 'SET_SELECTED_GAME_TITLE', gameTitle: "All" })
      store.dispatch({ type: 'SET_SELECTED_GAME_TIME', gameTime: 0 })
  }
  );

  if(document.getElementById("gameList").length > 0){
      document.getElementById("gameList").selectedIndex = "0";
  }
  document.getElementById("root").style.backgroundImage = 'url(https://images3.alphacoders.com/693/693872.jpg)';

  UpdateGameTitleAndTime();
}