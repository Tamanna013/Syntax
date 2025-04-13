import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useAppStore } from '@/store';
import { HOST, LOGOUT_ROUTE } from '@/utils/constants';
import { getColor, cn } from '@/lib/utils';
import { apiClient } from '@/lib/api-client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { FiEdit2 } from 'react-icons/fi';
import { IoPowerSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  const logout = async() => {
    try{
      const response = await apiClient.post(LOGOUT_ROUTE, {}, {withCredentials: true});
      if(response.status===200){
        navigate('/auth');
        setUserInfo(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <div className="absolute bottom-0 w-full h-20 bg-[#2a2b33] px-6 shadow-inner z-10 hidden lg:flex">
      <div className="relative flex items-center justify-between h-full">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 relative">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={cn(
                  `uppercase h-12 w-12 text-lg border flex items-center justify-center rounded-full ${getColor(
                    userInfo.Color
                  )}`
                )}
              >
                {userInfo.firstName
                  ? userInfo.firstName[0]
                  : userInfo.email[0]}
              </div>
            )}
          </Avatar>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-white font-medium text-md">
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ''}
        </div>

        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => navigate('/profile')}
                  className="text-purple-400 hover:text-white transition-all duration-200"
                >
                  <FiEdit2 className="text-xl" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                <p>Edit Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => navigate('/logout')}
                  className="text-red-500 hover:text-white transition-all duration-200"
                >
                  <IoPowerSharp className="text-xl" onClick={logout} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
