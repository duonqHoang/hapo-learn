import "./LessonDetail.scss";
import { Container, Row, Col } from "react-bootstrap";
import RoutePath from "../Components/RoutePath";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../Utils/axios";

const documents = [
  {
    type: "Lesson",
    title: "Program learn HTML/CSS",
  },
  {
    type: "PDF",
    title: "Download course slides",
  },
  { type: "Video", title: "Download course videos" },
];

const tags = ["#coder", "#js"];

export default function LessonDetail() {
  const [content, setContent] = useState("descriptions");
  const [course, setCourse] = useState({});
  const [lesson, setLesson] = useState({});
  const navigate = useNavigate();

  const params = useParams();

  const changeContent = (newContent, e) => {
    if (newContent !== content) setContent(newContent);
    const current = document.querySelector(".current");
    if (current !== e.target) {
      current.classList.remove("current");
      e.target.classList.add("current");
    }
  };

  const fetchLessonData = async () => {
    try {
      const res = await axios.get(
        `/lessons?courseID=${params.courseID}&lessonNumber=${params.lessonNumber}`
      );
      setLesson(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCourseData = async () => {
    try {
      const res = await axios.get("/courses/" + params.courseID);
      setCourse(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const enrollCourse = async () => {
    try {
      await axios.post(`/courses/${params.courseID}/enroll`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLessonData();
    fetchCourseData();
    enrollCourse();
  }, []);

  return (
    <>
      <RoutePath />
      <div className="lesson-container">
        <Container style={{ width: "82%" }}>
          <Row>
            <Col xl={8} lg={6} md={12} sm={12}>
              <div>
                <div className="lesson-img-container">
                  <img
                    src={`http://localhost:8080/images/${course.image}`}
                    alt="course logo image"
                    onError={(event) => {
                      event.currentTarget.src = "Hapo_Learn.png";
                    }}
                  />
                </div>

                <div className="lesson-contents">
                  <div className="nav-btns">
                    <span
                      className="current"
                      onClick={(e) => changeContent("descriptions", e)}
                    >
                      Descriptions
                    </span>
                    <span onClick={(e) => changeContent("documents", e)}>
                      Documents
                    </span>
                  </div>
                  {content === "descriptions" && (
                    <Descriptions lesson={lesson} />
                  )}
                  {content === "documents" && <Documents />}
                </div>
              </div>
            </Col>
            <Col xl={4} lg={6} md={12} sm={12}>
              <div className="lesson-course-info">
                <div className="info-row">
                  <div className="info-left">
                    <img src="images/desktop-icon.png" alt="" />
                    <span>Course</span>
                  </div>
                  <div className="colon">:</div>
                  <div className="info-right">{course.name}</div>
                </div>
                <div className="info-row">
                  <div className="info-left">
                    <img src="images/learners.png" />
                    <span>Learners</span>
                  </div>
                  <div className="colon">:</div>
                  <div className="info-right">{course.learnersCount}</div>
                </div>
                <div className="info-row">
                  <div className="info-left">
                    <img src="images/clock.png" />
                    <span>Time</span>
                  </div>
                  <div className="colon">:</div>
                  <div className="info-right">{lesson.time}h</div>
                </div>
                <div className="info-row">
                  <div className="info-left">
                    <img src="images/tag.png" />
                    <span>Tag</span>
                  </div>
                  <div className="colon">:</div>
                  <div className="info-right">
                    {course.tags
                      ? course.tags.map((tag, i) => {
                          return (
                            <>
                              <a key={i} href="#">
                                {tag}
                              </a>
                              {i === course.tags.length - 1 ? "" : ", "}
                            </>
                          );
                        })
                      : tags.map((tag, i) => {
                          return (
                            <>
                              <a key={i} href="#">
                                {tag}
                              </a>
                              {i === tags.length - 1 ? "" : ", "}
                            </>
                          );
                        })}
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-left">
                    <img src="images/price.png" />
                    <span>Price</span>
                  </div>
                  <div className="colon">:</div>
                  <div className="info-right">
                    {course.price === 0 ? "Free" : course.price}
                  </div>
                </div>
                <button
                  className="course-stop-btn"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Kết thúc khóa học
                </button>
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

function Descriptions({ lesson }) {
  return (
    <div className="lesson-descriptions">
      <div className="description-title">{lesson.name}</div>
      <p className="description-txt">{lesson.description}</p>
      <div className="description-title">Requirements</div>
      <p className="description-txt">{lesson.requirement}</p>
      <div className="tags-container">
        <div className="tags-title">Tags:</div>
        <div className="tags">
          {tags.map((tag, i) => {
            return (
              <div key={i} className="tag">
                {tag}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Documents() {
  return (
    <div className="documents">
      <span className="program-txt">Program</span>
      {documents.map((document, i) => {
        return (
          <div className="document-row" key={i}>
            <div className="document-row-left">
              {document.type === "Lesson"
                ? lessonIcon
                : document.type === "PDF"
                ? pdfIcon
                : videoIcon}
              <span className="document-type">{document.type}</span>
              <span className="document-title">{document.title}</span>
            </div>
            <button className="preview-btn">Preview</button>
          </div>
        );
      })}
    </div>
  );
}

const lessonIcon = (
  <svg
    width="18"
    height="24"
    viewBox="0 0 18 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="document-icon"
  >
    <path
      d="M8.94942 18.0205C8.13979 18.0205 7.66772 18.7912 7.66772 19.821C7.66772 20.8591 8.1553 21.5903 8.95726 21.5903C9.76746 21.5903 10.2312 20.8196 10.2312 19.7898C10.2312 18.8381 9.77525 18.0205 8.94942 18.0205Z"
      fill="#B2D235"
    />
    <path
      d="M2.91848 18.0364C2.65098 18.0364 2.47774 18.0598 2.37573 18.0833V21.551C2.47774 21.575 2.64318 21.575 2.79242 21.575C3.8773 21.5828 4.58505 20.9849 4.58505 19.7193C4.59333 18.6182 3.94836 18.0364 2.91848 18.0364Z"
      fill="#B2D235"
    />
    <path
      d="M17.4071 5.75127C17.4057 5.6412 17.3708 5.53249 17.2952 5.44656L12.6677 0.160958C12.6668 0.159477 12.6654 0.158997 12.664 0.157646C12.6364 0.126841 12.6047 0.101438 12.5707 0.0790411C12.5606 0.0725052 12.5505 0.0666229 12.5399 0.0606534C12.51 0.0447057 12.4792 0.0314596 12.4471 0.0217864C12.4383 0.0192592 12.4305 0.0156862 12.4218 0.0134204C12.3864 0.0049673 12.3506 0 12.3138 0H0.941173C0.422308 0 0 0.422351 0 0.941217V23.0588C0 23.5779 0.422308 24 0.941173 24H16.4705C16.9898 24 17.4117 23.5779 17.4117 23.0588V5.80399C17.4117 5.7863 17.409 5.76896 17.4071 5.75127ZM4.97837 21.8262C4.42003 22.2904 3.57075 22.5105 2.5325 22.5105C1.91106 22.5105 1.4708 22.471 1.1722 22.4319V17.2265C1.61246 17.1558 2.18657 17.1162 2.79223 17.1162C3.79855 17.1162 4.45123 17.2973 4.96229 17.6824C5.51297 18.0914 5.85898 18.744 5.85898 19.6797C5.8588 20.6941 5.48944 21.3938 4.97837 21.8262ZM8.8947 22.5422C7.32211 22.5422 6.40207 21.3547 6.40207 19.8449C6.40207 18.2564 7.41644 17.0691 8.9811 17.0691C10.6088 17.0691 11.4976 18.2881 11.4976 19.7504C11.4977 21.4885 10.4439 22.5422 8.8947 22.5422ZM14.9972 21.5436C15.3589 21.5436 15.7601 21.4646 15.9958 21.3706L16.1768 22.3062C15.9567 22.4168 15.4613 22.5344 14.8165 22.5344C12.9843 22.5344 12.0408 21.394 12.0408 19.8844C12.0408 18.076 13.3304 17.0694 14.9342 17.0694C15.5555 17.0694 16.0275 17.1951 16.2398 17.3054L15.9958 18.2567C15.7524 18.1546 15.4139 18.0599 14.9895 18.0599C14.0382 18.0599 13.2986 18.6342 13.2986 19.8136C13.2987 20.875 13.9278 21.5436 14.9972 21.5436ZM0.941173 15.9804V0.941217H11.8432V5.75667C11.8432 6.01641 12.0537 6.22725 12.3138 6.22725H16.4705L16.471 15.9804H0.941173Z"
      fill="#B2D235"
    />
    <path
      d="M7.51328 6.49677H10.9378C11.1096 6.49677 11.2493 6.3573 11.2493 6.1851C11.2493 6.0129 11.1096 5.87329 10.9378 5.87329H7.51328C7.34103 5.87329 7.2019 6.0129 7.2019 6.1851C7.20169 6.3573 7.34068 6.49677 7.51328 6.49677Z"
      fill="#B2D235"
    />
    <path
      d="M12.6124 8.36694H4.09303C3.92083 8.36694 3.78101 8.50642 3.78101 8.67862C3.78101 8.85095 3.92083 8.99021 4.09303 8.99021H12.6124C12.7848 8.99021 12.9245 8.85095 12.9245 8.67862C12.9245 8.50646 12.785 8.36694 12.6124 8.36694Z"
      fill="#B2D235"
    />
    <path
      d="M4.98385 7.12126L5.27257 5.94754C5.34642 5.66262 5.39479 5.42197 5.43941 5.15539H5.44664C5.47605 5.42549 5.5205 5.66262 5.58337 5.94754L5.84289 7.12126H6.33187L7.00145 4.62598H6.53866L6.27958 5.75512C6.21296 6.05887 6.15339 6.34357 6.10921 6.61795H6.1015C6.06472 6.34763 6.01278 6.06994 5.94995 5.77373L5.70189 4.62624H5.22433L4.95444 5.75538C4.88355 6.06998 4.81279 6.36649 4.77257 6.62902H4.76568C4.72499 6.38109 4.66551 6.06249 4.60242 5.75896L4.36542 4.62624H3.88037L4.49135 7.12152H4.98385V7.12126Z"
      fill="#B2D235"
    />
    <path
      d="M12.6124 10.843H4.09303C3.92083 10.843 3.78101 10.9825 3.78101 11.1548C3.78101 11.327 3.92083 11.4665 4.09303 11.4665H12.6124C12.7848 11.4665 12.9245 11.327 12.9245 11.1548C12.9245 10.9825 12.785 10.843 12.6124 10.843Z"
      fill="#B2D235"
    />
    <path
      d="M12.6124 13.3782H4.09303C3.92083 13.3782 3.78101 13.5179 3.78101 13.6902C3.78101 13.8623 3.92083 14.0018 4.09303 14.0018H12.6124C12.7848 14.0018 12.9245 13.8623 12.9245 13.6902C12.9245 13.5179 12.785 13.3782 12.6124 13.3782Z"
      fill="#B2D235"
    />
  </svg>
);

const pdfIcon = (
  <svg
    width="19"
    height="25"
    viewBox="0 0 19 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="document-icon"
  >
    <path
      d="M8.70279 18.8225C8.40264 18.8225 8.20878 18.8491 8.09399 18.8754V22.7661C8.20901 22.7927 8.39428 22.7927 8.56168 22.7927C9.7789 22.8013 10.5731 22.1311 10.5731 20.7105C10.5817 19.4752 9.85842 18.8225 8.70279 18.8225Z"
      fill="#B2D235"
    />
    <path
      d="M3.50587 18.8049C3.23254 18.8049 3.04726 18.8313 2.94995 18.8576V20.6135C3.06483 20.6398 3.20608 20.6489 3.39943 20.6489C4.11462 20.6489 4.55552 20.287 4.55552 19.6783C4.55556 19.1314 4.17598 18.8049 3.50587 18.8049Z"
      fill="#B2D235"
    />
    <path
      d="M18.1324 5.9909C18.131 5.87625 18.0946 5.76301 18.0159 5.6735L13.1955 0.167665C13.1945 0.166121 13.1927 0.165622 13.1917 0.164215C13.1629 0.132126 13.1299 0.105664 13.0945 0.0823345C13.084 0.0755262 13.0729 0.0693988 13.0619 0.0631806C13.0313 0.0465685 12.9992 0.0327704 12.9652 0.0226942C12.9566 0.0200617 12.948 0.0163398 12.9389 0.0139796C12.9025 0.00517427 12.8647 0 12.8269 0H0.980389C0.439904 0 0 0.439949 0 0.980434V24.0196C0 24.5603 0.439904 25 0.980389 25H17.1568C17.6973 25 18.1372 24.5603 18.1372 24.0196V6.04582C18.1372 6.02739 18.1343 6.00933 18.1324 5.9909ZM5.34044 21.0544C4.88184 21.4867 4.20246 21.6811 3.4083 21.6811C3.23211 21.6811 3.07284 21.672 2.94979 21.6547V23.7807H1.61764V17.9137C2.03208 17.8433 2.61469 17.7901 3.43531 17.7901C4.26442 17.7901 4.8556 17.9491 5.25248 18.2665C5.63206 18.5666 5.88723 19.0606 5.88723 19.6427C5.88723 20.2253 5.69361 20.7193 5.34044 21.0544ZM11.0136 23.0751C10.3879 23.5954 9.43506 23.8424 8.27085 23.8424C7.57373 23.8424 7.07995 23.7984 6.74412 23.7544V17.9137C7.23826 17.8347 7.8826 17.7901 8.56174 17.7901C9.69041 17.7901 10.4228 17.9931 10.9966 18.4254C11.6143 18.8842 12.0026 19.6164 12.0026 20.6662C12.0021 21.8046 11.5875 22.5897 11.0136 23.0751ZM16.5201 18.9372H14.2347V20.2957H16.3698V21.39H14.2347V23.7807H12.8853V17.8347H16.5201V18.9372ZM0.980389 16.6463V0.980434H12.3367V5.99653C12.3367 6.26709 12.556 6.48672 12.8269 6.48672H17.1568L17.1573 16.6463H0.980389Z"
      fill="#B2D235"
    />
    <path
      d="M14.0979 10.5362C14.0692 10.5335 13.3784 10.4705 12.3181 10.4705C11.9859 10.4705 11.6513 10.4769 11.3209 10.4894C9.22704 8.91804 7.512 7.34547 6.59383 6.46416C6.61058 6.36712 6.62211 6.29042 6.62747 6.2315C6.74856 4.95314 6.61394 4.09012 6.22868 3.66638C5.97642 3.38946 5.60591 3.29733 5.21957 3.40285C4.97964 3.46572 4.53552 3.69847 4.39332 4.17228C4.23632 4.69588 4.48868 5.33136 5.15166 6.06828C5.16219 6.07945 5.38718 6.3152 5.796 6.71466C5.53029 7.98159 4.83476 10.7156 4.4973 12.0284C3.70468 12.4519 3.04428 12.9621 2.53303 13.5473L2.49953 13.5856L2.47788 13.6316C2.42523 13.7422 2.17355 14.3164 2.3625 14.7776C2.44879 14.9873 2.61046 15.1405 2.83009 15.2209L2.88896 15.2368C2.88896 15.2368 2.94207 15.2483 3.03543 15.2483C3.44438 15.2483 4.45382 15.0333 4.99526 13.0381L5.12643 12.5325C7.01635 11.6139 9.37877 11.3176 11.0911 11.235C11.9719 11.8882 12.8484 12.4882 13.6977 13.0196L13.7254 13.0357C13.7666 13.0567 14.139 13.2406 14.5752 13.241C15.1984 13.241 15.6537 12.8585 15.8231 12.1919L15.8317 12.1464C15.8791 11.7654 15.7834 11.4221 15.555 11.1536C15.074 10.5882 14.1784 10.5389 14.0979 10.5362ZM3.05068 14.5126C3.04687 14.5081 3.04505 14.5038 3.04315 14.499C3.00248 14.4011 3.05127 14.1636 3.12308 13.9896C3.43135 13.645 3.80141 13.3286 4.22842 13.0437C3.81257 14.3898 3.20782 14.5062 3.05068 14.5126ZM5.69101 5.56888C5.0524 4.858 5.06198 4.50556 5.09634 4.38692C5.15271 4.18862 5.40716 4.11368 5.40933 4.113C5.53751 4.07814 5.61531 4.085 5.68457 4.16102C5.8412 4.33309 5.97574 4.85238 5.92259 5.8049C5.77181 5.65339 5.69101 5.56888 5.69101 5.56888ZM5.36104 11.6225L5.37207 11.5803L5.37062 11.5808C5.69038 10.3284 6.15152 8.49461 6.41668 7.31665L6.42626 7.32577L6.42721 7.32014C7.28505 8.12796 8.60041 9.30956 10.1753 10.5385L10.1576 10.5392L10.1837 10.5589C8.70004 10.6842 6.92798 10.9767 5.36104 11.6225ZM15.1047 12.0333C14.9917 12.4484 14.7744 12.5052 14.5752 12.5052C14.344 12.5052 14.1214 12.4089 14.0707 12.3857C13.4924 12.0232 12.9007 11.6283 12.3037 11.2057C12.3085 11.2057 12.3128 11.2057 12.3181 11.2057C13.3415 11.2057 14.0232 11.2678 14.05 11.2697C14.2209 11.2761 14.7619 11.356 14.995 11.63C15.0864 11.7375 15.1214 11.8659 15.1047 12.0333Z"
      fill="#B2D235"
    />
  </svg>
);

const videoIcon = (
  <svg
    width="20"
    height="25"
    viewBox="0 0 20 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="document-icon"
  >
    <path
      d="M14.2199 0H0V25H19.0437V4.82388L14.2199 0ZM1.46484 23.5352V1.46484H13.1842L13.1847 5.85899L17.5789 5.85957V23.5352H1.46484ZM14.6492 2.50092L16.5428 4.39453L14.6494 4.39434L14.6492 2.50092Z"
      fill="#B2D235"
    />
    <path
      d="M8.42603 16.3097L12.0555 13.9162L8.42603 11.5225V16.3097Z"
      fill="#B2D235"
    />
    <path
      d="M9.50268 8.07056C6.27945 8.07056 3.65723 10.693 3.65723 13.9162C3.65723 17.1392 6.27945 19.7617 9.50268 19.7617C12.7259 19.7617 15.3481 17.1392 15.3481 13.9162C15.3481 10.693 12.7259 8.07056 9.50268 8.07056ZM9.50268 18.2968C7.08721 18.2968 5.12207 16.3317 5.12207 13.9162C5.12207 11.5005 7.08721 9.5354 9.50268 9.5354C11.9181 9.5354 13.8833 11.5005 13.8833 13.9162C13.8833 16.3317 11.9181 18.2968 9.50268 18.2968Z"
      fill="#B2D235"
    />
  </svg>
);
