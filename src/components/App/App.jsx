import {useState, useEffect} from 'react';
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
          <button type="submit">Add Task</button>
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
                    <button onClick={() => completeTask(task.id)}>Complete</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
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
                    <button onClick={() => completeTask(task.id)}>Complete</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
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
