/**
 * Test setup file that runs before all tests.
 * Configures the testing environment and global test utilities.
 */

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Start MSW server before all tests
beforeAll(() => server.listen());

// Reset request handlers after each test
// Removes any request handlers that were added during the test
afterEach(() => server.resetHandlers());

// Clean up after all tests are done
afterAll(() => server.close());
