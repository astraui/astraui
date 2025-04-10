import React from 'react';
import Identity from '@/components/project/landing/Identity'
import { GoCommandPalette } from "react-icons/go";
import Link from "next/link"
import Frameworks from "@/components/project/landing/Frameworks"
import Card from "@/components/project/fundamentals/Card"
import { LuCommand } from "react-icons/lu";
import features from "./data/features"
import { v4 as uuidv4 } from 'uuid';
import StartNewsletter from "@/components/StartNewsletter"

const Home: React.FC = () => {
  return (
    <main className="flex flex-col gap-20">
      <section className="w-full flex flex-col gap-4">
        <h1>Design fast. Build smart. Shine with Astra UI.</h1>
        <p>Astra UI offers beautifully-designed, accessible components with seamless framework integration. Open-source and fully customizable.</p>
        <aside className="grid md:grid-cols-2 gap-4 lg:grid-cols-4">
          <Link href="/">
            <button className="btn-1 w-full">Get started</button>
          </Link>
          <button className="btn-2 lg:col-span-3 flex items-center justify-center gap-3">
            <GoCommandPalette className="stroke-2" />
            <code>pnpm dlx astui@latest  add {"{x}"}</code>
          </button>
        </aside>
        <Identity />
      </section>
      <section className="w-full flex flex-col gap-2">
        <h2>Optimized for speed. Built for precision.</h2>
        <p>Astra UI provides fast, efficient features that seamlessly enhance your workflow and boost productivity.</p>
        <aside className="grid md:grid-cols-2 gap-4 mt-4">
          {features.map((feature) => {
            return (
              <Card
                icon={feature.icon}
                featureName={feature.featureName}
                featureDesc={feature.featureDesc}
                key={uuidv4()}
                className="col-span-2 md:col-span-1"
              />
            )
          })}
        </aside>
      </section>
      <section className="w-full flex flex-col gap-2">
        <h2>Works with your preferred application framework.</h2>
        <p>Astra UI effortlessly integrates with your preferred framework, making development faster and more efficient.</p>
        <aside className="flex-center mt-4">
          <Frameworks />
        </aside>
      </section>
      <section className="w-full flex flex-col gap-4">
        <h2>Get the latest from Astra UI.</h2>
        <p>Stay updated with the latest components, updates, and designs from Astra UI Library</p>
        <StartNewsletter />
      </section>
    </main>
  );
}

export default Home;
