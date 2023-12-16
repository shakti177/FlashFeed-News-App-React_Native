import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';

const NewsDetail = ({route, navigation}) => {
  const {item} = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({title: item.title});
  }, [navigation, item.title]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{backgroundColor: '#ffffff'}}>
          <View
            style={{
              width: '100%',
              height: 250,
            }}>
            <Image
              source={
                item.image_url
                  ? {uri: item.image_url}
                  : require('../../Assets/flashfeed.jpg')
              }
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'stretch',
              }}
            />
          </View>
          <View style={{padding: 14}}>
            <Text
              style={{
                fontSize: 23,
                fontWeight: '700',
                marginBottom: 13,
                textAlign: 'left',
                color: '#000000',
              }}>
              {item.title}
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginBottom: 20,
              }}>
              <Text style={{fontSize: 14, fontWeight: '600', color: '#000000'}}>
                {item.pubDate}
              </Text>
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#D00000',
                  backgroundColor: '#FFB0B0',
                  borderRadius: 10,
                  paddingVertical: 2,
                  paddingHorizontal: 9,
                }}>
                {item.category}
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 17,
                marginBottom: 20,
                lineHeight: 28,
                color: '#000000',
              }}>
              {item.content}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  homeIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 'auto',
  },
});
