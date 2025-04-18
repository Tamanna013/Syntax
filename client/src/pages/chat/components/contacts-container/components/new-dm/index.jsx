import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {FaPlus} from "react-icons/fa";
import { useState } from 'react';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { apiClient } from "@/lib/api-client";
import { SEARCH_CONTACT_ROUTES } from "@/utils/constants";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, getColor } from "@/lib/utils";
import { useAppStore } from '../../../../../../store';
import {HOST} from "@/utils/constants";

const NewDM = () => {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]); 
  const { userInfo } = useAppStore();
  const { setSelectedChatType, setSelectedChatData } = useAppStore();

  const searchContacts=async(searchTerm)=>{
    try{
        if(searchTerm.length>0){
            const response=await apiClient.post(SEARCH_CONTACT_ROUTES, {searchTerm}, {withCredentials: true});
            if(response.status===200 && response.data.contacts){
                setSearchedContacts(response.data.contacts);
            } else {
                setSearchedContacts([]);
            }
        } else {
            setSearchedContacts([]);
        }
    } catch(error){
        console.log(error);
    }
  }

  const selectNewContact=(contact)=>{
    setOpenNewContactModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
  }

  return (
    <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span onClick={() => setOpenNewContactModal(true)}>
                        <FaPlus className='text-neutral-400 font-light text-capacity-90 text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300' />
                    </span>
                </TooltipTrigger>
                <TooltipContent className='bg-[#1c1b1e] border-none mb-2 p-3 text-white'>
                    <p>Select New Contact</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
            <DialogContent className="bg-[#181920] border-none w-[400px] h-[400px] text-white flex flex-col">
                <DialogHeader>
                    <DialogTitle>Select a Contact</DialogTitle>
                    <DialogDescription>
                        Select a contact to chat.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Input placeholder="Search Contacts" className="rounded-lg p-6 border-none bg-[#2c2e3b]" onChange={e=>searchContacts(e.target.value)} />
                </div>
                {searchedContacts.length>0 && (
                    <ScrollArea className="h-[250px]">
                        <div className='flex flex-col gap-5'>
                        {
                            searchedContacts.map(contact=><div key={contact._id} className='flex gap-3 items-center cursor-pointer' onClick={() => { selectNewContact(contact) }} >
                                <div className='w-12 h-12 relative'>
                                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                        {contact.image ? (
                                            <AvatarImage src={`${HOST}/${contact.image}`} alt="profile" className="object-cover w-full h-full bg-black" />
                                        ) : (
                                                <div className={cn(`uppercase h-12 w-12 text-lg border flex items-center justify-center rounded-full ${getColor(contact.Color)}`)}>
                                                    {contact.firstName ? contact.firstName[0] : contact.email[0]}
                                                </div>
                                            )}
                                        </Avatar>
                                    </div>
                                <span className='flex flex-col'>
                                    {
                                        contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : `${contact.email}`
                                    }
                                </span>
                                <span className='text-xs'>
                                    {
                                        contact.email
                                    }
                                </span>

                            </div>)
                        }
                        </div>
                    </ScrollArea>
                )}
                <div className="flex flex-1 justify-center items-center">
                    {
                        searchedContacts.length<=0 && <img
                        src="/logo.png"
                        alt="empty-chat"
                        className="w-40 h-40 flex-grow object-contain opacity-70"
                      />
                    }
                </div>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default NewDM;
