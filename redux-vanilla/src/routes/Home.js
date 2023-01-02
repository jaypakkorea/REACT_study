import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {addTodo} from "../store"


function Home() {
    const [text, setText] = useState("");
    const toDo = useSelector((state) => state);
    const dispatch = useDispatch();

    function onChange(e) {
        setText(e.target.value);
    }
    function onSubmit(e) {
        e.preventDefault();
        console.log(text);
        dispatch(addToDo(text));
        setText("");
    }
    return (
    <>
        <h1>To Do</h1>
        <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
        </form>
        <ul>{JSON.stringify(toDo)}</ul>
    </>
    );
}

export default Home;