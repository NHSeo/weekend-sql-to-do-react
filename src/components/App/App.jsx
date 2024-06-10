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
    });
  }


  return (
    <div>
      <h1>TO DO APP</h1>
      <h2>Hello world!</h2>
    </div>
  );

}

export default App
