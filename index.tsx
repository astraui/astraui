import React from "react";
import NavigationBar from './NavigationBar';
function App() {
    return (
      <main className="h-screen w-screen bg-neutral-100 dark:bg-neutral-900 grid place-items-center">
        <section className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-black dark:text-white font-bold text-2xl md:text-3xl lg:text-4xl">My Navigation Bar </h1>
        </section>
      </main>
    );
  }
  export default App;