# Jeevan Chakra — Healthcare Platform

A full-stack, portfolio-grade healthcare platform connecting patients with doctors. Built with React 18, Firebase, and Tailwind CSS.

![Jeevan Chakra](public/logo.png)

## Features

### Patient
- **Find Doctors** — Search by name, specialty, or location with real-time Firestore pagination
- **Book Appointments** — React Calendar with real-time slot availability and instant confirmation
- **AI Health Assistant (Aarohi)** — Keyword-pattern chatbot for symptom guidance and healthcare FAQs
- **Medical Records** — Allergies, medications, conditions, family history, vitals, and emergency contacts
- **BMI & Health Tracker** — BMI calculator, meal planner, medication reminders, and progress history
- **Book Medicine** — Browse and order medicines by category with cart and order history
- **Appointments Dashboard** — View upcoming, past, and cancelled appointments
- **Real-Time Notifications** — Instant updates for appointment confirmations, completions, and reviews
- **Emergency Help** — Emergency numbers (108, 100), blood banks, NGOs, and first-aid guides

### Doctor
- **Doctor Dashboard** — View upcoming appointments, manage availability, and see patient stats
- **Set Availability** — Define available time slots for patient booking
- **Patient Reviews** — Receive ratings and reviews after completed appointments
- **Verification Badge** — License number submission with verified badge on profile

### Platform
- **Custom Animated Cursor** — Glowing dot + spring-lagged ring; disabled automatically on touch devices
- **Dark Mode** — Full dark mode support across all pages
- **Fully Responsive** — Mobile-first design with bottom navigation, touch-friendly targets (44×44px min)
- **Health Games** — Interactive health knowledge quiz

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 6 |
| Routing | React Router v7 |
| Styling | Tailwind CSS (dark mode, animations) |
| Animations | Framer Motion |
| Auth | Firebase Authentication (Email + Google OAuth) |
| Database | Cloud Firestore (real-time, NoSQL) |
| State | React Context API + onSnapshot listeners |
| Icons | lucide-react + react-icons |
| Calendar | react-calendar |
| Charts | Pure SVG (no external chart library) |

## Firestore Collections

| Collection | Key Fields |
|-----------|-----------|
| `patients` | uid, firstName, lastName, email, bloodGroup, allergies, conditions, medications, height, weight, emergencyContact |
| `doctors` | uid, firstName, lastName, specialty, experience, licenseNumber, verified, avgRating, totalRatings, availability |
| `appointments` | patientId, doctorId, date, timeSlot, status, rating, patientName, doctorName |
| `notifications` | userId, message, type, appointmentId, read, createdAt |
| `reviews` | doctorId, patientId, rating, comment, patientName, createdAt |
| `bmiHistory` | userId, bmi, category, height, weight, unit, recordedAt |

## Project Structure

```
src/
├── about/              # About page with tech stack and architecture docs
├── ai-assistant/       # Aarohi AI chatbot + keyword response engine
├── appointments/       # Patient appointment management
├── bmi-tracker/        # BMI calculator, meal planner, medication tracker
├── book-medicine/      # Online pharmacy with cart
├── components/         # Shared: Navbar, BottomNav, ChatWidget, CustomCursor, Toast...
├── doc-dashboard/      # Doctor dashboard, availability setter, patient sidebar
├── emergency/          # Emergency numbers, blood banks, NGOs, first-aid guide
├── faq/                # Help center with searchable FAQ accordion
├── game/               # Health knowledge quiz
├── login/ signup/      # Auth pages (email + Google OAuth)
├── medical-records/    # Patient health records form
├── NGOs/               # NGO/help page (ngo.jsx)
├── patient-dashboard/  # Patient home dashboard with analytics charts
├── reviews/            # Review and rating system
├── search/             # Doctor search (search.jsx) + doctor profile (view.jsx)
├── settings/           # User settings (theme, notifications, account)
├── App.jsx             # Root: routes, AnimatedRoutes, home page
├── AuthContext.jsx      # Firebase auth context provider
└── main.jsx            # Entry point with CustomCursor + ToastProvider
```

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project with Firestore and Authentication enabled

### Installation

```bash
git clone <repo-url>
cd MediChain-main
npm install
```

### Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Firestore Database** and **Authentication** (Email/Password + Google)
3. Copy your Firebase config and create `src/firebase/config.js`:

```js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
```

### Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, specialties, features, testimonials |
| `/search` | Find doctors with filters and real-time pagination |
| `/search/view?docid=...` | Doctor profile with booking calendar |
| `/appointments` | Patient appointment management |
| `/ai-assistant` | Full-page Aarohi AI health chatbot |
| `/bmi-tracker` | Health tracker: BMI, meals, medications, history |
| `/book-medicine` | Online pharmacy |
| `/medical-records` | Patient health records |
| `/emergency` | Emergency contacts and first-aid guide |
| `/dashboard` | Doctor dashboard |
| `/help` | NGO and help resources |
| `/about` | Platform architecture and tech stack |
| `/faq` | Searchable FAQ |

## Responsive Design

- Tested at 320px, 375px, 425px, 768px, 1024px, 1280px+
- Bottom navigation on mobile (`md:hidden`)
- Touch targets ≥ 44×44px throughout
- `overflow-x: hidden` on html/body; safe area insets for iOS
- React Calendar fully overridden for mobile viewport fit
- Sticky "Book Appointment" CTA on doctor profile for mobile

## License

MIT
