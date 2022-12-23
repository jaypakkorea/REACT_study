import React, {useState} from 'react' ;
import { dbService, storageService } from "myBase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { async } from '@firebase/util';
import { deleteObject, ref } from "firebase/storage";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false)
    const [newNweet, setNewNweet] = useState(nweetObj.text)
    console.log(nweetObj.text)
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete")
        const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
        const desertRef = ref(storageService, nweetObj.attachmentUrl);

        if(ok) {
            try {
                //해당하는 트윗 파이어스토어에서 삭제
                await deleteDoc(NweetTextRef);
                //삭제하려는 트윗에 이미지 파일이 있는 경우 이미지 파일 스토리지에서 삭제
                if (nweetObj.attachmentUrl !== "") {
                await deleteObject(desertRef);
                }
            } catch (error) {
                window.alert("트윗을 삭제하는 데 실패했습니다!");
            }
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
                {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" /> }
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