import { 
  IconCashRegister, 
  IconCreditCardRefund, 
  IconCreditCardPay, 
  IconChartHistogram,
  IconFileInvoice,       // Added new icon for 'Task Transactions'
  IconCoins,             // Added new icon for 'Deposit History'
  IconArrowBackUp,       // Added new icon for 'Withdraw History'
  IconFileText,          // Added new icon for 'Training Bonus History'
  IconBox,               // Added new icon for 'Product Profit History'
} from '@tabler/icons-react';

// constant
const icons = {
  IconCashRegister,
  IconCreditCardRefund,
  IconCreditCardPay,
  IconChartHistogram,
  IconFileInvoice,       // New icon for Task Transactions
  IconCoins,             // New icon for Deposit History
  IconArrowBackUp,       // New icon for Withdraw History
  IconFileText,          // New icon for Training Bonus History
  IconBox,               // New icon for Product Profit History
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'Transaction',
  title: 'Transaction',
  type: 'group',
  children: [
    
    {
      id: 'All Transactions',
      title: 'All Transactions',
      type: 'item',
      url: '/Transactions/all-transactions',
      icon: icons.IconCashRegister,  // Keeping IconCashRegister for All Transactions
      breadcrumbs: false
    },
    {
      id: 'Task Transactions',
      title: 'Task Transactions',
      type: 'item',
      url: '/Transactions/task-transactions',
      icon: icons.IconFileInvoice,  // New icon for Task Transactions
      breadcrumbs: false
    },
    {
      id: 'Deposit History',
      title: 'Deposit History',
      type: 'item',
      url: '/Transactions/deposit-history',
      icon: icons.IconCoins,  // New icon for Deposit History
      breadcrumbs: false
    },
    {
      id: 'Withdraw History',
      title: 'Withdraw History',
      type: 'item',
      url: '/Transactions/withdraw-history',
      icon: icons.IconArrowBackUp,  // New icon for Withdraw History
      breadcrumbs: false
    },
    {
      id: 'Training Bonus History',
      title: 'Training Bonus History',
      type: 'item',
      url: '/Transactions/training-bonus-history',
      icon: icons.IconFileText,  // New icon for Training Bonus History
      breadcrumbs: false
    },
    {
      id: 'Product Profit History',
      title: 'Product Profit History',
      type: 'item',
      url: '/Transactions/product-history',
      icon: icons.IconBox,  // New icon for Product Profit History
      breadcrumbs: false
    }
  ]
};

export default utilities;
