import React from "react";
import docs from "./docs"
import Mdx from "./Mdx"
import { v4 as uuidv4 } from 'uuid';

const Documentation: React.FC = () => {
  return (
    <main className="w-full flex flex-col gap-4">
      <h1>Documentation</h1>
      <p>Quickly get started with Astra UI, explore components, and customize your design seamlessly.</p>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {docs.map((doc) => {
        return (
          <Mdx
            icon={doc.icon}
            title={doc.title}
            desc={doc.desc}
            link={doc.link}
            className={doc.className || ""}
            key={uuidv4()}
          />
        );
      })}
      </section>
    </main>
  );
}

export default Documentation;