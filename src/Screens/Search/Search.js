import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Search = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const categories = [
    {name: 'Top', icon: 'trending-up'},
    {name: 'Sports', icon: 'basketball'},
    {name: 'Entertainment', icon: 'movie'},
    {name: 'Business', icon: 'briefcase'},
    {name: 'Technology', icon: 'cellphone'},
    {name: 'World', icon: 'earth'},
  ];

  const handleSearch = category => {
    if (!category) {
      Alert.alert('Category is empty');
    } else {
      const lowercaseCategory = category.name.toLowerCase();
      const lowerCaseCategories = categories.map(cat => cat.name.toLowerCase());

      if (lowerCaseCategories.includes(lowercaseCategory)) {
        navigation.navigate('CategoryNews', {
          category: lowercaseCategory,
          title: category.name,
        });
      } else {
        Alert.alert('Category not found');
      }
    }
  };

  const filterCategories = () => {
    return categories.filter(cat =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const filteredCategories = filterCategories();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search categories..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onBlur={() => {
          if (!searchQuery) {
            setError('Category is empty');
          } else {
            setError('');
          }
        }}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.categoriesContainer}>
        {filteredCategories.length === 0 ? (
          <Text>No categories found</Text>
        ) : (
          filteredCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSearch(category)}
              style={styles.categoryBox}>
              <Icon
                name={category.icon}
                size={30}
                color="#0964ed"
                style={styles.icon}
              />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    color: 'grey',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  categoryBox: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  categoryText: {
    marginTop: 5,
    textAlign: 'center',
    color: '#000000',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  icon: {
    marginBottom: 5,
  },
});

export default Search;
