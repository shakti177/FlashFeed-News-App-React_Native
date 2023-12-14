import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ImageBackground,
} from 'react-native';
import React from 'react';

const Slider = ({topNews, navigation}) => {
  const navigateToNewsDetail = item => {
    navigation.navigate('NewsDetail', {item});
  };

  const topCategoryNews = topNews.filter(item =>
    item.category.includes('top' || 'Sports' || 'Entertainment'),
  );

  return (
    <View>
      <View style={styles.sliderContainer}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 10,
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '700',
              color: '#000000',
            }}>
            Breaking News
          </Text>
        </View>
        <ScrollView horizontal>
          {topCategoryNews.map((item, index) => (
            <View
              key={index}
              style={{
                paddingLeft: 10,
                paddingVertical: 10,
              }}>
              <Pressable onPress={() => navigateToNewsDetail(item)}>
                <ImageBackground
                  source={
                    item.image_url
                      ? {uri: item.image_url}
                      : require('../../Assets/flashfeed.jpg')
                  }
                  resizeMode="cover"
                  borderRadius={10}
                  style={{
                    height: 200,
                    width: 300,
                    justifyContent: 'flex-end',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '600',
                      fontSize: 15,
                      backgroundColor: 'rgba(0, 0, 0, 0.57)',
                      padding: 5,
                      paddingBottom: 10,
                      textAlign: 'center',
                      borderRadius: 0,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}>
                    {item.title}
                  </Text>
                </ImageBackground>
              </Pressable>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '700',
              color: '#000000',
            }}>
            Trending News
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  sliderContainer: {
    width: '100%',
  },
});
