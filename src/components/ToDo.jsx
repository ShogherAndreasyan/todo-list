import { Component } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { idGenerator } from "../utils/helpers";
import Task from "./Task";

class Todo extends Component {
  state = {
    tasks: [],
    newTaskTitle: "",
  };
  inputChange = (event) => {
    const newTaskTitle = event.target.value;
    this.setState({
      newTaskTitle,
    });
  };
  addNewTask = () => {
    const trimedTitle = this.state.newTaskTitle.trim();
    if(!trimedTitle){
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

  inputKeyDown = (event)=>{
    if(event.code === 'Enter'){
        this.addNewTask();
    }
  }
  render() {
    const isAddNewTaskButtonDisabled = !this.state.newTaskTitle.trim();
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
              <Button variant="success" onClick={this.addNewTask} disabled={isAddNewTaskButtonDisabled}>
                Add
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          {this.state.tasks.map((el) => {
            return (<Task data={el} key={el.id}/>);
          })}
        </Row>
      </Container>
    );
  }
}

export default Todo;
