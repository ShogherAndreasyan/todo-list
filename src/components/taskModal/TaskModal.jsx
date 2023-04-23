import { useState, useEffect } from "react";
import { Button, Modal, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import styles from "./taskModal.module.css";

function TaskModal(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [isTatleValid, setIsTatleValid] = useState(false);
  const saveTask = () => {
    const newTask = {
        title: title.trim(),
        description: description.trim(),
        date: date.toISOString().slice(0, 10),
    };
    props.onSave(newTask);
  };
  const onTitleChange = (event) => {
    const trimedTitle = event.target.value.trim();
    setIsTatleValid(!!trimedTitle);
    setTitle(trimedTitle);
  };
  return (
    <Modal size="md" show={true} onHide={props.onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new task</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-evenly flex-column gap-1">
        <Form.Control
          className={!isTatleValid ? styles.invalid : ""}
          placeholder="Title"
          value={title}
          onChange={onTitleChange}
        />
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        {/* <Row className="d-flex"> */}
        <h6>Deadline:</h6>
        <DatePicker showIcon selected={date} onChange={setDate} />
        {/* </Row> */}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-evenly">
        <Button variant="success" onClick={saveTask} disabled={!isTatleValid}>
          Save
        </Button>
        <Button variant="danger" onClick={props.onCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

TaskModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default TaskModal;
