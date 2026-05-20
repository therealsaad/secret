import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, MessageCircle } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu and scroll to top when route changes
  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const navItems = [
    { label: "Home", path: "/", icon: null },
    { label: "Our Story", path: "/story", icon: null },
    { label: "1000 Reasons", path: "/reasons", icon: null },
    { label: "Distance Love", path: "/special", icon: null },
    { label: "Proposal", path: "/proposal", icon: null },
    { label: "Chat", path: "/chat", icon: MessageCircle },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Main Navbar */}
      <motion.div
        className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[rgba(10,14,39,0.8)] to-[rgba(20,24,41,0.8)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.1)]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <Link to="/">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="w-6 h-6 text-[var(--accent-pink)]" />
            <span className="text-xl font-bold gradient-text font-poppins">
              Arziya 💕
            </span>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <motion.div
                className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors"
                whileHover={{ color: "white" }}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {open ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </motion.button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 right-0 h-screen w-full md:hidden bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] p-6 flex flex-col gap-4"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-4 rounded-xl hover:bg-[rgba(255,20,147,0.1)] transition-colors"
                >
                  {item.icon && (
                    <item.icon className="w-5 h-5 text-[var(--accent-pink)]" />
                  )}
                  <span className="text-lg font-medium">{item.label}</span>
                </Link>
              </motion.div>
            ))}

            {/* Divider */}
            <div className="my-4 h-[1px] bg-[var(--border-color)]" />

            {/* Call to Action */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto pt-4"
            >
              <motion.button
                className="w-full btn btn-primary text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Chatting 💬
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"
            style={{ top: "64px" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
