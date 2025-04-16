import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", onClick }) => {
    return (
        <button
            className={`bg-black dark:bg-white text-white dark:text-black py-2 px-3.5 font-semibold rounded-md ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
