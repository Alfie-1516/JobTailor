"use client";
import { useEffect, useRef, useState } from "react";
import Stage1 from "./stage1";
import Stage2 from "./stage2";
import Stage3 from "./stage3";
import { useUser } from "@/context/UserContext";
import { get_user_details, generate_resume } from "@/api";

export default function Content({ setCurrentPage }) {
  const { user } = useUser();
  console.log(user?._id);
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
    setFormData((prev) => ({ ...prev, stage2: data }));

    // Print all collected data after stage2 is submitted
    console.log("=== ALL COLLECTED DATA ===");
    console.log("User Details:", userDetails);
    console.log("Stage 1 Data:", formData.stage1);
    console.log("Stage 2 Data:", data);
    console.log("Complete Form Data:", { ...formData, stage2: data });

    // Call generate resume API
    try {
      const jobDescription = formData.stage1?.jobDescription || "";
      const userDetailsString = JSON.stringify(userDetails);

      console.log("Calling generate_resume API...");
      const resumeResult = await generate_resume(
        jobDescription,
        userDetailsString
      );

      console.log("=== GENERATED RESUME ===");
      console.log(resumeResult);
    } catch (error) {
      console.error("Error generating resume:", error);
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
