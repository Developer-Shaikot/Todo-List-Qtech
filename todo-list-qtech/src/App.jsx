import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import "./App.css";
function App() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodo, setTodo] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newPriority, setNewPriority] = useState("");
    const [CompletedTodo, setCompletedTodo] = useState([]);
    const [completedCount, setCompletedCount] = useState(0);

    const handleAddTodo = () => {
        if (!newTitle.trim() || !newPriority.trim()) {
            alert("Please enter a title and select a priority before adding a task.");
            return;
        }

        let newTodoItem = {
            title: newTitle,
            priority: newPriority,
        };

        let updateTodoArr = [...allTodo];
        updateTodoArr.push(newTodoItem);
        setTodo(updateTodoArr);
        setNewTitle("");
        setNewPriority("");

        localStorage.setItem("todoList", JSON.stringify(updateTodoArr));
    };

    useEffect(() => {
        let saveTodo = JSON.parse(localStorage.getItem("todoList"));
        if (saveTodo) {
            setTodo(saveTodo);
        }
    }, []);

    const handleToDoDelete = (index) => {
        let reducedTodos = [...allTodo];
        reducedTodos.splice(index, 1);
        localStorage.setItem("todoList", JSON.stringify(reducedTodos));
        setTodo(reducedTodos);
    };

    const handleComplete = (index) => {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

        let filteredItem = {
            ...allTodo[index],
            completedOn: completedOn,
        };

        let updatedCompletedArr = [...CompletedTodo];
        updatedCompletedArr.push(filteredItem);
        setCompletedTodo(updatedCompletedArr);
        setCompletedCount((prevCount) => prevCount + 1);
    };

    const priorityColors = {
        High: "green",
        Medium: "darkBlue",
        Low: "red",
    };

    const handleCompletedTodoDelete = (index) => {
        let reducedCompletedTodos = [...CompletedTodo];
        reducedCompletedTodos.splice(index, 1);
        // console.log (reducedCompletedTodos);
        localStorage.setItem("completedTodos", JSON.stringify(reducedCompletedTodos));
        setCompletedTodo(reducedCompletedTodos);
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
                            name="priority"
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value)}
                        >
                            <option value="" disabled>
                                Select
                            </option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
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
                        className={`secondaryBtn ${!isCompleteScreen && "active"}`}
                        onClick={() => setIsCompleteScreen(false)}
                    >
                        Todo
                    </button>
                    <button
                        type="button"
                        className={`secondaryBtn ${isCompleteScreen && "active"}`}
                        onClick={() => setIsCompleteScreen(true)}
                    >
                        Completed ({completedCount})
                    </button>
                </div>
                <div className="todo-list">
                    {isCompleteScreen === false &&
                        allTodo.map((item, index) => (
                            <div className="todo-list-item" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p style={{ color: `${priorityColors[item.priority]}` }}>
                                        {item.priority}
                                    </p>
                                </div>
                                <div>
                                    <AiOutlineDelete
                                        title="Delete?"
                                        className="icon"
                                        onClick={() => handleToDoDelete(index)}
                                    />
                                    <BsCheckLg
                                        title="Completed?"
                                        className=" check-icon"
                                        onClick={() => handleComplete(index)}
                                    />
                                </div>
                            </div>
                        ))}

                    {isCompleteScreen === true &&
                        CompletedTodo.map((item, index) => (
                            <div className="todo-list-item" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p style={{ color: `${priorityColors[item.priority]}` }}>
                                        {item.priority}
                                    </p>
                                    <p>
                                        {" "}
                                        <i>Completed at: {item.completedOn}</i>
                                    </p>
                                </div>
                                <div>
                                    <AiOutlineDelete
                                        className="icon"
                                        onClick={() => handleCompletedTodoDelete(index)}
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
export default App;
