import { Form } from "react-bootstrap";
import "./SignIn.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../Utils/axios";

export default function SignIn() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        const res = await axios.post("/login", {
          username: form.username.value,
          password: form.password.value,
        });
        navigate("/", { relative: false });
      } catch (err) {
        setError(err.response.data);
      }
    }

    setValidated(true);
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <span className="sign-in-title">Sign in to HapoLearn</span>
        <div
          className="sign-in-error"
          style={{ display: error ? "block" : "none" }}
        >
          {error}
        </div>
        <Form noValidate validated={validated} onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              required
              onChange={(e) => {
                e.target.setCustomValidity(
                  e.target.value.length >= 8 ? "" : "invalid"
                );
              }}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              required
              onChange={(e) => {
                e.target.setCustomValidity(
                  e.target.value.length >= 8 ? "" : "invalid"
                );
              }}
            />
          </Form.Group>
          <Link to="/resetPassword">Forgot password</Link>
          <button className="sign-in-btn" type="submit">
            Sign in
          </button>
        </Form>
        <div className="divider-container">
          <span>Sign in with</span>
          <div className="black-line"></div>
        </div>
        <button className="google-btn">
          <img src="images/google.svg" />
          <span>Google</span>
        </button>
        <div className="divider-container">
          <span>or New to HapoLearn</span>
          <div className="black-line"></div>
        </div>
        <button
          className="create-account-btn"
          onClick={() => navigate("/signUp")}
        >
          Create New Account
        </button>
      </div>
    </div>
  );
}
