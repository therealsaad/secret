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
    <>
      {/* Main Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[rgba(10,14,39,0.95)] via-[rgba(15,18,35,0.95)] to-[rgba(20,24,41,0.95)] backdrop-blur-lg border-b border-[rgba(255,20,147,0.2)] shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto w-full">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-6 h-6 text-[var(--accent-pink)] animate-pulse" />
              <span className="text-xl font-bold gradient-text hidden sm:inline">
                Arziya
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <motion.div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? "bg-[rgba(255,20,147,0.2)] text-[var(--accent-pink)]"
                      : "text-[var(--text-secondary)] hover:text-white hover:bg-[rgba(255,20,147,0.1)]"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
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
            className="md:hidden p-2.5 rounded-lg hover:bg-[rgba(255,20,147,0.15)] transition-all duration-200 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <X className="w-6 h-6 text-[var(--accent-pink)]" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay - Higher z-index, no blur, fully clickable */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/20 md:hidden z-40"
              style={{ top: "64px" }}
            />
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-16 right-0 bottom-0 w-full sm:w-80 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] md:hidden z-50 overflow-y-auto shadow-2xl"
            >
              <div className="flex flex-col gap-2 p-6 pt-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        location.pathname === item.path
                          ? "bg-[rgba(255,20,147,0.2)] text-[var(--accent-pink)]"
                          : "text-[var(--text-secondary)] hover:text-white hover:bg-[rgba(255,20,147,0.1)]"
                      }`}
                    >
                      {item.icon && (
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* Divider */}
                <div className="my-4 h-[1px] bg-[var(--border-color)]" />

                {/* Call to Action */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="mt-4 pt-2"
                >
                  <Link to="/chat" onClick={() => setOpen(false)}>
                    <button className="w-full btn btn-primary py-3 font-semibold">
                      💬 Start Chatting
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}

export default Navbar;
