import {useState, useEffect} from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

import axios from 'axios';
import './App.css';


function App () {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios({
      method: 'GET',
      url: '/api/todo'
    }).then((response) => {
      setTasks(response.data);
    }).catch((error) => {
      console.log('Fetching tasks Error', error);
    });
  }

  useEffect(fetchTasks, []);

  const addTask = (event) => {
    event.preventDefault();

    axios({
      method: 'POST',
      url: '/api/todo',
      data: {
        title: newTask
      }
    }).then((response) => {
      fetchTasks();
      setNewTask('');
    }).catch((error) => {
      console.log('Adding task Error', error);
    })
  }

  const deleteTask = (id) => {
    axios.delete(`/api/todo/${id}`)
    .then((response) => {
      fetchTasks();
    })
    .catch((error) => {
      console.error('Deleting task Error', error);
    })
  }

  const completeTask = (id) => {
    axios({
      method: 'PUT',
      url: `/api/todo/${id}`,
    }).then((response) => {
      fetchTasks();
    }).catch((error) => {
      console.error('Completing task Error', error);
    })
  }
  return (
    <div>
      <header>
        <h1>TO DO APP</h1>
        <h2>Hello world!</h2>
      </header>
      <main>
        <h2>Add a Task</h2>
        <form onSubmit={addTask}>
          <label htmlFor="New-task">Task: </label>
          <input id="New-task" onChange={(event) => setNewTask(event.target.value)} />
          <Button variant="outlined" color="primary" type="submit">Add Task</Button>
        </form>
        <h2>Task List</h2>
        <ul className="Task-list">
          {tasks.filter(task => task.completed === false).map((task) => {
            return (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
                {task.title}
                {task.completed ? (
                  <span> Completed </span>
                ) : (
                  <>
                    <Button variant="contained" color="success" startIcon={<DoneIcon />} onClick={() => completeTask(task.id)}>Complete</Button>
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => deleteTask(task.id)}>Delete</Button>
                  </>
                )}
              </li>
            )
          })}
          {tasks.filter(task => task.completed).map((task) => {
            return (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
                {task.title}
                {task.completed ? (
                  <span> - Completed</span>
                ) : (
                  <>
                    <Button variant="contained" color="success" startIcon={<DoneIcon />} onClick={() => completeTask(task.id)}>Complete</Button>
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => deleteTask(task.id)}>Delete</Button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
