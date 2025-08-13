import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Define the files directory path (relative to project root)
    const filesDir = path.join(process.cwd(), 'public', 'files');
    
    // Define the files to check for
    const filesToCheck = [
      { key: 'resume', filename: 'resume.pdf' },
      { key: 'coverLetter', filename: 'coverLetter.pdf' },
      { key: 'interviewNotes', filename: 'interviewNotes.pdf' }
    ];

    const fileStatus: Record<string, boolean> = {};
    let allFilesExist = true;

    // Check each file
    for (const file of filesToCheck) {
      const filePath = path.join(filesDir, file.filename);
      
      try {
        await fs.access(filePath, fs.constants.F_OK);
        fileStatus[file.key] = true;
      } catch (error) {
        fileStatus[file.key] = false;
        allFilesExist = false;
      }
    }

    // Return the status
    return NextResponse.json({
      filesExist: allFilesExist,
      files: fileStatus,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error checking files:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      filesExist: false,
      files: {
        resume: false,
        coverLetter: false,
        interviewNotes: false
      }
    }, { status: 500 });
  }
}