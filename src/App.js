import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserForm from "./UserForm";
import MonthlyPaymentForm from "./MonthlyPaymentForm";
import HomePage from "./Homepage";
import AdminDashboard from "./Admin/AdminDashboard";
import ViewRecords from "./Admin/ViewRecords";
import UpdateImages from "./Admin/UpdateImages";
import SignInForm from "./signin";
import Navbar from "./Navbar";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<UserForm />} />
          <Route path="/monthly/payment" element={<MonthlyPaymentForm />} />
          <Route
            path="/signin"
            element={<SignInForm setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/admin/view-records"
            element={<ViewRecords isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/admin/update-images"
            element={<UpdateImages isAuthenticated={isAuthenticated} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
