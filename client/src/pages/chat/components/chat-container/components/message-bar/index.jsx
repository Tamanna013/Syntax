import {GrAttachment} from 'react-icons/gr'
import { RiEmojiStickerLine } from 'react-icons/ri'
import { IoSend } from 'react-icons/io5'
import React, { useState, useRef, useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { useAppStore } from '@/store';
import { useSocket } from '../../../../../../context/SocketContext';

const MessageBar = () => {
  const emojiRef=useRef();
  const socket=useSocket();
  const {selectedChatType, selectedChatData, userInfo}=useAppStore();
  const [message, setMessage] = useState('')
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return ()=>{
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [emojiRef]);

  const handleSendMessage = () => {
    if(selectedChatType==="contact"){
      socket.emit("sendMessage",{
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl:undefined
      })
    }
  }

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg +emoji.emoji)
  }

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center ap-5 pr-5">
        <input type="text" className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none" placeholder="Enter Message" value={message} onChange={e=>setMessage(e.target.value)} />
        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'>
          <GrAttachment className='text-2xl' />
        </button>
        <div className='relative'>
          <button onClick={()=>setEmojiPickerOpen(true)} className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'>
            <RiEmojiStickerLine className='text-2xl ml-3' />
          </button>
          <div className='absolute bottom-16 right-0 z-50' ref={emojiRef}>
            <EmojiPicker theme='dark' open={emojiPickerOpen} onEmojiClick={handleAddEmoji} autoFocusSearch={false} />
          </div>
        </div>
      </div>
      <button onClick={handleSendMessage} className='focus:border-none focus:outline-none focus:text-white duration-300 transition-all text-neutral-500 rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] bg-[#8417ff]'>
        <IoSend className='text-2xl' />
      </button>
    </div>
  )
}

export default MessageBar
