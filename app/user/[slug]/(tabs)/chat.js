import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { WebView } from 'react-native-webview'
import { useStateContext } from '../../../../context/StateProvider'
import { useLocalSearchParams } from 'expo-router'


const Chat = () => {

  const { selectedProfile } = useStateContext()




  const content = `

  <!doctype html>
<html>
<head>
    <title>Dash.js Rocks</title>
  
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
        
            <style>*{padding:0;margin:0}</style>
    </head>
    <body>
  <h2>Chat</h2>

      <script>


      
      
        // alert("getCookie("session_token")")

        
        
        alert("ok")
     </script>
</body>
</html>
`
  function getCookie(cookies, name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = cookies.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1].replace("%7C", "|") : null;
  }

  const onMessage = (event) => {
    const cookies = event.nativeEvent.data;
    const sessionToken = getCookie(cookies, "session_token");
    console.log(sessionToken);

    fetch("https://kick.com/api/v2/channels/sebacorax/follow", {
      "headers": {
        "accept": "application/json",
        "accept-language": "es-419,es;q=0.9,en;q=0.8",
        "authorization": `Bearer 58699966|djVbHR4qWpqGLKmRE4xNxwDXzUUjw9Y1EVKREk9Y`,
        "cache-control": "max-age=0",
        "content-type": "application/json",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\"",
        "Referer": "https://next.kick.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "POST"
    }).then(e=>console.log(e)); 



  };

  const injectJS = `
window.ReactNativeWebView.postMessage(document.cookie);
true;
`;


  return (

    <WebView
      id={selectedProfile}
      style={ s.webview}
      // source={{ html: content }}
      source={{ uri: `https://kick.com/${selectedProfile}/chatroom` }}

      // onMessage={onMessage}
      // source={{ uri: "http://kick.com" }}
      // injectedJavaScript={injectJS}

    />

  )
}

export default Chat

const s = StyleSheet.create({
  webview: {
    backgroundColor: "#1c1c1c",
    flex: 1,
  },
  title: {
    fontSize: 15,
    textAlign: "center",
    marginHorizontal: 10,
    marginTop: 250,
    color: "white"

  }
})