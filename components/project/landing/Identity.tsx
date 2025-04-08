"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import React from 'react';
import images from '../../../app/data/images'

const Identity: React.FC = () => {
    return (
        <div className="w-full bg-white dark:bg-black">
          <ThreeDMarquee images={images} />
        </div>
      );
}

export default Identity;