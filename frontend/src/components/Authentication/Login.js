import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.error("All fields are required.", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast.success("Login successful.", {
        position: "top-center",
      });
      setLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/chats");
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
      setLoading(false);
      return;
    }

    console.log(email, password);
  };

  const guestHandler = () => {
    console.log("Guest");
    setEmail("guest@example.com");
    setPassword("123456");
  };

  return (
    <div
      className="form-container"
      style={{ width: "90%", margin: "auto", paddingBottom: "2rem" }}
    >
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            id="loginemail"
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
              id="loginpassword"
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
          {loading ? (
            <div
              style={{
                width: "100%",
                textAlign: "center",
              }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            "Login"
          )}
        </Button>

        <Button
          variant="danger"
          onClick={guestHandler}
          style={{
            display: "block",
            margin: "auto",
            padding: "0.5rem 2rem",
            marginTop: "1rem",
          }}
        >
          Request guest user credentials
        </Button>
      </Form>
    </div>
  );
};

export default Login;
