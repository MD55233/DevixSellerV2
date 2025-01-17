import React, { useEffect, useState, lazy, Suspense } from 'react';
import axios from 'axios';
import { CircularProgress, Typography, Box } from '@mui/material';
import { useAuth } from 'views/pages/authentication/AuthContext'; // Import the useAuth hook
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Lazy load components
const TransactionChart = lazy(() => import('./TransactionChart'));
const UpgradeAccountCard = lazy(() => import('./UpgradeAccountCard'));

const TransactionsPage = () => {
  const { username } = useAuth(); // Extract username from useAuth
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({ taskLimit: 0 }); // Store user data including taskLimit

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/user/${username}`);
        setUserData({
          taskLimit: response.data.user.dailyTaskLimit || 0,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const [
          allResponse,
          withdrawalsResponse,
          bonusesResponse,
          approvedResponse,
          rejectedResponse,
          referralResponse,
          approvedReferralResponse,
          rejectedReferralResponse,
          taskTransactionsResponse,
        ] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_HOST}/api/transaction-history/${username}`),
          axios.get(`${process.env.REACT_APP_API_HOST}/api/withdrawals/${username}`),
          axios.get(`${process.env.REACT_APP_API_HOST}/api/training-bonus/${username}`),
          axios.get(`${process.env.REACT_APP_API_HOST}/api/approvals/approve/${username}`),
          axios.get(`${process.env.REACT_APP_API_HOST}/api/approvals/reject/${username}`),
          axios.get(`${process.env.REACT_APP_API_HOST}/api/referral-payment/${username}`),
          axios.get(`${process.env.REACT_APP_API_HOST}/api/approvals/referral/approve/${username}`),
          axios.get(`${process.env.REACT_APP_API_HOST}/api/approvals/referral/reject/${username}`),
          axios.get(`${process.env.REACT_APP_API_HOST}/api/task-transactions/${username}`),
        ]);

        // Combine transactions
        const combinedTransactions = [
          ...allResponse.data.map((item) => ({ ...item, type: 'Credit' })),
          ...withdrawalsResponse.data.map((item) => ({ ...item, type: 'Withdrawal' })),
          ...bonusesResponse.data.map((item) => ({ ...item, type: 'Pending Bonus', status: 'pending' })),
          ...approvedResponse.data.map((item) => ({ ...item, type: 'Approved Bonus', status: 'approved' })),
          ...rejectedResponse.data.map((item) => ({ ...item, type: 'Rejected Bonus', status: 'rejected' })),
          ...referralResponse.data.map((item) => ({ ...item, type: 'Referral Payment' })),
          ...approvedReferralResponse.data.map((item) => ({ ...item, type: 'Approved Referral Payment', status: 'approved' })),
          ...rejectedReferralResponse.data.map((item) => ({ ...item, type: 'Rejected Referral Payment', status: 'rejected' })),
          ...taskTransactionsResponse.data.map((item) => ({ ...item, type: 'Task Transaction' })),
        ];

        // Sort by date
        combinedTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setTransactions(combinedTransactions);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch transactions.');
        setLoading(false);
      }
    };

    if (username) {
      fetchUserData();
      fetchTransactions();
    }
  }, [username]);

  const handleUpgradeClick = () => {
    window.location.href = '/payments/referral/plans'; // Replace with your upgrade page route
  };

  // Data for Pie Chart
  const pieData = [
    {
      name: 'Bonuses',
      value: transactions.filter((tx) => tx.type === 'Task Transaction').length,
    },
    {
      name: 'Withdrawals',
      value: transactions.filter((tx) => tx.type === 'Withdrawal').length,
    },
    {
      name: 'Deposits',
      value: transactions.filter((tx) => tx.type === 'Credit').length,
    },
  ];

  const COLORS = ['#2C6630', '#d61e11', '#1E88E5'];

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: '16px' }}>
      {userData.taskLimit > 0 ? (
        <>
          <Box sx={{ marginTop: '32px', marginBottom: '32px' }}>
            <Typography variant="h5" gutterBottom>
              Profits Overview
            </Typography>
            <PieChart width={350} height={350}>
  <Pie
    data={pieData}
    cx="50%"
    cy="50%"
    innerRadius={65} // Creates the donut shape
    outerRadius={100} // Sets the outer radius
    fill="#8884d8"
    paddingAngle={5} // Adds spacing between slices
    dataKey="value"
    labelLine={false} // Removes label lines
    label={({ percent }) =>
      `${(percent * 100).toFixed(0)}%`
    } // Display percentage in slices
  >
    {pieData.map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={COLORS[index % COLORS.length]}
      />
    ))}
  </Pie>
  {/* Custom Total in the Center */}
 
  <Legend
    layout="vertical"
    verticalAlign="middle"
    align="right"
    wrapperStyle={{ paddingLeft: 20 }}
  />
  <Tooltip />
</PieChart>

          </Box>
          <Suspense fallback={<CircularProgress />}>
            <TransactionChart title="Credits" transactions={transactions.filter((tx) => tx.type === 'Credit')} />
            <TransactionChart title="Task Transactions" transactions={transactions.filter((tx) => tx.type === 'Task Transaction')} />
            <TransactionChart title="Withdrawals" transactions={transactions.filter((tx) => tx.type === 'Withdrawal')} />
          </Suspense>
        </>
      ) : (
        <Suspense fallback={<CircularProgress />}>
          <UpgradeAccountCard isLoading={false} onUpgradeClick={handleUpgradeClick} />
        </Suspense>
      )}
    </Box>
  );
};

export default TransactionsPage;
