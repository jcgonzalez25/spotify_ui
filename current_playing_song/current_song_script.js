const getIntValue = function(eStyleValue) {
  return parseInt(eStyleValue.slice(0, -2));
}
const song_statusbar_element             = document.querySelector(".currently_playing");
const song_progress_bar                  = document.querySelector(".progress");
const song_info_div                      = document.querySelector(".song_info_div");
const screenHeight                       = window.innerHeight;
const navigation_original_height         = document.querySelector(".navigation").offsetHeight;
let SongInfo, SongController, SongState;
(function() {
  song_statusbar_element.addEventListener("click", () => SongInfo.showPlayingStatus());
  document.querySelector("#now_playing_toggle_button").addEventListener("click",()=> SongInfo.showPlayingStatus());
})();

SongState = {
  onFullScreen: false,
  isPlaying: false
};
SongInfo = {
  getSong: function() {},
  getAlbumArt: function() {},
  showPlayingStatus: function() {
    let fullScreen         = !song_info_div.classList.contains("d-none");
    let navigation_element = document.querySelector(".navigation");
    let song_info_height_value;
    if (!fullScreen) {
      song_info_div.style.height      = "0px";
      navigation_element.style.height = navigation_element.clientHeight + "px";
      song_info_div.classList.remove("d-none");
    }
    let animateNav = ()=>{
      let navigation_element_height_value;
      let id = setInterval(() => {
        navigation_element_height_value = getIntValue(navigation_element.style.height);
        if(fullScreen){
          navigation_element.style.height = navigation_element_height_value + 1 + "px";
          if(navigation_element_height_value === navigation_original_height)
            clearInterval(id);
        }else{
          navigation_element.style.height = navigation_element_height_value - 1 + "px";
          if(navigation_element_height_value === 0)
            clearInterval(id);
        }
      }, 10);
    }
    let animateMainContent =  ()=>{
      let topAnimation = setInterval(() => {
        song_info_height_value = getIntValue(song_info_div.style.height);
        if (fullScreen) {
          song_info_div.style.height = song_info_height_value - 30 + "px";
          if(song_info_height_value === 0)
            clearInterval(topAnimation)
            song_info_div.classList.add("d-none");
        } else {
          song_info_div.classList.remove("d-none");
          song_info_div.style.height = song_info_height_value + 30 + "px";
          if (song_info_height_value >= screenHeight - 20) {
            song_info_div.style.height = (screenHeight - song_info_height_value) + song_info_height_value + "px";
            clearInterval(topAnimation);
          }
        }
      }, 10);
    }
    animateNav();
    animateMainContent();
  },
  hidePlayingStatus: function() {

  }
}
SongController = {
  playSong: function() {},
  pauseSong: function() {}
}
