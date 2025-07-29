"use client";
import { useEffect, useRef } from "react";
import Stage1 from "./stage1";
import Stage2 from "./stage2";
import Stage3 from "./stage3";
export default function Content({ setCurrentPage }) {
  const containerRef = useRef(null);

  const scrollToNextPage = () => {
    const container = containerRef.current;
    if (container) {
      const containerHeight = container.clientHeight;
      const currentPage = Math.round(container.scrollTop / containerHeight);
      const nextPage = Math.min(currentPage + 1, 2); // Max 3 pages (0, 1, 2)
      const nextScrollTop = nextPage * containerHeight;
      
      console.log('Scrolling from page', currentPage, 'to page', nextPage);
      
      container.scrollTo({
        top: nextScrollTop,
        behavior: 'smooth'
      });
      
      // Update the current page state
      setCurrentPage(nextPage);
    }
  };

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
      className="w-full h-full overflow-y-scroll scroll-smooth snap-y snap-mandatory "
      ref={containerRef}
    >
      {/* Page 1 */}
      <div className="w-full h-full  flex items-center  justify-center snap-start p-20">
        <Stage1 onNext={scrollToNextPage} />
      </div>

      {/* Page 2 */}
      <div className="w-full h-full  flex items-center justify-center snap-start">
        <Stage2 onNext={scrollToNextPage} />
      </div>

      {/* Page 3 */}
      <div className="w-full h-full flex items-center justify-center snap-start">
        <Stage3 />
      </div>
    </div>
  );
}
