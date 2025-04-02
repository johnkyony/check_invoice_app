import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Invoice, Company } from '../types';
import { invoiceAPI } from '../services/api';

interface InvoicesListProps {
  invoices: Invoice[];
  companies: Company[];
  onInvoiceChange: () => void;
}

const InvoicesList: React.FC<InvoicesListProps> = ({ invoices, companies, onInvoiceChange }) => {
  const [open, setOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    number: '',
    company_id: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewInvoice({ number: '', company_id: '' });
  };

  const handleAdd = async () => {
    if (!newInvoice.number.trim() || !newInvoice.company_id) return;

    try {
      await invoiceAPI.create({
        number: newInvoice.number,
        company_id: parseInt(newInvoice.company_id),
      });
      onInvoiceChange();
      handleClose();
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Error creating invoice');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this invoice?')) return;

    try {
      await invoiceAPI.delete(id);
      onInvoiceChange();
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('Error deleting invoice');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        sx={{ mb: 2 }}
      >
        Add Invoice
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.number}</TableCell>
                <TableCell>{invoice.company?.name}</TableCell>
                <TableCell>{new Date(invoice.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(invoice.id)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Invoice</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Invoice Number"
            type="text"
            fullWidth
            variant="outlined"
            value={newInvoice.number}
            onChange={(e) => setNewInvoice({ ...newInvoice, number: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Company</InputLabel>
            <Select
              value={newInvoice.company_id}
              label="Company"
              onChange={(e) => setNewInvoice({ ...newInvoice, company_id: e.target.value })}
            >
              {companies.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InvoicesList; 