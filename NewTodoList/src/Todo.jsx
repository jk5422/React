import { FaArrowLeft } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";
import { useEffect, useState } from "react";

function Todo() {

    const [todos, setTodos] = useState([]);
    const [inputtxt, setInput] = useState("");
    const [updatedtxt, setUpdatedtxt] = useState("");
    const [completed, setCompleted] = useState(0);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const addtodo = () => {
        if (inputtxt !== "") {
            setTodos((prev) => [...prev, { id: Date.now(), name: inputtxt, isCompleted: false, isEditable: false }])
            setInput("")
        }
        else {
            alert("Enter the todo text..!!");
        }
    }

    const updateTodo = (id) => {
        const result = JSON.parse(localStorage.getItem('todos'));
        const newlist = result.map(item =>
            item.id === id ? { ...item, isEditable: true }
                :
                item
        )
        setTodos(newlist);
    }

    const updateTodotxt = (id) => {
        const result = JSON.parse(localStorage.getItem('todos'));
        const newlist = result.map(item =>
            item.id === id ? { ...item, name: updatedtxt, isEditable: false }
                : item
        )

        setTodos(newlist);

    }

    const completedTodo = (id, isCompleted) => {
        const result = JSON.parse(localStorage.getItem('todos'));
        const newlist = result.map(item =>
            item.id === id ? { ...item, isCompleted: !isCompleted }
                : item
        )
        setTodos(newlist);
    }


    /* every todos render useEffect  */
    useEffect(() => {
        if (todos != "") {
            localStorage.setItem('todos', JSON.stringify(todos));
            const data = JSON.parse(localStorage.getItem('todos'));
            setCompleted(data.filter(item => item.isCompleted).length);
        }

    }, [todos])



    useEffect(() => {
        const todolist = JSON.parse(localStorage.getItem('todos'));

        if (todolist && todolist.length > 0) {
            setTodos(todolist);
            setCompleted(todolist.filter(item => item.isCompleted).length);
        }

    }, [])



    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('index', index.toString());
        setDraggingIndex(index);
        console.log("Drag Start ondrag start:-", index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        const draggedOverIndex = parseInt(e.currentTarget.getAttribute('data-index'));
        // console.log("Drag Over Index:-", draggedOverIndex)
        // console.log("Dragging index:-", draggingIndex)

        const draggedIndex = draggingIndex;
        if (draggedOverIndex !== draggedIndex) {
            const newTodos = [...todos];
            const draggedItem = newTodos[draggedIndex];
            newTodos.splice(draggedIndex, 1);
            newTodos.splice(draggedOverIndex, 0, draggedItem);
            setTodos(newTodos);
            setDraggingIndex(draggedOverIndex);
        }
    };

    const handleDrop = (e, newIndex) => {
        const oldIndex = parseInt(e.dataTransfer.getData('index'));
        const newItems = [...todos];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);
        setTodos(newItems);
        setDraggingIndex(null);
        console.log("New Index ondrop:-", newIndex)
    };


    return (
        <>
            <div className="todoContainer">
                <div className="header">
                    <div className="left">
                        <button><FaArrowLeft /></button>
                    </div>
                    <div className="center">
                        <h3>To Do App</h3>
                    </div>
                    <div className="right">
                        <button><MdClose /></button>
                    </div>
                </div>

                <div className="main">
                    <div className="todos">
                        {
                            todos.map((item, index) => (
                                item.isCompleted === false ?
                                    <div key={item.id} className={`todolist ${draggingIndex === index ? 'dragging' : ''}`} draggable={true}
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragOver={(e) => handleDragOver(e, index)}
                                        onDrop={(e) => handleDrop(e, index)}
                                        onDragEnd={() => setDraggingIndex(null)}
                                        data-index={index}
                                    >
                                        <MdDragIndicator />
                                        <input type="checkbox" defaultChecked={item.isCompleted} onClick={() => completedTodo(item.id, item.isCompleted)} />
                                        {
                                            item.isEditable ? <input type="text" onKeyDown={(e) => e.key === 'Enter' ? updateTodotxt(item.id) : ""} onChange={(e) => setUpdatedtxt(e.target.value)} defaultValue={item.name} /> : <p onClick={() => updateTodo(item.id)}>{item.name}</p>
                                        }
                                    </div>
                                    : ""

                            ))
                        }

                        <div className="newtodo">
                            <FaPlusCircle onClick={addtodo} />
                            <input type="text" onKeyDown={(e) => e.key === 'Enter' ? addtodo() : ""} onChange={(e) => setInput(e.target.value)} value={inputtxt} placeholder="Add New Todo" />
                        </div>

                        <div className={`donetodo ${isVisible ? "visible" : "hidden"}`}>
                            {
                                todos.map((item, index) => (
                                    item.isCompleted === true ?
                                        <div key={item.id} className={`todolist ${draggingIndex === index ? 'dragging' : ''}`} draggable={true}
                                            onDragOver={handleDragOver}
                                            onDragStart={(e) => handleDragStart(e, index)}
                                            onDrop={(e) => handleDrop(e, index)}
                                            onDragEnd={() => setDraggingIndex(null)}
                                            data-index={index}
                                        >
                                            <MdDragIndicator />
                                            <input type="checkbox" defaultChecked={item.isCompleted} onClick={() => completedTodo(item.id, item.isCompleted)} />
                                            <p>{item.name}</p>
                                        </div>
                                        : ""
                                ))
                            }
                        </div>

                    </div>
                </div>

                <div className="footer">
                    <div className="complete">
                        <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? <FaMinusCircle /> : <FaPlusCircle />}Done</button><span>({completed})</span>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Todo
