// assets
import { IconUserPlus, IconMoodPlus, IconDeviceTabletUp, IconChecklist  } from '@tabler/icons-react';

// constant
const icons = {
  IconUserPlus,
  IconMoodPlus,
  IconDeviceTabletUp,
  IconChecklist 
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Payments',
  type: 'group',
  children: [
    {
      id: 'Training Bonus',
      title: 'Training Bonus',
      type: 'item',
      url: '/payments/training-bonus',
      icon: icons.IconUserPlus
    },
    {
      id: 'Add Referral',
      title: 'Add Referral',
      type: 'item',
      url: '/payments/referral/plans',
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
