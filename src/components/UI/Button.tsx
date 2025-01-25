import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean; // Check whether the button is under loading
  loadingText?: string; // The text to be displayed during loading
}

const Button: React.FC<ButtonProps> = ({ isLoading, loadingText, children, ...props }) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled} // Disable the button to prevent multiple submit behavior
      className={`btn ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${props.className}`}
    >
      {isLoading ? (loadingText || 'Loading...') : children}
    </button>
  );
};

export default Button;