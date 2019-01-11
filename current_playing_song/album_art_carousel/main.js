//figure album movement
//testing for show playing status
(function(){
  SongInfo.showPlayingStatus();
})();
let Carousel = {
  AlbumWrapper:null,
  centeredScroll:328,
  moveArtwork:function(event){
    console.log("hello");
  },
  focusOnMainElement:function(){
    this.AlbumWrapper.scrollLeft = this.centeredScroll;
  },
  swiperOn:function(){
    this.AlbumWrapper = document.querySelector("#album_art_Wrapper");
    this.AlbumWrapper.addEventListener("scroll",event=>this.moveArtwork(event));
    this.AlbumWrapper.addEventListener("touchend",event=>this.dragoff(event));
    this.AlbumWrapper.addEventListener("touchstart",event=>this.dragon(event));
  },
  dragoff:function(event){
    let onNextSong = false;
    console.log("dragging done");
    this.AlbumWrapper.style.overflow= "hidden";
    this.AlbumWrapper.scrollLeft = this.centeredScroll;
  },
  dragon:function(event){
    this.AlbumWrapper.style.overflow = "scroll";
    console.log("this.Wrapper");
  }
}
