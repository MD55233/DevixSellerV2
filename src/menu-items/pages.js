// assets
import {  IconMoodPlus, IconDeviceTabletUp, IconCreditCard, IconCrown,IconChecklist,IconWashEco } from '@tabler/icons-react';

// constant
const icons = {
  IconMoodPlus,
  IconDeviceTabletUp,
  IconCreditCard,
  IconCrown,
  IconChecklist,
  IconWashEco  
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Payments',
  type: 'group',
  children: [
    {
      id: 'Upgrade Account',
      title: 'Upgrade Account',
      type: 'item',
      url: '/payments/referral/plans',
      icon: icons.IconCrown
    },
    {
      id: 'Payment Accounts',
      title: 'Our Payment Accounts',
      type: 'item',
      url: '/payment-accounts',
      icon: icons.IconCreditCard  
    },
    {
      id: 'Salary',
      title: 'Claim Salary',
      type: 'item',
      url: '/payments/salary',
      icon: icons.IconWashEco  // Updated icon for Salary
    },
    {
      id: 'Add Referral',
      title: 'Add Referral',
      type: 'item',
      url: '/payments/referral/referral-link',
      icon: icons.IconMoodPlus 
    },
    {
      id: 'Withdraw',
      title: 'Withdraw',
      type: 'item',
      url: '/payments/withdraw',
      icon: icons.IconDeviceTabletUp
    },
    {
      id: 'Task Center',
      title: 'Task Center',
      type: 'item',
      url: '/payments/task-center',
      icon: icons.IconChecklist 
    }
  ]
};

export default pages;
