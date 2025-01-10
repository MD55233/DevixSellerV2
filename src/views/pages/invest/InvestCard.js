import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const InvestCard = ({ plan, onClick, isLoading }) => {
  const { name, price, DirectBonus, IndirectBonus, DailyTaskLimit } = plan;

  const calculateTotalCommission = (days) => {
    return DailyTaskLimit * 50 * days;
  };

  return (
    <Box
      sx={{
        border: '1px solid #076951',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        mb: 2,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* A: Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#076951',
          color: '#fff',
          p: 2,
          borderBottom: '1px solid #076951',
        }}
      >
        <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#fff' }}>
            {name}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#fff' }}>
            <strong>Direct:</strong> {DirectBonus}%
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#fff' }}>
            <strong>Indirect:</strong> {IndirectBonus}%
          </Typography>
   
        </Box>
        {isLoading && <CircularProgress size={24} sx={{ color: '#fff' }} />}
      </Box>

      {/* B: Table */}
      <TableContainer component={Paper} sx={{ maxWidth: '100%', boxShadow: 'none', backgroundColor: '#f2fff5' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#076951' }}>Time (Days)</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#076951' }}>Commission</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#076951' }}>Tasks</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#076951' }}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 30, 365].map((days) => (
              <TableRow key={days}>
                <TableCell align="center" sx={{ fontSize: '0.85rem', color: '#555' }}>{days} Day{days > 1 ? 's' : ''}</TableCell>
                <TableCell align="center" sx={{ fontSize: '0.85rem', color: '#555' }}>50</TableCell>
                <TableCell align="center" sx={{ fontSize: '0.85rem', color: '#555' }}>{DailyTaskLimit * days}</TableCell>
                <TableCell align="center" sx={{ fontSize: '0.85rem', color: '#555' }}>{calculateTotalCommission(days)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* C: Footer */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          backgroundColor: '#D4EDDA',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#076951', fontSize: '1.2rem' }}>
          Price: PKR {price}
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#076951',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 'bold',
            ':hover': {
              backgroundColor: '#0056b3',
            },
          }}
          onClick={onClick}
        >
          Choose
        </Button>
      </Box>
    </Box>
  );
};

InvestCard.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    DirectBonus: PropTypes.number.isRequired,
    IndirectBonus: PropTypes.number.isRequired,
    DailyTaskLimit: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default InvestCard;
