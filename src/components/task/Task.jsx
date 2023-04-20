import { Col, Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import styles from "./task.module.css";

function Task(props) {
  const el = props.data;
  return (
    <Col xs="12" sm="6" md="4" lg="3">
      <Card className="mt-2 mb-2">
        <Card.Body>
        <Form.Check className={styles.selectTask} onClick={()=>props.onTaskSelect(el.id)}/>
          <Card.Title>{el.title}</Card.Title>
          <Card.Text>Description</Card.Text>
          <div className={styles.actionButtons}>
            <Button variant="warning">
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button variant="danger" className={styles.deleteButton} onClick={()=>{
              props.onTaskDelete(el.id)
            }}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Task;
