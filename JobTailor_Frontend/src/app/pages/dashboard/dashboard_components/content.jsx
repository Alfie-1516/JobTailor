"use client";
import { useEffect, useRef, useState } from "react";
import Stage1 from "./stage1";
import Stage2 from "./stage2";
import Stage3 from "./stage3";


export default function Content({ setCurrentPage }) {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    stage1: null,
    stage2: null,
  });
  const [resumeGenerated, setResumeGenerated] = useState(false);
  const [coverLetterGenerated, setCoverLetterGenerated] = useState(false);
  const [interviewNotesGenerated, setInterviewNotesGenerated] = useState(false);

  const scrollToNextPage = () => {
    try {
      const container = containerRef.current;
      if (container) {
        const containerHeight = container.clientHeight;
        const currentPage = Math.round(container.scrollTop / containerHeight);
        const nextPage = Math.min(currentPage + 1, 2); // Max 3 pages (0, 1, 2)
        const nextScrollTop = nextPage * containerHeight;


        container.scrollTo({
          top: nextScrollTop,
          behavior: "smooth",
        });

        // Update the current page state
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Error in scrollToNextPage:", error);
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
  }, [setCurrentPage]);

  const handleStage1Data = (data) => {
    setFormData((prev) => ({ ...prev, stage1: data }));
  };

  const handleStage2Data = (data) => {
    try {
      setFormData((prev) => ({ ...prev, stage2: data }));
      // Temporary local-only flow while generation APIs are rebuilt.
      // Mark steps complete so the dashboard can progress to stage 3.
      setResumeGenerated(true);
      setCoverLetterGenerated(true);
      setInterviewNotesGenerated(true);
    } catch (error) {
      console.error("Error in handleStage2Data:", error);
    }
  };

  return (
    <div
      className="w-full h-full overflow-y-scroll scroll-smooth snap-y snap-mandatory "
      ref={containerRef}
    >
      {/* Page 1 */}
      <div className="w-full h-full  flex items-center  justify-center snap-start p-20">
        <Stage1 onNext={scrollToNextPage} onDataSubmit={handleStage1Data} />
      </div>

      {/* Page 2 */}
      <div className="w-full h-full  flex items-center justify-center snap-start">
        <Stage2 onNext={scrollToNextPage} onDataSubmit={handleStage2Data} />
      </div>

      {/* Page 3 */}
      <div className="w-full h-full flex items-center justify-center snap-start">
        <Stage3 resumeGenerated={resumeGenerated} coverLetterGenerated={coverLetterGenerated} interviewNotesGenerated={interviewNotesGenerated} />
      </div>
    </div>
  );
}
