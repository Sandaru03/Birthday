"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Gift } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [isKissing, setIsKissing] = useState(false);

  useEffect(() => {
    setMounted(true);

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const firework = () => {
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Use a wide variety of bright colors for a true fireworks effect
        const colorfulPalette = [
          '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff1493', '#7cfc00'
        ];

        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: colorfulPalette
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: 0.7, y: Math.random() - 0.2 },
            colors: colorfulPalette
          })
        );
      }, 250);
    };

    // Fire immediately, then every 4 seconds
    setTimeout(firework, 500);
    const mainInterval = setInterval(firework, 4000);
    
    return () => clearInterval(mainInterval);
  }, []);

  const handleOpenGift = () => {
    setIsGiftOpened(true);
    
    // Huge explosion of colors when clicking the gift
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 40, spread: 360, ticks: 80, zIndex: 100, colors: ['#ec4899', '#db2777', '#be185d', '#fbcfe8'] };

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 60 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: 0.5, y: 0.5 }
      }));
    }, 200);

    // Trigger the kiss animation slightly after opening
    setTimeout(() => {
      setIsKissing(true);
    }, 400);
    
    // Reset kiss animation state after it finishes to allow it to pulse
    setTimeout(() => {
      setIsKissing(false);
    }, 1200);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 selection:bg-pink-500 selection:text-white">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 fixed">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen space-y-24 text-center">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 text-pink-300"
          >
            <Sparkles size={18} />
            <span className="text-sm font-medium tracking-widest uppercase">July 07, 2026</span>
            <Sparkles size={18} />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Happy 21st Birthday,
          </h1>
          <h2 className="text-7xl md:text-9xl font-display text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 drop-shadow-lg">
            Tharu
          </h2>
        </motion.div>

        {/* Photo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 w-[300px] h-[400px] md:w-[400px] md:h-[500px]">
            <Image
              src="/Tharu.jpeg"
              alt="Tharu"
              fill
              className="object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
            />
          </div>
          <motion.div 
            className="absolute -bottom-6 -right-6 text-pink-500 drop-shadow-lg"
            animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={56} fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Messages Section */}
        <div className="space-y-12 max-w-2xl mx-auto">
          {[
            "To the most amazing person in my life...",
            "May your 21st birthday be as beautiful and bright as your smile.",
            "I am so lucky to have you.",
            "I promise to always be by your side, making you smile.",
            "Happy Birthday, my Manika! ❤️"
          ].map((text, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="text-2xl md:text-3xl font-light text-slate-300 leading-relaxed"
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Interactive Gift Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-10 pb-32 flex flex-col items-center relative min-h-[300px]"
        >
          <AnimatePresence mode="wait">
            {!isGiftOpened ? (
              <motion.button
                key="gift"
                onClick={handleOpenGift}
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="relative group p-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 shadow-2xl shadow-pink-500/50 outline-none"
              >
                <Gift size={64} className="text-white" strokeWidth={1.5} />
                <div className="absolute inset-0 rounded-full animate-ping bg-pink-400 opacity-20 pointer-events-none"></div>
              </motion.button>
            ) : (
              <motion.div
                key="kiss"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex flex-col items-center justify-center"
              >
                <motion.div
                  animate={isKissing ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-8xl drop-shadow-2xl"
                >
                  💋
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="mt-6 text-6xl font-display text-pink-400 drop-shadow-lg"
                >
                  Ummah...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isGiftOpened && (
            <p className="mt-8 text-pink-400 font-medium text-lg tracking-widest uppercase animate-pulse">
              Tap the Gift
            </p>
          )}
          
          <p className="mt-16 text-slate-500 font-display text-4xl">
            From Sandaru, with love.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
