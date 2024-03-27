import { VoiceRSS } from "./voice.js";
import { APIKEY } from "./env.js";

let startBtn = document.getElementById("startBtn");
const audioElement = document.getElementById("audio");

const audioControl =() =>{
  startBtn.disabled = !startBtn.disabled;
}


const tellJoke = (joke)=>{
  VoiceRSS.speech({
        key: `${APIKEY}`,
        src: joke,
        hl: "en-us",
        v: "Linda",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
      });
}


//fetching joke 
const getJokes = async () => {
  let joke = "";
  try {
    const res = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    );

    const data = await res.json();
    if(data.setup){
      joke = `${data.setup}...${data.delivery}`
    } else{
      joke = `${data.joke}`
    }
    tellJoke(joke);
    audioControl();
  
  } catch (err) {
    console.log("jokesAPI", err);
  }
};



startBtn.addEventListener("click", getJokes);
audioElement.addEventListener("ended", audioControl)
