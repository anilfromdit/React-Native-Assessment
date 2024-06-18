import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BookmarkContext from '../../context/BookmarkContext';

const JobsScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const { bookmarkedJobs, addBookmark, removeBookmark } = useContext(BookmarkContext);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
  
      const newJobs = response.data.results.filter(job => {
        return job.title && job?.title?.trim()?.toLowerCase() ;
      });
  
      if (newJobs.length > 0) {
        setJobs(prevJobs => [...prevJobs, ...newJobs]);
      } else {
        setError("No jobs found. Pull down to refresh or check your network connection.");
      }
  
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Error fetching jobs. Pull down to refresh or check your network connection.");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchJobs();
  }, [page]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    setJobs([]);
    setError(null);
    fetchJobs().then(() => setRefreshing(false));
  }, []);

  const bookmarkJob = async job => {
    try {
      await addBookmark(job);
    } catch (error) {
      console.error("Error bookmarking job:", error);
    }
  };

  const removeJobBookmark = async jobId => {
    try {
      await removeBookmark(jobId);
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  const isBookmarked = jobId => {
    return bookmarkedJobs.some(bookmark => bookmark.id === jobId);
  };

  const renderJob = ({ item }) => {
    const bookmarked = isBookmarked(item.id);

    return (
      <TouchableOpacity onPress={() => navigation.navigate('JobDetail', { job: item })}>
        <View style={styles.jobContainer}>
          <View style={styles.header}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.jobTitle}>{item.title}</Text>
            <TouchableOpacity
              onPress={() => bookmarked ? removeJobBookmark(item.id) : bookmarkJob(item)}
              style={styles.bookmarkButton}
            >
              <Icon
                name={bookmarked ? 'bookmark' : 'bookmark-o'}
                size={25} 
                color={bookmarked ? '#007BFF' : 'black'}
                style={{ backgroundColor: 'transparent' }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Icon name="map-marker" size={18} color="#007BFF" />
              <Text style={styles.jobDetail}>{item.primary_details?.Place || "N/A"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="money" size={18} color="#007BFF" />
              <Text style={styles.jobDetail}>{item.primary_details?.Salary || "N/A"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="phone" size={18} color="#007BFF" />
              <Text style={styles.jobDetail}>{item.whatsapp_no}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && jobs.length === 0) {
    return <ActivityIndicator style={styles.centered} size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={[styles.centered, styles.errorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={jobs}
      renderItem={renderJob}
      keyExtractor={item => item.id?.toString()}
      onEndReached={() => setPage(prevPage => prevPage + 1)}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  jobContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    maxWidth: '90%', 
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  jobDetail: {
    fontSize: 14,
    color: 'black',
    marginLeft: 5,
  },
  bookmarkButton: {
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  refreshButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  refreshButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default JobsScreen;
