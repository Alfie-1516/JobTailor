import { NextRequest, NextResponse } from "next/server";
import { readdir, unlink } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const filesDir = join(process.cwd(), "public", "files");

    // Read all files in the directory
    const files = await readdir(filesDir);

    // Delete each file
    for (const file of files) {
      try {
        await unlink(join(filesDir, file));
      } catch (error) {
        console.error(`Error deleting file ${file}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "All files cleared successfully",
      deletedCount: files.length,
    });
  } catch (error) {
    console.error("Error clearing files:", error);
    return NextResponse.json(
      { success: false, message: "Failed to clear files" },
      { status: 500 }
    );
  }
}
