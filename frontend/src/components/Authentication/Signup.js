import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Spinner,
  Toast,
} from "react-bootstrap";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [cloudLoading, setCloudLoading] = useState(false);

  const [showPassword, setShowPassword] = useState("password");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const pictureHandler = (chosenPic) => {
    setCloudLoading(true);
    if (!chosenPic || chosenPic === undefined) {
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
      </Toast>;
      return;
    }
    if (chosenPic.type === "image/jpeg" || chosenPic.type === "image/png") {
      const data = new FormData();
      data.append("file", chosenPic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "samgreen");
      fetch("https://api.cloudinary.com/v1_1/samgreen/image/upload", {
        method: "post",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setPic(data?.url?.toString());
          setCloudLoading(false);
        })
        .catch((err) => {
          setCloudLoading(false);
          console.log(err);
        });
    } else {
      <Toast>
        <Toast.Header>
          <strong className="me-auto">Error</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
      </Toast>;
    }
  };

  return (
    <div
      className="form-container"
      style={{ width: "90%", margin: "auto", paddingBottom: "2rem" }}
    >
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            id="name"
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            id="email"
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
            onChange={(e) => pictureHandler(e.target.files[0])}
          />
        </Form.Group>
        {cloudLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : null}

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
