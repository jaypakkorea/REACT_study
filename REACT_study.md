# REACT_study

20221129



```react
const btn = React.createElement("button", null, "Click me")
const container = React.createElement("div", null, [span, btn])
    ReactDOM.render(container, root);
const h3 = React.createElement("h3", {
        onMouseEnter:() => console.log('mouseenter')
    }, "Hello I'm h3")
```

html tag , property , content 순서

container에 담아서 render에 올릴 수 있음

property에 event listener를 추가할 수 있다.



useState()

```react
const [counter, modifer] = React.useState(0);

const [counter, setCounter] = React.useState(0);
  
const onClick = () =>{
    setCounter(counter + 1)
}
```







```
npx create-react-app 프로젝트명
npm i prop-types

npm start

npm install

npm install react-router-dom
```



state

useState

```react
import {useState} from 'react'
const [name, setName] = useState('Mike')
function changeName(){
        const newName = name === "Mike" ? "Jane" : "Mike";
        // document.getElementById('name').innerText = name
        setName(newName)
    }
```

