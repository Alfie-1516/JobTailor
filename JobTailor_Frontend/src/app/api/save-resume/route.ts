import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { htmlContent } = body;

    // Save to resume.txt file in the public directory
    const filePath = join(process.cwd(), "public", "resume.html");
    await writeFile(filePath, htmlContent, "utf8");

    return NextResponse.json({
      success: true,
      message: "Resume HTML saved successfully",
      filePath: "/resume.html",
    });
  } catch (error) {
    console.error("Error saving resume HTML:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save resume HTML" },
      { status: 500 }
    );
  }
}
