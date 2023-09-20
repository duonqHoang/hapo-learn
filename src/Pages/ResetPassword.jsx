import { Form } from "react-bootstrap";
import "./ResetPassword.scss";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../Utils/axios";

export default function ResetPassword() {
  const [error, setError] = useState();
  const [validated, setValidated] = useState(false);
  const password = useRef();
  const passwordConfirm = useRef();
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        const res = await axios.post("/reset-password", {
          username: params.username,
          password: form.password.value,
          token: params.token,
        });
        if (res.statusText === "OK") {
          navigate("/signIn", { relative: false });
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data);
        } else {
          setError("Error changing password");
        }
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
    <div className="reset-password-page">
      <div className="reset-password-container">
        <div className="reset-password-title">Reset Password</div>
        <div
          className="reset-pass-error"
          style={{ display: error ? "block" : "none" }}
        >
          {error}
        </div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>New password:</Form.Label>
            <Form.Control
              name="password"
              ref={password}
              type="password"
              onChange={(e) => {
                checkPasswordMatch();
                const pass = e.currentTarget;
                pass.setCustomValidity(pass.value.length >= 8 ? "" : "invalid");
              }}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm password:</Form.Label>
            <Form.Control
              name="password-confirm"
              ref={passwordConfirm}
              type="password"
              onChange={checkPasswordMatch}
              required
            />
          </Form.Group>
          <button className="submit-btn" type="submit">
            RESET PASSWORD
          </button>
        </Form>
      </div>
    </div>
  );
}
