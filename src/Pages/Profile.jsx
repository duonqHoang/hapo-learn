import { Row, Col, Container, Form } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import "./Profile.scss";
import { FaBirthdayCake, FaPhoneAlt, FaHome } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef, useState } from "react";

const user = {
  name: "Võ Hoài Nam",
  avatar: "images/user-avatar2.jpg",
  phone: "0123456789",
  email: "namvh@gmail.com",
  dob: "10/10/2998",
  address: "Cầu Giấy, Hà Nội",
  intro:
    "Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ippsumipsum, them venenatis",
  courses: [1, 2, 3, 4, 5],
};

const courses = [
  { id: 1, name: "HTML", img: "images/courses/html-small.png" },
  { id: 2, name: "CSS", img: "images/courses/css-small.png" },
  { id: 3, name: "Swift", img: "images/courses/swift-small.png" },
  { id: 4, name: "C#", img: "images/courses/csharp-small.png" },
  { id: 5, name: "Angular", img: "images/courses/angular-small.png" },
];

export default function Profile() {
  const [dob, setDob] = useState(new Date());

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

  return (
    <div className="profile-page">
      <Container>
        <Row>
          <Col xl={3} lg={4} md={12}>
            <div className="user-info">
              <div className="info-top">
                <div className="avatar-holder">
                  <img src={user.avatar} alt="user avatar" />
                  <FaCamera className="camera-icon" />
                </div>
                <div className="profile-name">{user.name}</div>
                <div className="profile-email">{user.email}</div>
              </div>
              <div className="info-bottom">
                <div className="info-row">
                  <FaBirthdayCake className="row-icon birth-icon" />
                  <span>{user.dob}</span>
                </div>
                <div className="info-row">
                  <FaPhoneAlt className="row-icon phone-icon" />
                  <span>{user.phone}</span>
                </div>
                <div className="info-row">
                  <FaHome className="row-icon address-icon" />
                  <span>{user.address}</span>
                </div>
                <p className="user-intro">{user.intro}</p>
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
                {user.courses.map((courseID) => {
                  const course = courses.find((item) => item.id === courseID);

                  return (
                    <div key={courseID} className="enrolled-course">
                      <div className="courseImg-container">
                        <img src={course.img} />
                      </div>
                      <span>{course.name}</span>
                    </div>
                  );
                })}
                <div className="add-course">
                  <button className="add-course-btn">
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
              <div className="section-title">
                <div className="section-title-txt">Edit profile</div>
                <div className="title-underline">
                  <div className="green-hr-line" />
                  <div className="green-hr-line" />
                </div>
              </div>
              <div className="profile-form">
                <Form>
                  <Row>
                    <Col xl={6}>
                      <Form.Group className="mt-3">
                        <Form.Label className="input-label">Name</Form.Label>
                        <Form.Control placeholder="Name" />
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
                        <Form.Control placeholder="Address" />
                      </Form.Group>
                    </Col>
                    <Col xl={6}>
                      <Form.Group className="mt-3">
                        <Form.Label className="input-label">Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Your email..."
                        />
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Form.Label className="input-label">Phone</Form.Label>
                        <Form.Control placeholder="Your phone number..." />
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Form.Label className="input-label">
                          About me
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="About you..."
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
