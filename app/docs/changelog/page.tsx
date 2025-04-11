import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

// Timeline data defined separately
const timelineData = [
  {
    title: "2024",
    content: (
      <div>
        <ul className="flex flex-col gap-4">
          <li className="list-item">
            Built and launched Aceternity UI and Aceternity UI Pro from scratch
          </li>
          <li className="list-item">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((img, index) => (
                <Image
                  key={index}
                  src="/placeholder.png"
                  alt={`Image ${index + 1} for 2024`}
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full"
                />
              ))}
            </div>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Early 2023",
    content: (
      <div>
        <ul className="flex flex-col gap-4">
          <li className="list-item">
            I usually run out of copy, but when I see content this big, I try to
            integrate lorem ipsum.
          </li>
          <li className="list-item">
            Lorem ipsum is for people who are too lazy to write copy. But we are
            not. Here are some more examples of beautiful designs I built.
          </li>
          <li className="list-item">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((img, index) => (
                <Image
                  key={index}
                  src="/placeholder.png"
                  alt={`Design ${index + 1}`}
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full"
                />
              ))}
            </div>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Changelog",
    content: (
      <div>
        <ul className="flex flex-col gap-4">
          <li className="list-item">
            Deployed 5 new components on Aceternity today
          </li>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <li key={index} className="list-item">
              ✅ Component {item}
            </li>
          ))}
          <li className="list-item">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((img, index) => (
                <Image
                  key={index}
                  src="/placeholder.png"
                  alt={`Changelog Image ${index + 1}`}
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full"
                />
              ))}
            </div>
          </li>
        </ul>
      </div>
    ),
  },
];

// React functional component
function TimelineDemo() {
  return (
    <div className="w-full">
      <Timeline data={timelineData} />
    </div>
  );
}

export default TimelineDemo;