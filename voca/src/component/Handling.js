export default function Handling() {
    function showName(){
        console.log('mike')
    }
    function showAge(age){
        console.log(age)
    }

   return (
   <div>
        <h1>Handling Event</h1>
        <button onClick={showName}>Show name</button>
        <button onClick={() =>{
            showAge(10)
        }}>Show age</button>

    <input type="text" onChange={(e) => {
        console.log(e.target.value)
    }}></input>
    </div>
   )
}