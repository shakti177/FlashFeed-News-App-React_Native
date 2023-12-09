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
import Slider from '../Components/Slider/Slider';
import NetInfo from '@react-native-community/netinfo';

const Home = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPageId, setNextPageId] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  const getAPIData = async (pageID = null) => {
    let URL =
      'https://newsdata.io/api/1/news?apikey=pub_342405caad2a216ccef37ce49c5757f947f93&language=en&country=in&prioritydomain=top';

    if (pageID) {
      URL += `&page=${pageID}`;
    }

    try {
      const res = await fetch(URL);
      if (!res.ok) {
        setIsLoading(false);
        return;
      }

      const data = await res.json();

      if (data && data.results && Array.isArray(data.results)) {
        setNews(prevNews => [...prevNews, ...data.results]);
        setNextPageId(data.nextPage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const checkInternetConnection = async () => {
    const netInfo = await NetInfo.fetch();
    setIsConnected(netInfo.isConnected);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    getAPIData();
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.newsContainer}>
        <Pressable
          onPress={() => navigation.navigate('NewsDetail', {item: item})}>
          <Image
            source={
              item.image_url
                ? {uri: item.image_url}
                : require('../Assets/flashfeed.jpg')
            }
            style={{
              width: '100%',
              height: 200,
              resizeMode: 'cover',
              backgroundColor: '#ffffff',
              marginBottom: 8,
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 10,
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
                color: '#000000',
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
      await getAPIData();
    };

    fetchData();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);

      if (state.isConnected) {
        fetchData();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const topNews = news.slice(0, 10);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Flash Feed</Text>
      </View>
      {!isConnected ? (
        <View style={styles.noInternetContainer}>
          <Text style={styles.noInternetText}>No internet connection</Text>
          <Pressable onPress={handleRefresh}>
            <Text style={styles.refreshButton}>Refresh</Text>
          </Pressable>
        </View>
      ) : isLoading ? (
        <View>
          <ActivityIndicator
            size="large"
            color="#d00000"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <FlatList
            data={news}
            renderItem={renderItem}
            ListHeaderComponent={
              <Slider topNews={topNews} navigation={navigation} />
            }
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreNews}
            onEndReachedThreshold={0.1}
          />
        </View>
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
  noInternetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noInternetText: {
    fontSize: 20,
    marginBottom: 20,
  },
  refreshButton: {
    fontSize: 18,
    color: '#d00000',
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#d00000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
