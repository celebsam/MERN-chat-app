import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");

  const loginHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="form-container"
      style={{ width: "90%", margin: "auto", paddingBottom: "2rem" }}
    >
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <InputGroup className="mb-2">
            <FormControl
              type={showPassword}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroup.Text
              style={{ cursor: "pointer", userSelect: "none" }}
              onClick={() =>
                setShowPassword(
                  showPassword === "password" ? "text" : "password"
                )
              }
            >
              <i
                className={
                  showPassword !== "password"
                    ? "fas fa-eye-slash"
                    : "fas fa-eye"
                }
              ></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={loginHandler}
          style={{ display: "block", margin: "auto", padding: "0.5rem 2rem" }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
