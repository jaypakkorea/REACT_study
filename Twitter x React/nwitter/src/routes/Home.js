import React, { useEffect, useState } from 'react';
import { dbService, storageService } from "myBase";
import { getDocs, query, orderBy, onSnapshot, collection, addDoc, serverTimestamp } from "firebase/firestore";
import Nweet from 'components/Nweet';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])
    const [attatchment, setAttatchment] = useState("")
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
        let attachmentUrl = "";

        //이미지 첨부하지 않고 텍스트만 올리고 싶을 때도 있기 때문에 attachment가 있을때만 아래 코드 실행
        //이미지 첨부하지 않은 경우엔 attachmentUrl=""이 된다.
        if (attatchment !== "") {
            //파일 경로 참조 만들기
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            //storage 참조 경로로 파일 업로드 하기
            const response = await uploadString(attachmentRef, attatchment, "data_url");
                //storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트
                attachmentUrl = await getDownloadURL(response.ref);
        }

        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        //트윗하기 누르면 nweetObj 형태로 새로운 document 생성하여 nweets 콜렉션에 넣기
        await addDoc(collection(dbService, "nweets"), nweetObj);
        setNweet("");
        //파일 미리보기 img src 비워주기
        setAttatchment("");

        // console.log(`서브밋 하는 nweet:${nweet}`);
        // await addDoc(collection(dbService, "nweets"), {
        // text : nweet,
        // createdAt: serverTimestamp(),
        // creatorId : userObj.uid
        // });
        // setNweet("");
    };

    const onChange = (event) => {
        const {target : {value}} = event
        setNweet(value)
    }

    const onFileChange = (event) => {
        const {target : {files}} = event
        const theFile = files[0]
        const reader = new FileReader()
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget : {result},
            } = finishedEvent
            setAttatchment(result)
        }
        reader.readAsDataURL(theFile)
    }

    const onClearPhotoclick = () => {
        setAttatchment(null)
    }

    return (
        <div>
            <form>
                <input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" onClick={onSubmit} />
                {attatchment && (
                    <div>
                        <img src={attatchment} width = "50px" height="50px"/>
                        <button onClick={onClearPhotoclick}> clear </button>
                    </div>
                ) }
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