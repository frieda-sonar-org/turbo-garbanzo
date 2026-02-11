import Link from 'next/link';

const basePath = process.env.NODE_ENV === 'production' ? '/code-review-prototype' : '';

export default function PullRequestsPage() {
  return (
    <div>
      {/* Top Navigation */}
      <header className="top-nav">
        <div className="top-nav-left">
          <button className="menu-toggle">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="logo">
            <img src={`${basePath}/Sonar Qube Cloud.svg`} alt="SonarQube Cloud" width="157" height="36" />
          </div>
          <nav className="top-nav-center">
            <a href="#" className="nav-link">My Projects</a>
            <a href="#" className="nav-link">My Issues</a>
            <a href="#" className="nav-link nav-dropdown">
              My Portfolios
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 8L2 4h8L6 8z"/>
              </svg>
            </a>
            <a href="#" className="nav-link">Explore</a>
          </nav>
        </div>

        <div className="top-nav-right">
          <button className="icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M14 14l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="icon-btn notification-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3l-2 2v1h16v-1l-2-2V8a6 6 0 00-6-6zM8 16a2 2 0 104 0"/>
            </svg>
            <span className="notification-badge">1</span>
          </button>
          <button className="icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <circle cx="10" cy="10" r="8"/>
            </svg>
          </button>
          <button className="icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="3" width="6" height="6" fill="currentColor"/>
              <rect x="11" y="3" width="6" height="6" fill="currentColor"/>
              <rect x="3" y="11" width="6" height="6" fill="currentColor"/>
              <rect x="11" y="11" width="6" height="6" fill="currentColor"/>
            </svg>
          </button>
          <button className="icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <rect x="2" y="2" width="7" height="7" rx="1"/>
              <rect x="11" y="2" width="7" height="7" rx="1"/>
              <rect x="2" y="11" width="7" height="7" rx="1"/>
              <rect x="11" y="11" width="7" height="7" rx="1"/>
            </svg>
          </button>
        </div>
      </header>

      <div className="layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="project-selector">
            <div className="project-icon">A</div>
            <div className="project-info">
              <div className="project-name">asast-scanner-pipe...</div>
              <div className="project-label">Project</div>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 8L2 4h8L6 8z"/>
            </svg>
          </div>

          <nav className="sidebar-nav">
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="2" width="12" height="12" rx="1"/>
              </svg>
              Overview
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="2" width="5" height="5"/>
                <rect x="9" y="2" width="5" height="5"/>
                <rect x="2" y="9" width="5" height="5"/>
                <rect x="9" y="9" width="5" height="5"/>
              </svg>
              Dashboards
              <span className="badge-new">New</span>
              <svg className="chevron" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M4 2l4 4-4 4V2z"/>
              </svg>
            </a>

            <div className="sidebar-section">Analysis</div>

            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="10" width="3" height="4"/>
                <rect x="6" y="6" width="3" height="8"/>
                <rect x="10" y="2" width="3" height="12"/>
              </svg>
              Summary
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 2h12v12H2V2zm2 2v8h8V4H4z"/>
              </svg>
              Issues
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="6"/>
              </svg>
              Security Hotspots
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 2L6 6H2l4 4-2 6 4-3 4 3-2-6 4-4h-4l-2-4z"/>
              </svg>
              Dependency Risks
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 2h12l-6 12L2 2z"/>
              </svg>
              Security Reports
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="2" width="4" height="4"/>
                <rect x="7" y="2" width="4" height="4"/>
                <rect x="12" y="2" width="2" height="4"/>
                <rect x="2" y="7" width="4" height="7"/>
                <rect x="7" y="7" width="4" height="7"/>
                <rect x="12" y="7" width="2" height="7"/>
              </svg>
              Architecture
              <span className="badge-beta">Beta</span>
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 6h12v2H2V6zm0 4h12v2H2v-2z"/>
              </svg>
              Measures
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 2h12v12H2V2zm2 2v8h8V4H4z"/>
                <path d="M6 6h4v4H6V6z"/>
              </svg>
              Code
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="5" cy="5" r="2"/>
                <circle cx="11" cy="5" r="2"/>
                <circle cx="8" cy="11" r="2"/>
                <path d="M5 7l3 4m3-4l-3 4"/>
              </svg>
              Dependencies
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 2v12M2 8h12"/>
              </svg>
              Activity
            </a>

            <div className="sidebar-section">Information</div>

            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 2L2 6v4l6 4 6-4V6l-6-4z"/>
              </svg>
              Agent activity
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="6"/>
                <path d="M8 5v4M8 11h.01" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Project Information
            </a>
            <a href="#" className="sidebar-link sidebar-link-active">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 2l4 4-4 4V2zM8 6l4 4-4 4V6z"/>
              </svg>
              Pull Requests
              <span className="count-badge">10</span>
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 2h12v2H2V2zm0 4h8v2H2V6zm0 4h10v2H2v-2z"/>
              </svg>
              Branches
              <span className="count-badge">1</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Page Header - unified breadcrumb and title section */}
          <div className="page-header">
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <a href="#" className="breadcrumb-link">SonarSource</a>
              <span className="breadcrumb-separator">/</span>
              <a href="#" className="breadcrumb-link">asast-scanner-pipeline</a>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Pull Requests</span>
            </div>

            {/* Title section */}
            <div className="page-header-title-section">
              <div>
                <h1 className="page-title">Pull Requests</h1>
                {/* <div className="warning-badge">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 2l6 12H2L8 2z"/>
                    <path d="M8 7v3M8 11h.01" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  Last analysis had warnings
                </div> */}
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="search-bar">
            <div className="pr-count">10 Pull Requests</div>
            <div className="search-input-wrapper">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input type="text" className="search-input" placeholder="Search for Pull Requests..."/>
            </div>
            <button className="btn-filters">Filters</button>
          </div>

          {/* Pull Requests List */}
          <div className="pr-list">
            {[
              { id: '35', title: '35 - SC-37654 Fix Mise', date: 'a day ago', commit: 'd785751e', icon: 'square' },
              { id: '34', title: '34 - ASASTSCAN-223 License header of asast-scanner-pipeline should b...', date: '2 days ago', commit: 'ca09b179', icon: 'square' },
              { id: '33', title: '33 - ASASTSCAN-220 Increase memory available during generation', date: '3 days ago', commit: 'e99ee76e', icon: 'square' },
              { id: '31', title: '31 - ASASTSCAN-218 Exclude rule S6639 from generation', date: '1 month ago', commit: '1c98ce11', icon: 'square' },
              { id: '32', title: '32 - ASASTSCAN-219 Fix ASAST pipeline regarding repox access', date: '1 month ago', commit: '9ea4f498', icon: 'square' },
              { id: '30', title: '30 - ASASTSCAN-191 Update Java version of ASAST Scanner', date: '1 month ago', commit: '71a0e383', icon: 'grid' },
              { id: '29', title: '29 - ASASTSCAN-196 Libraries.io token should be available in the pipeline ...', date: '1 month ago', commit: 'a869de1d', icon: 'grid' },
              { id: '28', title: '28 - SC-35440 scripted update of SonarSource SA to SonarSource Sàrl', date: '1 month ago', commit: 'e8f9a357', icon: 'grid' },
              { id: '27', title: '27 - ASASTSCAN-193 Add repox access token to the pipeline for the integr...', date: '1 month ago', commit: '43eb1612', icon: 'grid' },
              { id: '26', title: '26 - SC-35844 Add required secrets', date: '1 month ago', commit: '8f76eaaf', icon: 'grid' },
            ].map((pr, index) => (
                    <Link key={index} href={`/pr/${pr.id}`} className="pr-item">                <div className="pr-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4 2l4 4-4 4V2zM8 6l4 4-4 4V6z"/>
                  </svg>
                </div>
                <div className="pr-title">{pr.title}</div>
                <div className="pr-status">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2 8l4 4 8-8" stroke="#4caf50" strokeWidth="2" fill="none"/>
                  </svg>
                  Passed
                </div>
                <div className="pr-icon-small">
                  {pr.icon === 'grid' ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <rect x="2" y="2" width="5" height="5" rx="1"/>
                      <rect x="9" y="2" width="5" height="5" rx="1"/>
                      <rect x="2" y="9" width="5" height="5" rx="1"/>
                      <rect x="9" y="9" width="5" height="5" rx="1"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <rect x="3" y="3" width="10" height="10" rx="2"/>
                    </svg>
                  )}
                </div>
                <div className="pr-date">{pr.date}</div>
                <div className="pr-commit">{pr.commit}</div>
              </Link>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
