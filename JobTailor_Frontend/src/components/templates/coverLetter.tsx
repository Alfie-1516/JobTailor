interface CoverLetterData {
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    applicantLocation: string;
    date: string;
    recipientName: string;
    companyName: string;
    greeting: string;
    openingParagraph: string;
    bodyParagraph1: string;
    bodyParagraph2: string;
    bodyParagraph3: string;
    closingParagraph: string;
    signature?: string;
    keywordsUsed?: string[];
  }
  
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  export const generateCoverLetterHTML = (data: CoverLetterData): string => {
    if (!data) {
      return `
        <div style="display: flex; align-items: center; justify-content: center; height: 16rem;">
          <p style="color: #6b7280;">No cover letter data provided</p>
        </div>
      `;
    }
  
    const formattedDate = formatDate(data.date);
    const signature = data.signature || `Sincerely,\n\n${data.applicantName}`;
  
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cover Letter - ${data.applicantName}</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            color: #000;
            font-size: 12px;
            background-color: #fff;
          }
          .cover-letter-container {
            width: 210mm;
            min-height: 297mm;
            max-width: 100%;
            margin: 0 auto;
            background-color: white;
            padding: 1.5rem;
          }
          .header {
            margin-bottom: 2rem;
          }
          .applicant-info {
            text-align: left;
            margin-bottom: 1.5rem;
          }
          .date {
            margin-bottom: 2rem;
            text-align: left;
          }
          .recipient-info {
            margin-bottom: 2rem;
            text-align: left;
          }
          .greeting {
            margin-bottom: 1.5rem;
          }
          .body-content {
            margin-bottom: 2rem;
          }
          .paragraph {
            margin-bottom: 1.5rem;
            text-align: justify;
            line-height: 1.6;
          }
          .closing {
            margin-bottom: 3rem;
          }
          .signature {
            white-space: pre-line;
          }
          @media print {
            .cover-letter-container {
              padding: 1rem;
              margin: 0;
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="cover-letter-container">
          <!-- Applicant Header -->
          <div class="header">
            <div class="applicant-info">
              <div style="font-weight: bold; font-size: 14px; margin-bottom: 0.25rem;">
                ${data.applicantName}
              </div>
              <div style="margin-bottom: 0.125rem;">${data.applicantEmail}</div>
              <div style="margin-bottom: 0.125rem;">${data.applicantPhone}</div>
              <div>${data.applicantLocation}</div>
            </div>
          </div>
  
          <!-- Date -->
          <div class="date">
            ${formattedDate}
          </div>
  
          <!-- Recipient Information -->
          ${data.recipientName || data.companyName ? `
            <div class="recipient-info">
              ${data.recipientName ? `<div style="font-weight: bold; margin-bottom: 0.25rem;">${data.recipientName}</div>` : ''}
              ${data.companyName ? `<div>${data.companyName}</div>` : ''}
            </div>
          ` : ''}
  
          <!-- Greeting -->
          <div class="greeting">
            ${data.greeting}
          </div>
  
          <!-- Body Content -->
          <div class="body-content">
            <!-- Opening Paragraph -->
            <div class="paragraph">
              ${data.openingParagraph}
            </div>
  
            <!-- Body Paragraph 1 -->
            <div class="paragraph">
              ${data.bodyParagraph1}
            </div>
  
            <!-- Body Paragraph 2 -->
            <div class="paragraph">
              ${data.bodyParagraph2}
            </div>
  
            <!-- Body Paragraph 3 -->
            <div class="paragraph">
              ${data.bodyParagraph3}
            </div>
  
            <!-- Closing Paragraph -->
            <div class="paragraph">
              ${data.closingParagraph}
            </div>
          </div>
  
          <!-- Closing and Signature -->
          <div class="closing">
            <div class="signature">
              ${signature}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };