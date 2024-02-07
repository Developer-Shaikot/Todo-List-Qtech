import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import CompletedTodoList from "./components/CompletedTodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";

const App = () => {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodo, setTodo] = useState([]);

    const [CompletedTodo, setCompletedTodo] = useState([]);
    const [completedCount, setCompletedCount] = useState(0);

    useEffect(() => {
        let saveTodo = JSON.parse(localStorage.getItem("todoList"));
        if (saveTodo) {
            setTodo(saveTodo);
        }
    }, []);

    const handleAddTodo = (newTodoItem) => {
        let updateTodoArr = [...allTodo];
        updateTodoArr.push(newTodoItem);
        setTodo(updateTodoArr);

        localStorage.setItem("todoList", JSON.stringify(updateTodoArr));
    };

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

    const handleCompletedTodoDelete = (index) => {
        let reducedCompletedTodos = [...CompletedTodo];
        reducedCompletedTodos.splice(index, 1);
        localStorage.setItem("completedTodos", JSON.stringify(reducedCompletedTodos));
        setCompletedTodo(reducedCompletedTodos);
    };

    const priorityColors = {
        High: "green",
        Medium: "darkBlue",
        Low: "red",
    };

    const handleEdit = (oldItem, editedTitle, editedPriority) => {
        const updatedTodos = allTodo.map((item) =>
            item === oldItem ? { ...item, title: editedTitle, priority: editedPriority } : item
        );

        setTodo(updatedTodos);
        localStorage.setItem("todoList", JSON.stringify(updatedTodos));
    };

    return (
        <div className="App">
            <h1> My Todo</h1>

            <div className="todo-wrapper">
                <TodoForm onAddTodo={handleAddTodo} />

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
                    {isCompleteScreen === false && (
                        <TodoList
                            todos={allTodo}
                            onDelete={handleToDoDelete}
                            onComplete={handleComplete}
                            onEdit={handleEdit}
                            priorityColors={priorityColors}
                        />
                    )}

                    {isCompleteScreen === true && (
                        <CompletedTodoList
                            completedTodos={CompletedTodo}
                            onDelete={handleCompletedTodoDelete}
                            onEdit={handleEdit}
                            priorityColors={priorityColors}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
