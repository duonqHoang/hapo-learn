import { Form } from "react-bootstrap";
import "./SignIn.scss";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <span className="sign-in-title">Sign in to HapoLearn</span>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control />
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