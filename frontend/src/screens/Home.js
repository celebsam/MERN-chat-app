import React from "react";
import "./Home.scss";
import { Tabs, Tab } from "react-bootstrap";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const Home = () => {
  return (
    <section className="home-container">
      <div className="box-container">
        <div className="heading-container">
          <h1>SaMedia</h1>
        </div>
        <div className="main-content-container">
          <Tabs
            defaultActiveKey="login"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="login" title="Login">
              <Login />
            </Tab>
            <Tab eventKey="Signup" title="Sign Up">
              <Signup />
            </Tab>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Home;
