import {useAppStore} from '@/store';
import { useEffect, useRef } from 'react';
import moment from "moment";
import { GET_ALL_MESSAGES_ROUTE } from '../../../../../../utils/constants';
import {apiClient} from '@/lib/api-client.js';

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatType, selectedChatData, selectedChatMessages, userInfo, setSelectedChatMessages } = useAppStore();

  useEffect(() => {
    const getMessages = async () => {
      try{
        const response = await apiClient.post(GET_ALL_MESSAGES_ROUTE, { id: selectedChatData._id }, { withCredentials: true });

        if(response.data.messages){
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    if(selectedChatData._id && selectedChatType === 'contact') {
      getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY_MM_DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && <div className='text-center text-gray-500 my-2'>
            {moment(message.timestamp).format("LL")}
          </div>}
          {
            selectedChatType === 'contact' &&
            renderDMMessages(message)
          }
        </div>
      );
    });
  };

  const renderDMMessages=(message)=>(
    <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
      {message.messageType==="text" && 
        <div className={`${message.sender !== selectedChatData._id 
          ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
          : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"} 
          border inline-block rounded my-1 p-2 max-w-[70%] w-fit break-words`}>
          {message.content}
        </div>        
      }
      <div className='text-xs text-gray-600'>
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] sm:w-full">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  )
}

export default MessageContainer;
