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
- **Real-time Features**: Action Cable for WebSocket support
- **Background Jobs**: Active Job for asynchronous processing
- **Testing**: RSpec for backend testing, Jest for frontend testing
- **Deployment**: Docker and Kamal for containerized deployment

### Data Models

1. **Talent**
   - Represents users of the application
   - Stores personal information, email, and preferences
   - Has many boards, resumes, notifications, contacts, and notes

2. **Board**
   - Represents a job tracking board for a talent
   - Has many board columns
   - Default name is "Job Board [Current Year]"
   - Supports drag-and-drop reordering of columns

3. **BoardColumn**
   - Represents stages in the job application process (e.g., Wish, Applied, Interview)
   - Has a position attribute for ordering
   - Can be collapsed/expanded in the UI
   - Has many board cards
   - Supports custom column names and colors

4. **BoardCard**
   - Represents a job in a specific column
   - Has position for ordering within a column
   - Belongs to a job and a board column
   - Supports drag-and-drop reordering within and between columns

5. **Job**
   - Stores job details (role, company, description, URL)
   - Has many tailored resumes
   - Can have associated contacts and notes

6. **TailoredResume**
   - Customized resume for a specific job application
   - Contains build data (JSON) for the tailored resume
   - Supports versioning and history

7. **TextPdf**
   - Extracted text and metadata from uploaded PDF resumes
   - Used for generating tailored resumes
   - Stores structured data for easy querying

8. **Notification**
   - System messages to users
   - Has read/unread status
   - Supports different notification types and priorities

9. **Contact**
   - Represents people associated with job applications
   - Stores contact information and relationship to jobs

10. **Note**
    - User-created notes associated with jobs or contacts
    - Supports rich text formatting
    - Can be private or shared

### Frontend Components

- **Dashboard**: Main application container with sidebar navigation
  - Responsive design with mobile support
  - Quick access to recent boards and jobs
- **Board**: Kanban-style board showing job application stages
  - Supports both kanban and list views
  - Allows drag-and-drop of cards between columns
  - Column customization (name, color, collapse/expand)
  - Card filtering and search
- **Job**: Detailed view of a job with tabs
  - Details tab for job information
  - Resume tab for creating tailored resumes
  - Cover letter tab
  - Interview prep tab
  - Notes and contacts management
- **Profile**: User profile management
  - Personal information
  - Preferences and settings
  - Resume management
- **Support**: Help and support section
  - FAQ and documentation
  - Contact support
- **Inbox**: Notification management
  - Real-time updates
  - Mark as read/unread
  - Filter by type

## Key Features

### 1. Job Board Management

- Create and manage job boards
- Default columns: Wish, Applied, Contacted, Interview, Rejected
- Drag-and-drop cards between columns
- Collapse/expand columns
- Toggle between kanban and list views
- Custom column names and colors
- Board sharing and collaboration

### 2. Job Application Tracking

- Add new job applications with company and role details
- Move jobs through application stages
- Store job details including description and URL
- Associate contacts with jobs
- Add notes and comments
- Track application deadlines and follow-ups

### 3. Resume Management

- Upload PDF resumes
- Extract text and information from resumes
- Create tailored versions for specific job applications
- Version control for tailored resumes
- A/B testing of different resume versions
- Export resumes in multiple formats

### 4. Contact Management

- Store contact information for recruiters and hiring managers
- Associate contacts with specific jobs
- Track communication history
- Set reminders for follow-ups

### 5. Notes and Documentation

- Create rich text notes for jobs and contacts
- Organize notes by category
- Share notes with team members
- Version history for notes

### 6. Notifications

- System notifications for important events
- Inbox for viewing and managing notifications
- Email notifications for critical updates
- Custom notification preferences

## Technical Implementation

### Multi-tenancy

The system uses a partitioning approach (Partionable concern) to isolate data between users:

- Most models include `partition_id` to separate data
- Current talent is set in the session and used for scoping data access
- Secure token-based authentication

### State Management

- React Context API for global state (DashboardContext, BoardContext)
- useImmerReducer for immutable state updates
- Action creators and reducers for predictable state changes
- Real-time updates via Action Cable

### Data Flow

1. Rails controllers handle API requests and data persistence
2. React components fetch data and update the UI
3. User actions trigger API calls to update the backend
4. Background jobs handle heavy processing tasks
5. WebSocket connections maintain real-time updates

### URL Structure

- `/dashboard` - Main dashboard
- `/dashboard/boards` - List of boards
- `/dashboard/boards/:board_id` - Specific board view
- `/dashboard/boards/:board_id/jobs/:job_id` - Job details view
- `/dashboard/profile` - User profile
- `/dashboard/notifications` - Notifications inbox
- `/dashboard/support` - Support section
- `/dashboard/contacts` - Contact management
- `/dashboard/notes` - Notes management

## Development Workflow

The application combines Rails and React in a cohesive way:

- Turbo handles page navigation
- React components are mounted in specific views
- API endpoints are used for data fetching and manipulation
- Docker containers for consistent development environment
- Automated testing with RSpec and Jest
- Continuous Integration/Deployment pipeline

## Authentication

The system uses a secure authentication system:

- SignedMessage model for generating secure tokens
- Email-based authentication
- Session management
- Password reset functionality
- Two-factor authentication support

## Advanced Features

- PDF text extraction for resume parsing
- Drag-and-drop card management
- Responsive design for different screen sizes
- Tailored resume generation
- Real-time collaboration features
- Export functionality for resumes and job data
- Integration with job boards and ATS systems
- Analytics and reporting
- Mobile-responsive design
- Accessibility support
- Internationalization support
