import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

const Search = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const categories = [
    'Top',
    'Sports',
    'Entertainment',
    'Business',
    'Technology',
    'World',
  ];

  const handleSearch = category => {
    if (!category) {
      Alert.alert('Category is empty');
    } else {
      const lowercaseCategory = category.toLowerCase();
      const lowerCaseCategories = categories.map(cat => cat.toLowerCase());

      if (lowerCaseCategories.includes(lowercaseCategory)) {
        navigation.navigate('CategoryNews', {
          category: lowercaseCategory,
          title: category,
        });
      } else {
        Alert.alert('Category not found');
      }
    }
  };

  const filterCategories = () => {
    return categories.filter(cat =>
      cat.toLowerCase().includes(searchQuery.toLowerCase()),
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
              onPress={() => handleSearch(category)}>
              <Text style={styles.categoryText}>{category}</Text>
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  categoryText: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    margin: 5,
    borderRadius: 5,
    color: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Search;
