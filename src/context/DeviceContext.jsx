// ✅ src/context/DeviceContext.jsx
import React, { createContext, useContext } from "react";
import useDeviceTier from "../hooks/useDeviceTier";

const DeviceContext = createContext("mid");

export function DeviceProvider({ children }) {
    const tier = useDeviceTier();
    return <DeviceContext.Provider value={tier}>{children}</DeviceContext.Provider>;
}

export function useDevice() {
    return useContext(DeviceContext);
}
