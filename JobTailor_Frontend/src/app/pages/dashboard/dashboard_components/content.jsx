"use client";
import { useEffect, useRef } from "react";
import Stage1 from "./stage1";
import Stage2 from "./stage2";
import Stage3 from "./stage3";
import Stage4 from "./stage4";
export default function Content({ setCurrentPage }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const page = Math.round(scrollTop / containerHeight);
      setCurrentPage(page);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="w-full h-full overflow-y-scroll scroll-smooth snap-y snap-mandatory bg-red-300"
      ref={containerRef}
    >
      {/* Page 1 */}
      <div className="w-full h-full  flex items-center bg-amber-500 justify-center snap-start p-20">
        <Stage1 />
      </div>

      {/* Page 2 */}
      <div className="w-full h-full  flex items-center justify-center snap-start">
        <Stage2 />
      </div>

      {/* Page 3 */}
      <div className="w-full h-full bg-red-500 flex items-center justify-center snap-start">
        <Stage3 />
      </div>

      {/* Page 4 */}
      <div className="w-full h-full bg-blue-500 flex items-center justify-center snap-start">
        <Stage4 />
      </div>
    </div>
  );
}
