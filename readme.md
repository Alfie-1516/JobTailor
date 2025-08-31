# 🎯 JobTailor

> **AI-Powered Resume & Cover Letter Generator**  
> _Craft personalized job applications that stand out from the crowd_

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16.2-green?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-5.8.3-green?style=for-the-badge&logo=openai)](https://openai.com/)

---

## ✨ Overview

JobTailor is an intelligent application that helps job seekers create personalized resumes, cover letters, and interview preparation notes based on specific job descriptions. By leveraging AI technology, it analyzes job requirements and tailors your application materials to maximize your chances of landing interviews.

**Built with ❤️ by [Alfred Okorocha](https://github.com/yourusername)**

---

## 🚀 Features

- **🤖 AI-Powered Generation**: Uses OpenAI's advanced language models to create tailored content
- **📝 Resume Optimization**: Generates ATS-friendly resumes optimized for specific job descriptions
- **💌 Cover Letter Creation**: Crafts personalized cover letters that highlight relevant experience
- **📋 Interview Preparation**: Generates comprehensive interview notes with key talking points
- **👤 User Profiles**: Save and manage your professional information for consistent applications
- **📱 Modern UI**: Beautiful, responsive interface built with Next.js and Tailwind CSS
- **🔒 Secure Authentication**: User registration and login system
- **📄 PDF Export**: Download your generated documents in professional PDF format

---

## 🏗️ Architecture

```
JobTailor/
├── 🎨 Frontend (Next.js + React + TypeScript)
│   ├── Modern UI with Tailwind CSS
│   ├── Responsive dashboard
│   ├── Form components and validation
│   └── PDF generation and export
│
└── ⚙️ Backend (Node.js + Express + MongoDB)
    ├── RESTful API endpoints
    ├── OpenAI integration
    ├── User management
    └── Document generation
```

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.3.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Ant Design
- **PDF Generation**: Puppeteer
- **State Management**: React Context

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **AI Integration**: OpenAI API
- **Authentication**: JWT-based
- **CORS**: Enabled for cross-origin requests

---

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud)
- **OpenAI API Key** for AI-powered content generation

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/JobTailor.git
cd JobTailor
```

### 2. Backend Setup

```bash
cd JobTailor_Backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure your `.env` file:**

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/JobTailor
# or for cloud: mongodb+srv://username:password@cluster.mongodb.net/JobTailor

# OpenAI API Configuration
In directory JobTailor_Backend/Controller/ServerController add in your api key as follows
 apiKey:
    "your_openai_api_key_here",
});

# Server Configuration
PORT=5001
NODE_ENV=development
```

**Get your OpenAI API Key:**

1. Visit [Open Router Platform](https://openrouter.ai/deepseek/deepseek-r1-0528:free/api)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env` file

### 3. Frontend Setup

```bash
cd ../JobTailor_Frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

**Configure your `.env.local` file:**

```env
# Backend API URL
NEXT_PUBLIC_API_BASE=http://localhost:5001/api

```

### 4. Start the Application

**Terminal 1 - Backend:**

```bash
cd JobTailor_Backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd JobTailor_Frontend
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001/api

---

## 📖 Usage Guide

### 1. **User Registration & Login**

- Create a new account or sign in with existing credentials
- Complete your profile with professional information

### 2. **Job Description Input**

- Navigate to the dashboard
- Paste the job description you're applying for
- Add company name and any additional context

### 3. **Profile Confirmation**

- Review and confirm your experience details
- Add any additional context relevant to the position

### 4. **Document Generation**

- AI analyzes the job requirements and your profile
- Generates tailored resume, cover letter, and interview notes
- Download all documents as PDFs

---

## 🔧 API Endpoints

### Authentication

- `POST /api/users/` - User registration
- `POST /api/users/login` - User login

### Document Generation

- `POST /api/generate-resume` - Generate tailored resume
- `POST /api/generate-cover-letter` - Generate cover letter
- `POST /api/generate-interview-notes` - Generate interview notes

### User Management

- `GET /api/about-users/:id` - Get user profile
- `POST /api/about-users` - Create user profile
- `PUT /api/about-users/:id` - Update user profile
- `DELETE /api/about-users/:id` - Delete user profile

---

## 🌟 Key Features Explained

### **AI-Powered Content Generation**

The application uses OpenAI's GPT models to analyze job descriptions and generate content that:

- Matches the job requirements
- Highlights relevant experience
- Uses industry-specific language
- Optimizes for ATS systems

### **Smart Profile Management**

- Store your professional information securely
- Reuse across multiple applications
- Easy updates and modifications
- Consistent formatting across documents

### **Professional PDF Export**

- Clean, professional formatting
- ATS-friendly layouts
- High-quality output
- Easy sharing and printing

---

## 🚨 Troubleshooting

### Common Issues

**Backend won't start:**

- Check if MongoDB is running
- Verify your `.env` file configuration
- Ensure port 5001 is available

**Frontend can't connect to backend:**

- Verify backend is running on port 5001
- Check CORS configuration
- Ensure API_BASE_URL is correct

**OpenAI API errors:**

- Verify your API key is correct
- Check your OpenAI account balance
- Ensure the API key has proper permissions

**PDF generation fails:**

- Check Puppeteer installation
- Verify file permissions in `/public/files/`
- Ensure sufficient disk space

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


---

## 🙏 Acknowledgments

- **OpenAI** for providing the AI capabilities
- **Next.js team** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Ant Design** for the beautiful UI components

---

## 📞 Support

If you have any questions or need help:

- **Email**: your.email@example.com
- **GitHub Issues**: [Create an issue](https://github.com/Alfie-1516/JobTailor/issues)
- **Documentation**: Check this README and code comments

---

<div align="center">

**Made with ❤️ by Alfred Okorocha**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourusername)

**⭐ Star this repository if you found it helpful!**

</div>
