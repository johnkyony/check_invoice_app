import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from '@mui/material';
import { Check } from '../types';

interface ChecksListProps {
  checks: Check[];
}

const ChecksList: React.FC<ChecksListProps> = ({ checks }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Check Number</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {checks.map((check) => (
              <TableRow key={check.id}>
                <TableCell>{check.number}</TableCell>
                <TableCell>{check.company?.name}</TableCell>
                <TableCell>{new Date(check.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  {check.image_url && (
                    <img
                      src={check.image_url}
                      alt={`Check ${check.number}`}
                      style={{ maxWidth: 100, cursor: 'pointer' }}
                      onClick={() => window.open(check.image_url, '_blank')}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ChecksList; 