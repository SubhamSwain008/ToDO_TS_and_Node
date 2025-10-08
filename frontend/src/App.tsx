import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import axios from "axios";
import type { Todo } from "./components/model";
import Listing from "./components/list";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [comTask, setComtask] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  // ✅ Fetch incomplete tasks
  async function getTasks() {
    try {
      const Tasklist = await axios.get(`${BACKEND_URL}/getlist`);
      const incompleteTask: Todo[] = Tasklist.data.filter(
        (task: Todo) => !task.isDone
      );
      setTasks(incompleteTask);
      setLoading(false);
    } catch (e) {
      console.error("Error fetching incomplete tasks:", e);
    }
  }

  // ✅ Fetch completed tasks
  async function setTask() {
    try {
      const Tasklist = await axios.get(`${BACKEND_URL}/getlist`);
      const completeTask: Todo[] = Tasklist.data.filter(
        (task: Todo) => task.isDone
      );
      setComtask(completeTask);
    } catch (e) {
      console.error("Error fetching completed tasks:", e);
    }
  }

  useEffect(() => {
    getTasks();
    setTask();

    // ✅ Handle screen resize for responsiveness
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Add new task
  const heandel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    const now = new Date();
    const dateOnly = now.toISOString().split("T")[0];

    const newTask: Todo = {
      id: Date.now(),
      task: input,
      isDone: false,
      date: dateOnly,
    };

    await axios.put(`${BACKEND_URL}/data`, newTask);
    setTasks([...tasks, newTask]);
    setInput("");
  };

  // 🌿 Inline styles with responsive adjustments
  const appContainer: React.CSSProperties = {
    backgroundColor: "#f6fff6",
    minHeight: "100vh",
    padding: isMobile ? "20px 10px" : "40px 20px",
    fontFamily: "Arial, sans-serif",
    color: "#114411",
  };

  const card: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
    padding: isMobile ? "20px" : "30px",
    maxWidth: "700px",
    margin: "0 auto",
    border: "2px solid #22aa22",
  };

  const heading: React.CSSProperties = {
    textAlign: "center",
    fontSize: isMobile ? "1.5rem" : "2rem",
    fontWeight: "bold",
    color: "#118811",
    marginBottom: "20px",
    letterSpacing: "1px",
  };

  const inputWrapper: React.CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginBottom: "25px",
  };

  const loadingStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: "40px",
    fontSize: "18px",
    color: "#118811",
  };

  return (
    <>
      {loading ? (
        <div style={loadingStyle}>Loading...</div>
      ) : (
        <div style={appContainer}>
          <div style={card}>
            <h1 style={heading}>TO DO</h1>
            <div style={inputWrapper}>
              <Input todo={input} setTodo={setInput} heandel={heandel} />
            </div>
            <Listing
              arr={tasks}
              comarr={comTask}
              arrTask={setTasks}
              setComarr={setComtask}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
