const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const shoutoutQueue = [];

const timer = 10000;
const popupdelaytimer = 10000;



let dialogElement = document.getElementById("dialog-box");
let profileImage = document.getElementById("profile-image");
let streamerName = document.getElementById("streamer-name");
let streamerCategory = document.getElementById("streamer-category");
let videoContent = document.getElementById("video-content");

let videoFrame = document.getElementById("video-frame");
let mainChannel = urlParams.get('channel');
let messageExist = false;

const mainfunction = async function(){
  const opts = {
    options: { debug: true },
      channels: [mainChannel]
    };

  const client = new tmi.Client( opts );
  client.connect().catch(console.error);


  client.on('message', (channel, tags, message, self) => {
    console.log(tags);

    var fulfilCondition = (message.startsWith("!so ") || message.startsWith("!shoutout ") || message.startsWith("!mso ")) && 
      (mainChannel === tags.username || tags.mod === true );

    if(fulfilCondition) 
    {
      let usernames = extractUsername(message);

      console.log(usernames)

      usernames.forEach(username => {
        if(username !== ""){
          if(shoutoutQueue.length === 0){
            getUsernameInfo(username);
            shoutoutQueue.push(username);
          } else {
            shoutoutQueue.push(username);
          }
        }
      });
    }

  });

  function extractUsername(message) {
    var messageComponent = message.split(" ");
    messageComponent.shift();
    return messageComponent;
  }
  
  function resetAnimation() {
    dialogElement.classList.remove(["fadeOutRight"]);
    dialogElement.style.animation = 'none';
    dialogElement.offsetHeight; /* trigger reflow */
    dialogElement.style.animation = null; 
  }

  function resetBox(){
    dialogElement.classList.add(["fadeOutRight"]);
    setTimeout(() => {
    videoFrame.innerHTML = "";
    streamerName.innerHTML = " ";
    streamerCategory.innerHTML = "";
    profileImage.setAttribute("src","");
    shoutoutQueue.shift();
    if(shoutoutQueue.length > 0){
      getUsernameInfo(shoutoutQueue[0]);
    }}, 2000);
  }

  function pickVideoAlgorithm(videoObject){
    if(videoObject.length > 0){
      videoObject.sort(function(a,b){return new Date(b.created_at) - new Date(a.created_at)});

      const probabilityArray = [0,0,0,0,0,1,1,1,1,2,2,2,3,3,3,4,4,5,5,6,7];
      var random = Math.floor(Math.random() * (probabilityArray.length));
      var pickedIndex = probabilityArray[random];

      pickedIndex = pickedIndex % (videoObject.length);


      console.log(random);
      console.log(pickedIndex);

      return videoObject[pickedIndex];

    }
  }

  function getUsernameInfo(userId){
    
    console.log('getting username info: ' +userId);

    Promise.all([
      result = fetch("https://twitchapi.teklynk.com/getuserstatus.php?channel="+userId, {
        method: "GET",
        headers:{
      }
      })
      .then(response => response.json())
      .then(response => {
        if(response.data.length > 0){
          streamerName.innerHTML = response.data[0].broadcaster_name;
          streamerCategory.innerHTML = response.data[0].game_name;
          //profileImage.setAttribute("src", response.data[0].profile_image_url);
        } else {
          setTimeout(resetBox, 0);
        }
      })
      ,
      result = fetch("https://twitchapi.teklynk.com/getuserinfo.php?channel="+userId, {
        method: "GET",
        headers:{
      }
      })
      .then(response => response.json())
      .then(response => {
        if(response.data.length > 0){
          profileImage.setAttribute("src", response.data[0].profile_image_url);
        } else {
          setTimeout(resetBox, 0);
        }
      })
      ,
      fetch("https://twitchapi.teklynk.com/getuserclips.php?channel="+userId+"&limit=100", {
        method: "GET",
        headers:{
        }
      }).then(response => response.json())
      .then(response => {
          if(response.data.length > 0){
            chosenClip = pickVideoAlgorithm(response.data);

            console.log(chosenClip);
            videoFrame.innerHTML = `
                <video id="video-content" autoplay muted loop>
                  <source src="${chosenClip.clip_url}" type="video/mp4" />
                </video>`;
          } else {

          }
        }
      )
    ]).then(()=>{
      
      console.log(shoutoutQueue);
      setTimeout(
        resetAnimation(),popupdelaytimer
      );
      setTimeout(resetBox, timer);
    })


    return true;
    
  }
}

mainfunction();