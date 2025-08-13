"use client";
import { useEffect, useRef, useState } from "react";
import Stage1 from "./stage1";
import Stage2 from "./stage2";
import Stage3 from "./stage3";
import { useUser } from "@/context/UserContext";
import { get_user_details, generate_resume, generate_cover_letter, generate_interview_notes } from "@/api";
import { generateResumeHTML } from "@/components/templates/resume";
import { generateCoverLetterHTML } from "@/components/templates/coverLetter";
import { generateInterviewNotesHTML } from "@/components/templates/interviewNotes";


export default function Content({ setCurrentPage }) {
  const { user } = useUser();
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    stage1: null,
    stage2: null,
  });
  const [userDetails, setUserDetails] = useState({});
  const [resumeGenerated, setResumeGenerated] = useState(false);
  const [coverLetterGenerated, setCoverLetterGenerated] = useState(false);
  const [interviewNotesGenerated, setInterviewNotesGenerated] = useState(false);

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


      // Call generate APIs if we have the required data
      if (formData.stage1?.jobDescription && userDetails) {
        // Clear all files in the files folder
        try {
          await fetch('/api/clear-files', {
            method: 'POST'
          });
        } catch (error) {
          console.error("Error clearing files:", error);
        }
        const jobDescription = formData.stage1.jobDescription;
        const userDetailsString = JSON.stringify(userDetails);
        const companyName = formData.stage1.companyName || "Unknown Company";

        const resumeResult = await generate_resume(
          jobDescription,
          userDetailsString
        );
        const htmlContent = generateResumeHTML(resumeResult);
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
            setResumeGenerated(true);
          } else {
            console.error("Failed to save resume HTML");
          }
        } catch (error) {
          console.error("Error saving resume HTML:", error);
        }
        const coverLetterResult = await generate_cover_letter(
          jobDescription,
          userDetailsString,
          
        );
        const coverLetterHtmlContent = generateCoverLetterHTML(coverLetterResult);
        try {
          const response = await fetch('/api/save-coverLetter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              htmlContent: coverLetterHtmlContent
            })
          });
          
          if (response.ok) {
            console.log("Cover Letter HTML saved to coverLetter.txt");
            setCoverLetterGenerated(true);
          } else {
            console.error("Failed to save cover Letter HTML");
          }
        } catch (error) {
          console.error("Error saving resume HTML:", error);
        }
        const interviewNotesResult = await generate_interview_notes(
          jobDescription,
          userDetailsString
        );
        const interviewNotesHtmlContent = generateInterviewNotesHTML(interviewNotesResult);
        try {
          const response = await fetch('/api/save-InterviewNotes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              htmlContent: interviewNotesHtmlContent
            })
          });
          
          if (response.ok) {
            console.log("Interview Notes HTML saved to interviewNotes.txt");
            setInterviewNotesGenerated(true);
          } else {
            console.error("Failed to save interview Notes HTML" , response);
          }
        } catch (error) {
          console.error("Error saving interview Notes HTML:", error);
        }

        
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
        <Stage3 resumeGenerated={resumeGenerated} coverLetterGenerated={coverLetterGenerated} interviewNotesGenerated={interviewNotesGenerated} />
      </div>
    </div>
  );
}
