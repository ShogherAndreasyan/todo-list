import { useState, useEffect, memo } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { formatDate } from "../../utils/helpers";
import styles from "./taskModal.module.css";

function TaskModal(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [isTitleValid, setIsTitleValid] = useState(false);
  useEffect(() => {
    if (props.data) {
      setTitle(props.data.title);
      setDescription(props.data.description);
      setDate(props.data.date ? new Date(props.data.date) : new Date());
      setIsTitleValid(true);
    }
  }, [props]);

  const saveTask = () => {
    const newTask = {
      title: title.trim(),
      description: description.trim(),
      date: formatDate(date),
    };
    if (props.data) {
      newTask._id = props.data._id;
    }
    props.onSave(newTask);
  };
  const onTitleChange = (event) => {
    const trimedTitle = event.target.value.trim();
    setIsTitleValid(!!trimedTitle);
    setTitle(trimedTitle);
  };

  return (
    <Modal size="md" show={true} onHide={props.onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new task</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-evenly flex-column gap-1">
        <Form.Control
          className={!isTitleValid ? styles.invalid : ""}
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
        <h6>Deadline:</h6>
        <DatePicker showIcon selected={date} onChange={setDate} />
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-evenly">
        <Button
          variant="success"
          onClick={() => {
            saveTask();
            // load();
          }}
          disabled={!isTitleValid}
        >
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
  data: PropTypes.object,
};

export default memo(TaskModal);
