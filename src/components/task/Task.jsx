import { memo} from "react";
import PropTypes from "prop-types";
import { Col, Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faCheck,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/helpers";
import moment from "moment";
import styles from "./task.module.css";

function Task(props) {
  const el = props.data;
  const nowTime = moment(new Date()).format("YYYY-MM-DD");
  const finish = moment(el.date).format("YYYY-MM-DD");
  return (
    <Col xs="12" sm="6" md="4" lg="3">
      <Card
        className={`mt-2 mb-2 ${
          props.checked === true ? styles.blueShadow : ""
        }`}
      >
        <Card.Body
          className={`${
            el.status === "active" && nowTime > finish 
            ? styles.timedOut 
            : el.status === "active" && nowTime <= finish 
            ? styles.inProgresTask
            : styles.taskIsDone
          }`}
        >
          <Form.Check
            className={styles.selectTask}
            onChange={() => props.onTaskSelect(el._id)}
            checked={props.checked}
          />
          <Card.Title
            className={
              el.status === "active"
                ? styles.textLength
                : styles.textLengthItalic
            }
          >
            {el.title}
          </Card.Title>
          <Card.Text className={styles.textLength}>{el.description}</Card.Text>
          <Card.Text>Status: {el.status}</Card.Text>
          <Card.Text>Created at: {formatDate(el.created_at)}</Card.Text>
          <Card.Text>Deadline: {formatDate(el.date)}</Card.Text>
          <div className={styles.actionButtons}>
            {el.status === "active" ? (
              <Button
                title="Done"
                variant="success"
                onClick={() =>
                  props.onStatusChange({ status: "done", _id: el._id })
                }
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            ) : (
              <Button
                title="In progress"
                variant="info"
                onClick={() =>
                  props.onStatusChange({ status: "active", _id: el._id })
                }
              >
                <FontAwesomeIcon icon={faHistory} />
              </Button>
            )}
            <Button
              title="Edit"
              variant="warning"
              onClick={() => {
                props.onTaskEdit(el);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
              title="Delete"
              variant="danger"
              className={styles.deleteButton}
              onClick={() => {
                props.onTaskDelete(el._id);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

Task.propTypes = {
  data: PropTypes.object.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onTaskSelect: PropTypes.func.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default memo(Task);
