import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserForm from "./UserForm";
import MonthlyPaymentForm from "./MonthlyPaymentForm";
import "./index.css";
import HomePage from "./Homepage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/register" element={<UserForm />} />
          <Route path="/monthly/payment" element={<MonthlyPaymentForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
