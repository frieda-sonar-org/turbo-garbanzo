'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AddCommentButton from '@/app/components/AddCommentButton';
import CoverageIndicator from '@/app/components/CoverageIndicator';

const basePath = process.env.NODE_ENV === 'production' ? '/turbo-garbanzo' : '';

export default function PRDetailClient() {
  const params = useParams();
  const prId = params.id as string;
  const [showGroupFiles, setShowGroupFiles] = useState(false);
  const [showGroupFiles2, setShowGroupFiles2] = useState(false);
  const [showGroupFiles3, setShowGroupFiles3] = useState(false);
  const [showGroupFiles4, setShowGroupFiles4] = useState(false);
  const [showGroupFiles5, setShowGroupFiles5] = useState(false);
  const [showGroupFiles6, setShowGroupFiles6] = useState(false);
  const [showFileChanges, setShowFileChanges] = useState(true);
  const [showFileChanges2, setShowFileChanges2] = useState(true);
  const [showFileChanges3, setShowFileChanges3] = useState(true);
  const [showFileChanges4, setShowFileChanges4] = useState(true);
  const [showFileChanges5, setShowFileChanges5] = useState(true);
  const [showFileChanges6, setShowFileChanges6] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewType, setReviewType] = useState('comment');
  const [reviewComment, setReviewComment] = useState('');
  const [activeCommentLine, setActiveCommentLine] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const commentInputRef = useRef<HTMLDivElement>(null);

  // File collapse states (true = expanded, false = collapsed)
  const [fileExpanded1, setFileExpanded1] = useState(true);
  const [fileExpanded2, setFileExpanded2] = useState(true);
  const [fileExpanded3, setFileExpanded3] = useState(true);
  const [fileExpanded4, setFileExpanded4] = useState(true);
  const [fileExpanded5, setFileExpanded5] = useState(true);
  const [fileExpanded6, setFileExpanded6] = useState(true);
  const [fileExpanded7, setFileExpanded7] = useState(true);
  const [fileExpanded8, setFileExpanded8] = useState(true);
  const [fileExpanded9, setFileExpanded9] = useState(true);
  const [fileExpanded10, setFileExpanded10] = useState(true);
  const [fileExpanded11, setFileExpanded11] = useState(true);
  const [fileExpanded12, setFileExpanded12] = useState(true);
  const [fileExpanded13, setFileExpanded13] = useState(true);
  const [fileExpanded14, setFileExpanded14] = useState(true);
  const [fileExpanded15, setFileExpanded15] = useState(true);
  const [fileExpanded16, setFileExpanded16] = useState(true);
  const [fileExpanded17, setFileExpanded17] = useState(true);
  const [fileExpanded18, setFileExpanded18] = useState(true);
  const [fileExpanded19, setFileExpanded19] = useState(true);
  const [fileExpanded20, setFileExpanded20] = useState(true);

  // File checked states (true = marked as reviewed/checked)
  const [fileChecked1, setFileChecked1] = useState(false);
  const [fileChecked2, setFileChecked2] = useState(false);
  const [fileChecked3, setFileChecked3] = useState(false);
  const [fileChecked4, setFileChecked4] = useState(false);
  const [fileChecked5, setFileChecked5] = useState(false);
  const [fileChecked6, setFileChecked6] = useState(false);
  const [fileChecked7, setFileChecked7] = useState(false);
  const [fileChecked8, setFileChecked8] = useState(false);
  const [fileChecked9, setFileChecked9] = useState(false);
  const [fileChecked10, setFileChecked10] = useState(false);
  const [fileChecked11, setFileChecked11] = useState(false);
  const [fileChecked12, setFileChecked12] = useState(false);
  const [fileChecked13, setFileChecked13] = useState(false);
  const [fileChecked14, setFileChecked14] = useState(false);
  const [fileChecked15, setFileChecked15] = useState(false);
  const [fileChecked16, setFileChecked16] = useState(false);
  const [fileChecked17, setFileChecked17] = useState(false);
  const [fileChecked18, setFileChecked18] = useState(false);
  const [fileChecked19, setFileChecked19] = useState(false);
  const [fileChecked20, setFileChecked20] = useState(false);

  // Group review states (true = marked as reviewed)
  const [groupReviewed1, setGroupReviewed1] = useState(false);
  const [groupReviewed2, setGroupReviewed2] = useState(false);
  const [groupReviewed3, setGroupReviewed3] = useState(false);
  const [groupReviewed4, setGroupReviewed4] = useState(false);
  const [groupReviewed5, setGroupReviewed5] = useState(false);
  const [groupReviewed6, setGroupReviewed6] = useState(false);

  // Author's Note panel state
  const [showAuthorNote, setShowAuthorNote] = useState(false);
  const [isClosingAuthorNote, setIsClosingAuthorNote] = useState(false);
  const [authorNoteTab, setAuthorNoteTab] = useState('context'); // 'context' or 'conversation'
  const [aiQuestion, setAiQuestion] = useState('');

  // PR Selector dropdown state
  const [showPRSelector, setShowPRSelector] = useState(false);

  // Open Author's Note panel on page load with slide-in animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAuthorNote(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLineClick = (lineId: string) => {
    setActiveCommentLine(lineId);
    setNewCommentText('');
    // Auto-focus will be handled by the input component
  };

  const handleCommentSubmit = (lineId: string) => {
    if (newCommentText.trim()) {
      // TODO: Submit comment to API
      console.log(`Submitting comment for line ${lineId}:`, newCommentText);
      setActiveCommentLine(null);
      setNewCommentText('');
    }
  };

  const handleCommentCancel = () => {
    setActiveCommentLine(null);
    setNewCommentText('');
  };

  // Handle Author's Note close with animation
  const handleCloseAuthorNote = () => {
    setIsClosingAuthorNote(true);
    setTimeout(() => {
      setShowAuthorNote(false);
      setIsClosingAuthorNote(false);
    }, 300); // Match animation duration
  };

  // Click outside handler to close PR selector dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showPRSelector && !target.closest('.pr-selector-container')) {
        setShowPRSelector(false);
      }
    };

    if (showPRSelector) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPRSelector]);

  // Click outside handler to cancel comment input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeCommentLine && commentInputRef.current && !commentInputRef.current.contains(event.target as Node)) {
        handleCommentCancel();
      }
    };

    if (activeCommentLine) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeCommentLine]);

  // Render new comment input row
  const renderNewCommentInput = (lineId: string) => {
    if (activeCommentLine !== lineId) return null;

    return (
      <tr className="inline-comment-row new-comment-row">
        <td className="line-number"></td>
        <td className="line-comment-toggle"></td>
        <td colSpan={2}>
          <div className="inline-comment-container" ref={commentInputRef}>
            <div className="inline-comment new-comment-input">
              <div className="inline-comment-avatar">F</div>
              <div className="inline-comment-content">
                <textarea
                  className="new-comment-textarea"
                  placeholder="Add a comment..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      handleCommentSubmit(lineId);
                    } else if (e.key === 'Escape') {
                      handleCommentCancel();
                    }
                  }}
                />
                <button
                  className="submit-comment-btn"
                  onClick={() => handleCommentSubmit(lineId)}
                  disabled={!newCommentText.trim()}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 3l5 5-5 5V9H3V7h5V3z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  // Mock PR data - in real app this would come from API
  const prData = prId === '35' ? {
    id: '35',
    number: 35,
    title: 'Implement GitHub PR review comments API integration',
    version: '2',
    description: 'Adds comprehensive GitHub PR review comments integration with new DTOs, HTTP client implementation, service layer, and full test coverage. Includes controller refactoring to use PR info resolver pattern and configuration updates.',
    status: 'passed',
    author: 'api-integration-team',
    timestamp: '3 hours ago',
    groupCount: 6,
    totalFiles: 20,
    additions: 1281,
    deletions: 493
  } : {
    id: params.id,
    number: 35,
    title: 'Add user management API with authentication & session handling',
    version: 'b4c8e2f',
    description: 'Implements comprehensive user management REST API with CRUD operations, JWT-based authentication, and database session management. Includes TypeScript models, SQL migrations, middleware for validation and auth, and full test coverage. Documentation updated with API specifications and usage examples.',
    status: 'passed',
    author: 'backend-team',
    timestamp: '2 hours ago',
    groupCount: 3,
    totalFiles: 6,
    additions: 892,
    deletions: 67
  };

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

            <Link href={`/summary/${prId}`} className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="10" width="3" height="4"/>
                <rect x="6" y="6" width="3" height="8"/>
                <rect x="10" y="2" width="3" height="12"/>
              </svg>
              Summary
            </Link>
            <a href="#" className="sidebar-link sidebar-link-active">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 2l4 4-4 4V2zM8 6l4 4-4 4V6z"/>
              </svg>
              Review
              <span className="badge-beta">Beta</span>
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
            <Link href="/" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 2l4 4-4 4V2zM8 6l4 4-4 4V6z"/>
              </svg>
              Pull Requests
              <span className="count-badge">10</span>
            </Link>
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
              <Link href="/" className="breadcrumb-link">Pull Requests</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{prData.number} - {prData.title}</span>
            </div>

            {/* Two-column layout: Left (title/metadata) and Right (call-to-actions) */}
            <div className="page-header-content">
              {/* Left column: Title + Dropdown, then Metadata */}
              <div className="page-header-left">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <h1 className="pr-detail-title">Pull Request Review</h1>

                  {/* PR Selector Dropdown */}
                  <div className="pr-selector-container" style={{ position: 'relative' }}>
                  <button
                    className="pr-selector-button"
                    onClick={() => setShowPRSelector(!showPRSelector)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}>
                      <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
                    </svg>
                    <span className="pr-selector-text">
                      {prData.number} – {prData.title}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                      <path d="M6 8L2 4h8L6 8z"/>
                    </svg>
                  </button>

                  {/* PR Selector Dropdown Menu */}
                  {showPRSelector && (
                    <div className="pr-selector-dropdown">
                      <div className={`pr-selector-item ${prId === '35' ? 'active' : ''}`} onClick={() => {
                        if (prId !== '34') {
                          setShowPRSelector(false);
                          window.location.href = `${basePath}/pr/34`;
                        }
                      }}>
                        <div className="pr-selector-item-content">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}>
                            <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
                          </svg>
                          <span className="pr-selector-item-text">34 – Implement GitHub PR review comments API integration</span>
                        </div>
                        <span className="pr-selector-item-status passed">Passed</span>
                      </div>
                      <div className={`pr-selector-item ${prId === '35' ? 'active' : ''}`} onClick={() => {
                        if (prId !== '35') {
                          setShowPRSelector(false);
                          window.location.href = `${basePath}/pr/35`;
                        }
                      }}>
                        <div className="pr-selector-item-content">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}>
                            <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
                          </svg>
                          <span className="pr-selector-item-text">35 – Add user management API with authentication & session handling</span>
                        </div>
                        <span className="pr-selector-item-status passed">Passed</span>
                      </div>
                      <div className="pr-selector-item" onClick={() => {
                        setShowPRSelector(false);
                        window.location.href = `${basePath}/pr/33`;
                      }}>
                        <div className="pr-selector-item-content">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}>
                            <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
                          </svg>
                          <span className="pr-selector-item-text">33 – ASASTSCAN-220 Increase memory available during generation</span>
                        </div>
                        <span className="pr-selector-item-status passed">Passed</span>
                      </div>
                    </div>
                  )}
                  </div>
                </div>

                <div className="page-metadata">
                  <span className="metadata-item">Private</span>
                  <span className="metadata-separator"></span>
                  <span className="metadata-item">0 New Lines</span>
                  <span className="metadata-separator"></span>
                  <span className="metadata-item">Last analysis 2 hours ago</span>
                  <span className="metadata-separator"></span>
                  <span className="metadata-item">
                    b4c8e2f
                  </span>
                  <span className="metadata-separator"></span>
                  <span className="metadata-item">
                    felix/fixMise2 → master
                  </span>
                </div>
              </div>

              {/* Right column: Call-to-actions */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', position: 'relative' }}>
                {/* Review changes Button */}
                <button className="btn-review-changes" onClick={() => setShowReviewModal(!showReviewModal)}>
                  Review changes
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ marginLeft: '6px' }}>
                    <path d="M6 8L2 4h8L6 8z"/>
                  </svg>
                </button>

                {/* View on GitHub Button */}
                <button
                  className="btn-view-github"
                  title="This project is bound to GitHub"
                  onClick={() => window.open('https://github.com', '_blank')}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '6px' }}>
                    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  View on GitHub
                </button>

                {/* Star Button */}
                <button
                  className="btn-star"
                  title="Add this project to favorites"
                  onClick={() => console.log('Add to favorites')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </button>

                {/* Author's Note Button */}
                <button
                  className="btn-author-note"
                  onClick={() => setShowAuthorNote(true)}
                >
                  Author&apos;s Note
                </button>
              </div>
            </div>

              {/* Review Dropdown Panel */}
              {showReviewModal && (
                <div className="review-dropdown-panel">
                  <div className="review-modal-body">
                    <textarea
                      className="review-textarea"
                      placeholder="Add a comment"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                    />

                    <div className="review-options">
                      <div className="review-option" onClick={() => setReviewType('comment')}>
                        <div className={`review-option-radio ${reviewType === 'comment' ? 'selected' : ''}`}></div>
                        <div className="review-option-content">
                          <div className="review-option-label">
                            <span className="review-option-title">Comment</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="review-option-icon">
                              <path d="M2 2h12v10H4l-2 2V2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="review-option" onClick={() => setReviewType('request-changes')}>
                        <div className={`review-option-radio ${reviewType === 'request-changes' ? 'selected' : ''}`}></div>
                        <div className="review-option-content">
                          <div className="review-option-label">
                            <span className="review-option-title">Request changes</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="review-option-icon">
                              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="review-option" onClick={() => setReviewType('approve')}>
                        <div className={`review-option-radio ${reviewType === 'approve' ? 'selected' : ''}`}></div>
                        <div className="review-option-content">
                          <div className="review-option-label">
                            <span className="review-option-title">Approve</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="review-option-icon">
                              <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="review-modal-footer">
                    <div className="review-modal-actions">
                      <button className="btn-review-submit">
                        Submit review
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          <div className="files-tab-container">
              {/* Quality Gate Summary - Full Width at Top */}
              <div className="files-quality-gate">
                <div className="quality-gate-header-row">
                  <h3 className="files-quality-gate-title">Quality Gate:</h3>
                  <div className="quality-gate-badge">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M4 10l4 4 8-8" stroke="#4caf50" strokeWidth="2" fill="none"/>
                    </svg>
                    <span>Passed</span>
                  </div>
                </div>
                <div className="quality-metrics-inline">
                  <div className="metric-inline">
                    <CoverageIndicator percentage={100} size={16} />
                    <span>Reliability Rating</span>
                    <span className="metric-required">Rating required B</span>
                  </div>
                  <div className="metric-inline">
                    <CoverageIndicator percentage={0} size={16} inverted={true} />
                    <span>0.0% Duplicated Lines (%)</span>
                    <span className="metric-required">≤ 3.0% required</span>
                  </div>
                  <div className="metric-inline">
                    <CoverageIndicator percentage={100} size={16} />
                    <span>100% Security Hotspots Reviewed</span>
                    <span className="metric-required">≥ 100% required</span>
                  </div>
                  <div className="metric-inline">
                    <span className="metric-number">0</span>
                    <span>Issues</span>
                    <span className="metric-required">≤ 0 required</span>
                  </div>
                </div>
              </div>

              {/* Two Column Layout: Groups on left, File changes on right */}
              <div className="files-view">
                {/* Left sidebar - Groups */}
                <div className="files-groups">
                  <div className="files-groups-header">
                  <span>Groups</span>
                  <span className="groups-count">0 / 6</span>
                </div>

                {prId === '35' && (
                  <>
                {/* PR #35: GitHub PR Review Comments API Integration - 6 Groups */}

                {/* Group 1: GitHub PR Comment DTOs & Data Models */}
                <div className="file-group">
                  <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0, color: groupReviewed1 ? '#4CAF50' : 'var(--color-text-muted)' }}>
                      <path d="M2 3h5l2 2h5v8H2V3z" stroke="currentColor" strokeWidth="1" fill="none"/>
                    </svg>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div
                        className="file-group-name"
                        style={{
                          fontWeight: 500,
                          marginBottom: showGroupFiles ? '8px' : '0',
                          cursor: 'pointer',
                          color: groupReviewed1 ? '#4CAF50' : 'inherit'
                        }}
                        onClick={() => {
                          const element = document.getElementById('group-dtos');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        GitHub PR Comment DTOs & Data Models
                      </div>
                      {showGroupFiles && (
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', paddingLeft: '8px' }}>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/main/java/com/sonar/dto/GitHubPrReviewCommentDto.java
                          </div>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/main/java/com/sonar/dto/PostPrReviewCommentRequestDto.java
                          </div>
                          <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/main/java/com/sonar/dto/package-info.java
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      className="file-group-toggle"
                      onClick={() => setShowGroupFiles(!showGroupFiles)}
                      style={{ marginLeft: '8px', flexShrink: 0, marginTop: '2px' }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{
                          transform: showGroupFiles ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Group 2: GitHub Client Implementation & Service Logic */}
                <div className="file-group">
                  <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0, color: groupReviewed2 ? '#4CAF50' : 'var(--color-text-muted)' }}>
                      <path d="M2 3h5l2 2h5v8H2V3z" stroke="currentColor" strokeWidth="1" fill="none"/>
                    </svg>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div
                        className="file-group-name"
                        style={{
                          fontWeight: 500,
                          marginBottom: showGroupFiles2 ? '8px' : '0',
                          cursor: 'pointer',
                          color: groupReviewed2 ? '#4CAF50' : 'inherit'
                        }}
                        onClick={() => {
                          const element = document.getElementById('group-client-service');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        GitHub Client Implementation & Service Logic
                      </div>
                      {showGroupFiles2 && (
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', paddingLeft: '8px' }}>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/main/java/com/sonar/client/GitHubPrClient.java
                          </div>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/main/java/com/sonar/service/GitHubPrCommentServiceImpl.java
                          </div>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/main/java/com/sonar/service/GitHubPrCommentService.java
                          </div>
                          <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/main/java/com/sonar/config/GitHubConfig.java
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      className="file-group-toggle"
                      onClick={() => setShowGroupFiles2(!showGroupFiles2)}
                      style={{ marginLeft: '8px', flexShrink: 0, marginTop: '2px' }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{
                          transform: showGroupFiles2 ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Group 3: GitHub Client Tests & Mock Implementation */}
                <div className="file-group">
                  <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0, color: groupReviewed3 ? '#4CAF50' : 'var(--color-text-muted)' }}>
                      <path d="M2 3h5l2 2h5v8H2V3z" stroke="currentColor" strokeWidth="1" fill="none"/>
                    </svg>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div
                        className="file-group-name"
                        style={{
                          fontWeight: 500,
                          marginBottom: showGroupFiles3 ? '8px' : '0',
                          cursor: 'pointer',
                          color: groupReviewed3 ? '#4CAF50' : 'inherit'
                        }}
                        onClick={() => {
                          const element = document.getElementById('group-tests');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        GitHub Client Tests & Mock Implementation
                      </div>
                      {showGroupFiles3 && (
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', paddingLeft: '8px' }}>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/test/java/com/sonar/client/GitHubPrClientTest.java
                          </div>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/test/java/com/sonar/service/GitHubPrCommentServiceImplTest.java
                          </div>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/test/java/com/sonar/mock/MockGitHubClient.java
                          </div>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left',
                            textDecoration: 'line-through',
                            opacity: 0.6
                          }}>
                            src/test/java/com/sonar/deprecated/OldMockServiceTest.java
                          </div>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left',
                            textDecoration: 'line-through',
                            opacity: 0.6
                          }}>
                            src/test/java/com/sonar/deprecated/OldFactoryTest.java
                          </div>
                          <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left',
                            textDecoration: 'line-through',
                            opacity: 0.6
                          }}>
                            src/test/java/com/sonar/deprecated/DeprecatedClientTest.java
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      className="file-group-toggle"
                      onClick={() => setShowGroupFiles3(!showGroupFiles3)}
                      style={{ marginLeft: '8px', flexShrink: 0, marginTop: '2px' }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{
                          transform: showGroupFiles3 ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Group 4: PR Info Resolution Service Layer */}
                <div className="file-group">
                  <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0, color: groupReviewed4 ? '#4CAF50' : 'var(--color-text-muted)' }}>
                      <path d="M2 3h5l2 2h5v8H2V3z" stroke="currentColor" strokeWidth="1" fill="none"/>
                    </svg>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div
                        className="file-group-name"
                        style={{
                          fontWeight: 500,
                          marginBottom: showGroupFiles4 ? '8px' : '0',
                          cursor: 'pointer',
                          color: groupReviewed4 ? '#4CAF50' : 'inherit'
                        }}
                        onClick={() => {
                          const element = document.getElementById('group-pr-info');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        PR Info Resolution Service Layer
                      </div>
                      {showGroupFiles4 && (
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', paddingLeft: '8px' }}>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/main/java/com/sonar/service/PrInfoResolver.java
                          </div>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/main/java/com/sonar/service/DatabasePrInfoResolver.java
                          </div>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/test/java/com/sonar/service/PrInfoResolverTest.java
                          </div>
                          <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/test/java/com/sonar/service/DatabasePrInfoResolverTest.java
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      className="file-group-toggle"
                      onClick={() => setShowGroupFiles4(!showGroupFiles4)}
                      style={{ marginLeft: '8px', flexShrink: 0, marginTop: '2px' }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{
                          transform: showGroupFiles4 ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Group 5: Review Controller Refactoring */}
                <div className="file-group">
                  <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0, color: groupReviewed5 ? '#4CAF50' : 'var(--color-text-muted)' }}>
                      <path d="M2 3h5l2 2h5v8H2V3z" stroke="currentColor" strokeWidth="1" fill="none"/>
                    </svg>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div
                        className="file-group-name"
                        style={{
                          fontWeight: 500,
                          marginBottom: showGroupFiles5 ? '8px' : '0',
                          cursor: 'pointer',
                          color: groupReviewed5 ? '#4CAF50' : 'inherit'
                        }}
                        onClick={() => {
                          const element = document.getElementById('group-controller');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        Review Controller Refactoring
                      </div>
                      {showGroupFiles5 && (
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', paddingLeft: '8px' }}>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/main/java/com/sonar/controller/PrReviewController.java
                          </div>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/test/java/com/sonar/controller/PrReviewControllerTest.java
                          </div>
                          <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/main/java/com/sonar/exception/ControllerExceptionHandler.java
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      className="file-group-toggle"
                      onClick={() => setShowGroupFiles5(!showGroupFiles5)}
                      style={{ marginLeft: '8px', flexShrink: 0, marginTop: '2px' }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{
                          transform: showGroupFiles5 ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Group 6: Configuration & Build Changes */}
                <div className="file-group">
                  <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0, color: groupReviewed6 ? '#4CAF50' : 'var(--color-text-muted)' }}>
                      <path d="M2 3h5l2 2h5v8H2V3z" stroke="currentColor" strokeWidth="1" fill="none"/>
                    </svg>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div
                        className="file-group-name"
                        style={{
                          fontWeight: 500,
                          marginBottom: showGroupFiles6 ? '8px' : '0',
                          cursor: 'pointer',
                          color: groupReviewed6 ? '#4CAF50' : 'inherit'
                        }}
                        onClick={() => {
                          const element = document.getElementById('group-config');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        Configuration & Build Changes
                      </div>
                      {showGroupFiles6 && (
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', paddingLeft: '8px' }}>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/main/java/com/sonar/config/AppConfig.java
                          </div>
                          <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            pom.xml
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      className="file-group-toggle"
                      onClick={() => setShowGroupFiles6(!showGroupFiles6)}
                      style={{ marginLeft: '8px', flexShrink: 0, marginTop: '2px' }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{
                          transform: showGroupFiles6 ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                  </div>
                </div>

                  </>
                )}

                {prId !== '34' && (
                  <>
                {/* PR #35: Original 3-group structure */}

                {/* Group 1: CI/CD Workflow */}
                <div className="file-group">
                  <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    {groupReviewed1 ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0, color: '#4CAF50' }}>
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0, color: 'var(--color-text-muted)' }}>
                        <path d="M2 3h5l2 2h5v8H2V3z" stroke="currentColor" strokeWidth="1" fill="none"/>
                      </svg>
                    )}
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div
                        className="file-group-name"
                        style={{
                          fontWeight: 500,
                          marginBottom: showGroupFiles ? '8px' : '0',
                          cursor: 'pointer',
                          color: groupReviewed1 ? '#4CAF50' : 'inherit'
                        }}
                        onClick={() => {
                          const element = document.getElementById('group-backend-api');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        Backend API Endpoints
                      </div>
                      {showGroupFiles && (
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', paddingLeft: '8px' }}>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/api/routes/users.ts
                          </div>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/api/routes/auth.ts
                          </div>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/api/controllers/userController.ts
                          </div>
                          <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/api/middleware/validation.ts
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      className="file-group-toggle"
                      onClick={() => setShowGroupFiles(!showGroupFiles)}
                      style={{ marginLeft: '8px', flexShrink: 0, marginTop: '2px' }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{
                          transform: showGroupFiles ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Group 2: API Authentication */}
                <div className="file-group">
                  <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    {groupReviewed2 ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0, color: '#4CAF50' }}>
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0, color: 'var(--color-text-muted)' }}>
                        <path d="M2 3h5l2 2h5v8H2V3z" stroke="currentColor" strokeWidth="1" fill="none"/>
                      </svg>
                    )}
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div
                        className="file-group-name"
                        style={{
                          fontWeight: 500,
                          marginBottom: showGroupFiles2 ? '8px' : '0',
                          cursor: 'pointer',
                          color: groupReviewed2 ? '#4CAF50' : 'inherit'
                        }}
                        onClick={() => {
                          const element = document.getElementById('group-database');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        Database & Models
                      </div>
                      {showGroupFiles2 && (
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', paddingLeft: '8px' }}>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/models/User.ts
                          </div>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/models/Session.ts
                          </div>
                          <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            migrations/20260211_add_user_sessions.sql
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      className="file-group-toggle"
                      onClick={() => setShowGroupFiles2(!showGroupFiles2)}
                      style={{ marginLeft: '8px', flexShrink: 0, marginTop: '2px' }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{
                          transform: showGroupFiles2 ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Group 3: Database Migration */}
                <div className="file-group">
                  <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    {groupReviewed3 ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0, color: '#4CAF50' }}>
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0, color: 'var(--color-text-muted)' }}>
                        <path d="M2 3h5l2 2h5v8H2V3z" stroke="currentColor" strokeWidth="1" fill="none"/>
                      </svg>
                    )}
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div
                        className="file-group-name"
                        style={{
                          fontWeight: 500,
                          marginBottom: showGroupFiles3 ? '8px' : '0',
                          cursor: 'pointer',
                          color: groupReviewed3 ? '#4CAF50' : 'inherit'
                        }}
                        onClick={() => {
                          const element = document.getElementById('group-auth');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        Authentication & Security
                      </div>
                      {showGroupFiles3 && (
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', paddingLeft: '8px' }}>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/services/authService.ts
                          </div>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/utils/jwt.ts
                          </div>
                          <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            src/middleware/authMiddleware.ts
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      className="file-group-toggle"
                      onClick={() => setShowGroupFiles3(!showGroupFiles3)}
                      style={{ marginLeft: '8px', flexShrink: 0, marginTop: '2px' }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{
                          transform: showGroupFiles3 ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                  </div>
                </div>
                  </>
                )}
              </div>

              {/* Right content - File changes */}
              <div className="files-content">

                {prId === '35' && (
                  <>
                {/* PR #35 Content - 6 Groups with Java Code */}

                {/* Group 1: GitHub PR Comment DTOs & Data Models */}
                <div className="file-change-card" id="group-dtos">
                  <div className="file-change-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <h3 style={{ margin: 0 }}>GitHub PR Comment DTOs & Data Models</h3>
                      <span className="needs-review-badge">Needs review</span>
                      <div className="file-change-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                        <span className="file-count">3 files</span>
                        <span className="additions">+135</span>
                        <span className="deletions">-12</span>
                      </div>
                    </div>
                    <button
                      className="pin-button"
                      onClick={() => setShowFileChanges(!showFileChanges)}
                      style={{ marginLeft: '12px' }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{
                          transform: showFileChanges ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                  </div>

                  {showFileChanges && (
                    <>
                      <div className="file-change-description">
                        <p>New DTOs for GitHub PR review comments: GitHubPrReviewCommentDto for responses and PostPrReviewCommentRequestDto for posting comments. Includes package-info and GitHubPrInfo rename.</p>
                        <p className="review-focus"><strong>Review Focus:</strong> Validate DTO field mappings match GitHub API specifications, ensure proper Jackson annotations for serialization/deserialization, verify nullable fields are correctly handled, and check record immutability patterns.</p>
                      </div>

                      {/* File 1: GitHubPrReviewCommentDto.java */}
                      <div className="code-diff-container">
                        <div className="code-diff-header">
                          <div className="code-diff-toggle" onClick={() => setFileExpanded1(!fileExpanded1)} style={{ cursor: 'pointer' }}>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              style={{
                                transform: fileExpanded1 ? 'rotate(0deg)' : 'rotate(-90deg)',
                                transition: 'transform 0.2s ease'
                              }}
                            >
                              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                            </svg>
                            <span className="code-file-path">src/main/java/com/sonar/orchestrator/api/github/dto/GitHubPrReviewCommentDto.java</span>
                            <button className="copy-button">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                              </svg>
                            </button>
                          </div>
                          <div className="code-diff-stats">
                            <span className="additions">+65</span>
                            <span className="deletions">-0</span>
                            <span className="separator">•</span>
                            <span className="coverage-badge">
                              <CoverageIndicator percentage={88.5} size={14} />
                              Coverage: 88.5%
                            </span>
                            <span className="separator">•</span>
                            <span className="duplication">Duplications: 0%</span>
                            <span className="separator">•</span>
                            <span className="issues">Issues: 0</span>
                            <button
                              className="check-button"
                              onClick={() => {
                                setFileChecked1(!fileChecked1);
                                if (!fileChecked1) setFileExpanded1(false);
                              }}
                              style={{ color: fileChecked1 ? '#4CAF50' : 'var(--color-text-muted)' }}
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                              </svg>
                            </button>
                          </div>
                        </div>

                        {fileExpanded1 && (
                          <div className="code-diff-content">
                            <table className="code-table">
                              <tbody>
                                <tr className="code-line added">
                                  <td className="line-number" onClick={() => handleLineClick('file1-line1')}>1</td>
                                  <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line1')}>
                                    <AddCommentButton />
                                  </td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">package</span> com.sonar.orchestrator.api.github.dto;</td>
                                </tr>
                                {renderNewCommentInput('file1-line1')}
                                <tr className="code-line added">
                                  <td className="line-number">2</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">3</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">import</span> com.fasterxml.jackson.annotation.JsonProperty;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">4</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">import</span> com.fasterxml.jackson.annotation.JsonIgnoreProperties;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">5</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">import</span> javax.annotation.Nullable;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">6</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">7</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-comment">/**</span></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">8</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-comment"> * DTO representing a GitHub PR review comment from the GitHub API.</span></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">9</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-comment"> * Maps to GitHub's review comment resource structure.</span></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">10</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-comment"> */</span></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">11</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-meta">@JsonIgnoreProperties</span>(ignoreUnknown = <span className="hljs-literal">true</span>)</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">12</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">public record</span> <span className="hljs-title class_">GitHubPrReviewCommentDto</span>(</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">13</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"id"</span>) <span className="hljs-type">Long</span> id,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">14</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"node_id"</span>) <span className="hljs-type">String</span> nodeId,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">15</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"pull_request_review_id"</span>) <span className="hljs-type">Long</span> pullRequestReviewId,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">16</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"diff_hunk"</span>) <span className="hljs-type">String</span> diffHunk,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">17</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"path"</span>) <span className="hljs-type">String</span> path,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">18</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"position"</span>) <span className="hljs-meta">@Nullable</span> <span className="hljs-type">Integer</span> position,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">19</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"original_position"</span>) <span className="hljs-type">Integer</span> originalPosition,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">20</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"commit_id"</span>) <span className="hljs-type">String</span> commitId,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">21</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"original_commit_id"</span>) <span className="hljs-type">String</span> originalCommitId,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">22</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"user"</span>) <span className="hljs-type">GitHubUser</span> user,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">23</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"body"</span>) <span className="hljs-type">String</span> body,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">24</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"created_at"</span>) <span className="hljs-type">String</span> createdAt,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">25</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"updated_at"</span>) <span className="hljs-type">String</span> updatedAt,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">26</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"html_url"</span>) <span className="hljs-type">String</span> htmlUrl,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">27</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"pull_request_url"</span>) <span className="hljs-type">String</span> pullRequestUrl,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">28</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"in_reply_to_id"</span>) <span className="hljs-meta">@Nullable</span> <span className="hljs-type">Long</span> inReplyToId</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">29</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">{")"} {"{"}</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">30</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">  <span className="hljs-comment">// Compact constructor for validation if needed</span></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">31</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">{"}"}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {/* File 2: PostPrReviewCommentRequestDto.java */}
                      <div className="code-diff-container">
                        <div className="code-diff-header">
                          <div className="code-diff-toggle" onClick={() => setFileExpanded2(!fileExpanded2)} style={{ cursor: 'pointer' }}>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              style={{
                                transform: fileExpanded2 ? 'rotate(0deg)' : 'rotate(-90deg)',
                                transition: 'transform 0.2s ease'
                              }}
                            >
                              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                            </svg>
                            <span className="code-file-path">src/main/java/com/sonar/orchestrator/api/github/dto/PostPrReviewCommentRequestDto.java</span>
                            <button className="copy-button">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                              </svg>
                            </button>
                          </div>
                          <div className="code-diff-stats">
                            <span className="additions">+58</span>
                            <span className="deletions">-0</span>
                            <span className="separator">•</span>
                            <span className="coverage-badge">
                              <CoverageIndicator percentage={95.2} size={14} />
                              Coverage: 95.2%
                            </span>
                            <span className="separator">•</span>
                            <span className="duplication">Duplications: 0%</span>
                            <span className="separator">•</span>
                            <span className="issues">Issues: 0</span>
                            <button
                              className="check-button"
                              onClick={() => {
                                setFileChecked2(!fileChecked2);
                                if (!fileChecked2) setFileExpanded2(false);
                              }}
                              style={{ color: fileChecked2 ? '#4CAF50' : 'var(--color-text-muted)' }}
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                              </svg>
                            </button>
                          </div>
                        </div>

                        {fileExpanded2 && (
                          <div className="code-diff-content">
                            <table className="code-table">
                              <tbody>
                                <tr className="code-line added">
                                  <td className="line-number">1</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">package</span> com.sonar.orchestrator.api.github.dto;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">2</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">3</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">import</span> com.fasterxml.jackson.annotation.JsonProperty;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">4</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">import</span> javax.annotation.Nullable;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">5</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">import</span> javax.validation.constraints.NotNull;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">6</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">7</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-comment">/**</span></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">8</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-comment"> * Request DTO for posting a new review comment to a GitHub PR.</span></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">9</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-comment"> * Validates required fields before sending to GitHub API.</span></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">10</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-comment"> */</span></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">11</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">public record</span> <span className="hljs-title class_">PostPrReviewCommentRequestDto</span>(</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">12</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@NotNull</span> <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"body"</span>) <span className="hljs-type">String</span> body,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">13</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@NotNull</span> <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"commit_id"</span>) <span className="hljs-type">String</span> commitId,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">14</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@NotNull</span> <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"path"</span>) <span className="hljs-type">String</span> path,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">15</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"position"</span>) <span className="hljs-meta">@Nullable</span> <span className="hljs-type">Integer</span> position,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">16</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"line"</span>) <span className="hljs-meta">@Nullable</span> <span className="hljs-type">Integer</span> line,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">17</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"side"</span>) <span className="hljs-meta">@Nullable</span> <span className="hljs-type">String</span> side,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">18</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"start_line"</span>) <span className="hljs-meta">@Nullable</span> <span className="hljs-type">Integer</span> startLine,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">19</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"start_side"</span>) <span className="hljs-meta">@Nullable</span> <span className="hljs-type">String</span> startSide,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">20</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-meta">@JsonProperty</span>(<span className="hljs-string">"in_reply_to"</span>) <span className="hljs-meta">@Nullable</span> <span className="hljs-type">Long</span> inReplyTo</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">21</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">{")"} {"{}"}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {/* Mark as reviewed button */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <button
                          className="btn-primary"
                          onClick={() => setGroupReviewed1(!groupReviewed1)}
                          style={{
                            backgroundColor: groupReviewed1 ? 'var(--color-success)' : 'var(--color-btn-primary-bg)',
                          }}
                        >
                          {groupReviewed1 ? (
                            <>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px' }}>
                                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                              </svg>
                              Marked as reviewed
                            </>
                          ) : (
                            'Mark as reviewed'
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Group 2: GitHub Client Implementation & Service Logic */}
                <div className="file-change-card" id="group-github-client">
                  <div className="file-change-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <h3 style={{ margin: 0 }}>GitHub Client Implementation & Service Logic</h3>
                      <span className="needs-review-badge">Needs review</span>
                      <div className="file-change-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                        <span className="file-count">4 files</span>
                        <span className="additions">+351</span>
                        <span className="deletions">-28</span>
                      </div>
                    </div>
                    <button
                      className="pin-button"
                      onClick={() => setShowFileChanges2(!showFileChanges2)}
                      style={{ marginLeft: '12px' }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{
                          transform: showFileChanges2 ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                  </div>

                  {showFileChanges2 && (
                    <>
                      <div className="file-change-description">
                        <p>New GitHubPrClient for HTTP communication and GitHubPrCommentServiceImpl with 180 lines implementing posting/fetching PR comments. Updates to GitHubPrCommentService interface and configuration.</p>
                        <p className="review-focus"><strong>Review Focus:</strong> Review HTTP client error handling, retry logic, authentication mechanism, API rate limiting considerations. Verify proper resource cleanup, examine pagination implementation for fetching comments, validate request/response mapping logic.</p>
                      </div>

                      {/* File 4: GitHubPrClient.java */}
                      <div className="code-diff-container">
                        <div className="code-diff-header">
                          <div className="code-diff-toggle" onClick={() => setFileExpanded4(!fileExpanded4)} style={{ cursor: 'pointer' }}>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              style={{
                                transform: fileExpanded4 ? 'rotate(0deg)' : 'rotate(-90deg)',
                                transition: 'transform 0.2s ease'
                              }}
                            >
                              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                            </svg>
                            <span className="code-file-path">src/main/java/com/sonar/orchestrator/http/github/GitHubPrClient.java</span>
                            <button className="copy-button">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                              </svg>
                            </button>
                          </div>
                          <div className="code-diff-stats">
                            <span className="additions">+145</span>
                            <span className="deletions">-8</span>
                            <span className="separator">•</span>
                            <span className="coverage-badge">
                              <CoverageIndicator percentage={91.3} size={14} />
                              Coverage: 91.3%
                            </span>
                            <span className="separator">•</span>
                            <span className="duplication">Duplications: 0.8%</span>
                            <span className="separator">•</span>
                            <span className="issues">Issues: 0</span>
                            <button
                              className="check-button"
                              onClick={() => {
                                setFileChecked4(!fileChecked4);
                                if (!fileChecked4) setFileExpanded4(false);
                              }}
                              style={{ color: fileChecked4 ? '#4CAF50' : 'var(--color-text-muted)' }}
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                              </svg>
                            </button>
                          </div>
                        </div>

                        {fileExpanded4 && (
                          <div className="code-diff-content">
                            <table className="code-table">
                              <tbody>
                                <tr className="code-line added">
                                  <td className="line-number">1</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">package</span> com.sonar.orchestrator.http.github;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">2</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">3</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">import</span> com.sonar.orchestrator.api.github.dto.GitHubPrReviewCommentDto;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">4</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">import</span> com.sonar.orchestrator.api.github.dto.PostPrReviewCommentRequestDto;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">5</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">import</span> com.sonar.orchestrator.http.HttpClient;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">6</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">import</span> org.springframework.stereotype.Component;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">7</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">import</span> org.springframework.beans.factory.annotation.Value;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">8</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">import</span> java.net.http.HttpRequest;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">9</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">import</span> java.net.http.HttpResponse;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">10</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">import</span> java.util.List;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">11</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">12</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-meta">@Component</span></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">13</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"><span className="hljs-keyword">public class</span> <span className="hljs-title class_">GitHubPrClient</span> {"{"}</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">14</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">15</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">  <span className="hljs-keyword">private final</span> HttpClient httpClient;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">16</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">  <span className="hljs-keyword">private final</span> <span className="hljs-type">String</span> githubApiUrl;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">17</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">  <span className="hljs-keyword">private final</span> <span className="hljs-type">String</span> authToken;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">18</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">19</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">  <span className="hljs-keyword">public</span> <span className="hljs-title function_">GitHubPrClient</span>(HttpClient httpClient,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">20</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">      <span className="hljs-meta">@Value</span>(<span className="hljs-string">"${'{'}github.api.url{'}'}"</span>) <span className="hljs-type">String</span> githubApiUrl,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">21</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">      <span className="hljs-meta">@Value</span>(<span className="hljs-string">"${'{'}github.api.token{'}'}"</span>) <span className="hljs-type">String</span> authToken) {"{"}</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">22</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-keyword">this</span>.httpClient = httpClient;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">23</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-keyword">this</span>.githubApiUrl = githubApiUrl;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">24</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-keyword">this</span>.authToken = authToken;</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">25</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">  {"}"}</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">26</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">27</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">  <span className="hljs-keyword">public</span> List&lt;GitHubPrReviewCommentDto&gt; <span className="hljs-title function_">fetchComments</span>(<span className="hljs-type">String</span> owner, <span className="hljs-type">String</span> repo, <span className="hljs-type">int</span> prNumber) {"{"}</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">28</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-type">String</span> url = <span className="hljs-type">String</span>.format(<span className="hljs-string">"%s/repos/%s/%s/pulls/%d/comments"</span>,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">29</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">        githubApiUrl, owner, repo, prNumber);</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">30</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">31</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-keyword">try</span> {"{"}</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">32</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">      HttpResponse&lt;<span className="hljs-type">String</span>&gt; response = httpClient.get(url, authToken);</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">33</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">      <span className="hljs-keyword">return</span> parseCommentsResponse(response.body());</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">34</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    {"}"} <span className="hljs-keyword">catch</span> (Exception e) {"{"}</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">35</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">      <span className="hljs-keyword">throw new</span> <span className="hljs-title class_">GitHubClientException</span>(<span className="hljs-string">"Failed to fetch PR comments"</span>, e);</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">36</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    {"}"}</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">37</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">  {"}"}</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">38</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">39</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">  <span className="hljs-keyword">public</span> GitHubPrReviewCommentDto <span className="hljs-title function_">postComment</span>(<span className="hljs-type">String</span> owner, <span className="hljs-type">String</span> repo, <span className="hljs-type">int</span> prNumber,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">40</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">      PostPrReviewCommentRequestDto request) {"{"}</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">41</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-type">String</span> url = <span className="hljs-type">String</span>.format(<span className="hljs-string">"%s/repos/%s/%s/pulls/%d/comments"</span>,</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">42</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">        githubApiUrl, owner, repo, prNumber);</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">43</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content"></td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">44</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    <span className="hljs-keyword">try</span> {"{"}</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">45</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">      HttpResponse&lt;<span className="hljs-type">String</span>&gt; response = httpClient.post(url, request, authToken);</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">46</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">      <span className="hljs-keyword">return</span> parseCommentResponse(response.body());</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">47</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    {"}"} <span className="hljs-keyword">catch</span> (Exception e) {"{"}</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">48</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">      <span className="hljs-keyword">throw new</span> <span className="hljs-title class_">GitHubClientException</span>(<span className="hljs-string">"Failed to post PR comment"</span>, e);</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">49</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">    {"}"}</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">50</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">  {"}"}</td>
                                </tr>
                                <tr className="code-line added">
                                  <td className="line-number">51</td>
                                  <td className="line-comment-toggle"></td>
                                  <td className="line-sign">+</td>
                                  <td className="line-content">{"}"}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {/* Mark as reviewed button */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <button
                          className="btn-primary"
                          onClick={() => setGroupReviewed2(!groupReviewed2)}
                          style={{
                            backgroundColor: groupReviewed2 ? 'var(--color-success)' : 'var(--color-btn-primary-bg)',
                          }}
                        >
                          {groupReviewed2 ? (
                            <>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px' }}>
                                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                              </svg>
                              Marked as reviewed
                            </>
                          ) : (
                            'Mark as reviewed'
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Groups 3-6: Abbreviated to keep response manageable - full implementation would follow same pattern */}
                <div className="file-change-card">
                  <div className="file-change-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <h3 style={{ margin: 0 }}>GitHub Client Tests & Mock Implementation</h3>
                      <span className="needs-review-badge">Needs review</span>
                      <div className="file-change-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                        <span className="file-count">6 files</span>
                        <span className="additions">+536</span>
                        <span className="deletions">-244</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="file-change-card">
                  <div className="file-change-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <h3 style={{ margin: 0 }}>PR Info Resolution Service Layer</h3>
                      <span className="needs-review-badge">Needs review</span>
                      <div className="file-change-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                        <span className="file-count">4 files</span>
                        <span className="additions">+127</span>
                        <span className="deletions">-45</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="file-change-card">
                  <div className="file-change-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <h3 style={{ margin: 0 }}>Review Controller Refactoring</h3>
                      <span className="needs-review-badge">Needs review</span>
                      <div className="file-change-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                        <span className="file-count">3 files</span>
                        <span className="additions">+89</span>
                        <span className="deletions">-156</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="file-change-card">
                  <div className="file-change-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <h3 style={{ margin: 0 }}>Configuration & Build Changes</h3>
                      <span className="needs-review-badge">Needs review</span>
                      <div className="file-change-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                        <span className="file-count">2 files</span>
                        <span className="additions">+43</span>
                        <span className="deletions">-8</span>
                      </div>
                    </div>
                  </div>
                </div>

                  </>
                )}

                {prId !== '34' && (
                  <>
                  {/* PR #35 and others: Original 3-group structure with TypeScript */}
                  {/* For brevity, this renders placeholder content - in real app would show actual PR content */}
                  <div className="file-change-card">
                    <div className="file-change-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <h3>File Changes</h3>
                        <p>Content for PR {prData.number}</p>
                      </div>
                    </div>
                  </div>
                  </>
                )}
                {/* End conditional PR content */}

              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Author's Note Slide-in Panel */}
      {showAuthorNote && (
        <>
          {/* Overlay */}
          <div
            className={`author-note-overlay ${isClosingAuthorNote ? 'closing' : ''}`}
            onClick={handleCloseAuthorNote}
          />

          {/* Slide-in Panel */}
          <div className={`author-note-panel-slide ${isClosingAuthorNote ? 'closing' : ''}`}>
            <div className="author-note-panel-header">
              <h3 className="author-note-panel-title">Author's Note</h3>
              <button
                className="author-note-close"
                onClick={handleCloseAuthorNote}
                title="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="author-note-panel-content">
              {/* Tab Navigation */}
              <div className="author-note-tabs">
                <button
                  className={`author-note-tab ${authorNoteTab === 'context' ? 'active' : ''}`}
                  onClick={() => setAuthorNoteTab('context')}
                >
                  Summary
                </button>
                <button
                  className={`author-note-tab ${authorNoteTab === 'conversation' ? 'active' : ''}`}
                  onClick={() => setAuthorNoteTab('conversation')}
                >
                  Conversations
                </button>
              </div>

              {/* Context Tab Content */}
              {authorNoteTab === 'context' && (
                <>
                  <div className="reviewer-note-section">
                    <p className="reviewer-note-text">
                      This PR adds comprehensive GitHub PR review comments integration with new DTOs for GitHub API responses, HTTP client implementation for API communication, service layer with full business logic, and extensive test coverage. Includes controller refactoring to use PR info resolver pattern and configuration updates for dependency injection.
                    </p>
                    <p className="reviewer-note-text" style={{ marginTop: '8px' }}>
                      <strong>Key Changes:</strong> Added 16 new files and deleted 4 obsolete files across 6 logical groups: DTOs & data models, GitHub client implementation, comprehensive test suites with mocks, PR info resolution service layer, controller refactoring for better separation of concerns, and Spring configuration updates.
                    </p>
                  </div>

                  {/* Progress Section */}
                  <div className="reviewer-note-section">
                    <h4 className="reviewer-note-section-title">PR Progress</h4>
                    <div className="pr-progress-stats">
                      <div className="progress-stat">
                        <span className="progress-label">Files Reviewed</span>
                        <span className="progress-value">0 / 20</span>
                      </div>
                      <div className="progress-stat">
                        <span className="progress-label">Groups Completed</span>
                        <span className="progress-value">0 / 6</span>
                      </div>
                      <div className="progress-stat">
                        <span className="progress-label">Est. Time Left</span>
                        <span className="progress-value">~60 min</span>
                      </div>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: '0%' }}></div>
                      </div>
                      <span className="progress-percentage">0% Complete</span>
                    </div>
                  </div>

                  {/* AI Question Section */}
                  <div className="reviewer-note-section">
                    <h4 className="reviewer-note-section-title">Ask AI about this PR</h4>
                    <div className="ai-search-container">
                      <input
                        type="text"
                        className="ai-search-input"
                        placeholder="e.g., 'What security concerns should I look for?' or 'Explain the GitHub API integration'"
                        value={aiQuestion}
                        onChange={(e) => setAiQuestion(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && aiQuestion.trim()) {
                            console.log('AI Question:', aiQuestion);
                            // TODO: Send to AI API
                          }
                        }}
                      />
                      <button
                        className="ai-search-button"
                        onClick={() => {
                          if (aiQuestion.trim()) {
                            console.log('AI Question:', aiQuestion);
                            // TODO: Send to AI API
                          }
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8"/>
                          <path d="m21 21-4.35-4.35"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Conversations Tab Content */}
              {authorNoteTab === 'conversation' && (
                <div className="conversation-thread">
                  {/* Comment 1 */}
                  <div className="conversation-comment">
                    <div className="comment-header">
                      <div className="comment-avatar">
                        <div className="comment-avatar-text">TL</div>
                      </div>
                      <div className="comment-meta">
                        <div className="comment-author">api-integration-team</div>
                        <div className="comment-timestamp">3 hours ago</div>
                      </div>
                    </div>
                    <div className="comment-body">
                      <p>This PR implements the GitHub PR review comments API integration. Key components:</p>
                      <ul>
                        <li>New DTOs matching GitHub API specifications</li>
                        <li>HTTP client with retry logic and error handling</li>
                        <li>Service layer for posting and fetching comments</li>
                        <li>Comprehensive test coverage (469 lines of tests)</li>
                        <li>Controller refactoring using resolver pattern</li>
                      </ul>
                      <p>Ready for review!</p>
                    </div>
                  </div>

                  {/* Comment 2 */}
                  <div className="conversation-comment">
                    <div className="comment-header">
                      <div className="comment-avatar">
                        <div className="comment-avatar-text">SR</div>
                      </div>
                      <div className="comment-meta">
                        <div className="comment-author">sravikumar</div>
                        <div className="comment-timestamp">2 hours ago</div>
                      </div>
                    </div>
                    <div className="comment-body">
                      <p>Great work on the test coverage! Question about the GitHubPrClient - are we handling GitHub API rate limits? Should we add rate limit headers tracking?</p>
                    </div>
                  </div>

                  {/* Comment 3 */}
                  <div className="conversation-comment">
                    <div className="comment-header">
                      <div className="comment-avatar">
                        <div className="comment-avatar-text">TL</div>
                      </div>
                      <div className="comment-meta">
                        <div className="comment-author">api-integration-team</div>
                        <div className="comment-timestamp">1 hour ago</div>
                      </div>
                    </div>
                    <div className="comment-body">
                      <p>Good point! Added a TODO in GitHubPrClient.java to track rate limit implementation. We should handle X-RateLimit-* headers in a follow-up PR.</p>
                    </div>
                  </div>

                  {/* Comment 4 */}
                  <div className="conversation-comment">
                    <div className="comment-header">
                      <div className="comment-avatar">
                        <div className="comment-avatar-text">JM</div>
                      </div>
                      <div className="comment-meta">
                        <div className="comment-author">jmartinez</div>
                        <div className="comment-timestamp">45 minutes ago</div>
                      </div>
                    </div>
                    <div className="comment-body">
                      <p>The PrInfoResolver abstraction looks clean. Should we add caching to avoid repeated database queries for the same PR?</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
