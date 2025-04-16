import React from "react";

interface ComponentWrapperProps {
    children: React.ReactNode;
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({ children }) => {
    return (
        <section className="bg-white bordered dark:bg-black rounded-xl dark:bg-neutral-900 bg-neutral-100 w-full p-24 grid place-items-center my-8">
            {children}
        </section>
    );
}

export default ComponentWrapper;