import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import "./App.css";
function App() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodo, setTodo] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newPriority, setNewPriority] = useState("");

    const handleAddTodo = () => {
        let newTodoItem = {
            title: newTitle,
            priority: newPriority,
        };

        let updateTodoArr = [...allTodo];
        updateTodoArr.push(newTodoItem);
        setTodo(updateTodoArr);
        localStorage.setItem("todoList", JSON.stringify(updateTodoArr));
    };

    useEffect(() => {
        let saveTodo = JSON.parse(localStorage.getItem("todoList"));
        if (saveTodo) {
            setTodo(saveTodo);
        }
    }, []);

    const priorityColors = {
        High: "green",
        Medium: "darkBlue",
        Low: "red",
    };

    return (
        <div className="App">
            <h1> My Todo</h1>

            <div className="todo-wrapper">
                <div className="todo-input">
                    <div className="todo-input-item">
                        <label htmlFor="Title">Task</label>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="What's the title?"
                        />
                    </div>
                    <div className="todo-input-item">
                        <label htmlFor="priority">Priority</label>
                        <select
                            className=""
                            name="priority"
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value)}
                        >
                            <option>Select</option>
                            <option value="High">High</option>
                            <option value="Medium">medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="todo-input-item">
                        <button type="button" className="primaryBtn" onClick={handleAddTodo}>
                            Add
                        </button>
                    </div>
                </div>
                <div className="btn-area">
                    <button
                        type="button"
                        className={`secondaryBtn ${isCompleteScreen === false && "active"} }`}
                        onClick={() => setIsCompleteScreen(false)}
                    >
                        Todo
                    </button>
                    <button
                        type="button"
                        className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
                        onClick={() => setIsCompleteScreen(true)}
                    >
                        Completed
                    </button>
                </div>
                <div className="todo-list">
                    {allTodo.map((item, index) => {
                        return (
                            <div className="todo-list-item" key={index}>
                                <h3>{item.title}</h3>
                                <p style={{ color: `${priorityColors[item.priority]}` }}>
                                    {item.priority}
                                </p>

                                <div>
                                    <AiOutlineDelete className="icon" />
                                    <BsCheckLg className="check-icon" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default App;
