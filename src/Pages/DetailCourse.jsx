import {
  Col,
  Container,
  Dropdown,
  ProgressBar,
  Row,
  Form,
} from "react-bootstrap";
import RoutePath from "../Components/RoutePath";
import "./DetailCourse.scss";
import { useState } from "react";
import SearchBox from "../Components/SearchBox";
import PageControl from "../Components/PageControl";
import { Rating, Star } from "@smastrom/react-rating";
import { useNavigate } from "react-router-dom";

const course = {
  id: 1,
  img: "images/courses/html.png",
  color: "#3F6185",
  description:
    "Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis quis, ultricies convallis neque. Pellentesque tristique fringilla tempus. Vivamus bibendum nibh in dolor pharetra, a euismod nulla dignissim. Aenean viverra tincidunt nibh, in imperdiet nunc. Suspendisse eu ante pretium, consectetur leo at, congue quam. Nullam hendrerit porta ante vitae tristique.",
  learners: 500,
  lessons: 6,
  tags: ["#learn", "#code"],
  price: 0,
};

const lessons = [
  "Hello World Lorem Lomen ifadsf",
  "suada felis quis, ultricies convallis neque. Pellentesque tristique fr",
  "Hello World 2",
  "Hello World 3",
  "Hello World 4",
  "Hello Worl 5",
];

const teachers = [
  {
    name: "Luu Trung Nghia",
    position: "Second Year Teacher",
    img: "images/teacher-icon.png",
    links: { google: "#", fb: "#", slack: "#" },
    description:
      "Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis quis, ultricies convallis neque. Pellentesque tristique",
  },
  {
    name: "Luu Trung Nghia",
    position: "Second Year Teacher",
    img: "images/teacher-icon.png",
    links: { google: "#", fb: "#", slack: "#" },
    description:
      "Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis quis, ultricies convallis neque. Pellentesque tristique",
  },
];

const reviews = [
  {
    user: { name: "Nam Hoang", avatar: "images/user-avatar.jpg" },
    star: 4,
    comment:
      "Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis quis, ultricies convallis neque. Pellentesque tristique",
    time: "August 4, 2020 at 1:30 pm",
    replies: [],
  },
  {
    user: { name: "Nam Hoang", avatar: "images/user-avatar.jpg" },
    star: 5,
    comment:
      "Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis quis, ultricies convallis neque. Pellentesque tristique",
    time: "August 4, 2020 at 1:30 pm",
    replies: [
      {
        user: { name: "Nga Nguyen", avatar: "images/user-avatar.jpg" },
        comment:
          "Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna",
        time: "August 4, 2020 at 1:30 pm",
      },
      {
        user: { name: "Nga Nguyen", avatar: "images/user-avatar.jpg" },
        comment:
          "Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna",
        time: "August 4, 2020 at 1:30 pm",
      },
    ],
  },
];

export default function DetailCourse() {
  const [content, setContent] = useState("lessons");
  const navigate = useNavigate();

  let enrolled = false;

  const changeContent = (newContent, e) => {
    if (newContent !== content) setContent(newContent);
    const current = document.querySelector(".current");
    if (current !== e.target) {
      current.classList.remove("current");
      e.target.classList.add("current");
    }
  };

  return (
    <>
      <RoutePath courseID={course.id} />
      <div className="course-container">
        <Container style={{ width: "82%" }}>
          <Row>
            <Col xl={8} lg={6} md={12} sm={12}>
              <div
                className="img-container"
                style={{ backgroundColor: course.color }}
              >
                <img src={course.img} alt="course logo image" />
              </div>
            </Col>
            <Col xl={4} lg={6} md={12} sm={12}>
              <div className="desciption">
                <h3>Descriptions course</h3>
                <p>{course.description}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xl={8} lg={6} md={12} sm={12}>
              <div className="course-contents">
                <div className="buttons">
                  <span
                    className="current"
                    onClick={(e) => changeContent("lessons", e)}
                  >
                    Lessons
                  </span>
                  <span onClick={(e) => changeContent("teachers", e)}>
                    Teacher
                  </span>
                  <span onClick={(e) => changeContent("reviews", e)}>
                    Reviews
                  </span>
                </div>
                {content === "lessons" && (
                  <Lessons lessons={lessons} navigate={navigate} />
                )}
                {content === "teachers" && <Teachers teachers={teachers} />}
                {content === "reviews" && <Reviews reviews={reviews} />}
              </div>
            </Col>
            <Col xl={4} lg={6} md={12} sm={12}>
              <div className="course-info">
                <div className="info-col">
                  <div className="info-left">
                    <img src="images/learners.png" />
                    <span>Learners</span>
                  </div>
                  <div className="colon">:</div>
                  <div className="info-right">{course.learners}</div>
                </div>
                <div className="info-col">
                  <div className="info-left">
                    <img src="images/lessons.png" />
                    <span>Lessons</span>
                  </div>
                  <div className="colon">:</div>
                  <div className="info-right">{course.lessons}</div>
                </div>
                <div className="info-col">
                  <div className="info-left">
                    <img src="images/clock.png" />
                    <span>Time</span>
                  </div>
                  <div className="colon">:</div>
                  <div className="info-right">80 hours</div>
                </div>
                <div className="info-col">
                  <div className="info-left">
                    <img src="images/tag.png" />
                    <span>Tag</span>
                  </div>
                  <div className="colon">:</div>
                  <div className="info-right">
                    {course.tags.map((tag, i) => {
                      return (
                        <>
                          <a href="#">{tag}</a>
                          {i === course.tags.length - 1 ? "" : ", "}
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="info-col">
                  <div className="info-left">
                    <img src="images/price.png" />
                    <span>Price</span>
                  </div>
                  <div className="colon">:</div>
                  <div className="info-right">
                    {course.price === 0 ? "Free" : course.price}
                  </div>
                </div>
                {enrolled && <button>Kết thúc khóa học</button>}
              </div>

              <div className="course-suggestions">
                <div className="title">Other Courses</div>
                <ol>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur the adipiscing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur the adipiscing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur the adipiscing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur the adipiscing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur the adipiscing elit.
                  </li>
                </ol>
                <button onClick={() => navigate("/courses")}>
                  View all our courses
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

function Lessons({ lessons, navigate }) {
  return (
    <>
      <Container>
        <Row
          style={{
            padding: "20px 0",
            borderBottom: "1px solid #e2e0e0",
          }}
        >
          <Col xl={7} lg={12} md={12} sm={12}>
            <div className="search">
              <SearchBox />
              <button>Tìm kiếm</button>
            </div>
          </Col>
          <Col xl={5} lg={12} md={12} sm={12}>
            <div className="course-enroll">
              <button>Tham gia khóa học</button>
            </div>
          </Col>
        </Row>
      </Container>
      <ol>
        {lessons.map((lessonName, i) => {
          return (
            <li>
              <div className="lesson">
                <div className="lesson-name">{lessonName}</div>
                <button
                  onClick={() => {
                    navigate(`${i}`);
                  }}
                >
                  Learn
                </button>
              </div>
            </li>
          );
        })}
      </ol>
      <PageControl />
    </>
  );
}

function Teachers({ teachers }) {
  return (
    <>
      <div className="teachers-title">Main Teachers</div>
      {teachers.map((teacher) => {
        return (
          <div className="teacher">
            <div className="teacher-info">
              <img src={teacher.img} />
              <div>
                <div className="teacher-name">{teacher.name}</div>
                <div className="teacher-position">{teacher.position}</div>
                <div className="social-links">
                  {teacher.links.google && (
                    <a
                      href={teacher.links.google}
                      style={{ border: "1px solid #F44336" }}
                    >
                      <svg
                        width="14"
                        height="9"
                        viewBox="0 0 14 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.7298 2.62646H11.454V3.89639H10.1841V5.17215H11.454V6.44208H12.7298V5.17215H13.9997V3.89639H12.7298V2.62646Z"
                          fill="#F44336"
                        />
                        <path
                          d="M8.57682 4.47788C8.57682 4.19146 8.54707 3.97038 8.50565 3.74988H4.37562V5.25372H6.85889C6.42255 7.99541 1.66601 7.76732 1.66601 4.37638C1.66601 1.93453 4.5477 0.775437 6.11863 2.28687L7.30631 1.14702C4.61245 -1.3765 0 0.514685 0 4.37638C0 10.0231 8.57682 10.3573 8.57682 4.47788Z"
                          fill="#F44336"
                        />
                      </svg>
                    </a>
                  )}
                  {teacher.links.fb && (
                    <a
                      href={teacher.links.fb}
                      style={{ border: "1px solid #1976D2" }}
                    >
                      <svg
                        width="6"
                        height="13"
                        viewBox="0 0 6 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 4.46875H3.75V2.84375C3.75 2.39525 4.086 2.03125 4.5 2.03125H5.25V0H3.75C2.50725 0 1.5 1.09119 1.5 2.4375V4.46875H0V6.5H1.5V13H3.75V6.5H5.25L6 4.46875Z"
                          fill="#1976D2"
                        />
                      </svg>
                    </a>
                  )}
                  {teacher.links.slack && (
                    <a
                      href={teacher.links.slack}
                      style={{ border: "1px solid #E91E63" }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.42016 6.32593C3.72417 6.32593 3.15967 6.89043 3.15967 7.58642V10.7394C3.15967 11.4354 3.72417 11.9999 4.42016 11.9999C5.11616 11.9999 5.68066 11.4354 5.68066 10.7394V7.58642C5.68016 6.89043 5.11566 6.32593 4.42016 6.32593Z"
                          fill="#E91E63"
                        />
                        <path
                          d="M0.00854492 7.58644C0.00854492 8.28294 0.573542 8.84794 1.27004 8.84794C1.96654 8.84794 2.53153 8.28294 2.53153 7.58644V6.32495H1.27104C1.27054 6.32495 1.27054 6.32495 1.27004 6.32495C0.573542 6.32495 0.00854492 6.88995 0.00854492 7.58644Z"
                          fill="#E91E63"
                        />
                        <path
                          d="M4.42169 0C4.42119 0 4.42069 0 4.42019 0C3.72369 0 3.15869 0.564997 3.15869 1.26149C3.15869 1.95799 3.72369 2.52299 4.42019 2.52299H5.68068V1.26149C5.68068 1.26099 5.68068 1.25999 5.68068 1.25899C5.68018 0.563497 5.11668 0 4.42169 0Z"
                          fill="#00BCD4"
                        />
                        <path
                          d="M1.26149 5.68559H4.42048C5.11698 5.68559 5.68197 5.12059 5.68197 4.42409C5.68197 3.72759 5.11698 3.1626 4.42048 3.1626H1.26149C0.564997 3.1626 0 3.72759 0 4.42409C0 5.12059 0.564997 5.68559 1.26149 5.68559Z"
                          fill="#00BCD4"
                        />
                        <path
                          d="M10.7275 3.16187C10.032 3.16187 9.46851 3.72536 9.46851 4.42086V4.42336V5.68485H10.729C11.4255 5.68485 11.9905 5.11986 11.9905 4.42336C11.9905 3.72686 11.4255 3.16187 10.729 3.16187C10.7285 3.16187 10.728 3.16187 10.7275 3.16187Z"
                          fill="#4CAF50"
                        />
                        <path
                          d="M6.31934 1.26147V4.42395C6.31934 5.11995 6.88383 5.68445 7.57983 5.68445C8.27583 5.68445 8.84032 5.11995 8.84032 4.42395V1.26147C8.84032 0.565474 8.27583 0.000976562 7.57983 0.000976562C6.88383 0.000976562 6.31934 0.565474 6.31934 1.26147Z"
                          fill="#4CAF50"
                        />
                        <path
                          d="M8.83935 10.7385C8.83935 10.0425 8.27485 9.47803 7.57885 9.47803H6.31836V10.7395C6.31886 11.435 6.88286 11.999 7.57885 11.999C8.27485 11.999 8.83935 11.4345 8.83935 10.7385Z"
                          fill="#FF9800"
                        />
                        <path
                          d="M10.7388 6.32495H7.57985C6.88336 6.32495 6.31836 6.88995 6.31836 7.58644C6.31836 8.28294 6.88336 8.84794 7.57985 8.84794H10.7388C11.4353 8.84794 12.0003 8.28294 12.0003 7.58644C12.0003 6.88995 11.4353 6.32495 10.7388 6.32495Z"
                          fill="#FF9800"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <p className="teacher-description">{teacher.description}</p>
          </div>
        );
      })}
    </>
  );
}

const starStyles = {
  itemShapes: Star,
  activeFillColor: "#FFD567",
  inactiveFillColor: "#D8D8D8",
};

function Reviews({ reviews }) {
  const reviewsCount = reviews.length;
  const starCounts = [0, 0, 0, 0, 0];
  let totalRating = 0;

  reviews.forEach((review) => {
    totalRating += review.star;
    starCounts[5 - review.star]++;
  });
  const averageRating = (totalRating / reviewsCount).toFixed(1);

  return (
    <>
      <h2 className="reviews-title">
        {reviews.length < 10 ? "0" + reviews.length : reviews.length} Reviews
      </h2>
      <div className="ratings">
        <Container>
          <Row>
            <Col lg={5}>
              <div className="rating-summary">
                <div className="averageRating">{averageRating}</div>
                <Rating
                  itemStyles={starStyles}
                  spaceBetween="small"
                  spaceInside="medium"
                  style={{ maxWidth: "180px" }}
                  value={averageRating}
                  readOnly
                />
                <span className="ratings-count">{reviewsCount} Ratings</span>
              </div>
            </Col>
            <Col lg={7}>
              <div className="ratings-chart">
                {starCounts.map((count, i) => {
                  return (
                    <div className="rating-row">
                      <div className="rating-star">{5 - i} stars</div>
                      <div className="rating-bar-container">
                        <ProgressBar
                          now={(count / reviewsCount) * 100}
                          variant="green"
                        />
                      </div>
                      <div>{count}</div>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Dropdown className="d-inline mx-2">
        <Dropdown.Toggle id="dropdown-autoclose-true" className="filter-button">
          Show all reviews
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#">Menu Item</Dropdown.Item>
          <Dropdown.Item href="#">Menu Item</Dropdown.Item>
          <Dropdown.Item href="#">Menu Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {reviews.map((review) => {
        const user = review.user;
        return (
          <div className="review">
            <div className="review-header">
              <img src={user.avatar} />
              <div className="user-name">{user.name}</div>
              <div style={{ display: "block", marginLeft: "15px" }}>
                <Rating
                  itemStyles={starStyles}
                  value={review.star}
                  style={{ maxWidth: 100 }}
                  readOnly
                />
              </div>
              <div className="review-time">{review.time}</div>
            </div>
            <p className="review-text">{review.comment}</p>
            <div className="review-replies">
              {review.replies.map((reply) => {
                return (
                  <div className="reply">
                    <div className="reply-header">
                      <img src={reply.user.avatar} />
                      <div className="user-name">{reply.user.name}</div>
                      <div className="review-time">{reply.time}</div>
                    </div>
                    <p className="review-text">{reply.comment}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="review-form">
        <h2>Leave a Review</h2>
        <Form>
          <Form.Group className="mb-3 mt-2">
            <Form.Label className="txtarea-title">Message</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="d-flex align-items-center gap-3">
            <Form.Label as="h2">Vote</Form.Label>
            <div>
              <Rating
                itemStyles={starStyles}
                style={{ maxWidth: 85 }}
                spaceBetween="small"
                spaceInside="none"
              />
            </div>

            <span style={{ marginLeft: "20px", color: "#747474" }}>
              (stars)
            </span>
          </Form.Group>
          <button className="submit-btn" type="submit">
            Send
          </button>
        </Form>
      </div>
    </>
  );
}
