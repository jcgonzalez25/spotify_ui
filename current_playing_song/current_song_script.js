const getIntValue = function(eStyleValue) {
  return parseInt(eStyleValue.slice(0, -2));
}
const song_statusbar_element             = document.querySelector(".currently_playing");
const song_progress_bar                  = document.querySelector(".progress");
const song_info_div                      = document.querySelector(".song_info_div");
const screenHeight                       = window.innerHeight;
const navigation_original_height         = document.querySelector(".navigation").offsetHeight;
let SongInfo, SongController, SongState,CurrentSongAnimation;

(function() {
  song_statusbar_element.addEventListener("click", () => SongInfo.showPlayingStatus());
  document.querySelector("#now_playing_toggle_button").addEventListener("click",()=> SongInfo.showPlayingStatus());
})();
let CAnimation = {
  fullScreen:null,
  NavigationElement:document.querySelector(".navigation"),
  init:function(){
    if(!this.fullScreen)
      this.fullScreenSetup();
  },
  fullScreenSetup:function(){
    song_info_div.style.height          = "0px";
    this.NavigationElement.style.height = this.NavigationElement.clientHeight + "px";
    song_info_div.classList.remove("d-none");
  },
  animateNav:function(){
    let navigation_element_height_value;
    let id = setInterval(() => {
      navigation_element_height_value = getIntValue(this.NavigationElement.style.height);
      if(this.fullScreen){
        this.NavigationElement.style.height = navigation_element_height_value + 1 + "px";
        if(navigation_element_height_value === navigation_original_height)
          clearInterval(id);
      }else{
        this.NavigationElement.style.height = navigation_element_height_value - 1 + "px";
        if(navigation_element_height_value === 0)
          clearInterval(id);
      }
    }, 10);
  },
  completedFullScreen:null,
  animateMainContent:function(){
    let topAnimation = setInterval(() => {
      song_info_height_value = getIntValue(song_info_div.style.height);
      if (this.fullScreen) {
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
          this.completedFullScreen();
        }
      }
    }, 10);
  }
};

SongInfo = {
  getSong: function() {},
  getAlbumArt: function() {},
  enableFullScreenControls:function(){
    Carousel.swiperOn();
  },
  showPlayingStatus:function() {
    let fullScreen         = !song_info_div.classList.contains("d-none");
    let navigation_element = document.querySelector(".navigation");
    let song_info_height_value;
    CAnimation.fullScreen  = !song_info_div.classList.contains("d-none");
    CAnimation.init();
    CAnimation.animateNav();
    CAnimation.animateMainContent();
    CAnimation.completedFullScreen=()=>{
      this.enableFullScreenControls();
    }
  },
  hidePlayingStatus: function() {

  }
};
SongController = {
  playSong: function() {},
  pauseSong: function() {}
};
