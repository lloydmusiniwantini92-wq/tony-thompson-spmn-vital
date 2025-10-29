import React from "react";
import { motion } from "framer-motion";

export default function TShape({ tilesA, tilesB, swap, delay = 0 }) {
    const displayedTiles = swap ? tilesB : tilesA;

    return (
        <div className="grid grid-cols-3 gap-5">
            {displayedTiles.slice(0, 3).map((src, i) => (
                <div
                    key={`tile-${i}`}
                    className="relative w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px]
                     rounded-xl overflow-hidden shadow-[0_0_14px_rgba(0,0,0,0.3)]"
                >
                    {/* A-set */}
                    <motion.img
                        src={tilesA[i]}
                        alt=""
                        initial={false}
                        animate={{ opacity: swap ? 0 : 1 }}
                        transition={{
                            duration: 1.2,
                            ease: "easeInOut",
                            delay: delay + i * 0.1,
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* B-set */}
                    <motion.img
                        src={tilesB[i]}
                        alt=""
                        initial={false}
                        animate={{ opacity: swap ? 1 : 0 }}
                        transition={{
                            duration: 1.2,
                            ease: "easeInOut",
                            delay: delay + i * 0.1,
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            ))}

            {/* Bottom segment */}
            <div className="col-span-3 flex justify-center mt-3">
                <div
                    key="bottom"
                    className="relative w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px]
                     rounded-xl overflow-hidden shadow-[0_0_14px_rgba(0,0,0,0.3)]"
                >
                    <motion.img
                        src={tilesA[3]}
                        alt=""
                        initial={false}
                        animate={{ opacity: swap ? 0 : 1 }}
                        transition={{
                            duration: 1.2,
                            ease: "easeInOut",
                            delay: delay + 0.2,
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <motion.img
                        src={tilesB[3]}
                        alt=""
                        initial={false}
                        animate={{ opacity: swap ? 1 : 0 }}
                        transition={{
                            duration: 1.2,
                            ease: "easeInOut",
                            delay: delay + 0.2,
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
