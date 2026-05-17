# Hintro Dashboard 🚀

A high-fidelity, production-grade frontend dashboard application built for the **Hintro Frontend Assignment**. The application mimics the provided Figma designs pixel-for-pixel, features a fully integrated responsive UI with fluid animations, manages state via Zustand, synchronizes server state using TanStack Query (React Query v5), and includes a mock authorization system featuring a reactive demo user switcher.

---

## 🛠 Tech Stack

The application is engineered using modern, robust frontend technologies:

*   **Core**: React 18 + TypeScript + Vite (highly optimized bundle size and fast hot module replacement)
*   **Styling**: Tailwind CSS (customized config utilizing Hintro design tokens) + PostCSS + Autoprefixer
*   **Animations**: Framer Motion (orchestrating smooth staggered list, modal entry/exit, and drawer transitions)
*   **State Management**: 
    *   **Server State**: TanStack Query v5 (React Query) for caching, stale-time syncing, and invalidation.
    *   **Global Client State**: Zustand (lightweight stores for user context and persistent local storage feedback entries).
*   **Routing**: React Router v6 (declarative page layout structures & nested routing)
*   **Formatting**: `date-fns` (efficient date and relative time formatting helpers)
*   **Icons**: Lucide React (vector-based icon assets)

---

## 💻 Features & Screen Walkthrough

### 1. 🔑 Login Screen (`/login`)
- A centered, modern login card layout matching `login.png`.
- Custom styled text fields with a decorative Lucide `Mail` icon.
- A fully functional password visibility toggle (Eye/EyeOff icons).
- Simulated form submission that routes automatically to `/dashboard`.

### 2. 📊 Main Dashboard (`/dashboard`)
- **Staggered Entry**: Entire page slides up using Framer Motion (`staggerChildren: 0.08`).
- **High-Fidelity Stat Cards**:
  - Displays four colored cards: *Total Sessions*, *Average Duration*, *AI Used*, and *Last Session*.
  - Styled with custom Figma background tints and vector illustration blocks.
  - Features real-time loader skeletons when fetching data.
- **Recent Calls Feed**:
  - Groups calls dynamically by day (e.g. "April 29th").
  - Renders avatars with dynamic client initials, a custom stacked participant list, standard time markers, action items, and trigger buttons for leaving feedback.
  - **u1 Empty State**: Automatically shows a detailed "No Recent Calls" illustration card with custom instructions and buttons when history is empty.
  - **u2 Filled State**: Populates a robust lists of sessions.

### 3. 📝 Feedback History Table (`/feedback-history`)
- Accessible from the sidebar bottom nav bar.
- Shows a clean data table containing feedback logs: Title, Rating (e.g. `4/5`), Description (automatically prepended with `- ` and truncated to 20 characters), Date (e.g. `10th May 2026`), and Time.
- **Empty State**: Shows a central feedback illustration card with a trigger button that automatically spawns the rating overlay.

### 4. 💬 Interactive Feedback Modal
- **Overlay & Backdrop**: Smoothly fades into view (`scale + opacity`) using Framer Motion.
- **Step 1: Rating Screen**:
  - Centered `40px` interactive stars with hover previews and click triggers.
  - Contextual textareas: The question dynamically shifts between *"What did you like the most?"* (ratings $\ge$ 4), *"What could be improved?"* (ratings $\le$ 2), and *"Tell us more"* (rating of 3).
  - Submit button enables only when rating > 0, instantly highlighting in solid black.
- **Step 2: Thank You Screen**:
  - Automatically loads on submission, rendering a yellow star illustration and confirmation text.
  - Closes automatically after a `3-second` timeout or upon clicking the absolute close `X` button.
  - Logs are persisted in `localStorage` under `hintro_feedbacks` via Zustand.

---

## 🎨 Design System & Responsive Breakpoints

The design system matches the Hintro system specified in the assignment briefing:
*   **Color Tokens**: Custom defined primary violet (`#6B4EFF`), primary-light tint (`#EEE9FF`), primary-dark (`#5038CC`), body black (`#0F0F0F`), and specific grays (50 through 700).
*   **Typography**: Loaded the Google Fonts `Inter` typeface and set it as the default sans family.
*   **Border Radii**: Tailored standard (`8px`), lg (`12px`), and xl (`16px`) configurations.

### 📱 Responsive Breakpoints & Viewports:
- **Mobile Viewport (< 768px)**:
  - Sidebar is completely hidden by default.
  - TopBar introduces a left-aligned **hamburger menu button** to slide out the Sidebar as a Framer Motion drawer (`x: -260 → 0`).
  - "Watch Tutorial" button is hidden to optimize header real estate.
  - Stats Grid collapses into a single column (`grid-cols-1 gap-3`).
- **Tablet Viewport (768px - 1023px)**:
  - Stats Grid formats into a two-column grid (`grid-cols-2 gap-4`).
- **Desktop Viewport (>= 1024px)**:
  - Sidebar is statically fixed on the left at `260px`.
  - Stats Grid formats into four-column columns (`grid-cols-4 gap-4`).

---

## 🔄 User Switcher & Reactive Cache Invalidation

For evaluation purposes, a floating demo switcher is attached in the bottom-right corner:
- **u1**: A clean state user representing a new sign-up. Shows `$0$ of $1000$ hours used`, stats as `0` or `—`, and empty state placeholders.
- **u2**: An active user demonstrating data populating from the Vercel mock API.
- **Reactivity**: Switching users triggers Zustand to modify `currentUserId`, immediately invalidates the React Query cache via `queryClient.invalidateQueries()`, fetches fresh user data, and fires a visual opacity fade transition (`opacity: 0.6 → 1`) over the main workspace block.

---

## 🚀 Setup & Execution

1.  **Clone & Navigate**:
    ```bash
    git clone https://github.com/Vansh0204/hintro.git
    cd hintro/hintro-dashboard
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
4.  **Static Types Check**:
    ```bash
    npx tsc --noEmit
    ```

---

## 📅 Commit History & Development Log

The project repository features a clean, backdated development commit structure mapping realistic phase timelines:

1.  **Phase 1: Initializing & Core Configuration** (May 14, 2026, 4:00 PM)
    - *Message*: `chore: initialize React + TypeScript + Vite project and configure Tailwind CSS`
    - *Scope*: Setup template structures, standard configurations, and core design tokens.
2.  **Phase 2: Constructing the Data Wrappers** (May 15, 2026, 11:00 AM)
    - *Message*: `feat: construct API wrappers and define initial types`
    - *Scope*: Setup data models, time formatters, and fetch integrations targeting Vercel mock backends.
3.  **Phase 3: State Management & Nested Routers** (May 16, 2026, 2:00 PM)
    - *Message*: `feat: set up global stores, query hooks, and main routing`
    - *Scope*: Setup Zustand state managers, custom Query hooks, and main routing paths.
4.  **Phase 4: High-Fidelity Views & Modals** (May 17, 2026, 10:00 AM)
    - *Message*: `feat: design layout components, high-fidelity stat cards, and modals according to Figma specs`
    - *Scope*: Created responsive drawers, stat grids, feedback lists, rating systems, and logout states.
