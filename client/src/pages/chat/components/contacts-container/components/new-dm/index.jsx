import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {FaPlus} from "react-icons/fa";
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const NewDM = () => {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]); 

  const searchContacts=async(searchTerm)=>{

  }
  return (
    <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <FaPlus onClick={() => setOpenNewContactModal(true)} className='text-neutral-400 font-light text-capacity-90 text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300' />
                </TooltipTrigger>
                <TooltipContent className='bg-[#1c1b1e] border-none mb-2 p-3 text-white'>
                    <p>Select New Contact</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
            <DialogContent className="bg-[#181920] border-none w-[400px] h-[400px] text-white flex flex-col">
                <DialogHeader>
                    <DialogDescription>
                        Select a contact to chat.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Input placeholder="Search Contacts" className="rounded-lg p-6 border-none bg-[#2c2e3b]" onChange={e=>searchContacts(e.target.value)} />
                </div>
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
