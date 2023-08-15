import { Form } from "react-bootstrap";
import "./ResetPassword.scss";

export default function ResetPassword() {
  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <div className="reset-password-title">Reset Password</div>
        <div className="reset-password-sub">
          Enter email to reset your password
        </div>
        <Form>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>
          <button className="submit-btn" type="submit">
            RESET PASSWORD
          </button>
        </Form>
      </div>
    </div>
  );
}
