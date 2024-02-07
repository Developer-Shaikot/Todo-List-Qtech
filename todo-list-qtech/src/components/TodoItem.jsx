
import PropTypes from "prop-types";

import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

const TodoItem = ({ item, onDelete, onComplete, priorityColors, isCompleted }) => {
    return (
        <div className="todo-list-item">
            <div>
                <h3>{item.title}</h3>
                <p style={{ color: `${priorityColors[item.priority]}` }}>{item.priority}</p>
                {isCompleted && <p>Completed at: {item.completedOn}</p>}
            </div>
            <div>
                <AiOutlineDelete title="Delete?" className="icon" onClick={onDelete} />
                {!isCompleted && (
                    <BsCheckLg title="Completed?" className="check-icon" onClick={onComplete} />
                )}
            </div>
        </div>
    );
};

TodoItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        priority: PropTypes.string.isRequired,
        completedOn: PropTypes.string,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onComplete: PropTypes.func,
    priorityColors: PropTypes.object.isRequired,
    isCompleted: PropTypes.bool.isRequired,
};

export default TodoItem;
