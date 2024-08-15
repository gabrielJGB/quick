import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { WebView } from 'react-native-webview'
import { useSettings } from '../context/SettingsProvider'


const VideoPlayer = ({ streamUrl }) => {

    const { accentColor } = useSettings()


    useEffect(() => {
        return () => { streamUrl = false }
    }, [])



    const htmlContentClappr = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>*{padding:0;margin:0}</style>
    </head>
      <body style="background:black">
      
        <div id="player"></div>


        <script src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js"></script>
        <script type="text/javascript"
        src="https://cdn.jsdelivr.net/gh/clappr/clappr-level-selector-plugin@latest/dist/level-selector.min.js"></script>

     

        <script>
        
            var player = new Clappr.Player({
                source: '${streamUrl}',
                parentId: '#player',
                width: '100%',
                height:'200px',
                preload: 'auto',
                autoPlay: 'true',
                fullscreenEnabled: 'true',
                hideMediaControl: 'false',
       
            }); 
        
        </script>
      </body>
    </html>
  `;


    const htmlContentVideojs = `
   <!DOCTYPE html>

    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <link href="https://vjs.zencdn.net/8.16.1/video-js.css" rel="stylesheet" />
            <style>*{padding:0;margin:0}</style>

        </head>



        <body style="background:black">
        

        <video id="videojs" class="video-js vjs-fluid vjs-default-skin vjs-big-play-centered" controls preload="auto" autoplay  fluid="true" >

            <source src="${streamUrl}" type="application/x-mpegURL">
           
        </video>

        <script src="https://vjs.zencdn.net/8.16.1/video.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-quality-levels/4.1.0/videojs-contrib-quality-levels.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/videojs-hls-quality-selector"></script>

        <script src="https://unpkg.com/browse/@videojs/http-streaming@3.10.0/dist/videojs-http-streaming.min.js"></script>

         

        <script>

            var player = videojs('videojs', {
                    controls: true,
                    autoplay: true,
                    preload: 'auto',
                    liveui: true,
                    });


        </script>


    </body>
</html>
  `

    const htmlContentNative = `
   <!DOCTYPE html>

    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
        
            <style>*{padding:0;margin:0}</style>

        </head>



        <body style="background:black">
        

        <video controls preload="auto" autoplay  fluid="true" >

            <source src="${streamUrl}" type="application/x-mpegURL">
           
        </video>

    </body>
</html>

  `


    const htmlContentShaka = `
    <!doctype html>
<html>
<head>
    <title>Dash.js Rocks</title>
  
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
        
            <style>*{padding:0;margin:0}</style>
    </head>
    <body>
    

    <div>
        <video data-dashjs-player autoplay src="${streamUrl}" controls>
        </video>
    </div>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/dashjs/4.7.4/dash.all.min.js"></script>
</body>
</html>
    `


    const htmlContentPlyr = `
    
    <!doctype html>
<html>
<head>
    <title>Dash.js Rocks</title>
  
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
        
            <style>
                *{padding:0;margin:0}

                :root {
                    --plyr-color-main: ${accentColor};
                }
            </style>
            <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
    </head>
    <body style="background-color:black">

    <video id="player" autoplay playsinline controls >

        <source src="${streamUrl}" type="application/x-mpegURL"/>
    </video>
  
<script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>

<script>
  const player = new Plyr('#player',{
    speed:{ selected: 1, options: [0.5, 1,1.5, 2, 5] },
    controls: [
  'play-large',
  'play', // Play/pause playback
  'current-time', // The current time of playback
  'mute',
  'volume', // Volume control
  'settings', // Settings menu
  'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
  'fullscreen', // Toggle fullscreen
],
    settings: ['captions', 'quality', 'speed', 'loop']
  });


</script>
</body>
</html>

    
    `

    return (
        <>
            {
                streamUrl &&
                <WebView
                    style={s.container}
                    userAgent='Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
                    allowsFullscreenVideo
                    originWhitelist={['*']}
                    // source={{uri:streamUrl}}
                    // source={{ html: htmlContentNative}}
                    // source={{ html: htmlContentVideojs }}
                    source={{ html: htmlContentPlyr }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowsInlineMediaPlayback={true}
                    allowsProtectedMedia={true}
                    mediaPlaybackRequiresUserAction={false}
                />
            }
        </>
    )
}

export default VideoPlayer

const s = StyleSheet.create({
    container: {
        flex: 1,
    },

})