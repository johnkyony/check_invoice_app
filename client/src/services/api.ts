/**
 * API service module that handles all HTTP requests to the backend.
 * Provides typed API calls for each model in the application.
 */
import axios from 'axios';
import { Company, Invoice, Check, CheckInvoice } from '../types';

// Base URL for all API requests
const API_BASE_URL = 'http://localhost:3000';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Company API endpoints
 * Handles CRUD operations for companies
 */
export const companyAPI = {
  // Get all companies
  getAll: () => api.get<Company[]>('/companies'),
  // Get a single company by ID
  getOne: (id: number) => api.get<Company>(`/companies/${id}`),
  // Create a new company
  create: (data: Partial<Company>) => api.post<Company>('/companies', { company: data }),
  // Update an existing company
  update: (id: number, data: Partial<Company>) => api.put<Company>(`/companies/${id}`, { company: data }),
  // Delete a company
  delete: (id: number) => api.delete(`/companies/${id}`),
};

/**
 * Invoice API endpoints
 * Handles CRUD operations for invoices
 */
export const invoiceAPI = {
  // Get all invoices
  getAll: () => api.get<Invoice[]>('/invoices'),
  // Get a single invoice by ID
  getOne: (id: number) => api.get<Invoice>(`/invoices/${id}`),
  // Create a new invoice
  create: (data: Partial<Invoice>) => api.post<Invoice>('/invoices', { invoice: data }),
  // Update an existing invoice
  update: (id: number, data: Partial<Invoice>) => api.put<Invoice>(`/invoices/${id}`, { invoice: data }),
  // Delete an invoice
  delete: (id: number) => api.delete(`/invoices/${id}`),
};

/**
 * Check API endpoints
 * Handles CRUD operations for checks, including image upload
 */
export const checkAPI = {
  // Get all checks
  getAll: () => api.get<Check[]>('/checks'),
  // Get a single check by ID
  getOne: (id: number) => api.get<Check>(`/checks/${id}`),
  // Create a new check with image upload
  create: (data: FormData) => api.post<Check>('/checks', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  // Update an existing check
  update: (id: number, data: Partial<Check>) => api.put<Check>(`/checks/${id}`, { check: data }),
  // Delete a check
  delete: (id: number) => api.delete(`/checks/${id}`),
};

/**
 * CheckInvoice API endpoints
 * Handles CRUD operations for check-invoice associations
 */
export const checkInvoiceAPI = {
  // Get all check-invoice associations
  getAll: () => api.get<CheckInvoice[]>('/check_invoices'),
  // Get a single check-invoice association by ID
  getOne: (id: number) => api.get<CheckInvoice>(`/check_invoices/${id}`),
  // Create a new check-invoice association
  create: (data: Partial<CheckInvoice>) => api.post<CheckInvoice>('/check_invoices', { check_invoice: data }),
  // Update an existing check-invoice association
  update: (id: number, data: Partial<CheckInvoice>) => api.put<CheckInvoice>(`/check_invoices/${id}`, { check_invoice: data }),
  // Delete a check-invoice association
  delete: (id: number) => api.delete(`/check_invoices/${id}`),
}; 