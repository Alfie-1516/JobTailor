"use client";
import { useEffect, useRef, useState } from "react";
import Stage1 from "./stage1";
import Stage2 from "./stage2";
import Stage3 from "./stage3";
import { useUser } from "@/context/UserContext";
import { get_user_details, generate_resume, generate_cover_letter, generate_interview_notes } from "@/api";
import { generateResumeHTML } from "@/components/templates/resume";

export default function Content({ setCurrentPage }) {
  const { user } = useUser();
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    stage1: null,
    stage2: null,
  });
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (!user?._id) return;

    const fetchUserDetails = async () => {
      try {
        const details = await get_user_details(user._id);
        if (details.success) {
          setUserDetails(details.data);
        } else {
          // No user details found - this is normal for new users
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [user?._id]);

  const scrollToNextPage = () => {
    try {
      const container = containerRef.current;
      if (container) {
        const containerHeight = container.clientHeight;
        const currentPage = Math.round(container.scrollTop / containerHeight);
        const nextPage = Math.min(currentPage + 1, 2); // Max 3 pages (0, 1, 2)
        const nextScrollTop = nextPage * containerHeight;

        console.log('Scrolling from page', currentPage, 'to page', nextPage);

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
  }, []);

  const handleStage1Data = (data) => {
    setFormData((prev) => ({ ...prev, stage1: data }));
  };

  const handleStage2Data = async (data) => {
    try {
      setFormData((prev) => ({ ...prev, stage2: data }));

      // Print all collected data after stage2 is submitted
      console.log("=== ALL COLLECTED DATA ===");
      console.log("User Details:", userDetails);
      console.log("Stage 1 Data:", formData.stage1);
      console.log("Stage 2 Data:", data);
      console.log("Complete Form Data:", { ...formData, stage2: data });

      // Call generate APIs if we have the required data
      if (formData.stage1?.jobDescription && userDetails) {
        const jobDescription = formData.stage1.jobDescription;
        const userDetailsString = JSON.stringify(userDetails);
        const companyName = formData.stage1.companyName || "Unknown Company";

        console.log("Calling generate APIs...");

        // Generate Resume
        console.log("Calling generate_resume API...");
        const resumeResult = await generate_resume(
          jobDescription,
          userDetailsString
        );
        console.log("=== GENERATED RESUME ===");
        const htmlContent = generateResumeHTML(resumeResult);
        console.log(htmlContent);
        
        // Save to resume.txt file
        try {
          const response = await fetch('/api/save-resume', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              htmlContent: htmlContent
            })
          });
          
          if (response.ok) {
            console.log("Resume HTML saved to resume.txt");
          } else {
            console.error("Failed to save resume HTML");
          }
        } catch (error) {
          console.error("Error saving resume HTML:", error);
        }

        

        // Generate Cover Letter
        console.log("Calling generate_cover_letter API...");
        const coverLetterResult = await generate_cover_letter(
          jobDescription,
          userDetailsString,
          companyName
        );
        console.log("=== GENERATED COVER LETTER ===");
        console.log(coverLetterResult);

        // Generate Interview Notes
        console.log("Calling generate_interview_notes API...");
        const interviewNotesResult = await generate_interview_notes(
          jobDescription,
          userDetailsString,
          companyName
        );
        console.log("=== GENERATED INTERVIEW NOTES ===");
        console.log(interviewNotesResult);
      } else {
        console.log("Missing required data for document generation");
      }
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
        <Stage3 />
      </div>
    </div>
  );
}
