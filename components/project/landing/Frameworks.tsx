import { Marquee } from "../../magicui/marquee";
import Framework from "./Framework";
import tools from "./tools";

export default function Frameworks() {
    console.log("Tools array:", tools);

    if (!Array.isArray(tools) || tools.length === 0) {
        return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>No tools available.</div>;
    }

    const firstRow = tools.slice(0, Math.ceil(tools.length / 2));
    const secondRow = tools.slice(Math.ceil(tools.length / 2));

    return (
        <div className="relative flex w-screen flex-col items-center justify-center overflow-hidden">
            <div className="marquee-container w-full">
                <Marquee className="[--duration:5]">
                    {firstRow.map((tool, index) => (
                        <div className="px-2 framework-item" key={`${tool.toolImage || "tool"}-${index}`}>
                            <Framework frameworkImage={tool.toolImage} />
                        </div>
                    ))}
                </Marquee>
                <Marquee reverse className="[--duration:5]">
                    {secondRow.map((tool, index) => (
                        <div className="px-2 framework-item" key={`${tool.toolImage || "tool"}-${index}`}>
                            <Framework frameworkImage={tool.toolImage} />
                        </div>
                    ))}
                </Marquee>
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r dark:from-[#000000] from-[#ffffff] to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l dark:from-[#000000] from-[#ffffff] to-transparent"></div>
        </div>
    );
}