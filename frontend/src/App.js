import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Selection from "./pages/Selection/Selection";
import { ContextProvider } from "./AppContext";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Selection />} />
            <Route path="/ganttChart" element={<Home />} />
          </Routes>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
