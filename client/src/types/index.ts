/**
 * Type definitions for the core data models in the application.
 * These types correspond to the Rails backend models.
 */

/**
 * Company model interface
 * Represents a business entity that can have checks and invoices
 */
export interface Company {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

/**
 * Invoice model interface
 * Represents a financial invoice that belongs to a company
 * Can be associated with multiple checks through CheckInvoice
 */
export interface Invoice {
  id: number;
  number: string;
  company_id: number;
  company?: Company;  // Optional company details when included in response
  created_at: string;
  updated_at: string;
}

/**
 * Check model interface
 * Represents a financial check that belongs to a company
 * Can be associated with multiple invoices through CheckInvoice
 */
export interface Check {
  id: number;
  number: string;
  company_id: number;
  company?: Company;  // Optional company details when included in response
  image_url?: string; // URL to the uploaded check image
  created_at: string;
  updated_at: string;
}

/**
 * CheckInvoice model interface
 * Represents the many-to-many relationship between checks and invoices
 * Acts as a join table in the database
 */
export interface CheckInvoice {
  id: number;
  check_id: number;
  invoice_id: number;
  check?: Check;     // Optional check details when included in response
  invoice?: Invoice; // Optional invoice details when included in response
  created_at: string;
  updated_at: string;
} 