import React from 'react';
import Identity from '@/components/project/landing/Identity'
import { GoCommandPalette } from "react-icons/go";
import Link from "next/link"
import Frameworks from "@/components/project/landing/Frameworks"

const Home: React.FC = () => {
  return (
    <main className="flex flex-col gap-20">
      <section className="w-full flex flex-col gap-2">
        <h1>Design fast. Build smart. Shine with Astra UI.</h1>
        <p>Astra UI offers beautifully-designed, accessible components with seamless framework integration. Open-source and fully customizable.</p>
        <aside className="grid mt-4 md:grid-cols-2 gap-2 lg:gap-4 lg:grid-cols-4 mb-6">
          <Link href="/">
            <button className="btn-1 w-full">Get Started</button>
          </Link>
          <button className="btn-2 lg:col-span-3 flex items-center justify-center gap-3">
            <GoCommandPalette className="stroke-2" />
            <code>pnpm dlx add {"{component}"}</code>
          </button>
        </aside>
        <Identity />
      </section>
      <section className="w-full flex flex-col gap-2">
        <h1>Works with your preferred application framework.</h1>
        <p>Astra UI effortlessly integrates with your preferred framework, making development faster and more efficient.</p>
        <aside className="flex-center">
          <Frameworks />
        </aside>
      </section>
    </main>
  );
}

export default Home;