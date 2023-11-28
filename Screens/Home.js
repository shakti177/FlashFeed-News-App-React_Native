import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const Home = ({navigation}) => {
  const [news, setNews] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getAPIData = async () => {
    const URL =
      'https://newsdata.io/api/1/news?apikey=pub_33659a507f4d0fe3b1008e30b70a8a2bc7b14&language=en&country=in';
    const res = await fetch(URL);
    const data = await res.json();
    setNews(data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Flash Feed</Text>
      </View>
      {isLoading ? (
        <View>
          <ActivityIndicator
            size="large"
            color="blue"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '95%',
            }}
          />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <FlatList
            data={news}
            renderItem={({item}) => {
              return (
                <View style={styles.newsContainer}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('NewsDetail', {item: item})
                    }>
                    <Image
                      source={{uri: item.image_url}}
                      style={{width: '100%', height: 180}}
                    />
                    <View style={styles.textContainer}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '700',
                          marginBottom: 7,
                          textAlign: 'left',
                        }}>
                        {item.title}
                      </Text>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          marginBottom: 9,
                        }}>
                        <Text style={{fontSize: 14, fontWeight: '600'}}>
                          {item.pubDate}
                        </Text>
                        <Text
                          style={{
                            textTransform: 'capitalize',
                            fontSize: 14,
                            fontWeight: '600',
                          }}>
                          {item.category}
                        </Text>
                      </View>
                      <Text
                        numberOfLines={4}
                        style={{fontSize: 15, textAlign: 'left'}}>
                        {item.description}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    height: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    width: '100%',
    padding: 14,
  },

  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },

  newsContainer: {
    // backgroundColor: '#00b4d8',
    marginBottom: 15,
  },
  mainContainer: {
    // backgroundColor: '#03045e',
    // padding: 10,
    paddingBottom: 80,
  },
  textContainer: {
    padding: 15,
  },
});
