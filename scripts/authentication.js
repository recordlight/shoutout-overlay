let clientId = 'process.env.CLIENT_KEY'
let clientSecret = 'process.env.CLIENT_SECRET'

async function getToken() {
    const credential = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
    }

    const response = await fetch("https://id.twitch.tv/oauth2/token", {
        method: "POST",
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams(credential)
    });

    return response.json();
}