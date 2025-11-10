import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

/**
 * 🎮 StackBuilder – Win on First Line Clear
 *  - Reads quizResult (archetype + focus)
 *  - True 10×20 grid Tetris
 *  - Ends instantly when a full row clears
 *  - Keeps all style, colors, and logic unchanged
 */
export default function StackBuilder() {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [grid, setGrid] = useState([]);
    const [piece, setPiece] = useState(null);
    const [score, setScore] = useState(0);
    const [running, setRunning] = useState(false);
    const [popup, setPopup] = useState(false);
    const [profile, setProfile] = useState({
        archetype: "Visionary",
        focus: "Business Development",
    });

    const COLS = 10;
    const ROWS = 20;
    const BLOCK = 24;
    const W = COLS * BLOCK;
    const H = ROWS * BLOCK;

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("quizResult"));
        if (saved) setProfile(saved);
    }, []);

    const COLORS = {
        Visionary: ["#9b26b6", "#7d1f97", "#b84fd4"],
        Challenger: ["#e84c3d", "#ff6b00", "#ffad42"],
        Harmonizer: ["#a5f0d0", "#6ef2b3", "#ffffff"],
    }[profile.archetype];

    const SHAPES = {
        I: [[1, 1, 1, 1]],
        O: [
            [1, 1],
            [1, 1],
        ],
        T: [
            [1, 1, 1],
            [0, 1, 0],
        ],
        L: [
            [1, 0],
            [1, 0],
            [1, 1],
        ],
        J: [
            [0, 1],
            [0, 1],
            [1, 1],
        ],
        S: [
            [0, 1, 1],
            [1, 1, 0],
        ],
        Z: [
            [1, 1, 0],
            [0, 1, 1],
        ],
    };

    useEffect(() => {
        setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
    }, []);

    // draw grid and active piece
    useEffect(() => {
        const c = canvasRef.current;
        if (!c) return;
        const ctx = c.getContext("2d");
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, W, H);

        grid.forEach((row, y) =>
            row.forEach((val, x) => {
                if (val) {
                    ctx.fillStyle = val;
                    ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK - 1, BLOCK - 1);
                }
            })
        );

        if (piece) {
            ctx.fillStyle = piece.color;
            piece.shape.forEach((r, y) =>
                r.forEach(
                    (v, x) =>
                        v &&
                        ctx.fillRect(
                            (piece.x + x) * BLOCK,
                            (piece.y + y) * BLOCK,
                            BLOCK - 1,
                            BLOCK - 1
                        )
                )
            );
        }
    }, [grid, piece]);

    const randomPiece = () => {
        const keys = Object.keys(SHAPES);
        const shape = SHAPES[keys[Math.floor(Math.random() * keys.length)]];
        return {
            shape,
            x: Math.floor(COLS / 2) - Math.ceil(shape[0].length / 2),
            y: 0,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
    };

    const collides = (px, py, shape = piece.shape) =>
        shape.some((r, y) =>
            r.some(
                (v, x) =>
                    v &&
                    (px + x < 0 ||
                        px + x >= COLS ||
                        py + y >= ROWS ||
                        grid[py + y]?.[px + x])
            )
        );

    const mergePiece = (p) => {
        const newGrid = grid.map((r) => r.slice());
        p.shape.forEach((r, y) =>
            r.forEach((v, x) => {
                if (v && p.y + y >= 0) newGrid[p.y + y][p.x + x] = p.color;
            })
        );
        return newGrid;
    };

    // 🧩 modified: treat any full row as instant win
    const clearLines = (g) => {
        const newGrid = g.filter((r) => !r.every((v) => v));
        const cleared = ROWS - newGrid.length;
        while (newGrid.length < ROWS) newGrid.unshift(Array(COLS).fill(0));
        if (cleared > 0) {
            setScore((s) => s + cleared * 100);
            endGame("leveled"); // instant win trigger
        }
        return newGrid;
    };

    // main game loop
    useEffect(() => {
        if (!running) return;
        const tick = setInterval(() => {
            if (!piece) return;
            const newY = piece.y + 1;
            if (collides(piece.x, newY)) {
                const merged = mergePiece(piece);
                const cleared = clearLines(merged);
                setGrid(cleared);
                const next = randomPiece();
                if (collides(next.x, next.y, next.shape)) {
                    setRunning(false);
                    endGame("stacked");
                    return;
                }
                setPiece(next);
            } else {
                setPiece({ ...piece, y: newY });
            }
        }, 300);
        return () => clearInterval(tick);
    }, [piece, grid, running]);

    const move = (dir) => {
        if (!piece) return;
        const newX = dir === "left" ? piece.x - 1 : piece.x + 1;
        if (!collides(newX, piece.y)) setPiece({ ...piece, x: newX });
    };

    const rotate = () => {
        const rotated = piece.shape[0].map((_, i) =>
            piece.shape.map((r) => r[i]).reverse()
        );
        if (!collides(piece.x, piece.y, rotated))
            setPiece({ ...piece, shape: rotated });
    };

    const start = () => {
        setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
        setPiece(randomPiece());
        setScore(0);
        setPopup(false);
        setRunning(true);
    };

    const endGame = () => {
        setRunning(false);
        setPopup(true);
        generatePDF();
        setTimeout(() => navigate("/?target=#tiers"), 4000);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const { archetype, focus } = profile;
        doc.setFontSize(22);
        doc.setTextColor(155, 38, 182);
        doc.text(`${archetype} Playbook`, 20, 30);
        doc.setFontSize(13);
        doc.setTextColor(40);
        doc.text(`Focus Area: ${focus}`, 20, 50);
        doc.text(
            {
                Visionary:
                    "Strategic vision defines your path. You build scalable systems with clarity.",
                Challenger:
                    "Ambition and drive push you forward. You thrive on challenge and execution.",
                Harmonizer:
                    "Balance and rhythm guide you. You align people, process, and purpose.",
            }[archetype],
            20,
            70
        );
        doc.text(`Final Score: ${score}`, 20, 120);
        doc.save(`${archetype}_Playbook.pdf`);
    };

    // keyboard controls
    useEffect(() => {
        const h = (e) => {
            if (e.key === "ArrowLeft") move("left");
            if (e.key === "ArrowRight") move("right");
            if (e.key === "ArrowUp") rotate();
            if (e.key === "ArrowDown") setPiece((p) => ({ ...p, y: p.y + 1 }));
        };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#9b26b6] mb-2 uppercase">
                Stack Your Success
            </h1>
            <p className="text-gray-400 mb-4 text-center text-sm">
                {profile.archetype} Mode — {profile.focus}
            </p>

            <canvas
                ref={canvasRef}
                width={W}
                height={H}
                className="border border-[#9b26b6]/50 rounded-xl shadow-[0_0_35px_rgba(155,38,182,0.4)]"
            />

            <div className="flex gap-3 mt-4">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => move("left")}
                    className="px-3 py-2 bg-[#7d1f97] hover:bg-[#952ca8] rounded-md text-xs font-bold uppercase"
                >
                    ←
                </motion.button>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => move("right")}
                    className="px-3 py-2 bg-[#7d1f97] hover:bg-[#952ca8] rounded-md text-xs font-bold uppercase"
                >
                    →
                </motion.button>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={rotate}
                    className="px-3 py-2 bg-[#952ca8] hover:bg-[#7d1f97] rounded-md text-xs font-bold uppercase"
                >
                    ⟳
                </motion.button>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={start}
                    className="px-5 py-2 bg-gradient-to-br from-[#952ca8] to-[#7d1f97] rounded-md font-bold uppercase text-xs"
                >
                    Start / Reset
                </motion.button>
            </div>

            <p className="text-xs text-gray-500 mt-3">Score: {score}</p>

            <AnimatePresence>
                {popup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white text-black rounded-2xl shadow-[0_0_40px_rgba(155,38,182,0.8)] max-w-sm w-[90%] p-8 text-center font-[Poppins]"
                        >
                            <h2 className="text-2xl font-extrabold text-[#9b26b6] mb-3 uppercase tracking-tight">
                                🎁 {profile.archetype} Playbook Ready!
                            </h2>
                            <p className="text-gray-700 mb-5 leading-snug">
                                Focus: {profile.focus}.<br />
                                Your personalized strategy playbook has been downloaded.
                            </p>
                            <div className="bg-gradient-to-br from-[#952ca8] to-[#7d1f97] text-white px-6 py-3 rounded-full font-bold uppercase shadow-[0_0_20px_rgba(155,38,182,0.6)]">
                                Redirecting...
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
