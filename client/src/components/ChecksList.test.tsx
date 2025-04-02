import React from 'react';
import { render, screen } from '@testing-library/react';
import ChecksList from './ChecksList';
import { Check } from '../types';

const mockChecks: Check[] = [
  {
    id: 1,
    number: 'CHK001',
    company_id: 1,
    company: { id: 1, name: 'Test Company', created_at: '2024-01-01', updated_at: '2024-01-01' },
    image_url: 'http://example.com/check1.jpg',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
];

describe('ChecksList', () => {
  beforeEach(() => {
    render(<ChecksList checks={mockChecks} />);
  });

  it('renders the checks table', () => {
    expect(screen.getByText('Check Number')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Image')).toBeInTheDocument();
  });

  it('displays check information', () => {
    expect(screen.getByText('CHK001')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByAltText('Check CHK001')).toBeInTheDocument();
  });

  it('renders check image with correct attributes', () => {
    const image = screen.getByAltText('Check CHK001') as HTMLImageElement;
    expect(image.src).toBe('http://example.com/check1.jpg');
    expect(image.style.maxWidth).toBe('100px');
    expect(image.style.cursor).toBe('pointer');
  });
});

// Add empty export to make this file a module
export {}; 