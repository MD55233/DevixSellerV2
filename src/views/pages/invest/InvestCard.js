import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Button, CircularProgress } from '@mui/material';
import CompanyCard from 'ui-component/cards/CompanyCard';

const InvestCard = ({ plan, onClick, isLoading }) => {
  const { name, price, DirectBonus, IndirectBonus, DailyTaskLimit } = plan;

  return (
    <CompanyCard onClick={onClick}>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h3" sx={{ color: '#fff', mb: 2 }}>
            {name}
          </Typography>
          <Typography variant="h3" sx={{ color: '#fff', mb: 1 }}>
            Price: pkr {price}
          </Typography>
          <Typography variant="h3" sx={{ color: '#fff', mb: 1 }}>
            DailyTaskLimit:  {DailyTaskLimit}
          </Typography>
          <Typography variant="h4" sx={{ color: '#fff', mb: 1 }}>
            Direct: {DirectBonus * 1}%
          </Typography>
          <Typography variant="h4" sx={{ color: '#fff', mb: 1 }}>
            Indirect: {IndirectBonus * 1}%
          </Typography>
          <Button variant="contained" color="primary">
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
    IndirectBonus: PropTypes.number.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default InvestCard;
