import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Slider from '../../Components/Slider/Slider';
import CheckInternet from '../CheckInternet';
import NetInfo from '@react-native-community/netinfo';

const Home = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPageId, setNextPageId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getAPIData = async (pageID = null) => {
    let URL =
      'https://newsdata.io/api/1/news?apikey=pub_33659a507f4d0fe3b1008e30b70a8a2bc7b14&language=en&country=in&prioritydomain=top';

    if (pageID) {
      URL += `&page=${pageID}`;
    }

    const res = await fetch(URL);
    const data = await res.json();

    if (data && data.results && Array.isArray(data.results)) {
      setNews(prevNews => [...prevNews, ...data.results]);
      setNextPageId(data.nextPage);
    }
    setIsLoading(false);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.newsContainer}>
        <Pressable
          onPress={() => navigation.navigate('NewsDetail', {item: item})}
          style={{
            borderColor: '#e9eaf0',
            borderWidth: 1,
          }}>
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
                resizeMode : "stretch",
                backgroundColor: '#ffffff',
                marginBottom: 8,
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 15,
                textAlign: 'left',
                color: '#000000',
              }}>
              {item.title}
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginBottom: 15,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#000000',
                }}>
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
              numberOfLines={4}
              style={{
                fontSize: 15,
                textAlign: 'left',
                color: '#767e94',
              }}>
              {item.description}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };

  const renderLoader = () => {
    return (
      <View>
        <ActivityIndicator
          size="large"
          color="#d00000"
          style={{
            // marginVertical: 16,
            alignItems: 'center',
          }}
        />
      </View>
    );
  };

  const loadMoreNews = () => {
    if (nextPageId) {
      getAPIData(nextPageId);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {
        await getAPIData(nextPageId);
      } else {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Flash Feed</Text>
      </View>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#d00000" />
        </View>
      ) : isConnected ? (
        <View style={styles.mainContainer}>
          <FlatList
            data={news}
            renderItem={renderItem}
            ListHeaderComponent={
              <View>
                <Slider topNews={news.slice(0, 10)} navigation={navigation} />
              </View>
            }
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreNews}
            onEndReachedThreshold={0.1}
          />
        </View>
      ) : (
        <CheckInternet />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#ffffff',
    paddingBottom: 60,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    width: '100%',
    padding: 14,
  },

  title: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
  },

  newsContainer: {
    backgroundColor: '#ffffff',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  mainContainer: {
    backgroundColor: '#ffffff',
  },
});
