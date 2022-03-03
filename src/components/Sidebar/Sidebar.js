import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material';
import SidebarChat from '../SidebarChat/SidebarChat';
import { Avatar } from '@mui/material';
import db from '../../firebase';
import "./Sidebar.scss";
import { useStateValue } from '../../context/StateProvider';

const Sidebar = () => {

  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unSubscribe = db.collection('rooms').onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      })))
    ))

    return () => {
      unSubscribe()
    }
  }, [])


  return (
    <div className='sidebar'>

      <div className="sidebar__header">
        <IconButton>
          <Avatar src={user?.photoURL} />
        </IconButton>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton >
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder='Search...' />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map(i => (
          <SidebarChat key={i.id} name={i.data.name} id={i.id} />
        ))}
      </div>

    </div>
  )
}

export default Sidebar