import { useEffect } from 'react';
import { useTaskContext } from '../hooks/useTaskContext';
import TaskDetails from '../components/TaskDetails';
import TaskForm from '../components/TaskForm';

const Home = () => {
  const { tasks, dispatch } = useTaskContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/api/tasks');
      const json = await res.json();
      if (res.ok) dispatch({ type: 'SET_TASKS', payload: json });
    };

    fetchTasks();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="tasks">
        {tasks && tasks.map(task => (
          <TaskDetails key={task._id} task={task} />
        ))}
      </div>
      <TaskForm />
    </div>
  );
};

export default Home;
