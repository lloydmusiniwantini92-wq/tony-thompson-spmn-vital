{/* === ASPIRE COUNTDOWN (Polished OFF+BRAND Edition) === */ }
<AnimatePresence>
    {showCountdown && endDate && (
        <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 1.1, ease: [0.25, 1, 0.3, 1] }}
            className="
        absolute top-[calc(12vh+1cm)] left-[calc(15.2%+0.75cm)]
        w-[10.5%] 
        text-center flex flex-col items-center z-[8]
        rounded-b-[2.4rem] overflow-hidden
        bg-gradient-to-b from-[#0a0a0a]/95 to-[#000]/85
        border border-[#9b26b6]/50
        shadow-[0_0_25px_rgba(155,38,182,0.35)]
        backdrop-blur-[3.5px]
        sm:w-[11%] md:w-[10.8%] lg:w-[10.5%]
        scale-[0.88] sm:scale-[0.92] md:scale-[0.97] lg:scale-100
      "
            style={{
                clipPath: "path('M0,0 H100% V78 Q50%,100 0,78 Z')",
            }}
        >
            {/* LABEL */}
            <p className="text-[#9b26b6] text-[0.48rem] md:text-[0.52rem] tracking-[0.15em] font-semibold mb-[0.25rem] uppercase w-full mt-[0.3rem]">
                Limited Aspire Offer Ends In
            </p>

            {/* COUNTDOWN CORE */}
            <div className="inline-flex justify-center items-center w-full px-[0.1rem] pb-[0.3rem]">
                <TetrisCountdown targetDate={endDate} />
            </div>

            {/* Glowing overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#9b26b6]/15 via-transparent to-transparent pointer-events-none" />
        </motion.div>
    )}
</AnimatePresence>
