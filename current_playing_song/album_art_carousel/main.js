//figure album movement
//testing for show playing status
(function(){
  //SongInfo.showPlayingStatus();
})();
let Carousel = {
  AlbumWrapper:null,
  centeredScrollX:328,
  moveArtwork:function(event){
    
  },
  focusOnMainElement:function(){
    this.AlbumWrapper.scrollLeft = this.centeredScroll;
  },
  showAlbumArtwork:function(){
    this.AlbumWrapper.classList.remove("d-none");
    this.AlbumWrapper.classList.add("d-flex");
  },
  swiperOn:function(){
    this.AlbumWrapper = document.querySelector("#album_art_Wrapper");
    this.focusOnMainElement();
    this.showAlbumArtwork();
    this.AlbumWrapper.addEventListener("scroll",event=>this.moveArtwork(event));
    this.AlbumWrapper.addEventListener("touchend",event=>this.draggingFinished(event));
    this.AlbumWrapper.addEventListener("touchstart",event=>this.dragging(event));
  },
  draggingFinished:function(event){
    let onNextSong = false;
    this.AlbumWrapper.style.overflow= "hidden";
    this.AlbumWrapper.scrollLeft = this.centeredScrollX;
  },
  dragging:function(event){
    this.AlbumWrapper.style.overflow = "scroll";
  }
}
