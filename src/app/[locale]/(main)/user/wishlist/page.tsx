import { WishlistPage } from '@/components/sections';

export const wishlistTabs = [
  { label: 'All', link: '/wishlist' },
  { label: 'Products', link: '/wishlist/products' },
  { label: 'Collections', link: '/wishlist/collections' },
];

export default function Wishlist() {
  return (
    <main className='container'>
      <WishlistPage tab={'all'} />
    </main>
  );
}
