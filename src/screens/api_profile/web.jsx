import React from 'react';
import {
    StyleSheet,
    View,
  } from 'react-native';
  import WebView from 'react-native-webview';

export default function Web({ url }){
 return (
    <View style={styles.container}>
      <WebView
        source={{uri: url}}
        style={styles.video}
      />
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',

},
video: {
  maxHeight: 800,
  width: 420,
  flex: 1
}
});