import { Link, useLocation, useNavigate } from 'react-router';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState,useEffect } from 'react';
import TaskCard from '../components/TaskCard/TaskCard';
import { toast } from 'react-toastify';
import '../styles/Tasks.css';
import useAuth from '../hooks/useAuth';

const Tasks = () => {
  const { setAuth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [submitting, setSubmitting] = useState(false);


  const handleSubmit = async (e) => {
     e.preventDefault();;

    if(!title || !description) {
      toast.error('Please fill in required fields');
      return;
    }

    setSubmitting(true);

    try {
      await axiosPrivate.post('/tasks', {
        title,
        description,
      });

      toast.success('Task added successful!');

      setTitle('');
      setDescription('');
      const res = await axiosPrivate.get('/tasks?limit=5');
      setTasks(res.data);

    } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          toast.error('Session expired. Please log in again.');
          setAuth({});
          navigate('/', { state: { from: location }, replace: true });
        } else {
          console.error(err);
          toast.error('Task adding failed. Please try again.');
        }
    } finally {
      setSubmitting(false);
    }
  }

  const handleDone = (taskId, taskTitle) => {
    setTasks(prev => prev.filter((task) => task.id !== taskId));
    toast.success(`${taskTitle} Completed !`);
  }

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axiosPrivate.get('/tasks?limit=5');
        setTasks(response.data);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          toast.error('Session expired. Please log in again.');
          setAuth({});
          navigate('/', { state: { from: location }, replace: true });
        } else {
          console.error(err);
        }
      }
    }

    getTasks();
  }, [axiosPrivate, navigate, location])

  return (
    <div className="tasks-page">

      <div className='add-task'>

        <div className="add-task-main">
          <div className="form-container">
            <h2 className="form-header">Add a Task</h2>
            
            <form onSubmit={handleSubmit} className="form-body">
              <div className="form-field">
                <input type="text" placeholder="Title" 
                value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div className="form-field">
                <textarea type="text" placeholder="Description"
                value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>

              <button type="submit" className="form-button" disabled={submitting}>
                {submitting ? 'Adding...' : 'Add'}
              </button>
            </form>
          </div>

        </div>

        <hr className="vertical-line" />
      </div>

      <div className='task-main'>
        <div className='task-main-main'>
          {(tasks.length === 0) ? (
            <div className='empty-tasks'>
              <h2>No Tasks to Display</h2>
            </div>
          ) : (
            <>
              {tasks.map((task) => {
                return (
                  <TaskCard 
                    key={task.id} 
                    title={task.title} 
                    description={task.description} 
                    handleDone={() => handleDone(task.id, task.title)} />
                )
              })}
            </>
          )}
          
        </div>
      </div>


    </div>
  )
}
export default Tasks