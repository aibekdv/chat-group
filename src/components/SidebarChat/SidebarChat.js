import Avatar from '@mui/material/Avatar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';
import db from '../../firebase';
import "./sidebar.scss"

const SidebarChat = ({ addNewChat, name, id }) => {

    const [{ user }, dispatch] = useStateValue();
    const [iconProfile, setIconProfile] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snap => setMessages(snap.docs.map((doc) => (
                doc.data()
            ))))
        }
    }, [])

    useEffect(() => {
        setIconProfile(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {
        const roomName = prompt('Enter your name for chat');

        if (roomName) {
            db.collection('rooms').add({
                name: roomName
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${iconProfile}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>

    ) : (
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add new Chart</h2>
        </div>
    )
}

export default SidebarChat