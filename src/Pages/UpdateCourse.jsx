import "./UpdateCourse.scss";
import {
  Button,
  CloseButton,
  Form,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import axios from "../Utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

export default function UpdateCourse() {
  const [course, setCourse] = useState({});
  const [validated, setValidated] = useState(false);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [lessons, setLessons] = useState([]);

  const lessonNameRef = useRef();
  const lessonTimeRef = useRef();
  const params = useParams();
  const navigate = useNavigate();

  const fetchCourseData = async () => {
    try {
      const res = await axios.get("/courses/" + params.courseID);
      setCourse(res.data);
      setPreview(`http://localhost:8080/images/${res.data.image}`);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLessons = async () => {
    try {
      const res = await axios.get("/lessons?courseID=" + params.courseID);
      setLessons(res.data.lessons);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    fetchCourseData();
    fetchLessons();
  }, []);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined);
      return;
    }
    setFile(e.target.files[0]);
  };

  const addLesson = () => {
    const name = lessonNameRef.current.value;
    const time = lessonTimeRef.current.value;
    if (name && time && time > 0) {
      setLessons([...lessons, { name, time }]);
      lessonNameRef.current.value = "";
      lessonTimeRef.current.value = "";
    }
  };

  const deleteLesson = (lesson) => {
    setLessons(lessons.filter((item) => item !== lesson));
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        await axios.put(
          "/courses/" + params.courseID,
          {
            name: form.name.value,
            description: form.description.value,
            price: form.price.value,
            image: file || null,
            lessons: JSON.stringify(lessons),
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        navigate("/courses/" + params.courseID);
      } catch (err) {
        console.log(err);
      }
    }

    setValidated(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/courses/" + params.courseID);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="update-course-page">
      <div className="section-title">
        <div className="section-title-txt">Update course</div>
        <div className="title-underline">
          <div className="green-hr-line" />
          <div className="green-hr-line" />
        </div>
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" defaultValue={course.name} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows={3}
            defaultValue={course.description}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            min="0"
            defaultValue={course.price}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control name="image" type="file" onChange={onSelectFile} />
        </Form.Group>
        <img className="preview" alt="course preview" src={preview} />
        <Form.Group>
          <Form.Label>Lessons</Form.Label>
          <ListGroup numbered>
            {lessons.map((lesson) => {
              return (
                <ListGroup.Item>
                  <div style={{ display: "inline-block" }}>{lesson.name}</div>
                  <div style={{ display: "inline-block", float: "right" }}>
                    Time: {lesson.time}h
                    <CloseButton
                      style={{
                        verticalAlign: "middle",
                        marginLeft: "190px",
                      }}
                      onClick={() => deleteLesson(lesson)}
                    />
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Form.Group>
        <InputGroup
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            marginTop: "10px",
          }}
        >
          <Form.Control
            ref={lessonNameRef}
            name="lessonName"
            placeholder="Lesson name"
            style={{ width: "55%" }}
          />
          <Form.Control
            ref={lessonTimeRef}
            name="lessonTime"
            type="number"
            step="0.1"
            min="0.1"
            placeholder="Time"
          />
          <Button
            variant="light"
            className="add-lesson-btn"
            onClick={addLesson}
          >
            <FaPlus />
          </Button>
        </InputGroup>
        <div className="btns">
          <Button
            variant="danger"
            className="delete-course-btn"
            onClick={handleDelete}
          >
            Delete course
          </Button>
          <button className="update-course-btn" type="submit">
            Save changes
          </button>
        </div>
      </Form>
    </div>
  );
}
