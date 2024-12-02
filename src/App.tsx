import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Exchange } from './pages/Exchange';
import { PageTransition } from './components/common/PageTransition';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0A0A0A]">
        <Header />
        <AnimatePresence mode="wait">
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/exchange"
                element={
                  <PageTransition>
                    <Exchange />
                  </PageTransition>
                }
              />
              <Route
                path="/about"
                element={
                  <PageTransition>
                    <About />
                  </PageTransition>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageTransition>
                    <Contact />
                  </PageTransition>
                }
              />
            </Routes>
          </main>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

export default App;