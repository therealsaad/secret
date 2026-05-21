import { supabase } from '../supabase.js';

// Story Service - Handles all story-related database operations
export const storyService = {
  // Fetch all stories with error handling
  async getStories() {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      console.error('[v0] Story fetch error:', error);
      return { data: [], error: error.message };
    }
  },

  // Add a new story
  async addStory(text, author) {
    try {
      if (!text.trim()) {
        throw new Error('Story cannot be empty');
      }

      const { data, error } = await supabase
        .from('stories')
        .insert([
          {
            text: text.trim(),
            author,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('[v0] Story add error:', error);
      return { data: null, error: error.message };
    }
  },

  // Delete a story (for future use)
  async deleteStory(id) {
    try {
      const { error } = await supabase
        .from('stories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true, error: null };
    } catch (error) {
      console.error('[v0] Story delete error:', error);
      return { success: false, error: error.message };
    }
  },

  // Subscribe to real-time updates
  subscribeToStories(callback) {
    const subscription = supabase
      .from('stories')
      .on('*', (payload) => {
        callback(payload);
      })
      .subscribe();

    return () => subscription.unsubscribe();
  },
};
