import React, {useState} from 'react' ;
import { dbService } from "myBase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { async } from '@firebase/util';


const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false)
    const [newNweet, setNewNweet] = useState(nweetObj.text)
    console.log(nweetObj.text)
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete")
        const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
        if(ok) {
            await deleteDoc(NweetTextRef);
        }
    }

    const toogleEditing = () => setEditing((prev) => !prev)
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log('hi!!!')
        const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
        await updateDoc(NweetTextRef, {
            text: newNweet,
        });
        setEditing(false)
    }
    const onChange = (event) => {
        const {
            target : {value}
        } = event
        setNewNweet(value)
    }

    return (
        <div>
            {editing ? (
                <>
                <form onSubmit={onSubmit}> 
                    <input 
                        onChange={onChange} 
                        type="text" 
                        placeholder='update your message' 
                        value={newNweet} 
                        required /> 
                    <input type="submit" value="Update" />
                </form>
                <button onClick={toogleEditing}> Cancel </button>
                </>
            ) : (
            <>
                <h4>{nweetObj.text}</h4>
                {isOwner && (
                    <>
                        <button onClick={toogleEditing}> edit </button>
                        <button onClick={onDeleteClick}> delete </button> 
                    </>
                )}
            </>
        )}
        </div>
    )
}

export default Nweet