import React from "react";
import type { Todo } from "./model";
import axios from "axios";

// ✅ Backend URL from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ;

interface Props {
  arr: Todo[];
  comarr: Todo[];
  arrTask: React.Dispatch<React.SetStateAction<Todo[]>>;
  setComarr: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Listing = ({ arr, comarr, arrTask, setComarr }: Props) => {
  // ✅ Mark task as done
  const handleMarkDone = async (task: Todo) => {
    try {
      setComarr(prev => [...prev, { ...task, isDone: true }]);
      arrTask(prev => prev.filter(ele => ele.id !== task.id));

      const res = await axios.put(`${BACKEND_URL}/markdone`, { id: task.id });
      console.log("Marked done:", res.data);
    } catch (e) {
      console.error("Error marking done:", e);
    }
  };

  // ✅ Delete task
  const handleDelete = async (task: Todo, completed = false) => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/delete`, {
        data: { id: task.id },
      });
      console.log("Deleted:", res.data);

      if (completed) {
        setComarr(prev => prev.filter(ele => ele.id !== task.id));
      } else {
        arrTask(prev => prev.filter(ele => ele.id !== task.id));
      }
    } catch (e) {
      console.error("Error deleting task:", e);
    }
  };

  // 🌿 Common styles (matches App.tsx theme)
  const containerStyle: React.CSSProperties = {
    backgroundColor: "#f6fff6",
    padding: "25px 20px",
    borderRadius: "12px",
    width: "85%",
    margin: "30px auto",
    fontFamily: "Arial, sans-serif",
  };

  const sectionTitle: React.CSSProperties = {
    color: "#116611",
    fontWeight: "bold",
    marginBottom: "15px",
    fontSize: "20px",
    borderBottom: "2px solid #22aa22",
    paddingBottom: "5px",
  };

  const listItem: React.CSSProperties = {
    listStyleType: "none",
    marginBottom: "12px",
  };

  const taskCard: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    border: "2px solid #22aa22",
    padding: "12px 18px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    gap: "15px",
    transition: "transform 0.1s ease-in-out",
  };

  const completedCard: React.CSSProperties = {
    ...taskCard,
    backgroundColor: "#dcfcdc",
    border: "2px solid #118811",
    textDecoration: "line-through",
  };

  const taskText: React.CSSProperties = {
    flex: 2,
    fontWeight: 500,
    color: "#114411",
    wordBreak: "break-word",
  };

  const dateText: React.CSSProperties = {
    flex: 1,
    color: "#444",
    fontSize: "0.9rem",
    textAlign: "right",
    whiteSpace: "nowrap",
  };

  const buttonContainer: React.CSSProperties = {
    flexShrink: 0,
    display: "flex",
    gap: "10px",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#22aa22",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.2s ease-in-out",
  };

  const deleteButton: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#ff5555",
  };

  return (
    <div style={containerStyle}>
      {/* Incomplete Tasks */}
      <div style={sectionTitle}>Pending Tasks</div>
      <ol style={{ padding: 0 }}>
        {arr.length > 0 ? (
          arr.map(val => (
            <li key={val.id} style={listItem}>
              <div style={taskCard}>
                <div style={taskText}>{val.task}</div>
                <div style={dateText}>{val.date}</div>
                <div style={buttonContainer}>
                  <button
                    style={buttonStyle}
                    onClick={() => handleMarkDone(val)}
                  >
                    Mark Done
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div style={{ color: "#666", textAlign: "center", marginTop: "10px" }}>
            No pending tasks 🎯
          </div>
        )}
      </ol>

      {/* Completed Tasks */}
      <div style={{ ...sectionTitle, marginTop: "30px" }}>Completed Tasks</div>
      <ol style={{ padding: 0 }}>
        {comarr.length > 0 ? (
          comarr.map(val => (
            <li key={val.id} style={listItem}>
              <div style={completedCard}>
                <div style={taskText}>{val.task}</div>
                <div style={dateText}>{val.date}</div>
                <div style={buttonContainer}>
                  <button
                    style={deleteButton}
                    onClick={() => handleDelete(val, true)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div style={{ color: "#666", textAlign: "center", marginTop: "10px" }}>
            No completed tasks yet ✅
          </div>
        )}
      </ol>
    </div>
  );
};

export default Listing;
