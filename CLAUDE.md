# Code Review POC - Persistent Data Concept - Technical Documentation

## Overview
This is a variant prototype exploring persistent data and real integrations. Based on the original code-review-fab prototype, this version will implement actual data persistence, API integrations, and backend functionality. The interface is inspired by SonarQube Cloud's design patterns while focusing on reducing reviewer cognitive load through better presentation of quality metrics and code changes.

**Port**: This project runs on port 3001 (while code-review-fab runs on 3000)

---

# MILESTONES

## Milestone 1: Base Template (Foundation)
This milestone represents the core code review interface without the Author's Note feature. Use this as the foundation template for new projects.

## Milestone 2: Author's Note Feature
This milestone adds the Author's Note panel to the base template. See the "Author's Note Panel Implementation" section in Development History.

---

## Tech Stack
- **Framework**: Next.js 16.1.1 (React 19.2.3)
- **Styling**: Custom CSS with design system + Tailwind CSS v4
- **TypeScript**: v5

## Project Structure

```
code-review-persistent/
├── app/
│   ├── components/
│   │   ├── PullRequestsPage.tsx    # Main Pull Requests page component
│   │   ├── AddCommentButton.tsx    # Inline comment button component
│   │   └── CoverageIndicator.tsx   # Coverage percentage indicator
│   ├── pr/
│   │   └── [id]/
│   │       ├── page.tsx            # PR detail page wrapper
│   │       └── PRDetailClient.tsx  # PR detail client component (main logic)
│   ├── design-system.css           # Color palette and design tokens
│   ├── echoes-tokens-base.css      # Echoes design system base tokens
│   ├── echoes-tokens-dark.css      # Echoes design system dark theme
│   ├── styles.css                  # Component-specific styles
│   ├── globals.css                 # Global styles and imports
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page (renders PullRequestsPage)
│   └── favicon.ico                 # Favicon
├── public/
│   ├── Sonar Qube Cloud.svg        # SonarQube Cloud logo
│   └── *.svg                       # Various UI icons
├── next.config.ts                  # Next.js configuration
├── package.json
├── CLAUDE.md                       # Project documentation (this file)
└── README.md
```

## Design System

### Custom Design System (SonarQube Cloud-inspired)

The design system uses a **custom color palette** inspired by SonarQube Cloud, defined in `app/design-system.css` with CSS custom properties. The application is **dark mode by default**.

#### Primary Colors
- `--color-bg-primary`: #1E212E (Main content background)
- `--color-bg-secondary`: #3c4248
- `--color-sidebar-bg`: #2B2F3F (Sidebar and top nav background)
- `--color-content-bg`: #1E212E
- `--color-card-bg`: #393f45 (Card/Panel background)

#### Text Colors
- `--color-text-primary`: #ffffff
- `--color-text-secondary`: #e6e6e6
- `--color-text-tertiary`: #b4b8bd
- `--color-text-muted`: #8a8f95

#### Accent Colors
- `--color-accent-primary`: #9FA9ED (Purple-Blue - primary actions)
- `--color-accent-primary-hover`: #BDC6FF (Purple-Blue hover state)
- `--color-accent-secondary`: #9FA9ED (Purple-Blue - icons, links)
- `--color-link`: #9FA9ED

#### Status Colors
- `--color-success`: #4caf50 (Green - Passed status)
- `--color-warning`: #ff9800 (Orange - Warning badges)
- `--color-error`: #f44336 (Red - Failed status)

#### Badge Colors
- `--color-badge-new`: #4b9fd8 (Blue - "New" badge)
- `--color-badge-beta`: #4b9fd8 (Blue - "Beta" badge)
- `--color-badge-private`: #8a8f95

#### Border Colors
- `--color-border-primary`: #4d5463
- `--color-border-secondary`: #3a3f45
- `--color-border-subtle`: #2e3238

#### Button Colors
- `--color-btn-primary-bg`: #9FA9ED (Primary button background)
- `--color-btn-primary-hover`: #BDC6FF (Primary button hover state)
- `--color-btn-primary-text`: #2A2F40 (Primary button text color)
- `--color-btn-primary-active`: #8892E8 (Primary button active state)

### Usage
All colors are accessible via CSS custom properties:

```css
.my-element {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  border-color: var(--color-border-primary);
}
```

## Pages

### Pull Requests Page (Homepage)
**Route**: `/` (localhost:3000)

**Features**:
- ✅ Top navigation bar with SonarQube Cloud logo and navigation links
- ✅ Left sidebar with project selector and navigation menu
- ✅ Pull Requests link is active in sidebar
- ✅ Page header with breadcrumb and title
- ✅ Search bar and filters
- ✅ Pull requests list (dummy items) - clickable, links to detail pages
- ✅ Status indicators with visual checkmarks/icons
- ✅ Floating action button (bottom right)

**Status**: Fully functional for navigation

### PR Detail Page
**Route**: `/pr/[id]` (e.g., `/pr/35`)

**Features**:
- ✅ Same top navigation and sidebar as homepage
- ✅ Page header with:
  - Breadcrumb navigation with PR number
  - Title with version
  - Action buttons (left to right):
    - "Review changes" button with dropdown modal (primary button)
    - "View on GitHub" button with GitHub icon (secondary button, tooltip: "This project is bound to GitHub")
    - "Star" icon button (secondary button, tooltip: "Add this project to favorites")
  - Review options: Comment, Request changes, Approve
  - Sticky positioning when scrolling
- ✅ **Files View** (default and only view):
  - Left sidebar: Groups panel showing file groups (sticky positioning)
  - Right content: File change cards with:
    - File metadata and statistics
    - Code diff viewer with syntax highlighting (YAML)
    - Inline comment capability (UI only)
    - Expandable/collapsible sections
    - Mark as reviewed functionality

**Design Notes**:
- Context tab has been removed to focus solely on file review
- All card components use transparent backgrounds with borders
- Scrollbar always visible to prevent layout shift
- Sticky positioning: Page header and file groups sidebar remain visible during scroll
- Primary button color scheme: #9FA9ED background, #2A2F40 text, #BDC6FF hover

## Running the Project

### Development Server
```bash
npm run dev
```
The app will be available at: http://localhost:3001

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

### Cleanup
```bash
# Remove build cache to reduce project size
rm -rf .next out
```

## GitHub Pages Deployment

### Live Site
**URL**: https://frieda-sonar-org.github.io/turbo-garbanzo/
**Repository**: frieda-sonar-org/turbo-garbanzo

### Deployment Configuration
The project is configured for static export to GitHub Pages:
- **basePath**: `/turbo-garbanzo` (matches GitHub repository name)
- **assetPrefix**: `/turbo-garbanzo`
- **output**: `export` (static site generation)

### GitHub Actions Workflow
Location: `.github/workflows/deploy.yml`

**IMPORTANT**: The workflow has been configured to handle corporate npm registry issues:

```yaml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    # NOTE: npm cache is intentionally DISABLED to prevent caching JFrog auth

- name: Install dependencies
  run: |
    rm -f package-lock.json .npmrc
    npm install --registry=https://registry.npmjs.org/
```

### Troubleshooting: npm Authentication Errors

**Problem**: GitHub Actions fails with `npm error code E401 - Incorrect or missing password`

**Root Cause**:
- Local development uses corporate JFrog Artifactory registry (configured in `~/.npmrc`)
- When `package-lock.json` is generated locally, it contains JFrog registry URLs for all packages
- `npm ci` uses exact URLs from `package-lock.json`, causing authentication failures in GitHub Actions
- npm cache in GitHub Actions can persist old authentication state

**Solution Applied**:
1. **Remove npm cache**: The `cache: 'npm'` option is removed from `setup-node` step to prevent caching authentication state
2. **Delete lockfile before install**: `package-lock.json` and `.npmrc` are deleted in CI before install
3. **Force public registry**: Use `--registry=https://registry.npmjs.org/` flag to bypass JFrog URLs

**DO NOT**:
- ❌ Add `cache: 'npm'` back to the workflow
- ❌ Use `npm ci` (it will use exact URLs from package-lock.json)
- ❌ Try to fix package-lock.json manually (it has 300+ package URLs)

**Alternative Solutions** (not implemented):
- Regenerate `package-lock.json` from a clean environment without JFrog registry
- Use a separate `.npmrc` for CI that overrides all registry settings
- Set up GitHub Actions secrets with JFrog credentials (not recommended)

### Manual Deployment
To manually trigger deployment:
```bash
git push origin main
```

The GitHub Actions workflow will automatically:
1. Install dependencies from public npm registry
2. Build Next.js static export
3. Deploy to GitHub Pages

## Component Details

### PullRequestsPage Component
Location: `app/components/PullRequestsPage.tsx`

**Sections**:
1. **Top Navigation**
   - Logo (SonarQube cloud SVG)
   - Main navigation (My Projects, My Issues, My Portfolios, Explore)
   - Right actions (search, notifications, user menu icons)

2. **Sidebar**
   - Project selector dropdown
   - Navigation sections:
     - Overview & Dashboards
     - Analysis (Summary, Issues, Security Hotspots, etc.)
     - Information (Pull Requests, Branches)
   - Badges for "New" and "Beta" features
   - Count indicators

3. **Main Content**
   - Breadcrumb trail
   - Page title
   - Search and filter controls
   - Pull requests list with:
     - PR number and title
     - Status (Passed/Failed)
     - Icons
     - Timestamps
     - Commit hashes

4. **Floating Action Button**
   - Fixed position (bottom right)
   - Gradient background
   - Checkmark icon

### PR Detail Page Component
Location: `app/pr/[id]/PRDetailClient.tsx`

**Client Component** (`'use client'`)

#### Base Template State Management:
- `showGroupFiles1-4`: Toggle file list visibility for each group
- `showFileChanges1-3`: Toggle file changes section visibility
- `showReviewModal`: Control review dropdown visibility
- `reviewType`: Selected review type (comment/request changes/approve)
- `reviewComment`: Review comment text
- `showPRSelector`: Control PR selector dropdown visibility

#### Author's Note State Management (Milestone 2):
- `showAuthorNote`: Control Author's Note panel visibility (default: true)
- `isClosingAuthorNote`: Track closing animation state
- `authorNoteTab`: Active tab in Author's Note ('context' or 'conversation')

**Sections (Base Template)**:
1. **Top Navigation & Sidebar** (same as homepage)

2. **Page Header** (sticky positioning, top: 0)
   - Breadcrumb at top
   - Two-column layout:
     - Left column:
       - "Pull Request Review" title + PR selector dropdown (same line)
       - Page metadata (Private, 0 New Lines, Last analysis, etc.) on next line
     - Right column (Call-to-actions):
       - "Review changes" button (primary button with dropdown)
       - "View on GitHub" button (ghost/secondary with GitHub icon)
       - "Star" button (icon-only secondary)

3. **PR Selector Dropdown**
   - Transparent background with border
   - Fixed width: 25rem with ellipsis overflow
   - PR icon before text
   - Shows list of PRs matching the PR list page content
   - Status labels on right (Passed/Failed)

4. **Review Modal**
   - Three review types with radio selection (styled with primary button colors)
   - Comment textarea (placeholder: "Add a comment")
   - Submit button (primary button style)

5. **Files View**
   - Groups sidebar (left, sticky positioning at top: 152px):
     - Shows 4 file groupings:
       - Group 1: Backend API Endpoints (4 files)
       - Group 2: Database & Models (3 files)
       - Group 3: Authentication & Security (3 files)
       - Group 4: Testing & Documentation (3 files)
     - Group names and file counts
     - Scrollable with max-height constraint
     - Scrollbar hidden by default, visible on hover
   - File changes (right):
     - 4 file change cards matching the groups
     - File metadata cards with statistics
     - Code diff tables with:
       - Line numbers
       - Add/remove indicators
       - Syntax-highlighted code
       - Inline comment buttons (on hover)
     - "Mark as reviewed" button per group (primary button style)

**Sections (Author's Note - Milestone 2)**:
- **Author's Note Button** (in page header, ghost/secondary style)
- **Author's Note Panel** (slide-in from right, open by default)
  - Slide-in/slide-out animations (300ms)
  - Two tabs: Context and Conversations
  - Context tab contains:
    - PR description and key changes
    - PR Progress section (with card backgrounds on stats)
    - Ask AI about this PR search input
  - Conversations tab contains:
    - Discussion thread comments (no card backgrounds)

## Styling Architecture

### CSS Organization
The CSS is organized in layers:

1. **design-system.css**: Core design tokens (colors, spacing)
2. **echoes-tokens-base.css**: Echoes design system base tokens
3. **echoes-tokens-dark.css**: Echoes design system dark theme
4. **styles.css**: Component-specific styles
5. **globals.css**: Global imports and configuration

### Dark Mode
The application is **dark mode by default** with no light mode option:
- Root variables set to dark colors
- Body background and text color enforced
- All components styled using dark theme colors

### Sticky Positioning
- **Page Header**: Uses `position: sticky` with `top: 0` relative to `.main-content` scroll container
  - Stays at the top when scrolling through file changes
  - `z-index: 100` ensures it stays above other content
- **Files Groups Sidebar**: Uses `position: sticky` with `top: 152px` (page header height + padding)
  - Remains visible while scrolling file changes
  - Has `max-height: calc(100vh - 224px)` with `overflow-y: auto` for long file lists

### Responsive Design
- Desktop: Full sidebar and all columns visible
- Tablet (< 1024px): Condensed navigation, smaller sidebar
- Mobile (< 768px): Collapsible sidebar, simplified layout

## Navigation Structure
```
/ (Pull Requests List)
  └── /pr/:id (Pull Request Detail - Files View)
```

## Key Design Decisions

### Why Files-Only View?
We removed the Context tab (Description + Discussion) to focus solely on **code review**:
- **Reduces context switching**: Everything needed for review is in one place
- **Minimizes cognitive load**: No need to toggle between tabs
- **Emphasizes code**: The files and quality metrics are the primary focus
- **Streamlines workflow**: Faster path from viewing to reviewing

### Color Scheme
- Background colors: #2B2F3F (sidebar/nav), #1E212E (content area)
- Maintains SonarQube Cloud's exact color palette

### Layout
- Scrollbar always visible (`overflow-y: scroll`) to prevent layout shift
- Transparent card backgrounds with stroke/borders only (no fill)

## Future Development

### Completed Features

#### Milestone 1: Base Template
- ✅ Click-through functionality for PR items
- ✅ PR detail page with Files view
- ✅ Code diff viewer with syntax highlighting (TypeScript)
- ✅ Collapsible file sections and groups
- ✅ Review modal with multiple review types (Comment, Request changes, Approve)
- ✅ Client-side navigation between PR list and PR detail
- ✅ 4-group file organization (Backend API, Database, Auth & Security, Testing & Docs)
- ✅ Sticky page header and groups sidebar
- ✅ Ghost/secondary button styling for supporting actions
- ✅ PR selector dropdown with transparent background, fixed width, ellipsis overflow
- ✅ Three-section page header layout (breadcrumb, left column, right column)
- ✅ Sidebar scrollbar hidden by default, visible on hover
- ✅ Primary button color scheme (purple-blue #9FA9ED)

#### Milestone 2: Author's Note
- ✅ Author's Note panel with slide-in/slide-out animations
- ✅ PR Progress tracking with visual stats and progress bar
- ✅ Ask AI search functionality (UI only)
- ✅ Conversation thread display with comment cards
- ✅ Two-tab interface (Context and Conversations)

### Planned Features
- [ ] Additional pages (Summary, Issues, Dashboard, etc.)
- [ ] Interactive search and filtering
- [ ] Real data integration (SonarQube API)
- [ ] User authentication
- [ ] Functional inline comment submission
- [ ] File and group review workflow (mark as reviewed)
- [ ] Coverage indicators with visual metrics
- [ ] Real-time collaboration features

## Notes
- All content is currently dummy data
- Navigation between pages is functional (PR list → PR detail → PR list)
- PR detail page shows Files view by default (no tab navigation)
- Collapsible sections functional for file groups
- **Context tab removed**: Focus is now entirely on file-based code review

## Resources
- Design reference: SonarQube Cloud interface
- Framework: [Next.js Documentation](https://nextjs.org/docs)
- Styling: [Tailwind CSS v4](https://tailwindcss.com/docs)

---

## Development History

### Milestone 1: Base Template (Foundation)

This milestone includes all features EXCEPT the Author's Note panel. This is the core template that can be used for new projects.

**Features included in Base Template:**
- Pull Requests List page with navigation
- PR Detail page with Files view
- Code diff viewer with syntax highlighting (TypeScript)
- Collapsible file sections and groups (4 groups)
- Review modal with multiple review types (Comment, Request changes, Approve)
- Client-side navigation between PR list and PR detail
- Sticky page header and groups sidebar
- Primary button color scheme (purple-blue #9FA9ED)
- Ghost/secondary button styling for supporting actions
- Transparent card backgrounds with borders
- Custom design system with SonarQube Cloud-inspired colors

**Development Timeline:**

- **February 12, 2026** (Template Refinements):
  - **Page Header Layout Restructure**:
    - Three-section header: breadcrumb at top, then two-column layout
    - Left column: "Pull Request Review" title + PR selector dropdown + page metadata
    - Right column: Action buttons (Review changes, View on GitHub, Star)
    - PR selector dropdown: transparent background, fixed 25rem width, ellipsis overflow, PR icon
    - Synchronized dropdown PR content with PR list page

  - **Sidebar Scrollbar Behavior**:
    - Updated scrollbar to be hidden by default (transparent background)
    - Scrollbar only appears on hover
    - Main content scrollbar always visible to prevent layout shift

- **February 11, 2026** (Base Template Completion):
  - **PR Content Update - 4 Group Structure**:
    - Group 1: Backend API Endpoints (4 files: users.ts, auth.ts, userController.ts, validation.ts)
    - Group 2: Database & Models (3 files: User.ts, Session.ts, migration SQL)
    - Group 3: Authentication & Security (3 files: authService.ts, jwt.ts, authMiddleware.ts)
    - Group 4: Testing & Documentation (3 files: users.test.ts, README.md, API.md)
    - Updated file change cards to match group structure
    - Updated code samples to show TypeScript instead of YAML

  - **UI Enhancement - Page Header Actions**:
    - Added "View on GitHub" button with GitHub icon and tooltip ("This project is bound to GitHub")
    - Added "Star" icon button with tooltip ("Add this project to favorites")
    - Reordered action buttons: "Review changes", "View on GitHub", "Star"
    - Changed review modal placeholder text from "Write your review" to "Add a comment"

  - **Design System Update - Primary Button Color Scheme**:
    - Updated primary button colors from blue (#4b9fd8) to purple-blue (#9FA9ED)
    - Button text color: #2A2F40 (dark, high contrast on light purple background)
    - Hover state: #BDC6FF (lighter purple-blue)
    - Applied consistently across all primary buttons

  - **Sticky Positioning Implementation**:
    - Made page header sticky (`position: sticky`, `top: 0`, `z-index: 100`)
    - Made file groups sidebar sticky (`position: sticky`, `top: 152px`)
    - Sticky positioning relative to `.main-content` scroll container
    - File groups sidebar has `max-height: calc(100vh - 224px)` with scrollable overflow

  - **Button Style Standardization**:
    - All primary buttons use design system CSS variables
    - Secondary/ghost buttons (View on GitHub, Star) use transparent background with border

- **February 10, 2026**:
  - **UI Simplification**: Removed Context tab from PR detail page
    - Files view displays by default with no tab switching
    - Removed Description and Discussion sections
    - Simplified PR detail page to focus solely on file review
  - **File Size Reduction**: Reduced PR detail page from 1020 lines to 807 lines
  - **Project Cleanup**: Reduced project size from 891MB to 421MB by removing build cache

- **January 12, 2026**:
  - Reverted from Echoes design system integration back to custom design system
  - Updated dark mode enforcement in globals.css and styles.css
  - Fixed CSS import order (custom CSS before Tailwind)
  - Documented all design tokens and color values

---

### Milestone 2: Author's Note Feature

This milestone adds the Author's Note panel feature to the base template. This is an optional enhancement that provides context and conversation capabilities.

**Features added in Author's Note:**
- Slide-in panel from right side (500px width)
- Two tabs: Context and Conversations
- PR Progress tracking with visual stats
- Ask AI search functionality (UI only)
- Discussion thread display
- Open by default with smooth animations

**Development Timeline:**

- **February 11, 2026** (Author's Note Implementation):
  - **Author's Note Panel**:
    - Added slide-in panel from right side (500px width, max-width: 90vw)
    - Panel opens by default on PR detail page load
    - Smooth slide-out animation (300ms) when closing
    - Added "Author's Note" button in page header (ghost/secondary style)
    - Panel includes overlay with fade-in/fade-out animations
    - Two tabs: Context and Conversations
    - Context tab features:
      - PR description and key changes
      - PR Progress section with stats (Files Reviewed, Groups Completed, Est. Time Left)
      - Progress bar with gradient fill
      - "Ask AI about this PR" search input (only in Context tab)
    - Conversations tab features:
      - Discussion thread with comment cards
      - Comment avatars with gradient backgrounds
      - Clean, minimal styling without card backgrounds

  - **Styling Refinements for Author's Note**:
    - Changed "Author's Note" button to ghost style (transparent background with border)
    - Removed card backgrounds from reviewer note sections for cleaner look
    - Removed card backgrounds from conversation comments
    - Added card backgrounds to individual PR progress stat items
    - Improved AI search input styling with focus states
    - Added proper spacing and typography hierarchy throughout Author's Note panel

  - **Component Styling**:
    - Added `.btn-author-note` styles (ghost/secondary button)
    - Added comprehensive Author's Note panel styles with animations
    - State management: `showAuthorNote`, `isClosingAuthorNote`, `authorNoteTab`

---

**Last Updated**: February 11, 2026 (Evening Session)
**Created by**: Claude Code Session
**Status**: Active POC Development - Ready for Real Implementation
