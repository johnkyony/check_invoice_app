/**
 * Mock Service Worker handlers for API request interception during testing.
 * Provides mock responses that mimic the backend API behavior.
 */
import { http, HttpResponse } from 'msw';
import { Company, Check, Invoice } from '../types';

// Base URL that matches the actual API
const API_BASE_URL = 'http://localhost:3000';

/**
 * Mock company data for testing
 * Represents a list of sample companies
 */
const mockCompanies: Company[] = [
  { id: 1, name: 'Test Company 1', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 2, name: 'Test Company 2', created_at: '2024-01-01', updated_at: '2024-01-01' },
];

/**
 * Mock invoice data for testing
 * Each invoice is associated with a company
 */
const mockInvoices: Invoice[] = [
  { id: 1, number: '1234', company_id: 1, created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 2, number: '5678', company_id: 2, created_at: '2024-01-01', updated_at: '2024-01-01' },
];

/**
 * Mock check data for testing
 * Includes sample check with image URL
 */
const mockChecks: Check[] = [
  {
    id: 1,
    number: 'CHK001',
    company_id: 1,
    image_url: 'http://example.com/check1.jpg',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
];

/**
 * MSW request handlers for intercepting API calls during testing
 * Each handler mimics the behavior of the corresponding backend endpoint
 */
export const handlers = [
  // Companies
  http.get(`${API_BASE_URL}/companies`, () => {
    return HttpResponse.json(mockCompanies);
  }),
  http.post(`${API_BASE_URL}/companies`, async ({ request }) => {
    const data = await request.json() as { company: { name: string } };
    const newCompany: Company = {
      id: mockCompanies.length + 1,
      name: data.company.name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockCompanies.push(newCompany);
    return HttpResponse.json(newCompany);
  }),
  http.delete(`${API_BASE_URL}/companies/:id`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // Invoices
  http.get(`${API_BASE_URL}/invoices`, () => {
    return HttpResponse.json(mockInvoices);
  }),
  http.post(`${API_BASE_URL}/invoices`, async ({ request }) => {
    const data = await request.json() as { invoice: { number: string; company_id: number } };
    const newInvoice: Invoice = {
      id: mockInvoices.length + 1,
      number: data.invoice.number,
      company_id: data.invoice.company_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockInvoices.push(newInvoice);
    return HttpResponse.json(newInvoice);
  }),
  http.delete(`${API_BASE_URL}/invoices/:id`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // Checks
  http.get(`${API_BASE_URL}/checks`, () => {
    return HttpResponse.json(mockChecks);
  }),
  http.post(`${API_BASE_URL}/checks`, async () => {
    const newCheck: Check = {
      id: mockChecks.length + 1,
      number: 'CHK002',
      company_id: 1,
      image_url: 'http://example.com/check2.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockChecks.push(newCheck);
    return HttpResponse.json(newCheck);
  }),
]; 