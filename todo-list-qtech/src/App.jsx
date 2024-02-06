import "./App.css";
import { useState } from "react";
function App() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    return (
        <div className="App">
            <h1> My Todo</h1>

            <div className="todo-warper">
                <div className="todo-input">
                    <div className="todo-input-item">
                        <label htmlFor="Title">Title</label>
                        <input type="text" placeholder="What's the title?" />
                    </div>
                    <div className="todo-input-item">
                        <select name="priority" id="priority">
                            <option value="High">High</option>
                            <option value="Medium">medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="todo-input-item">
                        <button type="button" className="primaryBtn">
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
                <div className="todo-list-item">
                    <h3>Task 1</h3>
                    <p>Priority</p>
                </div>
            </div>
        </div>
    );
}

export default App;
