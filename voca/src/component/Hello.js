import styles from "./Hello.module.css"

export default function hello() {
   return (
   <div>
        <p style={
            {color : '#f00',
            borderRight : '2rem solid red',
            opacity : 0.5,
            marginBottom : '30px'
            }
        }>
        Hello</p>
        <div className="Box"/>
        <div className={styles.box}/>
    </div>
   )
}