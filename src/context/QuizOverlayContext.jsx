import React, { createContext, useContext } from "react";

const QuizOverlayContext = createContext({ openQuiz: () => { } });

export const QuizOverlayProvider = ({ children }) => {
    const openQuiz = () => {
        window.location.href = "/quiz-intro";
    };

    return (
        <QuizOverlayContext.Provider value={{ openQuiz }}>
            {children}
        </QuizOverlayContext.Provider>
    );
};

export const useQuizOverlay = () => useContext(QuizOverlayContext);
