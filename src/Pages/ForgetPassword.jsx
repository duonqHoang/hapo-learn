import { Form } from "react-bootstrap";
import "./ForgetPassword.scss";
import { useState } from "react";
import axios from "../Utils/axios";

export default function ForgetPassword() {
  const [status, setStatus] = useState();
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        const res = await axios.post("/forget-password", {
          email: form.email.value,
        });
        setStatus("Check your mail for a password-change url");
      } catch (err) {
        if (err.response) {
          setStatus(err.response.data);
        } else {
          setStatus("Error sending mail");
        }
      }
    }

    setValidated(true);
  };

  return (
    <div className="forget-password-page">
      <div className="forget-password-container">
        <div className="forget-password-title">Reset Password</div>
        <div className="forget-password-sub">
          Enter email to reset your password
        </div>
        <div>{status}</div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control name="email" type="email" required />
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
