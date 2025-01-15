export interface DocsTab {
    label: string;
    href?: string;
    subItems?: { label: string; href: string }[];
  }
  
  export const docsTabs: DocsTab[] = [
    { label: 'What is Drop3?', href: '/docs/what-is-drop3' },
    { label: 'How to start', href: '/docs/how-to-start' },
    {
      label: 'Create Orders',
      href: '/docs/create-orders',
      subItems: [
        { label: 'WL Market', href: '/docs/wl-market' },
        { label: 'Public Market', href: '/docs/public-market' },
      ],
    },
    { label: 'Manage Balance', href: '/docs/manage-balance' },
    { label: 'Manage Orders', href: '/docs/manage-orders' },
    { label: 'Manage Offers', href: '/docs/manage-offers' },
  ];