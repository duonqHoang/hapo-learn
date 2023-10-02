import { Row, Col, Container, Form } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import "./Profile.scss";
import { FaBirthdayCake, FaPhoneAlt, FaHome } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef, useEffect, useRef, useState } from "react";
import axios from "../Utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Store/user-action";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [validated, setValidated] = useState(false);
  const profile = useSelector((state) => state.user.profile);
  const [dob, setDob] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const avtInput = useRef();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile.dob) {
      setDob(new Date(profile.dob));
    }
  }, [profile.dob]);

  const CustomDobInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <Form.Control
      className="dob-input"
      value={value}
      onClick={onClick}
      onChange={onChange}
      ref={ref}
      placeholder="dd/mm/yyyy"
    ></Form.Control>
  ));

  const submitProfile = async (event) => {
    setError(null);
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        await axios.put("/user", {
          name: form.name.value,
          email: form.email.value,
          dob: dob ? dob.toISOString().split("T")[0] : null,
          phone: form.phone.value,
          address: form.address.value,
          bio: form.bio.value,
        });
        dispatch(getProfile());
      } catch (err) {
        setError(err?.response?.data || err.message);
      }
    }

    setValidated(true);
  };

  const handleChangeAvatar = async () => {
    try {
      await axios.put(
        "/user/avatar",
        { avatar: avtInput.current.files[0] },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      dispatch(getProfile());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-page">
      <Container>
        <Row>
          <Col xl={3} lg={4} md={12}>
            <div className="user-info">
              <div className="info-top">
                <div className="avatar-holder">
                  <img
                    src={`http://localhost:8080/images/${profile.avatar}`}
                    alt="user avatar"
                    onError={(event) => {
                      event.currentTarget.src = "images/user-avatar.jpg";
                    }}
                  />
                  <FaCamera
                    className="camera-icon"
                    onClick={() => avtInput.current.click()}
                  />
                </div>

                <input
                  style={{ display: "none" }}
                  ref={avtInput}
                  name="file"
                  type="file"
                  onChange={handleChangeAvatar}
                  accept="image/png, image/jpeg"
                />

                <div className="profile-name">{profile.name}</div>
                <div className="profile-email">{profile.email}</div>
              </div>
              <div className="info-bottom">
                {profile.teacherProfile && (
                  <div className="info-row">
                    <MdWork className="row-icon role-icon" />
                    <span>{profile.teacherProfile.role}</span>
                  </div>
                )}
                <div className="info-row">
                  <FaBirthdayCake className="row-icon birth-icon" />
                  <span>{profile.dob}</span>
                </div>
                <div className="info-row">
                  <FaPhoneAlt className="row-icon phone-icon" />
                  <span>{profile.phone}</span>
                </div>
                <div className="info-row">
                  <FaHome className="row-icon address-icon" />
                  <span>{profile.address}</span>
                </div>
                <p className="user-intro">{profile.bio}</p>
              </div>
            </div>
          </Col>
          <Col xl={9} lg={8} md={12}>
            <div className="profile-right">
              <div className="section-title">
                <div className="section-title-txt">My courses</div>
                <div className="title-underline">
                  <div className="green-hr-line" />
                  <div className="green-hr-line" />
                </div>
              </div>
              <div className="enrolled-courses">
                {profile.courses.map((course) => {
                  return (
                    <div key={course.id} className="enrolled-course">
                      <div
                        className="courseImg-container"
                        onClick={() => navigate(`/courses/${course.id}`)}
                      >
                        <img
                          src={`http://localhost:8080/images/${course.image}`}
                          alt="course logo"
                          onError={(event) => {
                            event.currentTarget.src = "hapowl.png";
                          }}
                        />
                      </div>
                      <span>{course.name}</span>
                    </div>
                  );
                })}
                <div className="add-course">
                  <button
                    className="add-course-btn"
                    onClick={() => navigate("/courses")}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.5714 9.42857H9.71429C9.5565 9.42857 9.42857 9.5565 9.42857 9.71429V14.5714C9.42857 15.3604 8.78892 16 8 16C7.21108 16 6.57143 15.3604 6.57143 14.5714V9.71429C6.57143 9.5565 6.4435 9.42857 6.28571 9.42857H1.42857C0.639648 9.42857 0 8.78892 0 8C0 7.21108 0.639648 6.57143 1.42857 6.57143H6.28571C6.4435 6.57143 6.57143 6.4435 6.57143 6.28571V1.42857C6.57143 0.639647 7.21108 0 8 0C8.78892 0 9.42857 0.639647 9.42857 1.42857V6.28571C9.42857 6.4435 9.5565 6.57143 9.71429 6.57143H14.5714C15.3604 6.57143 16 7.21108 16 8C16 8.78892 15.3604 9.42857 14.5714 9.42857Z"
                        fill="#B2D235"
                      />
                    </svg>
                  </button>
                  <span>Add course</span>
                </div>
              </div>
              {profile.teacherProfile && (
                <>
                  <div className="section-title">
                    <div className="section-title-txt">My teaching</div>
                    <div className="title-underline">
                      <div className="green-hr-line" />
                      <div className="green-hr-line" />
                    </div>
                  </div>
                  <div className="enrolled-courses">
                    {profile?.teacherProfile?.courses.map((course) => {
                      return (
                        <div key={course.id} className="enrolled-course">
                          <div
                            className="courseImg-container"
                            onClick={() => navigate(`/courses/${course.id}`)}
                          >
                            <img
                              src={`http://localhost:8080/images/${course.image}`}
                              alt="course logo"
                              onError={(event) => {
                                event.currentTarget.src = "hapowl.png";
                              }}
                            />
                          </div>
                          <span>{course.name}</span>
                        </div>
                      );
                    })}
                    <div className="add-course">
                      <button
                        className="add-course-btn"
                        onClick={() => navigate("/create-course")}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.5714 9.42857H9.71429C9.5565 9.42857 9.42857 9.5565 9.42857 9.71429V14.5714C9.42857 15.3604 8.78892 16 8 16C7.21108 16 6.57143 15.3604 6.57143 14.5714V9.71429C6.57143 9.5565 6.4435 9.42857 6.28571 9.42857H1.42857C0.639648 9.42857 0 8.78892 0 8C0 7.21108 0.639648 6.57143 1.42857 6.57143H6.28571C6.4435 6.57143 6.57143 6.4435 6.57143 6.28571V1.42857C6.57143 0.639647 7.21108 0 8 0C8.78892 0 9.42857 0.639647 9.42857 1.42857V6.28571C9.42857 6.4435 9.5565 6.57143 9.71429 6.57143H14.5714C15.3604 6.57143 16 7.21108 16 8C16 8.78892 15.3604 9.42857 14.5714 9.42857Z"
                            fill="#B2D235"
                          />
                        </svg>
                      </button>
                      <span>Add course</span>
                    </div>
                  </div>
                </>
              )}

              <div className="section-title">
                <div className="section-title-txt">Edit profile</div>
                <div className="title-underline">
                  <div className="green-hr-line" />
                  <div className="green-hr-line" />
                </div>
              </div>
              <div
                className="profile-error"
                style={{ display: error ? "block" : "none" }}
              >
                {error}
              </div>
              <div className="profile-form">
                <Form noValidate validated={validated} onSubmit={submitProfile}>
                  <Row>
                    <Col xl={6}>
                      <Form.Group className="mt-3">
                        <Form.Label className="input-label">Name</Form.Label>
                        <Form.Control
                          name="name"
                          placeholder="Name"
                          defaultValue={profile.name}
                        />
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Form.Label className="input-label">
                          Date of birthday
                        </Form.Label>
                        <DatePicker
                          placeholderText="dd/mm/yyyy"
                          dateFormat="dd/MM/yyyy"
                          customInput={<CustomDobInput />}
                          selected={dob}
                          onChange={(date) => setDob(date)}
                        />
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Form.Label className="input-label">Address</Form.Label>
                        <Form.Control
                          name="address"
                          placeholder="Address"
                          defaultValue={profile.address}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={6}>
                      <Form.Group className="mt-3">
                        <Form.Label className="input-label">Email</Form.Label>
                        <Form.Control
                          name="email"
                          type="email"
                          placeholder="Your email..."
                          defaultValue={profile.email}
                        />
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Form.Label className="input-label">Phone</Form.Label>
                        <Form.Control
                          name="phone"
                          placeholder="Your phone number..."
                          defaultValue={profile.phone}
                        />
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Form.Label className="input-label">
                          About me
                        </Form.Label>
                        <Form.Control
                          name="bio"
                          as="textarea"
                          rows={3}
                          placeholder="About you..."
                          defaultValue={profile.bio}
                        />
                      </Form.Group>
                      <button className="submit-profile-btn" type="submit">
                        Submit
                      </button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
