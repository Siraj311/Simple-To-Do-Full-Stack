import './TaskCard.css';

const TaskCard = ({ title, description, handleDone }) => {
  return (
    <div className="note-card">
      <h3 className="note-title">{title}</h3>
      <p className="note-text">{description}</p>
      <button className="note-button" onClick={handleDone}>Done</button>
    </div>
  )
}
export default TaskCard