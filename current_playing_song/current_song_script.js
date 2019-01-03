const getIntValue         = function(eStyleValue){
  console.log(eStyleValue);
  return parseInt(eStyleValue.slice(0,-2));
}
const song_statusbar_element = document.querySelector(".currently_playing");
const song_progress_bar      = document.querySelector(".progress");
const song_info_div          = document.querySelector(".song_info_div");
const screenHeight           = window.innerHeight;


let SongInfo,SongController,SongState;
/*
progress bar is a sibling, so toggleing needs to be handled.
*/

(function(){
  song_statusbar_element.addEventListener("click",()=>SongInfo.showPlayingStatus());
})();

SongState={
  onFullScreen:false,
  isPlaying:false
}

SongInfo = {
  getSong:function(){
  },
  getAlbumArt:function(){
  },
  showPlayingStatus:function(){
    let fullScreen          = !song_info_div.classList.contains("d-none");
    let navigation_element  = document.querySelector(".navigation");
    let song_info_height_value;
    if(!fullScreen){
      song_info_div.style.height      = "0px";
      navigation_element.style.height = navigation_element.clientHeight + "px";
      song_info_div.classList.remove("d-none");
    }
    let animateNav = function(){
      let navigation_element_height_value;
      let id = setInterval(()=>{
        navigation_element_height_value = getIntValue(navigation_element.style.height);
        navigation_element.style.height = navigation_element_height_value - 1 + "px";
        if(navigation_element_height_value == 0)
          clearInterval(id);
      },1);
    }
    animateNav();


    let topAnimation = setInterval(()=>{
      if(fullScreen){
        console.log("should be full screen");
      }else{
        song_info_height_value          = getIntValue(song_info_div.style.height);
        song_info_div.style.height      = song_info_height_value + 10 + "px";
        if(song_info_height_value >= screenHeight){
          clearInterval(topAnimation);
        }
      }
    },1);

  },
  hidePlayingStatus:function(){

  }
}
SongController = {
  playSong:function(){
  },
  pauseSong:function(){
  }
}
