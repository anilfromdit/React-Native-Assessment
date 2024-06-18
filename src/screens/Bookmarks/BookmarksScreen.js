import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BookmarkContext from '../../context/BookmarkContext';

const BookmarksScreen = () => {
  const { bookmarkedJobs, removeBookmark } = useContext(BookmarkContext);
  const navigation = useNavigation();

  const renderBookmark = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('JobDetail', { job: item })}>
        <View style={styles.bookmarkContainer}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bookmarkTitle}>{item.title}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Icon name="map-marker" size={18} color="#007BFF" />
              <Text style={styles.bookmarkDetail}>{item.primary_details?.Place || "N/A"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="money" size={18} color="#007BFF" />
              <Text style={styles.bookmarkDetail}>{item.primary_details?.Salary || "N/A"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="phone" size={18} color="#007BFF" />
              <Text style={styles.bookmarkDetail}>{item.whatsapp_no}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => removeBookmark(item.id)} style={styles.bookmarkButton}>
            <Icon
              name={'bookmark'}
              size={25}
              color={'#007BFF'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (bookmarkedJobs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your bookmark list is empty! Explore jobs and bookmark your favorites.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Jobs')} style={styles.exploreButton}>
          <Text style={styles.exploreButtonText}>Explore Jobs</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={bookmarkedJobs}
      renderItem={renderBookmark}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  bookmarkContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bookmarkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    maxWidth: '90%',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkDetail: {
    fontSize: 14,
    color: 'black',
    marginLeft: 5,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'gray',
  },
  exploreButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  exploreButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default BookmarksScreen;
