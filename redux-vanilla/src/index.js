import { createStore } from "redux";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");


const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const addTodo = text => {
  return {
    type : ADD_TODO, 
    text
  }
}

const deleteTodo = id =>{
  return {
    type : DELETE_TODO, 
    id 
  }
}

const reducer = (state = [], action) => {
  console.log("hi", action);
  switch (action.type) {
  case ADD_TODO:
    return [...state, {text: action.text, id: Date.now(), ...state}];
  case DELETE_TODO:
    return state.filter(toDo => toDo.id !== action.id);
  default :
    return state;
  }
}

const store = createStore(reducer);
store.subscribe(() => {console.log(store.getState())})


const dispatchTodo = text => {
  store.dispatch(addTodo(text))
}

const dispatchdeleteTodo = event =>{
  const id = parseInt(event.target.parentNode.id)
  store.dispatch(deleteTodo(id))
}

const paintTodos = () => {
  const toDos = store.getState();
  ul.innerHTML = ""
  toDos.forEach(todo => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerText = "DEL"
    btn.addEventListener("click", dispatchdeleteTodo)
    li.id = todo.id
    li.innerText = todo.text
    li.appendChild(btn)
    ul.appendChild(li)
  })
}


store.subscribe(paintTodos)


const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchTodo(toDo)
};

form.addEventListener("submit", onSubmit);
