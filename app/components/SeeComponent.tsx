import React from "react";

interface SeeComponentProps {
  preview: React.ReactNode;
  name: string;
  desc: string;
  className?: string;
  link: string;
}

const SeeComponent: React.FC<SeeComponentProps> = ({ preview, name, desc, className, link }) => {
  return (
    <aside className="flex flex-col gap-1">
      <section className={`dark:bg-neutral-900 bg-neutral-100 md:bordered grid place-items-center md:p-16 rounded-xl ${className}`}>
        {preview}
      </section>
      <a href={link}>
        <div className="flex flex-col mt-1">
          <strong><p>{name}</p></strong>
          <p className="opacity-50 text-sm w-full md:text-base">{desc}</p>
        </div>
      </a>
    </aside>
  );
};

export default SeeComponent;