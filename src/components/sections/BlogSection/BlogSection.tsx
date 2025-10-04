import { BlogPost } from '@/types/blog';
import { BlogCard } from '@/components/organisms';

export const blogPosts: BlogPost[] = [
{
  id: 1,
  title: "Festival Celebrations Done Right",
  excerpt:
    "Explore creative décor, themes, and entertainment ideas that make festivals vibrant, joyful, and unforgettable for everyone.",
  image: '/images/blog/post-one.png',
  category: 'FESTIVALS',
  href: '#',
},
{
  id: 2,
  title: "Hosting the Ultimate Party",
  excerpt:
    "From birthdays to private get-togethers, discover tips to plan parties filled with fun, laughter, and memories that last.",
  image: '/images/blog/post-two.jpg',
  category: 'PARTIES',
  href: '#',
},
{
  id: 3,
  title: "Reception Planning Made Easy",
  excerpt:
    "Learn how to craft the perfect reception with stunning décor, personalized themes, and seamless guest experiences.",
  image: '/images/blog/post-three.jpg',
  category: 'RECEPTIONS',
  href: '#',
},
];

export function BlogSection() {
  return (
    <section className='bg-tertiary container'>
      <div className='flex items-center justify-between mb-12'>
        <h2 className='heading-lg text-tertiary'>
          FROM IDEAS TO CELEBRATIONS
        </h2>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3'>
        {blogPosts.map((post, index) => (
          <BlogCard
            key={post.id}
            index={index}
            post={post}
          />
        ))}
      </div>
    </section>
  );
}

