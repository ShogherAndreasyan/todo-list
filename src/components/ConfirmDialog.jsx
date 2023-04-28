import { Modal, Button } from "react-bootstrap";

function ConfirmDialog(props) {
  return (
    <Modal size="sm" show={true} onHide={props.onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.tasksCount > 1
            ? `Are you sure to delete ${props.tasksCount} tasks`
            : "Are you sure to delete this task"}
          ?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-evenly">
        <Button variant="danger" onClick={props.onSubmit}>
          Delete
        </Button>
        <Button variant="success" onClick={props.onCancel}>
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmDialog;
