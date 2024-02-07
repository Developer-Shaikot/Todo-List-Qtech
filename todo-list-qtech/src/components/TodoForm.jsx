
import  { useState } from "react";
import PropTypes from "prop-types";

const TodoForm = ({ onAddTodo }) => {
    const [newTitle, setNewTitle] = useState("");
    const [newPriority, setNewPriority] = useState("");

    const handleAddTodo = () => {
        if (!newTitle.trim() || !newPriority.trim()) {
            alert("Please enter a title and select a priority before adding a task.");
            return;
        }

        const newTodoItem = {
            title: newTitle,
            priority: newPriority,
        };

        onAddTodo(newTodoItem);
        setNewTitle("");
        setNewPriority("");
    };

    return (
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
    );
};

TodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};

export default TodoForm;
