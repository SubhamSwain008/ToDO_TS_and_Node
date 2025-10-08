import React, { useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  heandel: (e: React.FormEvent) => void;
}

const Input = ({ todo, setTodo, heandel }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const formStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 0",
    gap: "10px",
  };

  const inputStyle: React.CSSProperties = {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "16px",
    width: "250px",
    transition: "border-color 0.3s ease",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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
