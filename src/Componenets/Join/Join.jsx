import React, { useEffect } from "react";
import "./Join.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../../utils/APIRoutes";
import { loginRoute } from "../../utils/APIRoutes";


const Join = () => {

  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2500,
    paueOnHover: true,
    theme: "dark",
  };

  // The visibility of the password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const [reg, setReg] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    // if the validate returns true then we call the api
    if (handleValidationForRegister()) {
      const { name, password, email } = reg;
      const { data } = await axios.post(registerRoute, {
        name,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
        navigate("/chats");
      }
    }
  };

  // Validate the Registerform
  const handleValidationForRegister = () => {
    const { name, password, email } = reg;

    if (!name.match(/\b\w+\b \b\w+\b/)) {
      toast.error("Please enter your first and last name", toastOptions);
      return false;
    }
    else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters",
        toastOptions
      );
      return false;
    }

    return true;
  };

  // To Get the login data
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  // For Login
  const loginHandler = async (e) => {
    e.preventDefault();
    if (handleValidationForLogin()) {
      const { name, password } = formData;
      const { data } = await axios.post( loginRoute, { name, password });
      
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if(data.status === 400) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
        navigate("/chats");
      }
    }
  };
  const handleValidationForLogin = () => {
    const { name, password } = formData;

    if (!name.match(/\b\w+\b \b\w+\b/)) {
      toast.error("Please enter your first and last name", toastOptions);
      return false;
    } else if (password.length < 8 || password === "") {
      toast.error(
        "Please Enter  Password to continue",
        toastOptions
      );
      return false;
    }
    return true;
  };

  //  To change the rotation effect
  const [angle, setAngle] = useState(0);
  const location = useLocation();
  const openRegister = () => {
    setAngle(-180);
  };
  const openLogin = () => {
    setAngle(0);
  };

  // IF we have the user details in the local storage then we redirect it to the /chat page
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/chats");
    }
  }, []);

  // To Navigate different componenet when login and register are at the same page
  useEffect(() => {
    if (location.pathname === "/") {
      setAngle(0);
    } else if (location.pathname === "/register") {
      setAngle(-180);
    }
  }, [location.pathname]);

  // Render the componenet at different url paths
  if (location.pathname === "/") {
    return (
      <div className="join_container">
        <div className="card">
          <div
            className="inner_box"
            id="cardinner"
            style={{ transform: `rotateY(${angle}deg)` }}
          >
            <div className="card_front">
              <h2>Login</h2>
              <form action="">
                <input
                  type="text"
                  className="input_box"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />

                <input
                  type={showPassword ? "text" : "password"}
                  className="input_box"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />

                <IconButton
                  sx={{
                    float: "right",
                    bottom: "3.2rem",
                    right: "0.9rem",
                  }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "white" }} />
                  ) : (
                    <Visibility sx={{ color: "white" }} />
                  )}
                </IconButton>

                <button
                  type="submit"
                  className="submit_btn"
                  onClick={loginHandler}
                >
                  Submit
                </button>

                <label>
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </label>
              </form>
              <Link to="/register">
                <button
                  type="button"
                  className="join_btn"
                  onClick={openRegister}
                >
                  I'm New Here
                </button>
              </Link>
              <a href="/">Forgot Password?</a>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  } else if (location.pathname === "/register") {
    return (
      <div className="join_container">
        <div className="card">
          <div
            className="inner_box"
            id="cardinner"
            style={{ transform: `rotateY(${angle}deg)` }}
          >
            <div className="card_back">
              <h2>Register</h2>
              <form action="">
                <input
                  type="text"
                  className="input_box"
                  placeholder="Your Name"
                  onChange={(e) => setReg({ ...reg, name: e.target.value })}
                  value={reg.name}
                  required
                />
                <input
                  type="email"
                  className="input_box"
                  placeholder="Your Email ID"
                  onChange={(e) => setReg({ ...reg, email: e.target.value })}
                  value={reg.email}
                  required
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input_box"
                  placeholder="Password"
                  onChange={(e) => setReg({ ...reg, password: e.target.value })}
                  value={reg.password}
                  required
                />

                <IconButton
                  sx={{
                    float: "right",
                    bottom: "3.2rem",
                    right: "0.9rem",
                  }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "white" }} />
                  ) : (
                    <Visibility sx={{ color: "white" }} />
                  )}
                </IconButton>

                <button
                  type="submit"
                  className="submit_btn"
                  onClick={handleRegister}
                >
                  Submit
                </button>
                <label>
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </label>
              </form>
              <Link to="/">
                <button type="button" className="join_btn" onClick={openLogin}>
                  I've an account
                </button>
              </Link>
              <a href="/">Forgot Password?</a>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
};
export default Join;
