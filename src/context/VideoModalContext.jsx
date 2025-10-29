// ✅ src/context/VideoModalContext.jsx — with TT logo top-left and Spacebar Play/Pause
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import logoTT from "../assets/images/logoTT.png";

const VideoModalContext = createContext();

export function VideoModalProvider({ children }) {
    const [videoSrc, setVideoSrc] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showUI, setShowUI] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [showStartNow, setShowStartNow] = useState(false);

    const videoRef = useRef(null);
    const timeoutRef = useRef(null);
    const modalRef = useRef(null);
    const lastScrollPos = useRef(0);

    /* === Scroll Lock === */
    useEffect(() => {
        if (videoSrc) {
            lastScrollPos.current = window.scrollY;
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${lastScrollPos.current}px`;
        } else {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            window.scrollTo({ top: lastScrollPos.current, behavior: "instant" });
        }
    }, [videoSrc]);

    const openVideo = (src) => {
        setVideoSrc(src);
        setIsPlaying(false);
        setProgress(0);
        setShowUI(true);
        setHasInteracted(false);
        setShowStartNow(false);
    };

    const closeVideo = () => {
        if (videoRef.current) videoRef.current.pause();
        setVideoSrc(null);
        setShowStartNow(false);
        window.scrollTo({ top: lastScrollPos.current, behavior: "instant" });
    };

    /* === Keyboard Controls === */
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!videoSrc || !videoRef.current) return;
            if (e.code === "Space" || e.key === " ") {
                e.preventDefault(); // prevent page scroll
                togglePlay();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [videoSrc, isPlaying]);

    /* === Playback Logic === */
    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;
        if (isPlaying) {
            v.pause();
            setIsPlaying(false);
        } else {
            v.play();
            setIsPlaying(true);
        }
    };

    const handleTimeUpdate = () => {
        const v = videoRef.current;
        if (v && v.duration) {
            const pct = (v.currentTime / v.duration) * 100;
            setProgress(pct);
            setDuration(v.duration);
            setShowStartNow(pct >= 85);
        }
    };

    const handleSeek = (e) => {
        const v = videoRef.current;
        if (v && duration) {
            const newTime = (e.target.value / 100) * duration;
            v.currentTime = newTime;
            setProgress(e.target.value);
            setShowStartNow(e.target.value >= 85);
        }
    };

    const toggleMute = () => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const toggleFullscreen = () => {
        const c = document.getElementById("video-modal-container");
        if (!c) return;
        if (!document.fullscreenElement) {
            c.requestFullscreen().catch(() => { });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen().catch(() => { });
            setIsFullscreen(false);
        }
    };

    const formatTime = (t) => {
        if (!t || isNaN(t)) return "0:00";
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60);
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    const resetUITimer = () => {
        if (!hasInteracted) setHasInteracted(true);
        setShowUI(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setShowUI(false), 2500);
    };

    const handleMouseMove = () => resetUITimer();
    const handleTouchStart = () => resetUITimer();

    const handleStartNow = () => {
        closeVideo();
        setTimeout(() => {
            if (window.location.pathname === "/") {
                const el = document.querySelector("#programs");
                if (el)
                    window.lenis
                        ? window.lenis.scrollTo(el, { duration: 1.4, offset: -60 })
                        : el.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                window.location.href = "/#programs";
            }
        }, 300);
    };

    return (
        <VideoModalContext.Provider value={{ openVideo, closeVideo, videoSrc }}>
            {children}

            {createPortal(
                <AnimatePresence>
                    {videoSrc && (
                        <motion.div
                            key="video-modal"
                            id="video-modal-container"
                            ref={modalRef}
                            className="fixed inset-0 z-[2147483649] flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            onClick={closeVideo}
                            onMouseMove={handleMouseMove}
                            onTouchStart={handleTouchStart}
                            style={{
                                background:
                                    "radial-gradient(circle at center, rgba(155,38,182,0.25) 0%, rgba(0,0,0,0.95) 65%)",
                                backdropFilter: "blur(80px)",
                            }}
                        >
                            {/* === VIDEO CONTAINER === */}
                            <motion.div
                                className="relative w-[95vw] h-[90vh] rounded-[20px] overflow-hidden bg-black flex items-center justify-center"
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* ✅ TT ICON top-left inside modal */}
                                <div
                                    className="absolute top-[1.5vh] left-[0.5vw] z-[2147483650]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={logoTT}
                                        alt="TT"
                                        className="w-[38px] drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                                    />
                                </div>

                                <video
                                    ref={videoRef}
                                    src={videoSrc}
                                    autoPlay
                                    playsInline
                                    preload="auto"
                                    className="w-full h-full object-cover"
                                    onClick={togglePlay}
                                    onTimeUpdate={handleTimeUpdate}
                                    onEnded={() => setIsPlaying(false)}
                                    muted={isMuted}
                                />

                                {/* === START NOW CTA === */}
                                <AnimatePresence>
                                    {showStartNow && (
                                        <motion.button
                                            key="start-now"
                                            onClick={handleStartNow}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.6 }}
                                            className="absolute inset-0 flex items-center justify-center"
                                        >
                                            <div
                                                className="absolute z-[9999] flex justify-center items-center 
                          w-[210px] h-[60px] text-white font-['Press_Start_2P'] text-[0.8rem]
                          cursor-pointer bg-gradient-to-br from-[#9b26b6]/85 to-[#b14fc0]/70
                          rounded-[1rem] border border-white/20
                          shadow-[0_10px_25px_rgba(155,38,182,0.7)]
                          uppercase tracking-wider transition-all duration-[600ms]"
                                                style={{
                                                    top: "80%",
                                                    left: "50%",
                                                    transform: "translate(-50%, -50%)",
                                                }}
                                            >
                                                START NOW →
                                            </div>
                                        </motion.button>
                                    )}
                                </AnimatePresence>

                                {/* === Controls === */}
                                <AnimatePresence>
                                    {showUI && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 w-full px-6 pb-4 pt-2 bg-gradient-to-t from-black/70 to-transparent text-white flex flex-col gap-2"
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 40 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={progress}
                                                onChange={handleSeek}
                                                className="w-full accent-white cursor-pointer h-[4px] appearance-none bg-white/30 rounded-lg"
                                            />
                                            <div className="flex items-center justify-between mt-1">
                                                <div className="flex items-center gap-5">
                                                    <button onClick={togglePlay} className="hover:scale-110 transition-transform">
                                                        {isPlaying ? (
                                                            <Pause size={26} strokeWidth={2} />
                                                        ) : (
                                                            <Play size={26} strokeWidth={2} />
                                                        )}
                                                    </button>
                                                    <button onClick={toggleMute} className="hover:scale-110 transition-transform">
                                                        {isMuted ? (
                                                            <VolumeX size={24} strokeWidth={2} />
                                                        ) : (
                                                            <Volume2 size={24} strokeWidth={2} />
                                                        )}
                                                    </button>
                                                    <span className="text-sm tracking-wide text-white/90 font-medium">
                                                        {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
                                                    </span>
                                                </div>
                                                <button onClick={toggleFullscreen} className="hover:scale-110 transition-transform">
                                                    {isFullscreen ? (
                                                        <Minimize size={24} strokeWidth={2} />
                                                    ) : (
                                                        <Maximize size={24} strokeWidth={2} />
                                                    )}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* === CLOSE BUTTON === */}
                            <AnimatePresence>
                                {hasInteracted && showUI && (
                                    <motion.button
                                        key="close-btn"
                                        onClick={closeVideo}
                                        className="absolute top-[3vh] right-[3vw] text-[3.5rem] text-white 
                      hover:text-[#9b26b6] font-light transition-all duration-300 
                      z-[2147483650]"
                                        whileHover={{ rotate: 90, scale: 1.1 }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        ×
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </VideoModalContext.Provider>
    );
}

export function useVideoModal() {
    return useContext(VideoModalContext);
}
