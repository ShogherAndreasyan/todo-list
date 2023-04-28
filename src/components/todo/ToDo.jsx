import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col, Button } from "react-bootstrap";
import Task from "../task/Task";
import ConfirmDialog from "../ConfirmDialog";
import DeleteSelected from "../deleteSelected/DeleteSelected";
import TaskApi from "../../api/taskApi";
import TaskModal from "../taskModal/TaskModal";
import NavBar from "../navbar/NavBar";
import Filters from "../filters/Filters";
import styles from "./todo.module.css";

const taskApi = new TaskApi();

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const getTasks = (filters) => {
    taskApi
      .get(filters)
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

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

  const onTaskDelete = (taskId) => {
    taskApi
      .delete(taskId)
      .then(() => {
        const newTasks = tasks.filter((el) => el._id !== taskId);
        setTasks(newTasks);
        if (selectedTasks.has(taskId)) {
          const newSelectedTasks = new Set(selectedTasks);
          newSelectedTasks.delete(taskId);
          setSelectedTasks(newSelectedTasks);
        }

        toast.success("The task has been deleted");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onTaskSelect = (taskId) => {
    const selectedTasksNew = new Set(selectedTasks);
    selectedTasksNew.has(taskId)
      ? selectedTasksNew.delete(taskId)
      : selectedTasksNew.add(taskId);
    setSelectedTasks(selectedTasksNew);
  };

  const deleteSelectedTasks = () => {
    taskApi
      .deleteSome([...selectedTasks])
      .then(() => {
        const deletedTasksCount = selectedTasks.size;
        const newTasks = [];
        tasks.forEach((el) => {
          if (!selectedTasks.has(el._id)) {
            newTasks.push(el);
          }
        });

        setTasks(newTasks);
        setSelectedTasks(new Set());
        toast.success(`${deletedTasksCount} tasks have been deleted`);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const resetSelectedTasks = () => {
    setSelectedTasks(new Set());
  };

  const selectAllTasks = () => {
    const taskIds = tasks.map((el) => el._id);
    setSelectedTasks(new Set(taskIds));
  };

  const onEdit = (editTask) => {
    taskApi
      .update(editTask)
      .then((task) => {
        const newTasks = [...tasks];
        const foundIndex = newTasks.findIndex((elem) => elem._id === task._id);
        newTasks[foundIndex] = task;
        setTasks(newTasks);
        toast.success(`The tasks has been updated`);
        setEditTask(null);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onFilter = (filters) => {
    getTasks(filters);
  };

  return (
    <Container>
      <NavBar />
      <Row className={`justify-content-center ${styles.buttons}`}>
        <Col xs="6" sm="4" md="3">
          <Button variant="success" onClick={() => setIsAddTaskModalOpen(true)}>
            Add a new task
          </Button>
        </Col>
        <Col xs="6" sm="4" md="3">
          <Button variant="warning" onClick={selectAllTasks}>
            Select all
          </Button>
        </Col>
        <Col xs="6" sm="4" md="3">
          <Button variant="secondary" onClick={resetSelectedTasks}>
            Reset
          </Button>
        </Col>
      </Row>
      <Filters onFilter={onFilter} />
      <Row>
        {tasks.map((el) => {
          return (
            <Task
              data={el}
              key={el._id}
              onTaskDelete={setTaskToDelete}
              onTaskSelect={onTaskSelect}
              checked={selectedTasks.has(el._id)}
              onTaskEdit={setEditTask}
              onStatusChange={onEdit}
            />
          );
        })}
      </Row>
      <DeleteSelected
        disabled={!selectedTasks.size}
        tasksCount={selectedTasks.size}
        onSubmit={deleteSelectedTasks}
      />

      {taskToDelete && (
        <ConfirmDialog
          tasksCount={1}
          onCancel={() => setTaskToDelete(null)}
          onSubmit={() => {
            onTaskDelete(taskToDelete);
            setTaskToDelete(null);
          }}
        />
      )}

       {isAddTaskModalOpen && (
        <TaskModal
          onCancel={() => setIsAddTaskModalOpen(false)}
          onSave={onAddNewTask}
        />
      )}

       {editTask && (
        <TaskModal
          onCancel={() => setEditTask(null)}
          onSave={onEdit}
          data={editTask}
        />
      )}
      <ToastContainer
        position="bottom-left"
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
