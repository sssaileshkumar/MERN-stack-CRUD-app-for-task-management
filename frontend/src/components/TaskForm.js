import { useState } from 'react';
import { useTaskContext } from '../hooks/useTaskContext';

const TaskForm = () => {
  const { dispatch } = useTaskContext();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { title, priority, deadline };

    const res = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { 'Content-Type': 'application/json' }
    });

    const json = await res.json();
    if (res.ok) {
      setTitle('');
      setPriority('Normal');
      setDeadline('');
      dispatch({ type: 'ADD_TASK', payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create">
      <h3>Add a New Task</h3>

      <label>Title:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Priority:</label>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Normal</option>
        <option>High</option>
      </select>

      <label>Deadline:</label>
      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />

      <button>Add Task</button>
    </form>
  );
};

export default TaskForm;
