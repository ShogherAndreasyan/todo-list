import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Task from "../task/Task";
import styles from "./todo.module.css";
import ConfirmDialog from "../ConfirmDialog";
import TaskApi from "../../api/taskApi";
import TaskModal from "../taskModal/TaskModal";
import { ToastContainer, toast } from "react-toastify";

const taskApi = new TaskApi();

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  useEffect(() => {
    taskApi.get().then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  const inputChange = (event) => {
    // setNewTaskTitle(event.target.value);
  };
  const onAddNewTask = (newTask) => {
    taskApi
      .post(newTask)
      .then((task) => {
        const tasksNew = [...tasks];
        tasksNew.push(task);
        setTasks(tasksNew);
        setIsAddTaskModalOpen(false);
        toast.success("The task has been added");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const inputKeyDown = (event) => {
    if (event.code === "Enter") {
      onAddNewTask();
    }
  };

  const onTaskDelete = (taskId) => {
    const newTasks = tasks.filter((el) => el._id !== taskId);
    setTasks(newTasks);
    if (selectedTasks.has(taskId)) {
      const newSelectedTasks = new Set(selectedTasks);
      newSelectedTasks.delete(taskId);
      setSelectedTasks(newSelectedTasks);
    }
  };

  const onTaskSelect = (taskId) => {
    const selectedTasksNew = new Set(selectedTasks);
    selectedTasksNew.has(taskId)
      ? selectedTasksNew.delete(taskId)
      : selectedTasksNew.add(taskId);
    setSelectedTasks(selectedTasksNew);
  };

  const deleteSelectedTasks = () => {
    const newTasks = [];
    tasks.forEach((el) => {
      if (!selectedTasks.has(el._id)) {
        newTasks.push(el);
      }
    });

    setTasks(newTasks);
    setSelectedTasks(new Set());
    setIsConfirmDialogOpen(false);
  };

  const toggleConfirmDialog = () => {
    setIsConfirmDialogOpen(!isConfirmDialogOpen);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="12" sm="8" md="6">
          <Button variant="success" onClick={() => setIsAddTaskModalOpen(true)}>
            Add a new task
          </Button>
        </Col>
      </Row>
      <Row>
        {tasks.map((el) => {
          return (
            <Task
              data={el}
              key={el._id}
              onTaskDelete={onTaskDelete}
              onTaskSelect={onTaskSelect}
            />
          );
        })}
      </Row>

      <Button
        className={styles.deleteSelected}
        variant="danger"
        onClick={toggleConfirmDialog}
        disabled={!selectedTasks.size}
      >
        Delete selected
      </Button>

      {isConfirmDialogOpen && (
        <ConfirmDialog
          tasksCount={selectedTasks.size}
          onCancel={toggleConfirmDialog}
          onSubmit={deleteSelectedTasks}
        />
      )}
      {isAddTaskModalOpen && (
        <TaskModal
          onCancel={() => setIsAddTaskModalOpen(false)}
          onSave={onAddNewTask}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  );
}

export default Todo;
