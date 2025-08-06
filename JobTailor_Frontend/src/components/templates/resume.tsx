interface ResumeData {
  basics?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: {
      city: string;
      state: string;
      country: string;
    };
    profiles?: Array<{
      network: string;
      url: string;
    }>;
    summary: string;
  };
  work?: Array<{
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights?: string[];
    technologies?: string[];
  }>;
  education?: Array<{
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
  }>;
  skills?: Array<{
    name: string;
    keywords: string[];
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  projects?: Array<{
    name: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights?: string[];
    technologies?: string[];
    url?: string;
  }>;
  awards?: Array<{
    title: string;
    date: string;
    summary: string;
  }>;
  volunteer?: Array<{
    organization: string;
    position: string;
    startDate: string;
    endDate: string;
    summary: string;
  }>;
}

const formatDate = (dateStr: string): string => {
  if (dateStr === "Present") return "Present";
  const date = new Date(dateStr + "-01");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

export const generateResumeHTML = (data: ResumeData): string => {
  if (!data) {
    return `
      <div style="display: flex; align-items: center; justify-content: center; height: 16rem;">
        <p style="color: #6b7280;">No resume data provided</p>
      </div>
    `;
  }

  const profilesHTML = data.basics?.profiles
    ? data.basics.profiles.map(profile => ` | ${profile.network}: ${profile.url}`).join('')
    : '';

  const summaryHTML = data.basics?.summary ? `
    <div style="margin-bottom: 1rem;">
      <h2 style="font-size: 0.875rem; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 0.125rem; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
        Summary
      </h2>
      <div style="font-size: 0.75rem; line-height: 1.625; text-align: justify; margin-bottom: 0.25rem;">
        ${data.basics.summary}
      </div>
    </div>
  ` : '';

  const workHTML = data.work && data.work.length > 0 ? `
    <div style="margin-bottom: 1rem;">
      <h2 style="font-size: 0.875rem; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 0.125rem; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
        Experience
      </h2>
      ${data.work.map(job => `
        <div style="margin-bottom: 0.625rem;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
            <div>
              <div style="font-weight: bold; font-size: 0.75rem;">${job.position}</div>
              <div style="font-style: italic; font-size: 0.75rem;">${job.company}</div>
            </div>
            <div style="font-size: 0.75rem; font-style: italic;">
              ${formatDate(job.startDate)} - ${formatDate(job.endDate)}
            </div>
          </div>
          <div style="font-size: 0.75rem; margin-bottom: 0.25rem; line-height: 1.25;">${job.summary}</div>
          ${job.highlights && job.highlights.length > 0 ? `
            <div style="padding-left: 1rem; margin: 0.25rem 0;">
              <ul style="margin: 0; padding-left: 1rem;">
                ${job.highlights.map(highlight => `
                  <li style="font-size: 0.75rem; margin-bottom: 0.125rem; line-height: 1.25;">
                    ${highlight}
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}
          ${job.technologies && job.technologies.length > 0 ? `
            <div style="font-size: 0.75rem; margin-top: 0.25rem;">
              Technologies: <span style="font-style: italic;">${job.technologies.join(', ')}</span>
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
  ` : '';

  const educationHTML = data.education && data.education.length > 0 ? `
    <div style="margin-bottom: 1rem;">
      <h2 style="font-size: 0.875rem; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 0.125rem; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
        Education
      </h2>
      ${data.education.map(edu => `
        <div style="margin-bottom: 0.625rem;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
            <div>
              <div style="font-weight: bold; font-size: 0.75rem;">
                ${edu.studyType} in ${edu.area}
              </div>
              <div style="font-style: italic; font-size: 0.75rem;">${edu.institution}</div>
            </div>
            <div style="font-size: 0.75rem; font-style: italic;">
              ${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  ` : '';

  const skillsHTML = data.skills && data.skills.length > 0 ? `
    <div style="margin-bottom: 1rem;">
      <h2 style="font-size: 0.875rem; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 0.125rem; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
        Skills
      </h2>
      ${data.skills.map(skill => `
        <div style="font-size: 0.75rem; line-height: 1.25; margin-bottom: 0.25rem;">
          <strong>${skill.name}:</strong> ${skill.keywords.join(', ')}
        </div>
      `).join('')}
    </div>
  ` : '';

  const certificationsHTML = data.certifications && data.certifications.length > 0 ? `
    <div style="margin-bottom: 1rem;">
      <h2 style="font-size: 0.875rem; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 0.125rem; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
        Certifications
      </h2>
      ${data.certifications.map(cert => `
        <div style="margin-bottom: 0.25rem;">
          <div style="font-weight: bold; font-size: 0.75rem;">${cert.name}</div>
          <div style="font-size: 0.75rem; font-style: italic;">
            ${cert.issuer} - ${formatDate(cert.date)}
          </div>
        </div>
      `).join('')}
    </div>
  ` : '';

  const projectsHTML = data.projects && data.projects.length > 0 ? `
    <div style="margin-bottom: 1rem;">
      <h2 style="font-size: 0.875rem; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 0.125rem; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
        Projects
      </h2>
      ${data.projects.map(project => `
        <div style="margin-bottom: 0.625rem;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
            <div style="font-weight: bold; font-size: 0.75rem;">${project.name}</div>
            <div style="font-size: 0.75rem; font-style: italic;">
              ${formatDate(project.startDate)} - ${formatDate(project.endDate)}
            </div>
          </div>
          <div style="font-size: 0.75rem; margin-bottom: 0.25rem; line-height: 1.25;">
            ${project.summary}
          </div>
          ${project.highlights && project.highlights.length > 0 ? `
            <div style="padding-left: 1rem; margin: 0.25rem 0;">
              <ul style="margin: 0; padding-left: 1rem;">
                ${project.highlights.map(highlight => `
                  <li style="font-size: 0.75rem; margin-bottom: 0.125rem; line-height: 1.25;">
                    ${highlight}
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}
          ${project.technologies && project.technologies.length > 0 ? `
            <div style="font-size: 0.75rem; margin-top: 0.25rem;">
              Technologies: <span style="font-style: italic;">${project.technologies.join(', ')}</span>
            </div>
          ` : ''}
          ${project.url ? `
            <div style="font-size: 0.75rem; margin-top: 0.25rem;">URL: ${project.url}</div>
          ` : ''}
        </div>
      `).join('')}
    </div>
  ` : '';

  const awardsHTML = data.awards && data.awards.length > 0 ? `
    <div style="margin-bottom: 1rem;">
      <h2 style="font-size: 0.875rem; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 0.125rem; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
        Awards
      </h2>
      ${data.awards.map(award => `
        <div style="margin-bottom: 0.625rem;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
            <div style="font-weight: bold; font-size: 0.75rem;">${award.title}</div>
            <div style="font-size: 0.75rem; font-style: italic;">${formatDate(award.date)}</div>
          </div>
          <div style="font-size: 0.75rem; margin-bottom: 0.25rem; line-height: 1.25;">${award.summary}</div>
        </div>
      `).join('')}
    </div>
  ` : '';

  const volunteerHTML = data.volunteer && data.volunteer.length > 0 ? `
    <div style="margin-bottom: 1rem;">
      <h2 style="font-size: 0.875rem; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 0.125rem; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
        Volunteer Experience
      </h2>
      ${data.volunteer.map(vol => `
        <div style="margin-bottom: 0.625rem;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
            <div>
              <div style="font-weight: bold; font-size: 0.75rem;">${vol.position}</div>
              <div style="font-style: italic; font-size: 0.75rem;">${vol.organization}</div>
            </div>
            <div style="font-size: 0.75rem; font-style: italic;">
              ${formatDate(vol.startDate)} - ${formatDate(vol.endDate)}
            </div>
          </div>
          <div style="font-size: 0.75rem; margin-bottom: 0.25rem; line-height: 1.25;">${vol.summary}</div>
        </div>
      `).join('')}
    </div>
  ` : '';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume - ${data.basics?.firstName} ${data.basics?.lastName}</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Times New Roman', serif;
          line-height: 1.3;
          color: #000;
          font-size: 11px;
          background-color: #fff;
        }
        .resume-container {
          width: 210mm;
          min-height: 297mm;
          max-width: 100%;
          margin: 0 auto;
          background-color: white;
          padding: 1.25rem;
        }
        @media print {
          .resume-container {
            padding: 0;
            margin: 0;
            box-shadow: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="resume-container">
        <!-- Header Section -->
        <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.625rem; margin-bottom: 1rem;">
          <h1 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0;">
            ${data.basics?.firstName} ${data.basics?.lastName}
          </h1>
          <div style="font-size: 0.75rem; line-height: 1.25;">
            ${data.basics?.email} | ${data.basics?.phone} | ${data.basics?.location?.city}, ${data.basics?.location?.state}${profilesHTML}
          </div>
        </div>

        ${summaryHTML}
        ${workHTML}
        ${educationHTML}
        ${skillsHTML}
        ${certificationsHTML}
        ${projectsHTML}
        ${awardsHTML}
        ${volunteerHTML}
      </div>
    </body>
    </html>
  `;
};
