import { useState, useEffect } from "react";
import "./AddCourse.scss";
import { Form } from "react-bootstrap";
import axios from "../Utils/axios";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [validated, setValidated] = useState(false);

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
            time: form.time.value,
            image: file,
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
          <Form.Control name="price" type="number" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Time</Form.Label>
          <Form.Control name="time" type="number" required />
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
        {file && <img className="preview" src={preview} />}
        <button className="submit-course-btn" type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
}
