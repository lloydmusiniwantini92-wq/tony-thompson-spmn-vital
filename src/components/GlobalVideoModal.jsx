import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVideoModal } from "../context/VideoModalContext";

export default function GlobalVideoModal() {
    const { videoSrc, closeVideo } = useVideoModal();

    return (
        <AnimatePresence>
            {videoSrc && (
                <motion.div
                    key="video-modal"
                    className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-sm z-[2147483651]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
                    onClick={closeVideo}
                >
                    {/* === Top-to-Bottom Curtain Sweep === */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-black via-[#090009] to-[#120012] z-[1]"
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
                    />

                    {/* === Video === */}
                    <motion.video
                        key={videoSrc}
                        src={videoSrc}
                        autoPlay
                        controls
                        className="relative max-w-[90%] max-h-[90%] z-[2] bg-black rounded-xl 
                                   shadow-[0_0_50px_rgba(155,38,182,0.6)]"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8, ease: [0.25, 1, 0.3, 1], delay: 0.3 }}
                    />

                    {/* === Purple haze overlay === */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none bg-gradient-to-br 
                                   from-[#9b26b6]/25 via-transparent to-[#b14fc0]/25 z-[1]"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* === Close Button === */}
                    <motion.button
                        onClick={closeVideo}
                        className="fixed top-6 right-8 text-[4rem] leading-none text-white 
                                   hover:text-[#9b26b6] transition-all duration-300
                                   drop-shadow-[0_0_10px_rgba(0,0,0,0.6)] z-[3]"
                        whileHover={{ rotate: 90 }}
                    >
                        ×
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
