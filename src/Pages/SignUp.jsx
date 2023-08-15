import { Form } from "react-bootstrap";
import "./SignUp.scss";
import { useRef, useState } from "react";

export default function SignUp() {
  const [validated, setValidated] = useState(false);
  const password = useRef();

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <span className="sign-up-title">Sign up to HapoLearn</span>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              ref={password}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="passwordConfirm"
              type="password"
              onChange={(e) => {
                e.target.setCustomValidity(
                  password.current.value === e.target.value ? "" : "invalid"
                );
              }}
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
