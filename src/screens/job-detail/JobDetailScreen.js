import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BookmarkContext from '../../context/BookmarkContext';

const JobDetailScreen = ({ route }) => {
  const { job } = route.params;
  const navigation = useNavigation();
  const { bookmarkedJobs, addBookmark, removeBookmark } = useContext(BookmarkContext);

  const isBookmarked = jobId => {
    return bookmarkedJobs.some(bookmark => bookmark.id === jobId);
  };

  const handleToggleBookmark = () => {
    if (isBookmarked(job.id)) {
      removeBookmark(job.id);
    } else {
      addBookmark(job);
    }
  };

  const handleCallHR = async () => {
    const phoneNumber = job.whatsapp_no;

    try {
      await Linking.openURL(`tel:${phoneNumber}`);
    } catch (error) {
      console.error('Failed to open the phone dialer:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: job.creatives[0]?.file }} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{job.title}</Text>
          
          <View style={styles.detailItem}>
            <Icon name="money" size={18} color="#007BFF" style={styles.icon} />
            <Text style={styles.detailText}>{job.primary_details?.Salary || "N/A"}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="map-marker" size={18} color="#007BFF" style={styles.icon} />
            <Text style={styles.detailText}>{job.primary_details?.Place || "N/A"}</Text>
          </View>
          <Text style={styles.subTitle}>Job Type</Text>
          <Text style={styles.jobType}>{job.primary_details?.Job_Type || "N/A"}</Text>
          <Text style={styles.subTitle}>Description</Text>
          <Text style={styles.description}>{job.other_details}</Text>
        </View>
      </ScrollView>
      
      {job.whatsapp_no && (
        <TouchableOpacity style={styles.callButton} onPress={handleCallHR}>
          <Icon name="phone" size={25} color="#fff" />
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.bookmarkButton} onPress={handleToggleBookmark}>
        <View style={[styles.bookmarkIcon, { backgroundColor: isBookmarked(job.id) ? '#007BFF' : '#ddd' }]}>
          <Icon
            name={isBookmarked(job.id) ? 'bookmark' : 'bookmark-o'}
            size={25}
            color={'#fff'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  bookmarkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  image: {
    width: '80%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
  },
  jobType: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  callButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default JobDetailScreen;
