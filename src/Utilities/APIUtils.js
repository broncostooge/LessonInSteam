import passwordHash from 'password-hash';

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

export async function GetUserSteamGames(){
  const username = document.getElementById("username").value;

  const data = {
    userName: username
  }

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');

  await fetch('https://lessoninsteamservices.azurewebsites.net/GetUserSteamGameInfo', {
    method: "PUT",
    body: JSON.stringify(data),
    headers: headers
  })
  .then(response => response.json())
  .then(json => console.log(json));
}