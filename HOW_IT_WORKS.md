# ApplyWise: How It Works

## Overview

ApplyWise is a job application tracking and management system built with Ruby on Rails and React. It helps users (talents) organize and track their job applications through a kanban-style board interface. The application allows users to upload resumes, create tailored versions for specific jobs, and track the progress of their applications.

## Architecture

### Tech Stack

- **Backend**: Ruby on Rails 8.0 with PostgreSQL database
- **Frontend**: React with Tailwind CSS for styling
- **State Management**: React hooks, Context API, and use-immer for immutable state updates
- **File Storage**: AWS S3 via Active Storage
- **PDF Processing**: Uses pdf-reader gem to extract text from resume PDFs

### Data Models

1. **Talent**
   - Represents users of the application
   - Stores personal information, email, and preferences
   - Has many boards, resumes, notifications

2. **Board**
   - Represents a job tracking board for a talent
   - Has many board columns
   - Default name is "Job Board [Current Year]"

3. **BoardColumn**
   - Represents stages in the job application process (e.g., Wish, Applied, Interview)
   - Has a position attribute for ordering
   - Can be collapsed/expanded in the UI
   - Has many board cards

4. **BoardCard**
   - Represents a job in a specific column
   - Has position for ordering within a column
   - Belongs to a job and a board column

5. **Job**
   - Stores job details (role, company, description, URL)
   - Has many tailored resumes

6. **TailoredResume**
   - Customized resume for a specific job application
   - Contains build data (JSON) for the tailored resume

7. **TextPdf**
   - Extracted text and metadata from uploaded PDF resumes
   - Used for generating tailored resumes

8. **Notification**
   - System messages to users
   - Has read/unread status

### Frontend Components

- **Dashboard**: Main application container with sidebar navigation
- **Board**: Kanban-style board showing job application stages
  - Supports both kanban and list views
  - Allows drag-and-drop of cards between columns
- **Job**: Detailed view of a job with tabs
  - Details tab for job information
  - Resume tab for creating tailored resumes
  - Cover letter tab
  - Interview prep tab
- **Profile**: User profile management
- **Support**: Help and support section

## Key Features

### 1. Job Board Management

- Create and manage job boards
- Default columns: Wish, Applied, Contacted, Interview, Rejected
- Drag-and-drop cards between columns
- Collapse/expand columns
- Toggle between kanban and list views

### 2. Job Application Tracking

- Add new job applications with company and role details
- Move jobs through application stages
- Store job details including description and URL

### 3. Resume Management

- Upload PDF resumes
- Extract text and information from resumes
- Create tailored versions for specific job applications

### 4. Notifications

- System notifications for important events
- Inbox for viewing and managing notifications

## Technical Implementation

### Multi-tenancy

The system uses a partitioning approach (Partionable concern) to isolate data between users:

- Most models include `partition_id` to separate data
- Current talent is set in the session and used for scoping data access

### State Management

- React Context API for global state (DashboardContext, BoardContext)
- useImmerReducer for immutable state updates
- Action creators and reducers for predictable state changes

### Data Flow

1. Rails controllers handle API requests and data persistence
2. React components fetch data and update the UI
3. User actions trigger API calls to update the backend

### URL Structure

- `/dashboard` - Main dashboard
- `/dashboard/boards` - List of boards
- `/dashboard/boards/:board_id` - Specific board view
- `/dashboard/boards/:board_id/jobs/:job_id` - Job details view
- `/dashboard/profile` - User profile
- `/dashboard/notifications` - Notifications inbox
- `/dashboard/support` - Support section

## Development Workflow

The application combines Rails and React in a cohesive way:

- Turbo handles page navigation
- React components are mounted in specific views
- API endpoints are used for data fetching and manipulation

## Authentication

The system uses a simple authentication system:

- SignedMessage model for generating secure tokens
- Email-based authentication

## Advanced Features

- PDF text extraction for resume parsing
- Drag-and-drop card management
- Responsive design for different screen sizes
- Tailored resume generation
