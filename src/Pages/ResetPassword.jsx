import { Form } from "react-bootstrap";
import "./ResetPassword.scss";
import { useState } from "react";

export default function ResetPassword() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <div className="reset-password-title">Reset Password</div>
        <div className="reset-password-sub">
          Enter email to reset your password
        </div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" required />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address!
            </Form.Control.Feedback>
          </Form.Group>
          <button className="submit-btn" type="submit">
            RESET PASSWORD
          </button>
        </Form>
      </div>
    </div>
  );
}
