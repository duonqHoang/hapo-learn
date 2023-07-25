import Navbar from "../Components/Navbar";
import "./Home.scss";
import { Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <div className="homePage">
      <Navbar />
      <div className="banner">
        <div className="banner-content">
          <div className="banner-content--normal">Learn Anytime, Anywhere</div>
          <div className="banner-content--bold">
            at HapoLearn{" "}
            <img className="hapowl" src="/hapowl.png" alt="Hapo Owl" /> !
          </div>
          <div className="banner-content--sub">
            Interactive lessons, "on-the-go"{"\n"}practice, peer support.
          </div>
          <button className="banner-content__button">
            Start Learning Now!
          </button>
        </div>
      </div>
      <div className="banner-back"></div>
      <Row
        className="justify-content-center"
        lg={4}
        style={{ margin: "-80px auto", gap: "20px" }}
      >
        <CourseCards />
      </Row>

      <section className="otherCourses">
        <h1>Other courses</h1>
        <div className="greenBar"></div>
        <Row
          className="justify-content-center"
          lg={4}
          style={{ margin: " auto", gap: "20px" }}
        >
          <CourseCards />
        </Row>
        <a href="" style={{ textDecoration: "none" }}>
          View All Our Courses{" "}
          <svg
            width="48"
            height="27"
            viewBox="0 0 48 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M47.0926 13.0413C47.0926 12.4721 46.875 11.9196 46.4732 11.5346L35.5747 0.636161C35.173 0.234375 34.6205 0 34.0513 0C33.4821 0 32.9464 0.234375 32.5446 0.636161L31.289 1.89174C30.8872 2.27679 30.6529 2.82924 30.6529 3.39844C30.6529 3.96763 30.8872 4.52009 31.289 4.90514L36.1942 9.82701H1.95871C0.753348 9.82701 0 10.8315 0 11.9699V14.1127C0 15.2511 0.753348 16.2556 1.95871 16.2556H36.1942L31.289 21.1607C30.8872 21.5625 30.6529 22.115 30.6529 22.6842C30.6529 23.2534 30.8872 23.8058 31.289 24.2076L32.5446 25.4632C32.9464 25.8482 33.4821 26.0826 34.0513 26.0826C34.6205 26.0826 35.173 25.8482 35.5747 25.4632L46.4732 14.5647C46.875 14.1629 47.0926 13.6105 47.0926 13.0413Z"
              fill="#90AB26"
            />
          </svg>
        </a>
      </section>
      <section className="whyHapo">
        <h1>Why HapoLearn?</h1>
        {[1, 2, 3, 4, 5].map((_, i) => {
          return (
            <div key={i} className="whyHapo__reason">
              <svg
                style={{ fill: "#ffffff" }}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
              </svg>{" "}
              Interactive lessons, "on-the-go" practice, peer support.
            </div>
          );
        })}
        <img src="images/devices.png" alt="Some technology devices" />
      </section>
    </div>
  );
}

function CourseCards() {
  return [1, 2, 3].map(() => {
    return (
      <Col>
        <div className="courseCard">
          <div className="cardImg-container">
            <img
              className="card-img"
              src="images/courses/html.png"
              alt="Course logo"
            />
          </div>
          <div className="card-content">
            <div className="card-title">HTML/CSS/js Tutorial</div>
            <div className="card-description">
              I knew hardly anything about HTML, JS, and CSS before entering New
              Media. I had coded quite a bit, but never touched anything in
              regards to web development.
            </div>
            <button>Take this course</button>
          </div>
        </div>
      </Col>
    );
  });
}
