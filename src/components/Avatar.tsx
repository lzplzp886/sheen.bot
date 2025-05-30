// src/components/Avatar.tsx

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

interface AvatarProps {
  size?: number;       // 控制头像大小，默认为 40
  onClick?: () => void;
  className?: string;
  edit?: boolean;      // 控制是否显示编辑图标
}

const Avatar: React.FC<AvatarProps> = ({ size = 40, onClick, className = '', edit = false }) => {
  const router = useRouter();
  const user = useUser();
  const avatarUrl = user.attributes.picture || '/images/profile/avatar.svg';

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push('/profile');
    }
  };

  return (
    <button onClick={handleClick} className={`relative ${className} group`}>
      <Image 
        src={avatarUrl} 
        alt="User Avatar" 
        width={size} 
        height={size} 
        className="bg-background rounded-full border transition-transform duration-200 ease-in-out hover:scale-105" 
      />
      {edit && (
        <div className="absolute bottom-0 right-0 bg-light text-background rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536M4 13.5V20h6.5l9.586-9.586a2 2 0 00-2.828-2.828L4 13.5z"
            />
          </svg>
        </div>
      )}
    </button>
  );
};

export default Avatar;
