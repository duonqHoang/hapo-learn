import { Collapse } from "react-bootstrap";
import { VscSettings } from "react-icons/vsc";
import { useRef, useState } from "react";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";
import Pagination from "../Components/Pagination";
import "./AllCourses.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCourses } from "../Store/courses-actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "../Utils/axios";

export default function AllCourses() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const coursesData = useSelector((state) => state.courses);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPage = +searchParams.get("page") || 1;
  const courses = coursesData.courses;
  const coursesCount = coursesData.totalCoursesNumber;
  const numberOfPages = parseInt(coursesCount / 14) + 1 || 1;

  useEffect(() => {
    dispatch(getCourses(searchParams));
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = searchRef.current.value;
    if (search) {
      searchParams.set("s", search);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("s");
      setSearchParams(searchParams);
    }
  };

  const handleFilter = (type, event) => {
    setSearchParams((searchParams) => {
      if (event) {
        searchParams.set(type, event.value);
      } else searchParams.delete(type);
      return searchParams;
    });
  };

  const handlePageChange = (pageNumber) => {
    searchParams.set("page", pageNumber);
    setSearchParams(searchParams);
  };

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
          <form onSubmit={handleSearch}>
            <input
              className="search-box"
              type="text"
              placeholder="Search..."
              ref={searchRef}
            />
          </form>
          <FaSearch className="search-icon" />
        </div>

        <button className="search-btn" onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>
      <Collapse in={filtersOpen}>
        <div>
          <Filters
            setSearchParams={setSearchParams}
            handleFilter={handleFilter}
          />
        </div>
      </Collapse>
      <div className="courses">
        {courses.map((course) => {
          return (
            <div key={course.id} className="course-card">
              <div className="course-info">
                <img src="images/courses/course-img/html.png" />
                <div>
                  <span className="course-name">{course.name}</span>
                  <span className="course-intro">{course.description}</span>
                </div>
              </div>
              <button
                className="more-btn"
                onClick={() => navigate(`${course.id}`)}
              >
                More
              </button>
              <div className="course-statistics">
                <div className="stat-col">
                  <span className="stat-title">Learners</span>
                  <span className="stat-number">{course.learnersCount}</span>
                </div>
                <div className="stat-col">
                  <span className="stat-title">Lessons</span>
                  <span className="stat-number">{course.lessonsCount}</span>
                </div>
                <div className="stat-col">
                  <span className="stat-title">Times</span>
                  <span className="stat-number">{course.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <Pagination.Prev
          className={currentPage === 1 ? "active" : ""}
          onClick={() =>
            currentPage > 1 ? handlePageChange(currentPage - 1) : null
          }
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
          onClick={
            currentPage < numberOfPages
              ? handlePageChange(currentPage + 1)
              : null
          }
        />
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

function Filters({ setSearchParams, handleFilter }) {
  const [teachers, setTeachers] = useState([]);

  const fetchTeacherList = async () => {
    try {
      const res = await axios.get("/teachers");
      setTeachers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTeacherList();
  }, []);

  return (
    <div className="filters">
      <span className="filters-title">Lọc theo</span>
      <div className="filters-btns">
        <button
          className="time-sort-btn"
          onClick={() =>
            setSearchParams((searchParams) => {
              searchParams.set("date", "desc");
              return searchParams;
            })
          }
        >
          Mới nhất
        </button>
        <button
          className="time-sort-btn"
          onClick={() =>
            setSearchParams((searchParams) => {
              searchParams.set("date", "asc");
              return searchParams;
            })
          }
        >
          Cũ nhất
        </button>
        <Select
          isClearable
          unstyled={true}
          styles={dropdownStyles}
          classNames={dropdownClasses}
          isSearchable={false}
          placeholder="Teacher"
          options={teachers.map((teacher) => {
            return { value: teacher.id, label: teacher.name };
          })}
          onChange={(e) => handleFilter("teacher", e)}
        />
        <Select
          isClearable
          unstyled={true}
          styles={dropdownStyles}
          classNames={dropdownClasses}
          isSearchable={false}
          placeholder="Số người học"
          options={[
            { value: "asc", label: "Tăng dần" },
            { value: "desc", label: "Giảm dần" },
          ]}
          onChange={(e) => handleFilter("learners", e)}
        />
        <Select
          isClearable
          unstyled={true}
          styles={dropdownStyles}
          classNames={dropdownClasses}
          isSearchable={false}
          placeholder="Thời gian học"
          options={[
            { value: "asc", label: "Tăng dần" },
            { value: "desc", label: "Giảm dần" },
          ]}
          onChange={(e) => handleFilter("time", e)}
        />
        <Select
          isClearable
          unstyled={true}
          styles={dropdownStyles}
          classNames={dropdownClasses}
          isSearchable={false}
          placeholder="Số bài học"
          options={[
            { value: "asc", label: "Tăng dần" },
            { value: "desc", label: "Giảm dần" },
          ]}
          onChange={(e) => handleFilter("lessons", e)}
        />
        <Select
          isClearable
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
          isClearable
          unstyled={true}
          styles={dropdownStyles}
          classNames={dropdownClasses}
          isSearchable={false}
          placeholder="Review"
          options={[
            { value: "asc", label: "Tăng dần" },
            { value: "desc", label: "Giảm dần" },
          ]}
          onChange={(e) => handleFilter("review", e)}
        />
      </div>
    </div>
  );
}
