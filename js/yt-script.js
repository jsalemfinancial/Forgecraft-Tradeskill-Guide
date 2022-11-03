// YouTube Embed

// 1. Create Div tag to be replaced.

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('body-background', {
        videoId: 'oHDRwPiYnes',
        playerVars: {
            modestbranding: 1,
            mute: 1,
            autoplay: 1,
            autohide: 1,
            controls: 0,
            showinfo: 0,
            wmode: 'transparent',
            branding: 0,
            rel: 0,
            origin: window.location.origin
        },
        events: {
        'onReady': onPlayerReady,
        // 'onStateChange': onPlayerStateChange
        }
    });
};

// 4. The API will call this function when the video player is ready. 

function onPlayerReady(event) {
    event.target.playVideo();

    setInterval(() => {
        player.seekTo(0);
    }, 39690);
};

// 5. The API calls this function when the player's state changes.

// function onPlayerStateChange(event) {

// };

// function stopVideo() {
//     player.stopVideo();
// };