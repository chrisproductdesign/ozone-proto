import { useState, useCallback } from 'react';
import { DealProvider } from '@/contexts/DealContext';
import { ToastProvider } from '@/components/feedback/Toast';

import { playgroundPages } from './pages';

// Navigation context for programmatic navigation
export interface NavigationProps {
  navigateTo: (pageId: string) => void;
  currentPage: string;
}

const PlaygroundApp = () => {
  const [activeId, setActiveId] = useState(() => playgroundPages[0]?.id ?? 'overview');
  const activePage = playgroundPages.find((page) => page.id === activeId);

  // Navigation function that screens can use
  const navigateTo = useCallback((pageId: string) => {
    const pageExists = playgroundPages.some(page => page.id === pageId);
    if (pageExists) {
      setActiveId(pageId);
    }
  }, []);

  const navigationProps: NavigationProps = {
    navigateTo,
    currentPage: activeId
  };

  return (
    <DealProvider>
      <ToastProvider>
        <div className="playground">
          <div className="playground-tabs" role="tablist" aria-label="Base UI reference sections" style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Core pages - left side */}
            <div style={{ display: 'flex' }}>
              {playgroundPages.slice(0, 4).map((page) => {
                const isActive = page.id === activeId;

                return (
                  <button
                    key={page.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${page.id}`}
                    id={`tab-${page.id}`}
                    className={`playground-tab${isActive ? ' is-active' : ''}`}
                    onClick={() => setActiveId(page.id)}
                  >
                    {page.title}
                  </button>
                );
              })}
            </div>

            {/* Experimental pages - flush right */}
            <div style={{ display: 'flex' }}>
              {playgroundPages.slice(4).map((page) => {
                const isActive = page.id === activeId;

                return (
                  <button
                    key={page.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${page.id}`}
                    id={`tab-${page.id}`}
                    className={`playground-tab${isActive ? ' is-active' : ''}`}
                    onClick={() => setActiveId(page.id)}
                  >
                    {page.title}
                  </button>
                );
              })}
            </div>
          </div>
          <div
            id={`panel-${activeId}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeId}`}
            className="playground-content"
            tabIndex={0}
          >
            {activePage?.render(navigationProps)}
          </div>
        </div>
      </ToastProvider>
    </DealProvider>
  );
};

export default PlaygroundApp;
