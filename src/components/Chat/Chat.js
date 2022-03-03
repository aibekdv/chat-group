import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material';
import Mic from '@mui/icons-material/Mic';
import { Avatar, IconButton, } from '@mui/material';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';
import db from '../../firebase';
import "./Chat.scss";

const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState('');
    const [roomName, setRoomName] = useState('');
    const { roomId } = useParams();
    const [seed, setSeed] = useState();
    const [{ user }, dispatch] = useStateValue();

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: msg,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('');
    }

    const changeMsg = (event) => {
        event.preventDefault();
        setMsg(event.target.value);
    }

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snap => (
                setRoomName(snap.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snap => (
                setMessages(snap.docs.map(doc => doc.data()))
            ))
        }
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    return (
        <div className='chat'>

            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((i, idx) => (
                    <div className={`chat__message ${i.name === user.displayName && 'chat__recivery'}`} key={idx}>
                        <span className="chat__name">
                            {i.name}
                        </span>
                        {i.message}
                        <span className="chat__timestamp">
                            {new Date(i.timestamp?.toDate()).toUTCString()}
                        </span>
                    </div>
                ))}
            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form onSubmit={e => sendMessage(e)}>
                    <input
                        type="text"
                        placeholder='Enter your text here...'
                        value={msg}
                        onChange={changeMsg}
                    />
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>

        </div>
    )
}

export default Chat