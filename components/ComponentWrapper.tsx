import React from "react";

interface ComponentWrapperProps {
    children: React.ReactNode;
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({ children }) => {
    return (
        <section className="bg-neutral-100 bordered rounded-xl dark:bg-neutral-900 w-full p-24 grid place-items-center">
            {children}
        </section>
    );
}

export default ComponentWrapper;