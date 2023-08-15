import { Form } from "react-bootstrap";
import "./SignUp.scss";

export default function SignUp() {
  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <span className="sign-up-title">Sign up to HapoLearn</span>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control />
          </Form.Group>
          <button className="sign-up-btn" type="submit">
            Sign up
          </button>
        </Form>
      </div>
    </div>
  );
}
