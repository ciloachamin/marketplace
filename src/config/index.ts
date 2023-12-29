export const PRODUCT_CATEGORIES = [
  {
    label: 'Technology',
    value: 'technology' as const,
    href: '/products?category=technology',
    featured: [
      {
        name: 'Editor picks',
        href: `/products?category=technology`,
        imageSrc: '/nav/technology/editor_picks.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=technology&sort=desc',
        imageSrc: '/nav/technology/new_arrivals.jpg',
      },
      {
        name: 'Bestsellers',
        href: '/products?category=technology',
        imageSrc: '/nav/technology/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'Food',
    value: 'food' as const,
    href: '/products?category=food',
    featured: [
      {
        name: 'Favorite Food Picks',
        href: `/products?category=food`,
        imageSrc: '/nav/food/favorite_picks.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=food&sort=desc',
        imageSrc: '/nav/food/new_arrivals.jpg',
      },
      {
        name: 'Bestselling Food',
        href: '/products?category=food',
        imageSrc: '/nav/food/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'Fashion and Beauty',
    value: 'fashion_and_beauty' as const,
    href: '/products?category=fashion_and_beauty',
    featured: [
      {
        name: 'Editor Picks',
        href: `/products?category=fashion_and_beauty`,
        imageSrc: '/nav/fashion_and_beauty/editor_picks.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=fashion_and_beauty&sort=desc',
        imageSrc: '/nav/fashion_and_beauty/new_arrivals.jpg',
      },
      {
        name: 'Bestsellers',
        href: '/products?category=fashion_and_beauty',
        imageSrc: '/nav/fashion_and_beauty/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'Services',
    value: 'services' as const,
    href: '/products?category=services',
    featured: [
      {
        name: 'Top Services',
        href: `/products?category=services`,
        imageSrc: '/nav/services/top_services.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=services&sort=desc',
        imageSrc: '/nav/services/new_arrivals.jpg',
      },
      {
        name: 'Bestselling Services',
        href: '/products?category=services',
        imageSrc: '/nav/services/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'Sports',
    value: 'sports' as const,
    href: '/products?category=sports',
    featured: [
      {
        name: 'Sports Picks',
        href: `/products?category=sports`,
        imageSrc: '/nav/sports/sports_picks.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=sports&sort=desc',
        imageSrc: '/nav/sports/new_arrivals.jpg',
      },
      {
        name: 'Bestselling Sports',
        href: '/products?category=sports',
        imageSrc: '/nav/sports/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'Beverages',
    value: 'beverages' as const,
    href: '/products?category=beverages',
    featured: [
      {
        name: 'Favorite Beverages',
        href: `/products?category=beverages`,
        imageSrc: '/nav/beverages/favorite_beverages.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=beverages&sort=desc',
        imageSrc: '/nav/beverages/new_arrivals.jpg',
      },
      {
        name: 'Bestselling Beverages',
        href: '/products?category=beverages',
        imageSrc: '/nav/beverages/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'Art and Accessories',
    value: 'art_and_accessories' as const,
    href: '/products?category=art_and_accessories',
    featured: [
      {
        name: 'Art Picks',
        href: `/products?category=art_and_accessories`,
        imageSrc: '/nav/art_and_accessories/art_picks.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=art_and_accessories&sort=desc',
        imageSrc: '/nav/art_and_accessories/new_arrivals.jpg',
      },
      {
        name: 'Bestselling Art',
        href: '/products?category=art_and_accessories',
        imageSrc: '/nav/art_and_accessories/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'Tasks',
    value: 'tasks' as const,
    href: '/products?category=tasks',
    featured: [
      {
        name: 'Top Tasks',
        href: `/products?category=tasks`,
        imageSrc: '/nav/tasks/top_tasks.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=tasks&sort=desc',
        imageSrc: '/nav/tasks/new_arrivals.jpg',
      },
      {
        name: 'Bestselling Tasks',
        href: '/products?category=tasks',
        imageSrc: '/nav/tasks/bestsellers.jpg',
      },
    ],
  },
];
