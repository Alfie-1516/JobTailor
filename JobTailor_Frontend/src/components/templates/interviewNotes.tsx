interface InterviewNotesData {
    position: string[];
    company: string[];
    aboutCompany: string[];
    requiredYearsOfExperience: string[];
    salary: string[];
    requiredTechnicalSkills: string[];
    thingsToLearnPriorToInterview: string[];
    questionsToAskDuringInterview: string[];
  }
  
  export const generateInterviewNotesHTML = (data: InterviewNotesData): string => {
    if (!data) {
      return `
        <div style="display: flex; align-items: center; justify-content: center; height: 16rem;">
          <p style="color: #6b7280;">No interview notes data provided</p>
        </div>
      `;
    }
  
    const renderSection = (title: string, items: string[]) => {
      if (!items || items.length === 0 || (items.length === 1 && !items[0])) {
        return '';
      }
  
      const filteredItems = items.filter(item => item && item.trim());
      
      // For single item sections, render as paragraph instead of list
      if (filteredItems.length === 1) {
        return `
          <div style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1rem; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 0.25rem; margin-bottom: 0.75rem; letter-spacing: 0.05em;">
              ${title}
            </h2>
            <div style="font-size: 0.875rem; line-height: 1.6; text-align: justify; padding-left: 0.25rem;">
              ${filteredItems[0]}
            </div>
          </div>
        `;
      }
  
      // For multiple items, render as bulleted list
      return `
        <div style="margin-bottom: 1.5rem;">
          <h2 style="font-size: 1rem; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 0.25rem; margin-bottom: 0.75rem; letter-spacing: 0.05em;">
            ${title}
          </h2>
          <ul style="margin: 0; padding-left: 1.25rem; list-style-type: disc;">
            ${filteredItems.map(item => `
              <li style="font-size: 0.875rem; line-height: 1.5; margin-bottom: 0.5rem;">
                ${item}
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    };
  
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Interview Notes</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Times New Roman', serif;
            line-height: 1.5;
            color: #000;
            font-size: 12px;
            background-color: #fff;
          }
          .interview-notes-container {
            width: 210mm;
            min-height: 297mm;
            max-width: 100%;
            margin: 0 auto;
            background-color: white;
            padding: 1.5rem;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #000;
            padding-bottom: 1rem;
            margin-bottom: 2rem;
          }
          .title {
            font-size: 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin: 0;
          }
          .subtitle {
            font-size: 0.875rem;
            color: #666;
            margin-top: 0.5rem;
            font-style: italic;
          }
          @media print {
            .interview-notes-container {
              padding: 1rem;
              margin: 0;
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="interview-notes-container">
          <!-- Header -->
          <div class="header">
            <h1 class="title">Interview Preparation Notes</h1>
            <div class="subtitle">Comprehensive Interview Research & Preparation Guide</div>
          </div>
  
          <!-- Position Section -->
          ${renderSection('Position', data.position)}
  
          <!-- Company Section -->
          ${renderSection('Company', data.company)}
  
          <!-- About Company Section -->
          ${renderSection('About Company', data.aboutCompany)}
  
          <!-- Required Years of Experience Section -->
          ${renderSection('Required Years of Experience', data.requiredYearsOfExperience)}
  
          <!-- Salary Section -->
          ${renderSection('Salary', data.salary)}
  
          <!-- Required Technical Skills Section -->
          ${renderSection('Required Technical Skills', data.requiredTechnicalSkills)}
  
          <!-- Things to Learn Prior to Interview Section -->
          ${renderSection('Things to Learn Prior to Interview', data.thingsToLearnPriorToInterview)}
  
          <!-- Questions to Ask During Interview Section -->
          ${renderSection('Questions to Ask During Interview', data.questionsToAskDuringInterview)}
        </div>
      </body>
      </html>
    `;
  };