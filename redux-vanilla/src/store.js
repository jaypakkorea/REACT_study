import {createStore} from 'redux'

const ADD = "ADD"
const DELETE = "DELETE"

const addTodo = text => {
    return {
        type : ADD,
        text
    }
}

const deleteTodo = (id) => {
    return {
        type : DELETE,
        id
    }
}


const reducer = (state=[], action) => {
    switch (action.type) {
        case ADD:
            return [{text: action.text, id: Date.now()}, ...state]
        case DELETE:
            return state.filter(todo => todo != action.id)
        default :
            return state 
    }
}

const store = createStore(reducer)

export const actionCreators = {
    addToDo,
    deleteToDo
};
  

export default store;
