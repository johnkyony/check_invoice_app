/**
 * Mock Service Worker (MSW) server configuration.
 * Sets up request interception for testing environment.
 */

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Create MSW server with request handlers
// This server will intercept and mock API requests during tests
export const server = setupServer(...handlers); 