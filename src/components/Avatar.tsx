// src/components/Avatar.tsx

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser, UserContextType } from '@/context/UserContext';

interface ExtendedUserContextType extends UserContextType {
  attributes?: Record<string, string>;
}

interface AvatarProps {
  size?: number;       // 控制头像大小，默认为 40
  onClick?: () => void;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ size = 40, onClick, className = '' }) => {
  const router = useRouter();
  const user = useUser() as ExtendedUserContextType;
  const attributes = user.attributes ?? {};
  const avatarUrl = attributes.picture || '/images/profile/avatar.svg';

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push('/profile');
    }
  };

  return (
    <button onClick={handleClick} className={`relative ${className}`}>
      <Image 
        src={avatarUrl} 
        alt="User Avatar" 
        width={size} 
        height={size} 
        className="rounded-full border transition-transform duration-200 ease-in-out hover:scale-105" 
      />
    </button>
  );
};

export default Avatar;
