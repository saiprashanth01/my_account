export interface SubItem {
  name: string;
  href: string;
}

export interface MenuItem {
  title: string;
  path: string;
  subItems?: SubItem[];
}

export const navigationItems: MenuItem[] = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Gallery',
    path: '/gallery'
  },
  {
    title: 'Blog',
    path: '/blog'
  },
  {
    title: 'Reviews',
    path: '/reviews'
  },
  {
    title: 'About',
    path: '/about',
    subItems: [
      { name: 'My Story', href: '/about#story' },
      { name: 'Experience', href: '/about#experience' }
    ]
  },
  {
    title: 'Connect',
    path: '/connect',
    subItems: [
      { name: 'Contact', href: '/connect#contact' },
      { name: 'Instagram', href: 'https://www.instagram.com/prashanth.frames/' },
      { name: 'Unsplash', href: 'https://unsplash.com/@prashanth_frames' }
    ]
  },
  {
    title: 'Shop',
    path: '/shop'
  }
];