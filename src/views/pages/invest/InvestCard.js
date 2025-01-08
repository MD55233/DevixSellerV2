import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CompanyCard from 'ui-component/cards/CompanyCard';

const InvestCard = ({ plan, onClick, isLoading }) => {
  const { name, price, DirectBonus, IndirectBonus, DailyTaskLimit } = plan;

  const calculateTotalCommission = (days) => {
    return DailyTaskLimit * 50 * days;
  };

  return (
    <CompanyCard onClick={onClick} sx={{ p: 2 }}>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" p={2}>
          <Typography variant="h5" sx={{ color: '#fff', mb: 2, textAlign: 'center' }}>
            {name}
          </Typography>
          <Typography variant="h6" sx={{ color: '#fff', mb: 1, textAlign: 'center' }}>
            Price: PKR {price}
          </Typography>
          <Typography variant="h6" sx={{ color: '#fff', mb: 1, textAlign: 'center' }}>
            Daily Task Limit: {DailyTaskLimit}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#fff', mb: 1, textAlign: 'center' }}>
            Direct Bonus: {DirectBonus * 1}%
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#fff', mb: 1, textAlign: 'center' }}>
            Indirect Bonus: {IndirectBonus * 1}%
          </Typography>

          <TableContainer component={Paper} sx={{ mt: 2, width: '100%', maxWidth: '90%', boxShadow: 'none', backgroundColor: 'rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ color: '#fff', fontSize: '0.8rem', padding: '4px' }}>Time (Days)</TableCell>
                  <TableCell align="center" sx={{ color: '#fff', fontSize: '0.8rem', padding: '4px' }}>Commission</TableCell>
                  <TableCell align="center" sx={{ color: '#fff', fontSize: '0.8rem', padding: '4px' }}>Tasks</TableCell>
                  <TableCell align="center" sx={{ color: '#fff', fontSize: '0.8rem', padding: '4px' }}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[1, 30, 365].map((days) => (
                  <TableRow key={days}>
                    <TableCell align="center" sx={{ color: '#fff', fontSize: '0.8rem', padding: '4px' }}>{days} Day{days > 1 ? 's' : ''}</TableCell>
                    <TableCell align="center" sx={{ color: '#fff', fontSize: '0.8rem', padding: '4px' }}>50</TableCell>
                    <TableCell align="center" sx={{ color: '#fff', fontSize: '0.8rem', padding: '4px' }}>{DailyTaskLimit * days}</TableCell>
                    <TableCell align="center" sx={{ color: '#fff', fontSize: '0.8rem', padding: '4px' }}>{calculateTotalCommission(days)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button variant="contained" color="primary" sx={{ mt: 2, fontSize: '0.8rem', padding: '6px 12px' }}>
            Choose
          </Button>
        </Box>
      )}
    </CompanyCard>
  );
};

InvestCard.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    DirectBonus: PropTypes.number.isRequired,
    IndirectBonus: PropTypes.number.isRequired,
    DailyTaskLimit: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default InvestCard;
