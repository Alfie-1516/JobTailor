import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import puppeteer from "puppeteer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { htmlContent } = body;

    // Save HTML file
    const htmlFilePath = join(
      process.cwd(),
      "public",
      "files",
      "coverLetter.html"
    );
    await writeFile(htmlFilePath, htmlContent, "utf8");

    // Convert to PDF using Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfPath = join(process.cwd(), "public", "files", "coverLetter.pdf");
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0.5in", right: "0.5in", bottom: "0.5in", left: "0.5in" },
    });

    await browser.close();

    return NextResponse.json({
      success: true,
      message: "Cover letter PDF saved successfully",
      filePath: "/files/coverLetter.pdf",
    });
  } catch (error) {
    console.error("Error saving cover letter PDF:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save cover letter PDF" },
      { status: 500 }
    );
  }
}
