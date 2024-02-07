import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

const TodoList = ({ todos, onDelete, onComplete, priorityColors }) => {
    return (
        <div className="todo-list">
            {todos.map((item, index) => (
                <TodoItem
                    key={index}
                    item={item}
                    onDelete={() => onDelete(index)}
                    onComplete={() => onComplete(index)}
                    priorityColors={priorityColors}
                />
            ))}
        </div>
    );
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            priority: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
    priorityColors: PropTypes.object.isRequired,
};

export default TodoList;
