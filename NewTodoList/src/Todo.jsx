import { FaArrowLeft } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";
import { useEffect, useState } from "react";

function Todo() {

    const [todos, setTodos] = useState([]);
    const [inputtxt, setInput] = useState("");
    const [updatedtxt, setUpdatedtxt] = useState("");
    const [completed, setCompleted] = useState(0);

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
        if (updatedtxt !== "") {

            const result = JSON.parse(localStorage.getItem('todos'));
            const newlist = result.map(item =>
                item.id === id ? { ...item, name: updatedtxt, isEditable: false }
                    : item
            )

            setTodos(newlist);
        }
        else {
            alert("Enter the todo text..!!");
        }
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
                            todos.map((item) => (
                                item.isCompleted === false ?
                                    <div key={item.id} className="todolist" >
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

                        {
                            todos.map((item) => (
                                item.isCompleted === true ?
                                    <div key={item.id} className="todolist">
                                        <MdDragIndicator />
                                        <input type="checkbox" defaultChecked={item.isCompleted} onClick={() => completedTodo(item.id, item.isCompleted)} />
                                        {
                                            item.isEditable ? <input type="text" onKeyDown={(e) => e.key === 'Enter' ? updateTodotxt(item.id) : ""} onChange={(e) => setUpdatedtxt(e.target.value)} defaultValue={item.name} /> : <p onClick={() => updateTodo(item.id)}>{item.name}</p>
                                        }
                                    </div>
                                    : ""
                            ))
                        }

                    </div>
                </div>

                <div className="footer">
                    <div className="complete">
                        <button><FaPlusCircle />Done</button><span>({completed})</span>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Todo
