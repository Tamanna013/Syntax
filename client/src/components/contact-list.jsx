import { useAppStore } from "../store";

const ContactList=({contacts, isChannel=false})=>{
    const {selectedChatData, setSelectedChatData, setSelectedChatType, selectedChatType, setSelectedChatMessages} = useAppStore();
    const handleClick=(contact)=>{
        if(isChannel){
            setSelectedChatType("channel");
        }else{
            setSelectedChatType("contact");
        }
        setSelectedChatData(contact);
        if(setSelectedChatData && selectedChatData._id !== contact._id){
            setSelectedChatMessages([]);
        }
    }

    return <div>ContactList</div>
};

export default ContactList;