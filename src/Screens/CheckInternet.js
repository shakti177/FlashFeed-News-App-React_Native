import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CheckInternet = () => {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../Assets/no-wifi.png')}
        style={{
          width: 150,
          height: 150,
        }}
      />
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 500,
          fontSize: 20,
          color: '#000000',
          paddingBottom: 20,
        }}>
        No Internet Connection
      </Text>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Please Connect the Internet');
        }}
        style={{
          backgroundColor: '#000000',
          paddingHorizontal: 20,
          paddingVertical: 8,
          color: 'white',
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontWeight: '600', fontSize: 19}}>
          Refresh
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckInternet;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
