import React from 'react';
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';

export default function Setting() {
    return(
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle
        ]}>
        Setting
      </Text>
    </View>

    )
}

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });