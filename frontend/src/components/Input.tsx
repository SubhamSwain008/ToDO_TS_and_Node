import React, { useRef, useState, useEffect } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  heandel: (e: React.FormEvent) => void;
}

const Input = ({ todo, setTodo, heandel }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "center",
    alignItems: "center",
    gap: isMobile ? "10px" : "15px",
    width: "100%",
  };

  const inputStyle: React.CSSProperties = {
    padding: isMobile ? "10px" : "12px 16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: isMobile ? "14px" : "16px",
    width: isMobile ? "90%" : "250px",
    transition: "border-color 0.3s ease",
  };

  const buttonStyle: React.CSSProperties = {
    padding: isMobile ? "10px" : "10px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    width: isMobile ? "90%" : "auto",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <form
        onSubmit={(e) => {
          heandel(e);
          inputRef.current?.blur();
        }}
        style={formStyle}
      >
        <input
          type="text"
          placeholder="Enter task"
          ref={inputRef}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default Input;
