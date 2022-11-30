import State from "./State"

export default function Props() {
   return (
   <div>
    <h3>props</h3>
    <State age={10} />
    <State age={20} />
    <State age={30} />
    </div>
   )
}