import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

export default function HeroSectionSimpleCentred() {
  return (
    <>
      {/* Hero */}
      <div>
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          {/* Announcement Banner */}

          {/* End Announcement Banner */}
          {/* Title */}
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              AI-Powered Resume & Cover Letter Generator
            </h1>
          </div>
          {/* End Title */}
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="text-muted-foreground text-xl">
              Job Tailor creates personalized resumes, cover letters, and interview notes based on
              the job description you provide and your saved profile details. Stand out with tailored applications.
            </p>
          </div>
          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-3">
            <Button size={"lg"}>Create Resume</Button>
            <Button size={"lg"} variant={"outline"}>
              Build Profile
            </Button>
          </div>
          {/* End Buttons */}
          <div className="mt-5 flex items-center justify-center gap-x-1 sm:gap-x-3">
            <span className="text-muted-foreground text-sm">
              Trusted by:
            </span>
            <span className="text-sm font-bold">10,000+ Job Seekers</span>
            <svg
              className="text-muted-foreground h-5 w-5"
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 13L10 3"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
            <a
              className="inline-flex items-center gap-x-1 text-sm font-medium decoration-2 hover:underline"
              href="#"
            >
              Success Stories
              <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
            </a>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
