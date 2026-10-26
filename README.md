# Employee Management System

A full-stack application with a Spring Boot backend and React (Vite) frontend organized in a unified repository.

---

## 📁 Repository Structure

```text
employee-portal1/
│
├── emp-web/                   # Frontend (React 19, Vite, Bootstrap, Axios)
│   ├── src/                   # React components & UI logic
│   ├── public/                # Static assets
│   ├── package.json           # Frontend dependencies & scripts
│   └── vite.config.js
│
├── emp-api/                   # Backend (Spring Boot, Java 21, Gradle)
│   ├── src/main/java/         # Controllers, Services, Repositories, Entities
│   ├── src/main/resources/    # application.properties
│   ├── build.gradle           # Gradle dependencies
│   └── gradlew.bat
│
└── start-dev.ps1              # One-click launcher script for both services
```

---

## 🚀 Running the Project

### Option A: One-Click Launch (PowerShell)
Run the PowerShell helper script from the root:
```powershell
.\start-dev.ps1
```

### Option B: Running Manually

#### 1. Backend (Spring Boot)
```bash
cd emp-api
./gradlew.bat bootRun
```
Backend runs by default at `http://localhost:9898` (or configured port in `application.properties`).

#### 2. Frontend (React + Vite)
```bash
cd emp-web
npm run dev
```
Frontend runs by default at `http://localhost:5173`.
