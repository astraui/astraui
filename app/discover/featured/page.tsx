import React from 'react';
import BrandCard from '@/components/project/fundamentals/BrandCard'
import brandCards from './brandCards';
import { v4 as uuidv4 } from 'uuid';

const Featured: React.FC = () => {
    return (
        <main className="flex flex-col gap-20">
            <section className="w-full flex flex-col gap-4">
                <h1>Astra UI in action</h1>
                <p>Explore innovative projects built with AstraUI, showcasing its power and flexibility in action.</p>
                <aside className="w-full grid md:grid-cols-2 gap-4 mt-4">
                    {brandCards.map((brandCard) => {
                        return (
                            <BrandCard
                                image={brandCard.image}
                                desc={brandCard.desc}
                                className={brandCard.className}
                                key={uuidv4()}
                            />
                        );
                    })}
                </aside>
            </section>
        </main>
    );
}

export default Featured;