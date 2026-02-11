'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AddCommentButton from '@/app/components/AddCommentButton';
import CoverageIndicator from '@/app/components/CoverageIndicator';

const basePath = process.env.NODE_ENV === 'production' ? '/code-review-prototype' : '';

export default function PRDetailClient() {
  const params = useParams();
  const prId = params.id as string;
  const [showGroupFiles, setShowGroupFiles] = useState(false);
  const [showGroupFiles2, setShowGroupFiles2] = useState(false);
  const [showGroupFiles3, setShowGroupFiles3] = useState(false);
  const [showGroupFiles4, setShowGroupFiles4] = useState(false);
  const [showFileChanges, setShowFileChanges] = useState(true);
  const [showFileChanges2, setShowFileChanges2] = useState(true);
  const [showFileChanges3, setShowFileChanges3] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewType, setReviewType] = useState('comment');
  const [reviewComment, setReviewComment] = useState('');
  const [activeCommentLine, setActiveCommentLine] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const commentInputRef = useRef<HTMLDivElement>(null);

  // File collapse states (true = expanded, false = collapsed)
  const [fileExpanded1, setFileExpanded1] = useState(true); // src/api/routes/users.ts
  const [fileExpanded2, setFileExpanded2] = useState(true); // src/api/routes/auth.ts
  const [fileExpanded3, setFileExpanded3] = useState(true); // src/api/controllers/userController.ts
  const [fileExpanded4, setFileExpanded4] = useState(true); // src/api/middleware/validation.ts
  const [fileExpanded5, setFileExpanded5] = useState(true); // src/models/User.ts
  const [fileExpanded6, setFileExpanded6] = useState(true); // src/models/Session.ts

  // File checked states (true = marked as reviewed/checked)
  const [fileChecked1, setFileChecked1] = useState(false);
  const [fileChecked2, setFileChecked2] = useState(false);
  const [fileChecked3, setFileChecked3] = useState(false);
  const [fileChecked4, setFileChecked4] = useState(false);
  const [fileChecked5, setFileChecked5] = useState(false);
  const [fileChecked6, setFileChecked6] = useState(false);

  // Group review states (true = marked as reviewed)
  const [groupReviewed1, setGroupReviewed1] = useState(false);
  const [groupReviewed2, setGroupReviewed2] = useState(false);
  const [groupReviewed3, setGroupReviewed3] = useState(false);
  const [groupReviewed4, setGroupReviewed4] = useState(false);

  // Author's Note panel state
  const [showAuthorNote, setShowAuthorNote] = useState(false);
  const [authorNoteTab, setAuthorNoteTab] = useState('context'); // 'context' or 'conversation'
  const [aiQuestion, setAiQuestion] = useState('');

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
  const prData = {
    id: params.id,
    number: 35,
    title: 'Add user management API with authentication & session handling',
    version: 2,
    description: 'This pull request introduces a comprehensive user management system with REST API endpoints, JWT-based authentication, and database session handling. The implementation includes 4 main components: Backend API routes (users & auth), Database models & migrations, Authentication services with JWT utilities, and comprehensive test coverage with updated documentation.',
    status: 'passed',
    author: 'sonarqubecloud',
    timestamp: '2 hours ago'
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

            {/* Title section with Review Button */}
            <div className="page-header-title-section">
              <div>
                <h1 className="pr-detail-title">
                  {prData.number} - {prData.title} <span className="pr-version">#{prData.version}</span>
                </h1>
                <div className="page-metadata">
                  <span className="metadata-item">Private</span>
                  <span className="metadata-separator"></span>
                  <span className="metadata-item">0 New Lines</span>
                  <span className="metadata-separator"></span>
                  <span className="metadata-item">Last analysis 1 month ago</span>
                  <span className="metadata-separator"></span>
                  <span className="metadata-item">
                    d785751e
                  </span>
                  <span className="metadata-separator"></span>
                  <span className="metadata-item">
                    felix/fixMise2 → master
                  </span>
                  {/* <span className="metadata-separator"></span>
                  <div className="warning-badge">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 2l6 12H2L8 2z"/>
                      <path d="M8 7v3M8 11h.01" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    Last analysis had warnings
                  </div> */}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', position: 'relative' }}>
                {/* Review changes Button */}
                <button className="btn-review-changes" onClick={() => setShowReviewModal(!showReviewModal)}>
                  Review changes
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ marginLeft: '6px' }}>
                    <path d="M6 8L2 4h8L6 8z"/>
                  </svg>
                </button>

                {/* Author's Note Button */}
                <button className="btn-author-note" onClick={() => {
                  setShowAuthorNote(true);
                  setIsClosingAuthorNote(false);
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  Author's Note
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
          </div>
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
                  <span className="groups-count">0 / 4</span>
                </div>

                {/* Group 1: Backend API Endpoints */}
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

                {/* Group 2: Database & Models */}
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

                {/* Group 3: Authentication & Security */}
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

                {/* Group 4: Testing & Documentation */}
                <div className="file-group">
                  <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    {groupReviewed4 ? (
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
                          marginBottom: showGroupFiles4 ? '8px' : '0',
                          cursor: 'pointer',
                          color: groupReviewed4 ? '#4CAF50' : 'inherit'
                        }}
                        onClick={() => {
                          const element = document.getElementById('group-backend-api');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        Testing & Documentation
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
                            tests/api/users.test.ts
                          </div>
                          <div style={{
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            README.md
                          </div>
                          <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'rtl',
                            textAlign: 'left'
                          }}>
                            docs/API.md
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
              </div>

              {/* Right content - File changes */}
              <div className="files-content">
                {/* First File Change Card - Backend API Endpoints */}
                <div className="file-change-card" id="group-backend-api">
                  <div className="file-change-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <h3 style={{ margin: 0 }}>Backend API Endpoints</h3>
                      <span className="needs-review-badge">Needs review</span>
                      <div className="file-change-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                        <span className="file-count">4 files</span>
                        <span className="additions">+487</span>
                        <span className="deletions">-23</span>
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
                        <p>Implemented comprehensive user management REST API with CRUD operations, authentication endpoints, and request validation middleware.</p>
                        <p className="review-focus"><strong>Review Focus:</strong> Review the API route structure, controller logic for proper error handling, validation middleware rules, and ensure security best practices are followed for user data handling.</p>
                      </div>

                      {/* Code Diff */}
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
                        <span className="code-file-path">src/api/routes/users.ts</span>
                        <button className="copy-button">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                            <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            <rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                          </svg>
                        </button>
                      </div>
                      <div className="code-diff-stats">
                        <span className="additions">+215</span>
                        <span className="deletions">-0</span>
                        <span className="separator">•</span>
                        <span className="coverage-badge">
                          <CoverageIndicator percentage={92.8} size={14} />
                          Coverage: 92.8%
                        </span>
                        <span className="separator">•</span>
                        <span className="duplication">Duplications: 1.2%</span>
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
                            <td className="line-content">
                              <span className="code-keyword">import</span> {'{ Router }'} <span className="code-keyword">from</span> <span className="code-string">'express'</span>;
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line1')}
                          <tr className="code-line added">
                            <td className="line-number" onClick={() => handleLineClick('file1-line2')}>2</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line2')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">+</td>
                            <td className="line-content">
                              <span className="code-keyword">import</span> * <span className="code-keyword">as</span> userController <span className="code-keyword">from</span> <span className="code-string">'../controllers/userController'</span>;
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line2')}
                          <tr className="code-line added">
                            <td className="line-number" onClick={() => handleLineClick('file1-line3')}>3</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line3')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">+</td>
                            <td className="line-content">
                              <span className="code-keyword">import</span> {'{ authMiddleware }'} <span className="code-keyword">from</span> <span className="code-string">'../../middleware/authMiddleware'</span>;
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line3')}
                          <tr className="code-line added has-comment">
                            <td className="line-number" onClick={() => handleLineClick('file1-line4')}>4</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line4')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">+</td>
                            <td className="line-content">
                              <span className="code-keyword">import</span> {'{ validateUser }'} <span className="code-keyword">from</span> <span className="code-string">'../middleware/validation'</span>;
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line4')}
                          <tr className="inline-comment-row">
                            <td className="line-number"></td>
                            <td className="line-comment-toggle"></td>
                            <td colSpan={2}>
                              <div className="inline-comment-container">
                                <div className="inline-comment">
                                  <div className="inline-comment-avatar">F</div>
                                  <div className="inline-comment-content">
                                    <div className="inline-comment-header">
                                      <span className="inline-comment-author">Frieda Handoko</span>
                                      <span className="inline-comment-date">22/12/2025, 03:30</span>
                                    </div>
                                    <p className="inline-comment-text">
                                      Good use of validation middleware! Make sure to add rate limiting for production.
                                    </p>
                                    <div className="inline-comment-actions">
                                      <button className="inline-comment-action">Reply</button>
                                      <button className="inline-comment-action">Resolve</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="code-line added">
                            <td className="line-number" onClick={() => handleLineClick('file1-line5')}>5</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line5')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">+</td>
                            <td className="line-content"></td>
                          </tr>
                          {renderNewCommentInput('file1-line5')}
                          <tr className="code-line added">
                            <td className="line-number" onClick={() => handleLineClick('file1-line6')}>6</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line6')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">+</td>
                            <td className="line-content">
                              <span className="code-keyword">const</span> router = Router();
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line6')}
                          <tr className="code-line added">
                            <td className="line-number" onClick={() => handleLineClick('file1-line7')}>7</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line7')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">+</td>
                            <td className="line-content"></td>
                          </tr>
                          {renderNewCommentInput('file1-line7')}
                          <tr className="code-line added">
                            <td className="line-number" onClick={() => handleLineClick('file1-line8')}>8</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line8')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">+</td>
                            <td className="line-content">
                              <span className="code-comment">// User CRUD routes</span>
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line8')}
                          <tr className="code-line added">
                            <td className="line-number" onClick={() => handleLineClick('file1-line9')}>9</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line9')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">+</td>
                            <td className="line-content">
                              router.get(<span className="code-string">'/users'</span>, authMiddleware, userController.getAllUsers);
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line9')}
                          <tr className="code-line added">
                            <td className="line-number" onClick={() => handleLineClick('file1-line10')}>10</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line10')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">+</td>
                            <td className="line-content">
                              router.post(<span className="code-string">'/users'</span>, authMiddleware, validateUser, userController.createUser);
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line10')}
                        </tbody>
                      </table>
                    </div>
                    )}
                  </div>

                  {/* Code Diff - Second File */}
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
                        <span className="code-file-path">.github/workflows/build.yml</span>
                        <button className="copy-button">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                            <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            <rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                          </svg>
                        </button>
                      </div>
                      <div className="code-diff-stats">
                        <span className="additions">+2</span>
                        <span className="deletions">-7</span>
                        <span className="separator">•</span>
                        <span className="coverage-badge">
                          <CoverageIndicator percentage={65} size={14} />
                          Coverage: 65.0%
                        </span>
                        <span className="separator">•</span>
                        <span className="duplication">Duplications: 0.0%</span>
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
                          <tr className="code-line">
                            <td className="line-number" onClick={() => handleLineClick('file1-line8')}>18</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line8')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign"></td>
                            <td className="line-content">
                              <span className="code-indent">  </span><span className="code-keyword">steps:</span>
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line8')}
                          <tr className="code-line removed">
                            <td className="line-number" onClick={() => handleLineClick('file1-line9')}>19</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line9')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">-</td>
                            <td className="line-content">
                              <span className="code-indent">    </span>- <span className="code-keyword">name:</span> Setup Node.js
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line9')}
                          <tr className="code-line removed">
                            <td className="line-number" onClick={() => handleLineClick('file1-line10')}>20</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line10')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">-</td>
                            <td className="line-content">
                              <span className="code-indent">      </span><span className="code-keyword">uses:</span> actions/setup-node@v3
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line10')}
                          <tr className="code-line removed">
                            <td className="line-number" onClick={() => handleLineClick('file1-line11')}>21</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line11')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">-</td>
                            <td className="line-content">
                              <span className="code-indent">      </span><span className="code-keyword">with:</span>
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line11')}
                          <tr className="code-line removed">
                            <td className="line-number" onClick={() => handleLineClick('file1-line12')}>22</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line12')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">-</td>
                            <td className="line-content">
                              <span className="code-indent">        </span><span className="code-keyword">node-version:</span> <span className="code-string">'18'</span>
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line12')}
                          <tr className="code-line removed">
                            <td className="line-number" onClick={() => handleLineClick('file1-line13')}>23</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line13')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">-</td>
                            <td className="line-content">
                              <span className="code-indent">        </span><span className="code-keyword">cache:</span> <span className="code-string">'npm'</span>
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line13')}
                          <tr className="code-line removed">
                            <td className="line-number" onClick={() => handleLineClick('file1-line14')}>24</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line14')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">-</td>
                            <td className="line-content"></td>
                          </tr>
                          {renderNewCommentInput('file1-line14')}
                          <tr className="code-line removed">
                            <td className="line-number" onClick={() => handleLineClick('file1-line15')}>25</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line15')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">-</td>
                            <td className="line-content">
                              <span className="code-indent">    </span>- <span className="code-keyword">name:</span> Install dependencies
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line15')}
                          <tr className="code-line added">
                            <td className="line-number" onClick={() => handleLineClick('file1-line16')}>19</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line16')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">+</td>
                            <td className="line-content">
                              <span className="code-indent">    </span>- <span className="code-keyword">name:</span> Setup NPM
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line16')}
                          <tr className="code-line added">
                            <td className="line-number" onClick={() => handleLineClick('file1-line17')}>20</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line17')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">+</td>
                            <td className="line-content">
                              <span className="code-indent">      </span><span className="code-keyword">uses:</span> ./github/actions/npm-setup
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line17')}
                          <tr className="code-line">
                            <td className="line-number" onClick={() => handleLineClick('file1-line18')}>21</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line18')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign"></td>
                            <td className="line-content"></td>
                          </tr>
                          {renderNewCommentInput('file1-line18')}
                          <tr className="code-line">
                            <td className="line-number" onClick={() => handleLineClick('file1-line19')}>22</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line19')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign"></td>
                            <td className="line-content">
                              <span className="code-indent">    </span>- <span className="code-keyword">name:</span> Run build
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line19')}
                        </tbody>
                      </table>
                    </div>
                    )}
                  </div>

                  {/* Code Diff - Third File */}
                  <div className="code-diff-container">
                    <div className="code-diff-header">
                      <div className="code-diff-toggle" onClick={() => setFileExpanded3(!fileExpanded3)} style={{ cursor: 'pointer' }}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          style={{
                            transform: fileExpanded3 ? 'rotate(0deg)' : 'rotate(-90deg)',
                            transition: 'transform 0.2s ease'
                          }}
                        >
                          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>
                        <span className="code-file-path">.github/workflows/deploy.yml</span>
                        <button className="copy-button">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                            <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            <rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                          </svg>
                        </button>
                      </div>
                      <div className="code-diff-stats">
                        <span className="additions">+1</span>
                        <span className="deletions">-2</span>
                        <span className="separator">•</span>
                        <span className="coverage-badge">
                          <CoverageIndicator percentage={45} size={14} />
                          Coverage: 45.0%
                        </span>
                        <span className="separator">•</span>
                        <span className="duplication">Duplications: 0.0%</span>
                        <span className="separator">•</span>
                        <span className="issues">Issues: 0</span>
                        <button
                          className="check-button"
                          onClick={() => {
                            setFileChecked3(!fileChecked3);
                            if (!fileChecked3) setFileExpanded3(false);
                          }}
                          style={{ color: fileChecked3 ? '#4CAF50' : 'var(--color-text-muted)' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {fileExpanded3 && (
                    <div className="code-diff-content">
                      <table className="code-table">
                        <tbody>
                          <tr className="code-line">
                            <td className="line-number" onClick={() => handleLineClick('file1-line20')}>32</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line20')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign"></td>
                            <td className="line-content">
                              <span className="code-indent">  </span><span className="code-keyword">steps:</span>
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line20')}
                          <tr className="code-line removed">
                            <td className="line-number" onClick={() => handleLineClick('file1-line21')}>33</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line21')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">-</td>
                            <td className="line-content">
                              <span className="code-indent">    </span>- <span className="code-keyword">uses:</span> actions/setup-node@v3
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line21')}
                          <tr className="code-line removed">
                            <td className="line-number" onClick={() => handleLineClick('file1-line22')}>34</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line22')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">-</td>
                            <td className="line-content">
                              <span className="code-indent">      </span><span className="code-keyword">with:</span>
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line22')}
                          <tr className="code-line added">
                            <td className="line-number" onClick={() => handleLineClick('file1-line23')}>33</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line23')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign">+</td>
                            <td className="line-content">
                              <span className="code-indent">    </span>- <span className="code-keyword">uses:</span> ./github/actions/npm-setup
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line23')}
                          <tr className="code-line">
                            <td className="line-number" onClick={() => handleLineClick('file1-line24')}>34</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line24')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign"></td>
                            <td className="line-content"></td>
                          </tr>
                          {renderNewCommentInput('file1-line24')}
                          <tr className="code-line">
                            <td className="line-number" onClick={() => handleLineClick('file1-line25')}>35</td>
                            <td className="line-comment-toggle" onClick={() => handleLineClick('file1-line25')}>
                              <AddCommentButton />
                            </td>
                            <td className="line-sign"></td>
                            <td className="line-content">
                              <span className="code-indent">    </span>- <span className="code-keyword">name:</span> Deploy to production
                            </td>
                          </tr>
                          {renderNewCommentInput('file1-line25')}
                        </tbody>
                      </table>
                    </div>
                    )}
                  </div>

                  {/* Mark as reviewed button */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <button
                      className={groupReviewed1 ? "mark-needs-review-button" : "mark-reviewed-button"}
                      onClick={() => {
                        if (!groupReviewed1) {
                          // Mark as reviewed
                          setFileChecked1(true);
                          setFileChecked2(true);
                          setFileChecked3(true);
                          setFileExpanded1(false);
                          setFileExpanded2(false);
                          setFileExpanded3(false);
                          setGroupReviewed1(true);
                          setShowFileChanges(false); // Collapse the group
                        } else {
                          // Mark as needs review
                          setFileChecked1(false);
                          setFileChecked2(false);
                          setFileChecked3(false);
                          setGroupReviewed1(false);
                        }
                      }}
                    >
                      {groupReviewed1 ? 'Mark as needs review' : 'Mark as reviewed'}
                    </button>
                  </div>
                    </>
                  )}
                </div>

                {/* Second File Change Card - Database & Models */}
                <div className="file-change-card" id="group-database">
                  <div className="file-change-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <h3 style={{ margin: 0 }}>Database & Models</h3>
                      <span className="needs-review-badge">Needs review</span>
                      <div className="file-change-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                        <span className="file-count">3 files</span>
                        <span className="additions">+156</span>
                        <span className="deletions">-8</span>
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
                        <p>Created data models for User and Session entities, along with database migration for session storage table.</p>
                        <p className="review-focus"><strong>Review Focus:</strong> Verify model relationships and constraints, check migration includes proper indexes, ensure session table schema supports token refresh flow, and validate data types are appropriate.</p>
                      </div>

                      {/* Code Diff 1 */}
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
                            <span className="code-file-path">src/middleware/auth.ts</span>
                            <button className="copy-button">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                              </svg>
                            </button>
                          </div>
                          <div className="code-diff-stats">
                            <span className="additions">+35</span>
                            <span className="deletions">-8</span>
                            <span className="separator">•</span>
                            <span className="coverage-badge">
                              <CoverageIndicator percentage={92} size={14} />
                              Coverage: 92.0%
                            </span>
                            <span className="separator">•</span>
                            <span className="duplication">Duplications: 0.0%</span>
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
                              <tr className="code-line">
                                <td className="line-number">15</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign"></td>
                                <td className="line-content">
                                  <span className="code-keyword">export</span> <span className="code-keyword">async function</span> verifyToken(token: <span className="code-keyword">string</span>) {'{'}
                                </td>
                              </tr>
                              <tr className="code-line removed">
                                <td className="line-number">16</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">-</td>
                                <td className="line-content">
                                  <span className="code-indent">  </span><span className="code-keyword">return</span> jwt.verify(token, SECRET_KEY);
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">17</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">  </span><span className="code-keyword">try</span> {'{'}
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">18</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">    </span><span className="code-keyword">const</span> decoded = <span className="code-keyword">await</span> jwt.verify(token, SECRET_KEY);
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">19</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">    </span><span className="code-keyword">return</span> {'{'} valid: <span className="code-keyword">true</span>, data: decoded {'}'};
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">20</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">  </span>{'}'} <span className="code-keyword">catch</span> (error) {'{'}
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">21</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">    </span><span className="code-keyword">return</span> {'{'} valid: <span className="code-keyword">false</span>, error: <span className="code-string">'Invalid or expired token'</span> {'}'};
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">22</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">  </span>{'}'}
                                </td>
                              </tr>
                              <tr className="code-line">
                                <td className="line-number">23</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign"></td>
                                <td className="line-content">
                                  {'}'}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        )}
                      </div>

                      {/* Code Diff 2 */}
                      <div className="code-diff-container">
                        <div className="code-diff-header">
                          <div className="code-diff-toggle" onClick={() => setFileExpanded5(!fileExpanded5)} style={{ cursor: 'pointer' }}>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              style={{
                                transform: fileExpanded5 ? 'rotate(0deg)' : 'rotate(-90deg)',
                                transition: 'transform 0.2s ease'
                              }}
                            >
                              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                            </svg>
                            <span className="code-file-path">src/api/refresh-token.ts</span>
                            <button className="copy-button">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                              </svg>
                            </button>
                          </div>
                          <div className="code-diff-stats">
                            <span className="additions">+12</span>
                            <span className="deletions">-4</span>
                            <span className="separator">•</span>
                            <span className="coverage-badge">
                              <CoverageIndicator percentage={78} size={14} />
                              Coverage: 78.0%
                            </span>
                            <span className="separator">•</span>
                            <span className="duplication">Duplications: 0.0%</span>
                            <span className="separator">•</span>
                            <span className="issues">Issues: 1</span>
                            <button
                              className="check-button"
                              onClick={() => {
                                setFileChecked5(!fileChecked5);
                                if (!fileChecked5) setFileExpanded5(false);
                              }}
                              style={{ color: fileChecked5 ? '#4CAF50' : 'var(--color-text-muted)' }}
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                              </svg>
                            </button>
                          </div>
                        </div>

                        {fileExpanded5 && (
                        <div className="code-diff-content">
                          <table className="code-table">
                            <tbody>
                              <tr className="code-line added">
                                <td className="line-number">1</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-keyword">import</span> {'{'} generateToken {'}'} <span className="code-keyword">from</span> <span className="code-string">'./auth'</span>;
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">2</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-keyword">import</span> {'{'} validateRefreshToken {'}'} <span className="code-keyword">from</span> <span className="code-string">'./utils'</span>;
                                </td>
                              </tr>
                              <tr className="code-line">
                                <td className="line-number">3</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign"></td>
                                <td className="line-content"></td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">4</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-keyword">export async function</span> refreshAccessToken(refreshToken: <span className="code-keyword">string</span>) {'{'}
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">5</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">  </span><span className="code-keyword">const</span> isValid = <span className="code-keyword">await</span> validateRefreshToken(refreshToken);
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">6</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">  </span><span className="code-keyword">if</span> (!isValid) <span className="code-keyword">throw new</span> Error(<span className="code-string">'Invalid refresh token'</span>);
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">7</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">  </span><span className="code-keyword">return</span> generateToken(isValid.userId);
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">8</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  {'}'}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        )}
                      </div>

                      {/* Mark as reviewed button */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <button
                          className={groupReviewed2 ? "mark-needs-review-button" : "mark-reviewed-button"}
                          onClick={() => {
                            if (!groupReviewed2) {
                              // Mark as reviewed
                              setFileChecked4(true);
                              setFileChecked5(true);
                              setFileExpanded4(false);
                              setFileExpanded5(false);
                              setGroupReviewed2(true);
                              setShowFileChanges2(false); // Collapse the group
                            } else {
                              // Mark as needs review
                              setFileChecked4(false);
                              setFileChecked5(false);
                              setGroupReviewed2(false);
                            }
                          }}
                        >
                          {groupReviewed2 ? 'Mark as needs review' : 'Mark as reviewed'}
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Third File Change Card - Authentication & Security */}
                <div className="file-change-card" id="group-auth">
                  <div className="file-change-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <h3 style={{ margin: 0 }}>Authentication & Security</h3>
                      <span className="needs-review-badge">Needs review</span>
                      <div className="file-change-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                        <span className="file-count">3 files</span>
                        <span className="additions">+243</span>
                        <span className="deletions">-15</span>
                      </div>
                    </div>
                    <button
                      className="pin-button"
                      onClick={() => setShowFileChanges3(!showFileChanges3)}
                      style={{ marginLeft: '12px' }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{
                          transform: showFileChanges3 ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                  </div>

                  {showFileChanges3 && (
                    <>
                      <div className="file-change-description">
                        <p>Implemented JWT-based authentication services, token utilities, and authentication middleware for securing API endpoints.</p>
                        <p className="review-focus"><strong>Review Focus:</strong> Verify JWT token generation/validation logic, check token expiration handling, review middleware authentication flow, and ensure secure password hashing implementation.</p>
                      </div>

                      {/* Code Diff */}
                      <div className="code-diff-container">
                        <div className="code-diff-header">
                          <div className="code-diff-toggle" onClick={() => setFileExpanded6(!fileExpanded6)} style={{ cursor: 'pointer' }}>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              style={{
                                transform: fileExpanded6 ? 'rotate(0deg)' : 'rotate(-90deg)',
                                transition: 'transform 0.2s ease'
                              }}
                            >
                              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                            </svg>
                            <span className="code-file-path">migrations/20260119_add_user_preferences.sql</span>
                            <button className="copy-button">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                              </svg>
                            </button>
                          </div>
                          <div className="code-diff-stats">
                            <span className="additions">+28</span>
                            <span className="deletions">-0</span>
                            <span className="separator">•</span>
                            <span className="coverage-badge">
                              <CoverageIndicator percentage={0} size={14} />
                              Coverage: 0.0%
                            </span>
                            <span className="separator">•</span>
                            <span className="duplication">Duplications: 0.0%</span>
                            <span className="separator">•</span>
                            <span className="issues">Issues: 0</span>
                            <button
                              className="check-button"
                              onClick={() => {
                                setFileChecked6(!fileChecked6);
                                if (!fileChecked6) setFileExpanded6(false);
                              }}
                              style={{ color: fileChecked6 ? '#4CAF50' : 'var(--color-text-muted)' }}
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                              </svg>
                            </button>
                          </div>
                        </div>

                        {fileExpanded6 && (

                        <div className="code-diff-content">
                          <table className="code-table">
                            <tbody>
                              <tr className="code-line added">
                                <td className="line-number">1</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-keyword">CREATE TABLE</span> user_preferences (
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">2</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">  </span>id <span className="code-keyword">BIGSERIAL PRIMARY KEY</span>,
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">3</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">  </span>user_id <span className="code-keyword">BIGINT NOT NULL</span>,
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">4</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">  </span>theme <span className="code-keyword">VARCHAR</span>(20) <span className="code-keyword">DEFAULT</span> <span className="code-string">'light'</span>,
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">5</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">  </span>language <span className="code-keyword">VARCHAR</span>(10) <span className="code-keyword">DEFAULT</span> <span className="code-string">'en'</span>,
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">6</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">  </span>notifications_enabled <span className="code-keyword">BOOLEAN DEFAULT TRUE</span>,
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">7</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">  </span>created_at <span className="code-keyword">TIMESTAMP DEFAULT CURRENT_TIMESTAMP</span>,
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">8</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">  </span>updated_at <span className="code-keyword">TIMESTAMP DEFAULT CURRENT_TIMESTAMP</span>,
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">9</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-indent">  </span><span className="code-keyword">FOREIGN KEY</span> (user_id) <span className="code-keyword">REFERENCES</span> users(id) <span className="code-keyword">ON DELETE CASCADE</span>
                                </td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">10</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  );
                                </td>
                              </tr>
                              <tr className="code-line">
                                <td className="line-number">11</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign"></td>
                                <td className="line-content"></td>
                              </tr>
                              <tr className="code-line added">
                                <td className="line-number">12</td>
                                <td className="line-comment-toggle">
                                  <AddCommentButton />
                                </td>
                                <td className="line-sign">+</td>
                                <td className="line-content">
                                  <span className="code-keyword">CREATE INDEX</span> idx_user_preferences_user_id <span className="code-keyword">ON</span> user_preferences(user_id);
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        )}
                      </div>

                      {/* Mark as reviewed button */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <button
                          className={groupReviewed3 ? "mark-needs-review-button" : "mark-reviewed-button"}
                          onClick={() => {
                            if (!groupReviewed3) {
                              // Mark as reviewed
                              setFileChecked6(true);
                              setFileExpanded6(false);
                              setGroupReviewed3(true);
                              setShowFileChanges3(false); // Collapse the group
                            } else {
                              // Mark as needs review
                              setFileChecked6(false);
                              setGroupReviewed3(false);
                            }
                          }}
                        >
                          {groupReviewed3 ? 'Mark as needs review' : 'Mark as reviewed'}
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Fourth File Change Card - Testing & Documentation */}
                <div className="file-change-card">
                  <div className="file-change-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <h3 style={{ margin: 0 }}>Testing & Documentation</h3>
                      <span className="reviewed-badge" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500 }}>Reviewed</span>
                      <div className="file-change-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                        <span className="file-count">3 files</span>
                        <span className="additions">+312</span>
                        <span className="deletions">-5</span>
                      </div>
                    </div>
                    <button
                      className="pin-button"
                      onClick={() => setShowFileChanges(!showFileChanges)}
                      style={{ marginLeft: '12px', display: 'none' }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{
                          transform: 'rotate(-90deg)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                  </div>

                  {/* Collapsed state - no content shown */}
                  <div style={{ padding: '12px 24px', fontSize: '13px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                    This group has been marked as reviewed and collapsed.
                  </div>
                </div>
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
                  Context
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
                      This PR introduces a comprehensive user management system with REST API endpoints, JWT-based authentication, and database session handling. The implementation includes 4 main components: Backend API routes (users & auth), Database models & migrations, Authentication services with JWT utilities, and comprehensive test coverage with updated documentation.
                    </p>
                    <p className="reviewer-note-text" style={{ marginTop: '8px' }}>
                      <strong>Key Changes:</strong> Added 15 new files across backend infrastructure, implementing CRUD operations for user management, secure authentication flow with token refresh, SQL migration for session storage, and middleware for request validation and authorization.
                    </p>
                  </div>

                  {/* Progress Section */}
                  <div className="reviewer-note-section">
                    <h4 className="reviewer-note-section-title">PR Progress</h4>
                    <div className="pr-progress-stats">
                      <div className="progress-stat">
                        <span className="progress-label">Files Reviewed</span>
                        <span className="progress-value">0 / 15</span>
                      </div>
                      <div className="progress-stat">
                        <span className="progress-label">Groups Completed</span>
                        <span className="progress-value">0 / 4</span>
                      </div>
                      <div className="progress-stat">
                        <span className="progress-label">Est. Time Left</span>
                        <span className="progress-value">~45 min</span>
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
                        placeholder="e.g., 'What security concerns should I look for?' or 'Explain the authentication flow'"
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
                        <div className="comment-avatar-text">JD</div>
                      </div>
                      <div className="comment-meta">
                        <div className="comment-author">jdoe</div>
                        <div className="comment-timestamp">2 hours ago</div>
                      </div>
                    </div>
                    <div className="comment-body">
                      <p>I've implemented the user management API with JWT authentication. The main changes include:</p>
                      <ul>
                        <li>REST endpoints for user CRUD operations</li>
                        <li>JWT-based authentication with refresh tokens</li>
                        <li>Database session storage</li>
                        <li>Comprehensive test coverage</li>
                      </ul>
                      <p>Ready for review! 🚀</p>
                    </div>
                  </div>

                  {/* Comment 2 */}
                  <div className="conversation-comment">
                    <div className="comment-header">
                      <div className="comment-avatar">
                        <div className="comment-avatar-text">AS</div>
                      </div>
                      <div className="comment-meta">
                        <div className="comment-author">asmith</div>
                        <div className="comment-timestamp">1 hour ago</div>
                      </div>
                    </div>
                    <div className="comment-body">
                      <p>Great work! Quick question about the token refresh flow - are we storing the refresh tokens in the database or using Redis for better performance?</p>
                    </div>
                  </div>

                  {/* Comment 3 */}
                  <div className="conversation-comment">
                    <div className="comment-header">
                      <div className="comment-avatar">
                        <div className="comment-avatar-text">JD</div>
                      </div>
                      <div className="comment-meta">
                        <div className="comment-author">jdoe</div>
                        <div className="comment-timestamp">45 minutes ago</div>
                      </div>
                    </div>
                    <div className="comment-body">
                      <p>Currently using database storage for simplicity. We can migrate to Redis in a follow-up PR if we need better performance. Added a TODO comment in <code>auth.ts</code> to track this.</p>
                    </div>
                  </div>

                  {/* Comment 4 */}
                  <div className="conversation-comment">
                    <div className="comment-header">
                      <div className="comment-avatar">
                        <div className="comment-avatar-text">MK</div>
                      </div>
                      <div className="comment-meta">
                        <div className="comment-author">mkumar</div>
                        <div className="comment-timestamp">30 minutes ago</div>
                      </div>
                    </div>
                    <div className="comment-body">
                      <p>Looks good overall! Can you add rate limiting to the auth endpoints? We should prevent brute force attacks on the login endpoint.</p>
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
