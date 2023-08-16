import { Collapse } from "react-bootstrap";
import { VscSettings } from "react-icons/vsc";
import { useState } from "react";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";
import PageControl from "../Components/PageControl";

import "./AllCourses.scss";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    name: "HTML Fundamentals",
    img: "images/courses/course-img/html.png",
    intro:
      "Practice during lessons, practice between lessons, practice whenever you can. Master the task, then reinforce and test your knowledge with fun, hands-on exercises and interactive quizzes.",
    learners: 16882,
    lessons: 2689,
    time: 100,
  },
  {
    name: "HTML Fundamentals",
    img: "images/courses/course-img/html.png",
    intro:
      "Practice during lessons, practice between lessons, practice whenever you can. Master the task, then reinforce and test your knowledge with fun, hands-on exercises and interactive quizzes.",
    learners: 16882,
    lessons: 2689,
    time: 100,
  },
  {
    name: "HTML Fundamentals",
    img: "images/courses/course-img/html.png",
    intro:
      "Practice during lessons, practice between lessons, practice whenever you can. Master the task, then reinforce and test your knowledge with fun, hands-on exercises and interactive quizzes.",
    learners: 16882,
    lessons: 2689,
    time: 100,
  },
  {
    name: "HTML Fundamentals",
    img: "images/courses/course-img/html.png",
    intro:
      "Practice during lessons, practice between lessons, practice whenever you can. Master the task, then reinforce and test your knowledge with fun, hands-on exercises and interactive quizzes.",
    learners: 16882,
    lessons: 2689,
    time: 100,
  },
  {
    name: "HTML Fundamentals",
    img: "images/courses/course-img/html.png",
    intro:
      "Practice during lessons, practice between lessons, practice whenever you can. Master the task, then reinforce and test your knowledge with fun, hands-on exercises and interactive quizzes.",
    learners: 16882,
    lessons: 2689,
    time: 100,
  },
  {
    name: "HTML Fundamentals",
    img: "images/courses/course-img/html.png",
    intro:
      "Practice during lessons, practice between lessons, practice whenever you can. Master the task, then reinforce and test your knowledge with fun, hands-on exercises and interactive quizzes.",
    learners: 16882,
    lessons: 2689,
    time: 100,
  },
  {
    name: "HTML Fundamentals",
    img: "images/courses/course-img/html.png",
    intro:
      "Practice during lessons, practice between lessons, practice whenever you can. Master the task, then reinforce and test your knowledge with fun, hands-on exercises and interactive quizzes.",
    learners: 16882,
    lessons: 2689,
    time: 100,
  },
  {
    name: "HTML Fundamentals",
    img: "images/courses/course-img/html.png",
    intro:
      "Practice during lessons, practice between lessons, practice whenever you can. Master the task, then reinforce and test your knowledge with fun, hands-on exercises and interactive quizzes.",
    learners: 16882,
    lessons: 2689,
    time: 100,
  },
  {
    name: "HTML Fundamentals",
    img: "images/courses/course-img/html.png",
    intro:
      "Practice during lessons, practice between lessons, practice whenever you can. Master the task, then reinforce and test your knowledge with fun, hands-on exercises and interactive quizzes.",
    learners: 16882,
    lessons: 2689,
    time: 100,
  },
  {
    name: "HTML Fundamentals",
    img: "images/courses/course-img/html.png",
    intro:
      "Practice during lessons, practice between lessons, practice whenever you can. Master the task, then reinforce and test your knowledge with fun, hands-on exercises and interactive quizzes.",
    learners: 16882,
    lessons: 2689,
    time: 100,
  },
  {
    name: "HTML Fundamentals",
    img: "images/courses/course-img/html.png",
    intro:
      "Practice during lessons, practice between lessons, practice whenever you can. Master the task, then reinforce and test your knowledge with fun, hands-on exercises and interactive quizzes.",
    learners: 16882,
    lessons: 2689,
    time: 100,
  },
  {
    name: "HTML Fundamentals",
    img: "images/courses/course-img/html.png",
    intro:
      "Practice during lessons, practice between lessons, practice whenever you can. Master the task, then reinforce and test your knowledge with fun, hands-on exercises and interactive quizzes.",
    learners: 16882,
    lessons: 2689,
    time: 100,
  },
  {
    name: "HTML Fundamentals",
    img: "images/courses/course-img/html.png",
    intro:
      "Practice during lessons, practice between lessons, practice whenever you can. Master the task, then reinforce and test your knowledge with fun, hands-on exercises and interactive quizzes.",
    learners: 16882,
    lessons: 2689,
    time: 100,
  },
  {
    name: "HTML Fundamentals",
    img: "images/courses/course-img/html.png",
    intro:
      "Practice during lessons, practice between lessons, practice whenever you can. Master the task, then reinforce and test your knowledge with fun, hands-on exercises and interactive quizzes.",
    learners: 16882,
    lessons: 2689,
    time: 100,
  },
];

export default function AllCourses() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const numberOfPages = parseInt(courses.length / 14) + 1;
  const navigate = useNavigate();

  return (
    <div className="all-courses-page">
      <div className="top-bar">
        <button
          className="filter-toggle"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <VscSettings
            style={{
              rotate: "90deg",
              position: "relative",
              bottom: "1px",
              marginRight: "5px",
            }}
          />
          Filter
        </button>
        <div style={{ position: "relative" }}>
          <input className="search-box" type="text" placeholder="Search..." />
          <FaSearch className="search-icon" />
        </div>

        <button className="search-btn">Tìm kiếm</button>
      </div>
      <Collapse in={filtersOpen}>
        <div>
          <Filters />
        </div>
      </Collapse>
      <div className="courses">
        {courses.map((course, i) => {
          return (
            <div key={i} className="course-card">
              <div className="course-info">
                <img src={course.img} />
                <div>
                  <span className="course-name">{course.name}</span>
                  <span className="course-intro">{course.intro}</span>
                </div>
              </div>
              <button className="more-btn" onClick={() => navigate(`${i}`)}>
                More
              </button>
              <div className="course-statistics">
                <div className="stat-col">
                  <span className="stat-title">Learners</span>
                  <span className="stat-number">{course.learners}</span>
                </div>
                <div className="stat-col">
                  <span className="stat-title">Lessons</span>
                  <span className="stat-number">{course.lessons}</span>
                </div>
                <div className="stat-col">
                  <span className="stat-title">Times</span>
                  <span className="stat-number">{course.time}</span>
                </div>
              </div>
            </div>
          );
        })}
        <PageControl />
      </div>
    </div>
  );
}

const dropdownClasses = {
  control: () => "dropdown-box",
  option: () => "dropdown-option",
};

const dropdownStyles = {
  menu: (base) => ({
    ...base,
    border: "1px solid #E5E6E7",
  }),
};

function Filters() {
  return (
    <div className="filters">
      <span className="filters-title">Lọc theo</span>
      <div className="filters-btns">
        <button className="time-sort-btn">Mới nhất</button>
        <button className="time-sort-btn">Cũ nhất</button>
        <Select
          unstyled={true}
          styles={dropdownStyles}
          classNames={dropdownClasses}
          isSearchable={false}
          placeholder="Teacher"
          options={[
            { value: "test", label: "test" },
            { value: "test", label: "test" },
          ]}
        />
        <Select
          unstyled={true}
          styles={dropdownStyles}
          classNames={dropdownClasses}
          isSearchable={false}
          placeholder="Số người học"
          options={[
            { value: "ascending", label: "Tăng dần" },
            { value: "descending", label: "Giảm dần" },
          ]}
        />
        <Select
          unstyled={true}
          styles={dropdownStyles}
          classNames={dropdownClasses}
          isSearchable={false}
          placeholder="Thời gian học"
          options={[
            { value: "ascending", label: "Tăng dần" },
            { value: "descending", label: "Giảm dần" },
          ]}
        />
        <Select
          unstyled={true}
          styles={dropdownStyles}
          classNames={dropdownClasses}
          isSearchable={false}
          placeholder="Số bài học"
          options={[
            { value: "ascending", label: "Tăng dần" },
            { value: "descending", label: "Giảm dần" },
          ]}
        />
        <Select
          unstyled={true}
          styles={dropdownStyles}
          classNames={dropdownClasses}
          isSearchable={false}
          placeholder="Tags"
          options={[
            { value: "test", label: "test" },
            { value: "test", label: "test" },
          ]}
        />
        <Select
          unstyled={true}
          styles={dropdownStyles}
          classNames={dropdownClasses}
          isSearchable={false}
          placeholder="Review"
          options={[
            { value: "test", label: "test" },
            { value: "test", label: "test" },
          ]}
        />
      </div>
    </div>
  );
}
