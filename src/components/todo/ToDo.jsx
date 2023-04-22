import { Component } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { idGenerator } from "../../utils/helpers";
import Task from "../task/Task";
import styles from "./todo.module.css";
import ConfirmDialog from "../ConfirmDialog";
// import Counter from "../lesson67";

class Todo extends Component {
  state = {
    tasks: [],
    newTaskTitle: "",
    selectedTasks: new Set(),
    isConfirmDialogOpen: false,
  };
  inputChange = (event) => {
    const newTaskTitle = event.target.value;
    this.setState({
      newTaskTitle,
    });
  };
  addNewTask = () => {
    const trimedTitle = this.state.newTaskTitle.trim();
    if (!trimedTitle) {
      return;
    }
    const newTask = {
      id: idGenerator(),
      title: trimedTitle,
    };
    const tasks = [...this.state.tasks];
    tasks.push(newTask);
    this.setState({ tasks, newTaskTitle: "" });
  };

  inputKeyDown = (event) => {
    if (event.code === "Enter") {
      this.addNewTask();
    }
  };

  onTaskDelete = (taskId) => {
    const newTasks = this.state.tasks.filter((el) => el.id !== taskId);
    const newState = { tasks: newTasks };
    if (this.state.selectedTasks.has(taskId)) {
      const newSelectedTasks = new Set(this.state.selectedTasks);
      newSelectedTasks.delete(taskId);
      newState.selectedTasks = newSelectedTasks;
    }
    this.setState(newState);
  };

  onTaskSelect = (taskId) => {
    const selectedTasks = new Set(this.state.selectedTasks);
    selectedTasks.has(taskId)
      ? selectedTasks.delete(taskId)
      : selectedTasks.add(taskId);
    this.setState({
      selectedTasks,
    });
  };

  deleteSelectedTasks = () => {
    const newTasks = [];
    this.state.tasks.forEach((el) => {
      if (!this.state.selectedTasks.has(el.id)) {
        newTasks.push(el);
      }
    });
    this.setState({
      tasks: newTasks,
      selectedTasks: new Set(),
      isConfirmDialogOpen: false,
    });
  };

  openConfirmDialog = () => {
    this.setState({ isConfirmDialogOpen: true });
  };
  closeConfirmDialog = () => {
    this.setState({ isConfirmDialogOpen: false });
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs="12" sm="8" md="6">
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Task title"
                onChange={this.inputChange}
                onKeyDown={this.inputKeyDown}
                value={this.state.newTaskTitle}
              />
              <Button
                variant="success"
                onClick={this.addNewTask}
                disabled={!this.state.newTaskTitle.trim()}
              >
                Add
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          {this.state.tasks.map((el) => {
            return (
              <Task
                data={el}
                key={el.id}
                onTaskDelete={this.onTaskDelete}
                onTaskSelect={this.onTaskSelect}
              />
            );
          })}
        </Row>

        <Button
          className={styles.deleteSelected}
          variant="danger"
          onClick={this.openConfirmDialog}
          disabled={!this.state.selectedTasks.size}
        >
          Delete selected
        </Button>

        {/* lesson67 */}
        {/* <Row>
          <Counter/>
        </Row> */}
        {this.state.isConfirmDialogOpen && (
          <ConfirmDialog
            tasksCount={this.state.selectedTasks.size}
            onCancel={this.closeConfirmDialog}
            onSubmit={this.deleteSelectedTasks}
          />
        )}
      </Container>
    );
  }
}

export default Todo;
