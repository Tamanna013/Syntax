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
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await apiClient.post(LOGOUT_ROUTE, {}, { withCredentials: true });
      if (response.status === 200) {
        setUserInfo(null);
        navigate('/auth');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="absolute bottom-0 w-full h-24 bg-[#1e1f26] px-8 shadow-inner z-10 hidden lg:flex border-t border-zinc-800">
      <div className="flex items-center justify-between w-full h-full">
        {/* Avatar & Name */}
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 shadow-md">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={cn(
                  `uppercase h-14 w-14 text-lg font-semibold flex items-center justify-center rounded-full ${getColor(
                    userInfo.Color
                  )}`
                )}
              >
                {userInfo.firstName ? userInfo.firstName[0] : userInfo.email[0]}
              </div>
            )}
          </Avatar>
          <div className="text-white">
            <p className="font-semibold text-lg leading-none">
              {userInfo.firstName} {userInfo.lastName}
            </p>
            <p className="text-sm text-zinc-400">{userInfo.email}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => navigate('/profile')}
                  className="text-purple-400 hover:text-white transition-all duration-200"
                >
                  <FiEdit2 className="text-2xl" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-[#2c2c34] border-none text-white shadow-lg">
                <p>Edit Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={logout}
                  className="text-red-500 hover:text-white transition-all duration-200"
                >
                  <IoPowerSharp className="text-2xl" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-[#2c2c34] border-none text-white shadow-lg">
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
