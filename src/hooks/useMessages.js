import { useState, useEffect, useCallback } from 'react';
import { chatService } from '../services/chatService.js';

// Custom hook for managing chat messages
export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    const { data, error: fetchError } = await chatService.getMessages();
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setMessages(data || []);
    }
    
    setIsLoading(false);
  }, []);

  const sendMessage = useCallback(async (content, sender) => {
    if (!content.trim()) return false;

    const { error: sendError } = await chatService.sendMessage(content, sender);

    if (sendError) {
      setError(sendError);
      return false;
    } else {
      await fetchMessages();
      return true;
    }
  }, [fetchMessages]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    refetch: fetchMessages,
  };
};
