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
import { useEffect, useRef, useState } from "react";
import Pagination from "../Components/Pagination";
import { Rating, Star } from "@smastrom/react-rating";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../Utils/axios";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

export default function DetailCourse() {
  const [content, setContent] = useState("lessons");
  const [course, setCourse] = useState({});
  const [userCourses, setUserCourses] = useState([]);
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.isAuthenticated;
  const isOwnCourse = course.teacher?.id === user.profile.teacherProfile?.id;
  const navigate = useNavigate();

  const params = useParams();
  const enrolled = userCourses.find((course) => course.id == params.courseID)
    ? true
    : false;

  const fetchCourseData = async () => {
    try {
      const res = await axios.get("/courses/" + params.courseID);
      setCourse(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserCourses = async () => {
    try {
      const res = await axios.get("/user/courses");
      setUserCourses(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    try {
      fetchCourseData();
      if (isLoggedIn) fetchUserCourses();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleUnenrollCourse = async () => {
    try {
      await axios.post(`/courses/${params.courseID}/unenroll`);
      fetchUserCourses();
      fetchCourseData();
    } catch (err) {
      console.log(err);
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
                style={{ backgroundColor: "#3F6185" }}
              >
                <img
                  src={`http://localhost:8080/images/${course.image}`}
                  alt="course logo image"
                  // onError={(event) => {
                  //   event.currentTarget.src = "hapowl.png";
                  // }}
                />
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
                    className={content === "lessons" ? "current" : ""}
                    onClick={() => setContent("lessons")}
                  >
                    Lessons
                  </span>
                  <span
                    className={content === "teachers" ? "current" : ""}
                    onClick={() => setContent("teachers")}
                  >
                    Teacher
                  </span>
                  <span
                    className={content === "reviews" ? "current" : ""}
                    onClick={() => setContent("reviews")}
                  >
                    Reviews
                  </span>
                </div>
                {content === "lessons" && (
                  <Lessons
                    courseID={params.courseID}
                    navigate={navigate}
                    enrolled={enrolled}
                    isOwnCourse={isOwnCourse}
                    fetchUserCourses={fetchUserCourses}
                    fetchCourseData={fetchCourseData}
                  />
                )}
                {content === "teachers" && (
                  <Teachers teacher={course.teacher} />
                )}
                {content === "reviews" && (
                  <Reviews courseID={params.courseID} navigate={navigate} />
                )}
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
                  <div className="info-right">{course.learnersCount}</div>
                </div>
                <div className="info-col">
                  <div className="info-left">
                    <img src="images/lessons.png" />
                    <span>Lessons</span>
                  </div>
                  <div className="colon">:</div>
                  <div className="info-right">{course.lessonsCount}</div>
                </div>
                <div className="info-col">
                  <div className="info-left">
                    <img src="images/clock.png" />
                    <span>Time</span>
                  </div>
                  <div className="colon">:</div>
                  <div className="info-right">{course.time || "0"} hours</div>
                </div>
                <div className="info-col">
                  <div className="info-left">
                    <img src="images/tag.png" />
                    <span>Tag</span>
                  </div>
                  <div className="colon">:</div>
                  <div className="info-right">
                    {["#learn", "#code"].map((tag, i) => {
                      return (
                        <>
                          <a href="#">{tag}</a>
                          {i === 2 - 1 ? "" : ", "}
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
                    {course.price ? course.price : "Free"}
                  </div>
                </div>
                {enrolled && (
                  <div className="course-unenroll">
                    <button onClick={handleUnenrollCourse}>
                      Kết thúc khóa học
                    </button>
                  </div>
                )}
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

function Lessons({
  courseID,
  navigate,
  enrolled,
  isOwnCourse,
  fetchUserCourses,
  fetchCourseData,
}) {
  const [lessonData, setLessonData] = useState({
    lessons: [],
    lessonsCount: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const searchInput = useRef();
  const numberOfPages = parseInt(lessonData.lessonsCount / 20) + 1 || 1;

  const handleEnrollCourse = async () => {
    try {
      await axios.post(`/courses/${courseID}/enroll`);
      fetchUserCourses();
      fetchCourseData();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const input = searchInput.current.value;
    setSearch(input);
    setCurrentPage(1);
  };

  const fetchLessonData = async () => {
    try {
      const res = await axios.get(
        `/lessons?courseID=${courseID}&page=${currentPage}&s=${search}`
      );
      setLessonData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLessonData();
  }, [currentPage, search]);

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
              <form className="search-container" onSubmit={handleSearch}>
                <input
                  className="search-box"
                  type="text"
                  placeholder="Search..."
                  ref={searchInput}
                />
                <FaSearch className="search-icon" />
              </form>
              <button onClick={handleSearch}>Tìm kiếm</button>
            </div>
          </Col>
          <Col xl={5} lg={12} md={12} sm={12}>
            {!enrolled && !isOwnCourse && (
              <div className="course-enroll">
                <button onClick={handleEnrollCourse}>Tham gia khóa học</button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <ol>
        {lessonData.lessons.map((lesson) => {
          return (
            <li key={lesson.id}>
              <div className="lesson">
                <div className="lesson-name">{lesson.name}</div>
                <button
                  onClick={() => {
                    navigate(`${lesson.id}`);
                  }}
                >
                  Learn
                </button>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="pagination">
        <Pagination.Prev
          className={currentPage === 1 ? "active" : ""}
          onClick={() => {
            if (currentPage > 1) handlePageChange(currentPage - 1);
          }}
        />
        {[...Array(numberOfPages)].map((_, index) => {
          return (
            <Pagination.Item
              className={index + 1 === currentPage ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          );
        })}
        <Pagination.Next
          className={currentPage === numberOfPages ? "active" : ""}
          onClick={() => {
            if (currentPage < numberOfPages) handlePageChange(currentPage + 1);
          }}
        />
      </div>
    </>
  );
}

function Teachers({ teacher }) {
  return (
    <>
      <div className="teachers-title">Main Teachers</div>
      <div className="teacher">
        <div className="teacher-info">
          <div className="teacher-avt-container">
            <img
              src={`http://localhost:8080/images/${teacher.user.avatar}`}
              alt="teacher avatar"
              onError={(event) => {
                event.currentTarget.src = "images/teacher-icon.png";
              }}
            />
          </div>
          <div>
            <div className="teacher-name">{teacher.user.name}</div>
            <div className="teacher-position">{teacher.role}</div>
            <div className="social-links">
              {teacher?.links?.google && (
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
              {teacher?.links?.fb && (
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
              {teacher?.links?.slack && (
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
        <p className="teacher-description">{teacher.user.bio}</p>
      </div>
    </>
  );
}

const starStyles = {
  itemShapes: Star,
  activeFillColor: "#FFD567",
  inactiveFillColor: "#D8D8D8",
};

function Reviews({ courseID }) {
  const [reviewData, setReviewData] = useState({
    reviews: [],
    reviewsCount: 0,
    //Position: 5,4,3,2,1 star
    reviewCounter: [0, 0, 0, 0, 0],
    averageRating: 0,
  });
  const [formStar, setFormStar] = useState(5);

  const fetchReviewData = async () => {
    try {
      const res = await axios.get("/reviews/" + courseID);
      setReviewData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReviewData();
  }, []);

  const handleSubmitReview = async (event) => {
    try {
      const form = event.currentTarget;
      event.preventDefault();
      await axios.post("/reviews/" + courseID, {
        star: formStar,
        comment: form.comment.value,
      });
      fetchReviewData();
    } catch (err) {
      console.log(err?.response?.data || err.message);
    }
  };

  return (
    <>
      <h2 className="reviews-title">
        {reviewData.reviewsCount < 10
          ? "0" + reviewData.reviewsCount
          : reviewData.reviewsCount}{" "}
        Reviews
      </h2>
      <div className="ratings">
        <Container>
          <Row>
            <Col lg={5}>
              <div className="rating-summary">
                <div className="averageRating">{reviewData.averageRating}</div>
                <Rating
                  itemStyles={starStyles}
                  spaceBetween="small"
                  spaceInside="medium"
                  style={{ maxWidth: "180px" }}
                  value={reviewData.averageRating}
                  readOnly
                />
                <span className="ratings-count">
                  {reviewData.reviewsCount} Ratings
                </span>
              </div>
            </Col>
            <Col lg={7}>
              <div className="ratings-chart">
                {reviewData.reviewCounter.map((count, i) => {
                  return (
                    <div className="rating-row">
                      <div className="rating-star">{5 - i} stars</div>
                      <div className="rating-bar-container">
                        <ProgressBar
                          now={(count / reviewData.reviewsCount) * 100}
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
      {reviewData.reviews.map((review) => {
        const user = review.user || { name: "Unnamed User" };
        return (
          <div className="review">
            <div className="review-header">
              <div className="user-avt-container">
                <img
                  src={
                    review.user
                      ? `http://localhost:8080/images/${review.user.avatar}`
                      : "images/user-avatar.jpg"
                  }
                  alt="user avatar"
                  onError={(event) => {
                    event.currentTarget.src = "images/user-avatar.jpg";
                  }}
                />
              </div>
              <div className="user-name">{user.name}</div>
              <div style={{ display: "block", marginLeft: "15px" }}>
                <Rating
                  itemStyles={starStyles}
                  value={review.star}
                  style={{ maxWidth: 100 }}
                  readOnly
                />
              </div>
              <div className="review-time">{review.createdAt}</div>
            </div>
            <p className="review-text">{review.comment}</p>
            {/* <div className="review-replies">
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
            </div> */}
          </div>
        );
      })}
      <div className="review-form">
        <h2>Leave a Review</h2>
        <Form onSubmit={handleSubmitReview}>
          <Form.Group className="mb-3 mt-2">
            <Form.Label className="txtarea-title">Message</Form.Label>
            <Form.Control name="comment" as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="d-flex align-items-center gap-3">
            <Form.Label as="h2">Vote</Form.Label>
            <div>
              <Rating
                itemStyles={starStyles}
                style={{ maxWidth: 85 }}
                spaceBetween="small"
                spaceInside="none"
                value={formStar}
                onChange={(star) => setFormStar(star)}
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
