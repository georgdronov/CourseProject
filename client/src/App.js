import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { FormBuilder } from "./pages/FormBuilder";
import { MainPage } from "./pages/MainPage";
import { NotFound } from "./pages/NotFound";
import {LoginPage} from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Header } from "./components/page-component/Header";
import { Footer } from "./components/page-component/Footer";


function App() {
  return (
    <Router>
      <Header/>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/form-builder/:id" element={<FormBuilder />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
