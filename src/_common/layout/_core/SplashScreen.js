import React, { createContext, useContext, useState, useEffect } from "react";

const SplashScreenContext = createContext();

export function SplashScreenProvider({ children }) {
  const [count, setCount] = useState(0);
  let visible = count > 0;

  useEffect(() => {
    const splashScreen = document.getElementById("splash-screen");
    const splashScreen_logo = document.getElementById("kt_body");

    if (splashScreen && visible) {
      splashScreen.classList.remove("hidden");

      return () => {
        splashScreen.classList.add("hidden");
      };
    }

    // Hide SplashScreen
    let timeout;


    if (splashScreen && !visible) {
      timeout = setTimeout(() => {
        splashScreen.classList.add("hidden");
        splashScreen_logo.classList.remove("unique-splash");
      }, 1100);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);

  return (
    <SplashScreenContext.Provider value={setCount}>
      {children}
    </SplashScreenContext.Provider>
  );
}

export function LayoutSplashScreen({ visible = true }) {
  // Everything are ready - remove splashscreen
  const setCount = useContext(SplashScreenContext);
  return null;
}
