import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, notification } from "antd";
import "./signin.css";

const SignInForm = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const hardcodedEmail = "admin@modernlib.com";
    const hardcodedPassword = "modernlib!!@@12344321";

    if (email === hardcodedEmail && password === hardcodedPassword) {
      setIsAuthenticated(true);
      navigate("/admin/dashboard");
    } else {
      notification.error({
        message: "Login Failed",
        description: "Invalid email or password.",
      });
      setIsAuthenticated(false);
      navigate("/");
    }
  };

  return (
    <Card className="sign-in-card">
      <h2>Sign In</h2>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="sign-in-input"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="sign-in-input"
      />
      <Button type="primary" onClick={handleLogin} className="sign-in-button">
        Login
      </Button>
    </Card>
  );
};

export default SignInForm;
