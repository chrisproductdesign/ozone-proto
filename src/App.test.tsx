import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders the heading and main sections', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /origin fintech development/i })).toBeVisible();
    expect(screen.getByText(/building beautiful fintech experiences/i)).toBeVisible();
    expect(screen.getByRole('heading', { name: /development workspace/i })).toBeVisible();
  });
});
