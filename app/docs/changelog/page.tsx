import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import timelineData from "./timelineData"

// Define image interface
interface ImageItem {
  src: string;
  alt: string;
}

// React functional component with TypeScript
const TimelineDemo: React.FC = () => {
  // Function to render timeline item content
  const renderTimelineContent = (
    bullets: string[],
    images: ImageItem[],
  ) => {
    return (
      <div>
        <ul className="flex flex-col gap-1 list-disc mt-2 mb-6">
          {bullets.map((bullet, index) => (
            <li key={index} className="list-item">
              {bullet}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              width={1280}
              height={640}
              className="rounded-lg object-cover h-32 md:h-36 lg:h-64 w-full border border-snow dark:border-charcoal"
            />
          ))}
        </div>
      </div>
    );
  };

  // Create formatted timeline data with the content rendered by our function
  const formattedTimelineData = timelineData.map(item => ({
    title: item.title,
    time: item.time,
    content: renderTimelineContent(item.bullets, item.images)
  }));

  return (
    <div className="w-full">
      {/* Timeline component */}
      <Timeline data={formattedTimelineData} />
    </div>
  );
};

export default TimelineDemo;