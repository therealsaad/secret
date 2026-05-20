import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: uuidv4(),
      text: "Hey! 💫 How are you today?",
      sender: 'other',
      timestamp: new Date(),
      emotion: 'happy'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: uuidv4(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      emotion: input.includes('❤') ? 'love' : input.includes('!') ? 'excited' : 'normal'
    };

    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate typing response
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "That's amazing! ✨",
        "I love this energy! 💕",
        "You're the best! 🌟",
        "Couldn't agree more! 💫",
        "That made my day! 🥰"
      ];
      
      const responseMessage = {
        id: uuidv4(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'other',
        timestamp: new Date(),
        emotion: 'love'
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setIsTyping(false);
    }, 800);
  };

  const getEmotionEmoji = (emotion) => {
    switch(emotion) {
      case 'love': return '❤️';
      case 'excited': return '✨';
      default: return '💫';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-section min-h-screen bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ top: '10%', left: '5%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          style={{ bottom: '10%', right: '5%' }}
        />
      </div>

      <div className="container mx-auto h-screen max-w-2xl flex flex-col relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="py-6 border-b border-[rgba(255,255,255,0.1)]"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading-2 mb-2">Chat with Arziya</h1>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Online & Ready
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-[var(--accent-pink)]" />
          </div>
        </motion.div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-transparent">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ y: 20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`max-w-xs px-4 py-3 rounded-2xl transition-all ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-[var(--accent-pink)] to-pink-500 text-white shadow-lg'
                      : 'glass'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 opacity-70 ${message.sender === 'user' ? 'text-white' : 'text-[var(--text-muted)]'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="flex items-center gap-2 glass px-4 py-3 rounded-2xl w-fit"
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ delay: i * 0.1, duration: 0.6, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-[var(--accent-pink)]"
                    />
                  ))}
                </div>
                <span className="text-xs text-[var(--text-secondary)]">typing...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <motion.form
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onSubmit={handleSendMessage}
          className="p-6 border-t border-[rgba(255,255,255,0.1)]"
        >
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Say something sweet... 💕"
              className="flex-1 bg-[var(--bg-secondary)] border border-[rgba(255,255,255,0.1)] rounded-full px-6 py-3 text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-pink)] transition-all"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[var(--accent-pink)] to-pink-500 p-3 rounded-full text-white cursor-pointer transition-all hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Quick reactions */}
          <div className="flex gap-2 mt-4 justify-center flex-wrap">
            {['❤️', '😊', '✨', '🔥', '💕', '🌟'].map((emoji) => (
              <motion.button
                key={emoji}
                onClick={(e) => {
                  e.preventDefault();
                  setInput(prev => prev + ' ' + emoji);
                }}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="text-2xl p-2 rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-all"
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Chat;
