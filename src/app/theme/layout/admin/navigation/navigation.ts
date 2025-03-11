export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'page',
    title: 'Menu',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Prospects',
        title: 'Prospects',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'view-prospects',
            title: 'View Prospects',
            type: 'item',
            url: '/prospects',
            breadcrumbs: false
          },
          {
            id: 'add-prospect',
            title: 'Add Prospect',
            type: 'item',
            url: '/add-prospect',
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'Emails',
        title: 'Emails',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'generate-email',
            title: 'Generate Email',
            type: 'item',
            url: '/generate-email',
            breadcrumbs: false
          },
          {
            id: 'Mailing History',
            title: 'Mailing History',
            type: 'item',
            url: '/mail-history',
            breadcrumbs: true
          }
        ]
      }
    ]
  },

];
