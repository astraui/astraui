import React from "react";

interface CardProps {
    icon: React.ReactNode;
    featureName: string;
    featureDesc: string;
    className?: string;
}

const Card: React.FC<CardProps> = ({ className, icon, featureName, featureDesc }) => {
    return (
        <section className={`card ${className}`}>
            <div className="icon-container mb-1">{icon}</div>
            <strong><p>{featureName}</p></strong>
            <p className="w-full">{featureDesc}</p>
        </section>
    );
}

export default Card;