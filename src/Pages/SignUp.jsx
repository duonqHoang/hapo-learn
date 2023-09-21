import { Form } from "react-bootstrap";
import "./SignUp.scss";
import { useRef, useState } from "react";
import axios from "../Utils/axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const password = useRef();
  const passwordConfirm = useRef();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        const res = await axios.post("/register", {
          username: form.name.value,
          email: form.email.value,
          password: form.password.value,
        });
        navigate("/signIn", { relative: false });
      } catch (err) {
        setError(err.response.data.join(", "));
      }
    }

    setValidated(true);
  };

  const checkPasswordMatch = () => {
    passwordConfirm.current.setCustomValidity(
      password.current.value === passwordConfirm.current.value ? "" : "invalid"
    );
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <span className="sign-up-title">Sign up to HapoLearn</span>
        <div
          className="sign-up-error"
          style={{ display: error ? "block" : "none" }}
        >
          {error}
        </div>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control name="name" required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" required />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              ref={password}
              onChange={(e) => {
                checkPasswordMatch();
                const pass = e.currentTarget;
                pass.setCustomValidity(pass.value.length >= 8 ? "" : "invalid");
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Password must be longer than 8 characters.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="passwordConfirm"
              type="password"
              onChange={checkPasswordMatch}
              ref={passwordConfirm}
              required
            />
          </Form.Group>
          <button className="sign-up-btn" type="submit">
            Sign up
          </button>
        </Form>
      </div>
    </div>
  );
}
