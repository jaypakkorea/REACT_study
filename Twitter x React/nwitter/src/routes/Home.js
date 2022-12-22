import React, { useEffect, useState } from 'react';
import { dbService } from "myBase";
import { getDocs, query, orderBy, onSnapshot, collection, addDoc, serverTimestamp } from "firebase/firestore";
import Nweet from 'components/Nweet';

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])
    // const getNweets = async() => {
    //     const q = query(collection(dbService, "nweets"));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         const nweetObj = {
    //             ...doc.data(),
    //             id: doc.id,
    //         }
    //         setNweets(prev => [nweetObj, ...prev]);
    //         });
    //     }; 
    useEffect(() => {
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
            );
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setNweets(nweetArr);
    });
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(`서브밋 하는 nweet:${nweet}`);
        await addDoc(collection(dbService, "nweets"), {
        text : nweet,
        createdAt: serverTimestamp(),
        creatorId : userObj.uid
        });
        setNweet("");
    };

    const onChange = (event) => {
        const {target : {value}} = event
        setNweet(value)
    }

    return (
        <div>
            <form>
                <input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" onClick={onSubmit} />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div> 
    )

}
export default Home;