import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders home page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome to our App/i)).toBeInTheDocument();
  });

  it('renders events page', () => {
    render(
      <MemoryRouter initialEntries={['/events']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Upcoming Events/i)).toBeInTheDocument();
  });

  it('renders login page', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('renders 404 page', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });

  it('renders loading spinner', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders error boundary', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it('renders private route', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders admin dashboard', () => {
    render(
      <MemoryRouter initialEntries={['/admin-dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
  });

  it('renders member dashboard', () => {
    render(
      <MemoryRouter initialEntries={['/member-dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Member Dashboard/i)).toBeInTheDocument();
  });

  it('renders certification validation', () => {
    render(
      <MemoryRouter initialEntries={['/certification-validation']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Certification Validation/i)).toBeInTheDocument();
  });

  it('renders review feedback', () => {
    render(
      <MemoryRouter initialEntries={['/review-feedback']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Review Feedback/i)).toBeInTheDocument();
  });

  it('renders event calendar', () => {
    render(
      <MemoryRouter initialEntries={['/event-calendar']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Event Calendar/i)).toBeInTheDocument();
  });

  it('renders discussion forums', () => {
    render(
      <MemoryRouter initialEntries={['/discussion-forums']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Discussion Forums/i)).toBeInTheDocument();
  });

  it('renders blogs', () => {
    render(
      <MemoryRouter initialEntries={['/blogs']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Blogs/i)).toBeInTheDocument();
  });

  it('renders interactive tutorials', () => {
    render(
      <MemoryRouter initialEntries={['/interactive-tutorials']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Interactive Tutorials/i)).toBeInTheDocument();
  });

  it('renders gallery', () => {
    render(
      <MemoryRouter initialEntries={['/gallery']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Gallery/i)).toBeInTheDocument();
  });

  it('renders resources', () => {
    render(
      <MemoryRouter initialEntries={['/resources']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Resources/i)).toBeInTheDocument();
  });

  it('renders contact', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it('renders register', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
});

