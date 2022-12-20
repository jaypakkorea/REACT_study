import { async } from '@firebase/util';
import { authService } from 'myBase';
import React, {useState} from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("")


    const onChange = (event) => {
        const {target: {name, value}} = event
        if(name ==="email"){
            setEmail(value)
        } else if(name ==="password"){
            setPassword(value)
        }
    }
    const onSubmit = async(event) =>{
        event.preventDefault();
        try {
            let data;
            if(newAccount){
                const auth = getAuth();
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                const auth = getAuth();
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data)
        } catch(error){
            setError(error.message)
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev)
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder='Email' required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder='Password' required value={password} onChange={onChange} />
                <input type="submit" value= {newAccount ? "Create Account" : "Login"} />
            </form>
            {error}
            <span onClick={toggleAccount}>{newAccount ? "Login" : "Create Account"}</span>
            <div>
                <button>Coutinue with Google</button>
                <button>Coutinue with Github</button>
            </div>
        </div>
    )    
}; 
export default Auth;