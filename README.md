# Issue Tracker

A simple yet effective web application for tracking and managing issues or tasks in a team or personal project. Built as a foundational project to demonstrate core web development skills, this app allows users to create, view, update, and delete issues with basic filtering and search capabilities. While developed several years ago, it showcases efficient use of modern frontend tools at the time, with a focus on clean, maintainable code.


## Features

- **Create Issues**: Quickly add new issues with title, description, status (Open/Closed), and priority (Low/Medium/High).
- **View & List Issues**: Display all issues in a clean, paginated list with sortable columns.
- **Update & Delete**: Edit issue details or mark as resolved; permanent delete option for cleanup.
- **Search & Filter**: Real-time search by keywords and filter by status or priority for quick navigation.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.
- **Local Data Persistence**: Uses browser localStorage for data saving (no external database required for demo purposes).

This project is ideal for small teams or solo developers needing a lightweight issue management tool without complex setups.

## Tech Stack

- **Frontend**: Next.js (App Router) for server-side rendering and dynamic routing.
- **Styling**: Tailwind CSS for utility-first, responsive design.
- **JavaScript**: ES6+ with basic async patterns (no advanced hooks like useState/useEffect in this version, as it predates heavy React adoption).
- **Data Management**: Custom API routes in Next.js for CRUD operations; localStorage for persistence.
- **Other**: No external dependencies beyond Next.js and Tailwind; kept minimal for performance.

Note: This project was built several years ago, so it uses foundational React/Next.js patterns without modern features like React 18+ or TypeScript. For current work, I integrate advanced state management (e.g., Redux/Zustand) and TypeScript.

## Project Structure
