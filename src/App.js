import React, { useState } from "react";
import Weather from './Components/Weather';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {

  
  const [toDo, setTodo] = useState([
    { id: 1, title: "Learn React", status: false },
    { id: 2, title: "Learn Redux", status: false },
  ]);

  const [newTask, setNewtask] = useState("");
  const [updateTask, setUpdatetask] = useState("");

  //functions

  const saveToLocalStorage = (items) => {
    localStorage.setItem("toDo", JSON.stringify(items));
  };

  const getFromLocalStorage = () => {
    const list = localStorage.getItem("toDo");
    if (list) {
      return JSON.parse(localStorage.getItem("toDo"));
    } else {
      return [];
    }
  };

  React.useEffect(() => {
    setTodo(getFromLocalStorage());
  }, []);

  const addTask = () => {
    if (newTask) {
      const newTaskObj = {
        id: Date.now(),
        title: newTask,
        completed: false,
      };
      setTodo([...toDo, newTaskObj]);
      setNewtask("");

      saveToLocalStorage([...toDo, newTaskObj]);
    }
  };

  const deleteTask = (id) => {
    const newTasks = toDo.filter((task) => task.id !== id);
    setTodo(newTasks);
    saveToLocalStorage(newTasks);
  };

  const completeTask = (id) => {
    const newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setTodo(newTask);
  };

  const cancelUpdate = () => {
    setUpdatetask("");
  };

  const changenewTask = (e) => {
    let newEntry = {
      id: updateTask.id,
      title: e.target.value,
      status: updateTask.status ? true : false,
    };
    setUpdatetask(newEntry);
  };

  const updatenewTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateTask.id);
    let updatedObject = [...filterRecords, updateTask];
    setTodo(updatedObject);
    setUpdatetask("");
  };

  return (
    <div className="container App">
      <br></br>
      <Weather />
      <h2>ToDo App</h2>
      <br></br>

      {updateTask && updateTask ? (
        <>
          <div className="row">
            <div className="col">
              <input
                value={updateTask && updateTask.title}
                onChange={(e) => changenewTask(e)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-lg btn-success"
                onClick={updatenewTask}
              >
                Update
              </button>
              <button className="btn btn-lg btn-warning" onClick={cancelUpdate}>
                Cancel
              </button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          <form className="row" onSubmit={addTask} >
            <div className="col">
              <input
                value={newTask}
                onChange={(e) => setNewtask(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-lg btn-success" onClick={addTask}>
                Add Task
              </button>
            </div>
          </form>
          <br />
        </>
      )}

      {toDo && toDo.length ? "" : "No tasks available"}

      {toDo &&
        toDo.map((task, index) => {
          return (
            <React.Fragment key={task.id}>
              <div className="col taskBg">
                <div className={task.status ? "done" : ""}>
                  <span className="taskNum">{index + 1}</span>
                  <span className="taskName">{task.title}</span>
                </div>
                <div className="icon">
                  <span
                    title="Make as done"
                    onClick={() => completeTask(task.id)}
                  >
                    <FontAwesomeIcon icon={faSquareCheck} />
                  </span>
                  {task.status ? null : (
                    <span
                      title="Edit"
                      onClick={() =>
                        setUpdatetask({
                          id: task.id,
                          title: task.title,
                          satus: task.status ? true : false,
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  )}

                  <span title="Delete" onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default App;
