import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [pic, setPic] = useState("");

  const [showPassword, setShowPassword] = useState("password");

  const picHandler = (picture) => {
    console.log(picture);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="form-container"
      style={{ width: "90%", margin: "auto", paddingBottom: "2rem" }}
    >
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

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

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup className="mb-2">
            <FormControl
              type={showPassword}
              id="confirmpassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label>Small file input example</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            size="sm"
            onChange={(e) => picHandler(e.target.files[0])}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={submitHandler}
          style={{ display: "block", margin: "auto", padding: "0.5rem 2rem" }}
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
