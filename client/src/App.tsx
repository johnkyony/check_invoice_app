/**
 * Main application component that serves as the root of the React application.
 * Handles routing and global state management for companies, invoices, and checks.
 */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navigation from './components/Navigation';
import CheckCapture from './components/CheckCapture';
import ChecksList from './components/ChecksList';
import CompaniesList from './components/CompaniesList';
import InvoicesList from './components/InvoicesList';
import { Company, Invoice, Check } from './types';
import { companyAPI, invoiceAPI, checkAPI } from './services/api';

// Create a default Material-UI theme
const theme = createTheme();

function App() {
  // State for storing data fetched from the backend
  const [companies, setCompanies] = useState<Company[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [checks, setChecks] = useState<Check[]>([]);

  /**
   * Fetches all necessary data from the backend APIs.
   * This includes companies, invoices, and checks.
   */
  const fetchData = async () => {
    try {
      // Fetch all data in parallel for better performance
      const [companiesRes, invoicesRes, checksRes] = await Promise.all([
        companyAPI.getAll(),
        invoiceAPI.getAll(),
        checkAPI.getAll(),
      ]);

      // const mergedArray = invoicesRes.data.filter(invoice => invoice.companyId === checksRes.data.companyId);
      console.log(checksRes.data);
      // Update state with fetched data
      setCompanies(companiesRes.data);
      setInvoices(invoicesRes.data);
      setChecks(checksRes.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline normalizes styles across browsers */}
      <CssBaseline />
      <Router>
        {/* Navigation component handles the top navigation bar */}
        <Navigation />
        <Routes>
          {/* Home route shows the check capture form */}
          <Route
            path="/"
            element={
              <CheckCapture
                companies={companies}
                invoices={invoices}
                onCheckCaptured={fetchData}
              />
            }
          />
          {/* Checks route shows the list of captured checks */}
          <Route
            path="/checks"
            element={<ChecksList checks={checks} />}
          />
          {/* Companies route shows the list of companies with add/delete functionality */}
          <Route
            path="/companies"
            element={
              <CompaniesList
                companies={companies}
                onCompanyChange={fetchData}
              />
            }
          />
          {/* Invoices route shows the list of invoices with add/delete functionality */}
          <Route
            path="/invoices"
            element={
              <InvoicesList
                invoices={invoices}
                companies={companies}
                onInvoiceChange={fetchData}
              />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
