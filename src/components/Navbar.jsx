import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center p-4 bg-black/40 backdrop-blur-md">
        <h1 className="text-primary text-xl font-bold">Arziyaaaaa❤️ For You</h1>

        <button onClick={() => setOpen(!open)} className="text-2xl">
          {open ? "✖" : "☰"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 h-screen w-3/4 bg-dark p-10 flex flex-col gap-8 text-lg"
          >
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/story" onClick={() => setOpen(false)}>Our Story</Link>
            <Link to="/reasons" onClick={() => setOpen(false)}>1000 Reasons</Link>
            <Link to="/special" onClick={() => setOpen(false)}>MH-KT</Link>
            <Link to="/proposal" onClick={() => setOpen(false)}>AItebar 💍</Link>
            <Link to="/trends" onClick={() => setOpen(false)}>trends</Link>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
