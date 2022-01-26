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

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [cloudLoading, setCloudLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState("password");

  const history = useHistory();

  // code to submit the form starts here
  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    // if empty
    if (!name || !email || !password || !confirmPassword || !pic) {
      console.log("nothing");
      toast.error("All fields are required.", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }
    // if passwords do not matchPassword

    if (password.length < 6) {
      toast.error("Min of 6 charaters for password field.", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }
    console.log({ name, email, password, confirmPassword, pic });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );

      toast.success("Registration successful.", {
        position: "top-center",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error, {
        position: "top-center",
      });
    }
  };
  // code to submit the form ends here

  const pictureHandler = (chosenPic) => {
    console.log(chosenPic);
    setCloudLoading(true);
    if (!chosenPic || chosenPic === undefined) {
      toast.error("An image was not selected.", {
        position: "top-center",
      });
      console.log("No picture was chosen");
      setCloudLoading(false);
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
      setCloudLoading(false);
      toast.error("The file format is not supported.", {
        position: "top-center",
      });
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

        <Button
          variant="primary"
          type="submit"
          disabled={cloudLoading}
          onClick={submitHandler}
          style={{ display: "block", margin: "auto", padding: "0.5rem 2rem" }}
        >
          {cloudLoading ? (
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
            "Sign Up"
          )}
        </Button>
        {loading ? (
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "1rem" }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : null}
      </Form>
    </div>
  );
};

export default Signup;
