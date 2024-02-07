
import PropTypes from "prop-types";
import { useState } from "react";

import { AiOutlineDelete, AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";


const TodoItem = ({ item, onDelete, onComplete, onEdit, priorityColors, isCompleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(item.title);
    const [editedPriority, setEditedPriority] = useState(item.priority);

    const handleEdit = () => {
        onEdit(item, editedTitle, editedPriority);
        setIsEditing(false);
    };

    return (
        <div className="todo-list-item">
            {isEditing ? (
                <div className="todo-input-items">
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <select
                        className="todo-input-item"
                        name="priority"
                        value={editedPriority}
                        onChange={(e) => setEditedPriority(e.target.value)}
                    >
                        <option value="" disabled>
                            Select
                        </option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
            ) : (
                <div>
                    <h3>{item.title}</h3>
                    <p style={{ color: `${priorityColors[item.priority]}` }}>{item.priority}</p>
                    {isCompleted && <p>Completed at: {item.completedOn}</p>}
                </div>
            )}
            <div>
                <AiOutlineDelete title="Delete?" className="icon" onClick={onDelete} />
                {!isCompleted && (
                    <>
                        {isEditing ? (
                            <AiOutlineSave title="Edit?" className="icon" onClick={handleEdit} />
                        ) : (
                            <AiOutlineEdit
                                title="Edit?"
                                className="icon"
                                onClick={() => setIsEditing(true)}
                            />
                        )}
                        <BsCheckLg title="Completed?" className="check-icon" onClick={onComplete} />
                    </>
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
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onComplete: PropTypes.func,
    priorityColors: PropTypes.object.isRequired,
    isCompleted: PropTypes.bool.isRequired,
};

export default TodoItem;
