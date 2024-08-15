import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { IconButton } from 'react-native-paper'
import VideoPlayer from '../../components/VideoPlayer'
import WebView from 'react-native-webview'

const Player = () => {

    const { url } = useLocalSearchParams()
    const { back } = useRouter()

    const htmlContent = `
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
                height:'200px',
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


    return (
        <View>
            <View>
                <IconButton icon="arrow-left" iconColor="white" onPress={() => back()} />
            </View>
            <View style={s.webviewContainer}>

                <WebView
                    style={s.webview}
                    allowsFullscreenVideo
                    originWhitelist={['*']}
                    source={{ html: htmlContent }}
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
    webviewContainer:{
        height: 200 ,
        flexDirection:"column",
        gap:7,
    },
    title: {
        color: "white",
        fontSize: 14,
        fontWeight: "500"
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