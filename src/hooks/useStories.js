import { useState, useEffect, useCallback } from 'react';
import { storyService } from '../services/storyService.js';

// Custom hook for managing stories
export const useStories = (defaultStories = []) => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    const { data, error: fetchError } = await storyService.getStories();
    
    if (fetchError) {
      setError(fetchError);
      setStories(defaultStories);
    } else {
      setStories(data && data.length > 0 ? data : defaultStories);
    }
    
    setIsLoading(false);
  }, [defaultStories]);

  const addStory = useCallback(async (text, author) => {
    if (!text.trim()) return false;

    const { error: addError } = await storyService.addStory(text, author);

    if (addError) {
      setError(addError);
      return false;
    } else {
      await fetchStories();
      return true;
    }
  }, [fetchStories]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return {
    stories,
    isLoading,
    error,
    addStory,
    refetch: fetchStories,
  };
};
