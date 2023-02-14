import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@styles/Theme";
import { WorksProvider } from "@components/works";

import { Gallery } from "@routes/Gallery";
import { useWorks } from "./hooks";

export const App: React.FC = () => {
  const works = useWorks();
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <ThemeProvider>
        <WorksProvider>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Gallery />} />
              {works.map((work) => (
                <Route
                  path={`/${work.id}`}
                  element={<work.scene />}
                  key={work.id}
                />
              ))}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
        </WorksProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
