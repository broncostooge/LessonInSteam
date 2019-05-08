import passwordHash from 'password-hash';

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

    await fetch('https://lessoninsteamservices.azurewebsites.net/Register', {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers
    })
  }