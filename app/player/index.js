import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { ActivityIndicator, IconButton } from 'react-native-paper'
import VideoPlayer from '../../components/VideoPlayer'
import WebView from 'react-native-webview'
import { useSettings } from '../../context/SettingsProvider'
import { getM3U8Content } from '../../utils/stream'

const Player = () => {

    const { url, title, isClip } = useLocalSearchParams()
    const { accentColor } = useSettings()
    const { back } = useRouter()
    const [source, setSource] = useState(false)




    const htmlContentClappr = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>*{padding:0;margin:0}</style>
    </head>
      <body style="background:#1c1c1c;height:200px">
      
        <div id="player"></div>


        <script src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js"></script>
        <script type="text/javascript"
        src="https://cdn.jsdelivr.net/gh/clappr/clappr-level-selector-plugin@latest/dist/level-selector.min.js"></script>

     

        <script>
        
            var player = new Clappr.Player({
                source: '${url}',
                parentId: '#player',
                width: '100%',
                height:'340px',
                preload: 'auto',
                autoPlay: 'true',
                fullscreenEnabled: 'true',
                hideMediaControl: 'false',
                plugins: [LevelSelector],
                levelSelectorConfig: {
                    title: 'Calidad',
                    labels: {
                        4: '1080p',
                        3: '720p',
                        2: '480p', 
                        1: '360p', 
                        0: '160p',
                    },
                    
                    labelCallback: function(playbackLevel, customLabel) {
                        return customLabel 
                    }
                }
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

           <source src="${url}" type="application/x-mpegURL">
          
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

    const htmlContentPlyr = `
    
    <!doctype html>
<html>
<head>
    <title>Plyr</title>
  
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

        <source src="${url}" type="application/x-mpegURL"/>
    </video>
  
    <script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>

    <script>
        const player = new Plyr('#player',{
            settings: ['speed', 'quality'],
            speed:{ selected: 1, options: [0.5, 1,1.5, 2, 5] },
            quality:{ default: 360, options: [1080, 720,480, 360, 160] },
            controls: [
                'play-large',
                'play',
                'mute',
                'current-time',
                'progress',
                'settings',
                'download', 
                'fullscreen', 
            ]
        });

    </script>
</body>
</html>

    
    `

    // if (!source)
    //     return <ActivityIndicator size={22} color="white" style={{ marginTop: 40 }} />

    return (
        <View>
            <View style={s.header}>
                <IconButton icon="arrow-left" iconColor="white" onPress={() => back()} />
                <Text style={s.title}>{title}</Text>
            </View>
            <View style={s.webviewContainer}>

                <WebView
                    style={s.webview}
                    allowsFullscreenVideo
                    originWhitelist={['*']}
                    source={{ html: htmlContentClappr }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowsInlineMediaPlayback={true}
                    allowsProtectedMedia={true}
                    mediaPlaybackRequiresUserAction={false}
                />


            </View>

        </View>
    )
}

export default Player

const s = StyleSheet.create({
    webview: {
        flex: 1
    },
    header: {
        flexDirection: "row",
        alignItems: "center",

    },
    webviewContainer: {
        width: "100%",
        height: 340,
        flexDirection: "column",
        gap: 7,
    },
    title: {
        padding: 7,
        color: "white",
        fontSize: 14,
        fontWeight: "500",
        maxWidth: "85%"
    },
    creator: {
        color: "grey",
        fontSize: 12,
    },
    info: {
        padding: 7,
        flexDirection: "column",
        gap: 4
    }

})