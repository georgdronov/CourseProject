import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { FormBuilder } from "./pages/FormBuilder";
import { MainPage } from "./pages/MainPage";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/edit-form/:id" element={<FormBuilder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
