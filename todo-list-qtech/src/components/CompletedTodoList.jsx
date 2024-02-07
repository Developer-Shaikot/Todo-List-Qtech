import TodoItem from "./TodoItem";
import PropTypes from "prop-types";


 const priorityColors = {
     High: "green",
     Medium: "darkBlue",
     Low: "red",
 };


const CompletedTodoList = ({ completedTodos, onDelete, onEdit }) => {
    return (
        <div className="todo-list">
            {completedTodos.map((item, index) => (
                <TodoItem
                    key={index}
                    item={item}
                    onDelete={() => onDelete(index)}
                    onEdit={onEdit}
                    priorityColors={priorityColors}
                    isCompleted={true}
                />
            ))}
        </div>
    );
};


CompletedTodoList.propTypes = {
    completedTodos: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            priority: PropTypes.string.isRequired,
            completedOn: PropTypes.string.isRequired,
        })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    priorityColors: PropTypes.object.isRequired,
};

export default CompletedTodoList;
