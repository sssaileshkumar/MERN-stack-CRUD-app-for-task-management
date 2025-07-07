import { useTaskContext } from '../hooks/useTaskContext';

const TaskDetails = ({ task }) => {
  const { dispatch } = useTaskContext();

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: 'DELETE'
    });
    const json = await res.json();
    if (res.ok) dispatch({ type: 'DELETE_TASK', payload: json });
  };

  return (
    <div className="task-details">
      <h4>{task.title}</h4>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Deadline:</strong> {task.deadline?.substring(0, 10)}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskDetails;
