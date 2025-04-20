import React from "react";
const NavigationBar: React.FC = () => {
  return (
    <nav className="flex justify-between flex-row bg-black mx-1 my-2 h-11 items-center  ">
            <a href="#Logo" className="text-white ml-3 font-bold">Logo</a>
            <div className="text-white flex justify-end  ">
                 <a href="#" className="mx-3 hover:bg-white rounded-md hover:text-black hover:h-9 hover:w-12 hover:text-center font-semibold">home  </a>
                 <a href="#order"className="mx-3 hover:bg-white rounded-md hover:text-black hover:h-9 hover:w-12 hover:text-center font-semibold">order</a>
                 <a href="#about" className="mx-3 hover:bg-white rounded-md hover:text-black hover:h-9 hover:w-12 hover:text-center font-semibold">about</a>
                 <a href="#contact" className="mx-3 hover:bg-white rounded-md hover:text-black hover:h-9 hover:w-14 hover:text-center font-semibold">contact</a>
            </div>

    </nav>
  );
};
export default NavigationBar;