import PlaygroundApp from '@playground/App';

import type { ReactNode } from 'react';

type SectionProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

const Section = ({ title, description, children }: SectionProps) => (
  <section className="section">
    <header>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
    {children}
  </section>
);

const App = () => (
  <div className="app">
    <header className="hero">
      <h1>Origin Fintech Development</h1>
      <p>
        Building beautiful fintech experiences with React, TypeScript, and Base UI components.
        Test and iterate on funding flows, dashboards, and business banking interfaces.
      </p>
    </header>
    <main>
      <Section
        title="Active Demos"
        description="Live fintech application interfaces and component playground"
      >
        <ul>
          <li>Business Dashboard - Complete banking interface with transactions and metrics</li>
          <li>Funding Calculator - Interactive funding application with real-time calculations</li>
          <li>Component Library - Base UI foundation with custom fintech components</li>
        </ul>
      </Section>
      <Section
        title="Development Workspace"
        description="Test fintech features and iterate on component designs"
      >
        <PlaygroundApp />
      </Section>
    </main>
  </div>
);

export default App;
