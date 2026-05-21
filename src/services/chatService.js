import { supabase } from '../supabase.js';

// Chat Service - Handles all messaging operations
export const chatService = {
  // Fetch chat messages
  async getMessages() {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      console.error('[v0] Messages fetch error:', error);
      return { data: [], error: error.message };
    }
  },

  // Send a message
  async sendMessage(content, sender) {
    try {
      if (!content.trim()) {
        throw new Error('Message cannot be empty');
      }

      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            content: content.trim(),
            sender,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('[v0] Message send error:', error);
      return { data: null, error: error.message };
    }
  },

  // Real-time message subscription
  subscribeToMessages(callback) {
    const subscription = supabase
      .from('messages')
      .on('INSERT', (payload) => {
        callback({ type: 'INSERT', data: payload.new });
      })
      .subscribe();

    return () => subscription.unsubscribe();
  },
};
