import { useState } from 'react';

import { playgroundPages } from './pages';

const PlaygroundApp = () => {
  const [activeId, setActiveId] = useState(() => playgroundPages[0]?.id ?? 'overview');
  const activePage = playgroundPages.find((page) => page.id === activeId);

  return (
    <div className="playground">
      <div className="playground-tabs" role="tablist" aria-label="Base UI reference sections">
        {playgroundPages.map((page) => {
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
              <span className="playground-tab-title">{page.title}</span>
              <span className="playground-tab-summary">{page.summary}</span>
            </button>
          );
        })}
      </div>
      <div
        id={`panel-${activeId}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeId}`}
        className="playground-content"
        tabIndex={0}
      >
        {activePage?.render()}
      </div>
    </div>
  );
};

export default PlaygroundApp;
