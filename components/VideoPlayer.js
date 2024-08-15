import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { WebView } from 'react-native-webview'


const VideoPlayer = ({ streamUrl }) => {




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


        <script>

        
        var player = videojs('videojs', {
                controls: true,
                autoplay: false,
                preload: 'auto',
                
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
                    source={{ html: htmlContentClappr }}
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