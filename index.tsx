import React from "react";
import Button from "./Button"

function App() {
  function handleClick() {
    alert("You clicked!")
  }

  return (
    <main className="h-screen w-screen bg-neutral-100 dark:bg-neutral-900 grid place-items-center">
      <section className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-black dark:text-white font-bold text-2xl md:text-3xl lg:text-4xl">My button</h1>
        <Button onClick={handleClick} className="md:text-lg">
          Hello
        </Button>
      </section>
    </main>
  );
}

export default App;
