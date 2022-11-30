import {useState} from 'react'

export default function State(props) {
    // let name = "Mike";
    const [name, setName] = useState('Mike')
    const [age, setAge] = useState(props.age)
    console.log(props.age)
    const msg = age > 19 ? "성인입니다" : "미성년자 입니다"

    function changeName(){
        const newName = name === "Mike" ? "Jane" : "Mike";
        // document.getElementById('name').innerText = name
        setName(newName)
    }
   return (
   <div>
        <h1>State</h1>
        <h2 id="name">{name} ({age}세)</h2>
        <button onClick={changeName}>change</button>
        <button onClick={()=>{
            setAge(age + 1)
        }}>age</button>
        <div>{msg}</div>
    </div>
   )
}