import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckCapture from './CheckCapture';
import { Company, Invoice } from '../types';

const mockCompanies: Company[] = [
  { id: 1, name: 'Test Company 1', created_at: '2024-01-01', updated_at: '2024-01-01' },
];

const mockInvoices: Invoice[] = [
  { id: 1, number: '1234', company_id: 1, created_at: '2024-01-01', updated_at: '2024-01-01' },
];

const mockOnCheckCaptured = jest.fn();

describe('CheckCapture', () => {
  beforeEach(() => {
    render(
      <CheckCapture
        companies={mockCompanies}
        invoices={mockInvoices}
        onCheckCaptured={mockOnCheckCaptured}
      />
    );
  });

  it('renders the capture form', () => {
    expect(screen.getByText('Capture Check')).toBeInTheDocument();
    expect(screen.getByText('Capture Image')).toBeInTheDocument();
    expect(screen.getByLabelText('Company')).toBeInTheDocument();
    expect(screen.getByLabelText('Check Number')).toBeInTheDocument();
  });

  it('allows selecting a company', async () => {
    const companySelect = screen.getByLabelText('Company');
    fireEvent.mouseDown(companySelect);
    
    const option = screen.getByText('Test Company 1');
    fireEvent.click(option);
    
    expect(companySelect).toHaveTextContent('Test Company 1');
  });

  it('allows entering a check number', () => {
    const checkNumberInput = screen.getByLabelText('Check Number');
    userEvent.type(checkNumberInput, '12345');
    expect(checkNumberInput).toHaveValue('12345');
  });

  it('shows validation error when submitting without image', async () => {
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please capture a check image')).toBeInTheDocument();
    });
  });
}); 