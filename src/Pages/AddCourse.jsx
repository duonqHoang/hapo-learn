import { useState, useEffect, useRef } from "react";
import "./AddCourse.scss";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import axios from "../Utils/axios";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function AddCourse() {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [validated, setValidated] = useState(false);
  const [lessons, setLessons] = useState([]);

  const lessonNameRef = useRef();
  const lessonTimeRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

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
    if (name && time) {
      setLessons([...lessons, { name, time }]);
      lessonNameRef.current.value = "";
      lessonTimeRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        const res = await axios.post(
          "/courses",
          {
            name: form.name.value,
            description: form.description.value,
            price: form.price.value,
            image: file,
            lessons: JSON.stringify(lessons),
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        const newCourse = res.data;
        navigate("/courses/" + newCourse.id);
      } catch (err) {
        console.log(err);
      }
    }

    setValidated(true);
  };

  return (
    <div className="add-course-page">
      <div className="section-title">
        <div className="section-title-txt">Add new course</div>
        <div className="title-underline">
          <div className="green-hr-line" />
          <div className="green-hr-line" />
        </div>
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" as="textarea" rows={3} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" type="number" min="0" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            name="image"
            type="file"
            onChange={onSelectFile}
            required
          />
        </Form.Group>
        {file && <img className="preview" alt="course preview" src={preview} />}
        <Form.Group>
          <Form.Label>Lessons</Form.Label>
          <ListGroup numbered>
            {lessons.map((lesson) => {
              return (
                <ListGroup.Item>
                  <div style={{ display: "inline-block" }}>{lesson.name}</div>
                  <div style={{ display: "inline-block", float: "right" }}>
                    Time: {lesson.time}h
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
            placeholder="Time"
            min="0.1"
          />
          <Button
            variant="light"
            className="add-lesson-btn"
            onClick={addLesson}
          >
            <FaPlus />
          </Button>
        </InputGroup>
        <button className="submit-course-btn" type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
}
