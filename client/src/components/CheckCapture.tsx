import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Paper,
  Container,
} from '@mui/material';
import { Company, Invoice } from '../types';
import { checkAPI, checkInvoiceAPI } from '../services/api';

interface CheckCaptureProps {
  companies: Company[];
  invoices: Invoice[];
  onCheckCaptured: () => void;
}

const CheckCapture: React.FC<CheckCaptureProps> = ({ companies, invoices, onCheckCaptured }) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [checkNumber, setCheckNumber] = useState<string>('');
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!fileInputRef.current?.files?.[0]) {
      alert('Please capture a check image');
      return;
    }

    const formData = new FormData();
    formData.append('check[company_id]', selectedCompany);
    formData.append('check[number]', checkNumber);
    formData.append('check[image]', fileInputRef.current.files[0]);

    try {
      const response = await checkAPI.create(formData);
      
      // Create check-invoice associations
      if (response.data.id) {
        await Promise.all(
          selectedInvoices.map((invoiceId) =>
            checkInvoiceAPI.create({
              check_id: response.data.id,
              invoice_id: parseInt(invoiceId),
            })
          )
        );
      }

      onCheckCaptured();
      // Reset form
      setSelectedCompany('');
      setCheckNumber('');
      setSelectedInvoices([]);
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error saving check:', error);
      alert('Error saving check');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" gutterBottom>
            Capture Check
          </Typography>

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            {previewImage ? (
              <img src={previewImage} alt="Check preview" style={{ maxHeight: '100%', maxWidth: '100%' }} />
            ) : (
              'Capture Image'
            )}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageCapture}
              ref={fileInputRef}
            />
          </Button>

          <FormControl fullWidth>
            <InputLabel>Company</InputLabel>
            <Select
              value={selectedCompany}
              label="Company"
              onChange={(e) => setSelectedCompany(e.target.value)}
              required
            >
              {companies.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Check Number"
            value={checkNumber}
            onChange={(e) => setCheckNumber(e.target.value)}
            required
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Invoices</InputLabel>
            <Select
              multiple
              value={selectedInvoices}
              label="Invoices"
              onChange={(e) => setSelectedInvoices(typeof e.target.value === 'string' ? [e.target.value] : e.target.value)}
            >
              {invoices
                .filter((invoice) => invoice.company_id === parseInt(selectedCompany))
                .map((invoice) => (
                  <MenuItem key={invoice.id} value={invoice.id}>
                    {invoice.number}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CheckCapture; 