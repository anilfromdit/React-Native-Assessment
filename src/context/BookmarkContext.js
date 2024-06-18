import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const storedBookmarks = JSON.parse(await AsyncStorage.getItem('bookmarks')) || [];
        setBookmarkedJobs(storedBookmarks);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBookmarks();
  }, []);

  const addBookmark = async (job) => {
    try {
      const existingBookmarks = [...bookmarkedJobs];
      existingBookmarks.push(job);
      setBookmarkedJobs(existingBookmarks);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(existingBookmarks));
    } catch (error) {
      console.error('Error bookmarking job:', error);
    }
  };

  const removeBookmark = async (jobId) => {
    try {
      const updatedBookmarks = bookmarkedJobs.filter((bookmark) => bookmark.id !== jobId);
      setBookmarkedJobs(updatedBookmarks);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  const contextValue = {
    bookmarkedJobs,
    addBookmark,
    removeBookmark,
  };

  return (
    <BookmarkContext.Provider value={contextValue}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContext;
