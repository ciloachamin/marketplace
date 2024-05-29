export const PRODUCT_CATEGORIES = [
  {
    label: 'Arriendos',
    value: 'rentals' as const,
    href: '/products?category=rentals',
    destacados: [
      {
        name: 'Selecciones del Editor',
        href: `/products?category=rentals`,
        imageSrc: '/nav/rentals/editor_picks.jpg',
      },
      {
        name: 'Nuevos Lanzamientos',
        href: '/products?category=rentals&sort=desc',
        imageSrc: '/nav/rentals/new_arrivals.jpg',
      },
      {
        name: 'Más Solicitados',
        href: '/products?category=rentals&sort=popular',
        imageSrc: '/nav/rentals/most_requested.jpg',
      },
    ],
  },
  {
    label: 'Negocios',
    value: 'business' as const,
    href: '/products?category=business',
    destacados: [
      {
        name: 'Selecciones del Editor',
        href: `/products?category=business`,
        imageSrc: '/nav/business/editor_picks.jpg',
      },
      {
        name: 'Nuevos Lanzamientos',
        href: '/products?category=business&sort=desc',
        imageSrc: '/nav/business/new_arrivals.jpg',
      },
      {
        name: 'Más Solicitados',
        href: '/products?category=business&sort=popular',
        imageSrc: '/nav/business/most_requested.jpg',
      },
    ],
  },  
  {
    label: 'Internacional',
    value: 'international' as const,
    href: '/products?category=international',
    destacados: [
      {
        name: 'Selecciones del Editor',
        href: `/products?category=international`,
        imageSrc: '/nav/international/editor_picks.jpg',
      },
      {
        name: 'Nuevos Lanzamientos',
        href: '/products?category=international&sort=desc',
        imageSrc: '/nav/international/new_arrivals.jpg',
      },
      {
        name: 'Más Solicitados',
        href: '/products?category=international&sort=popular',
        imageSrc: '/nav/international/most_requested.jpg',
      },
    ],
  }
  ,
  {
    label: 'Tecnología',
    value: 'technology' as const,
    href: '/products?category=technology',
    destacados: [
      {
        name: 'Selecciones del Editor',
        href: `/products?category=technology`,
        imageSrc: '/nav/technology/editor_picks.jpg',
      },
      {
        name: 'Nuevos Lanzamientos',
        href: '/products?category=technology&sort=desc',
        imageSrc: '/nav/technology/new_arrivals.jpg',
      },
      {
        name: 'Más Vendidos',
        href: '/products?category=technology',
        imageSrc: '/nav/technology/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'Comida',
    value: 'food' as const,
    href: '/products?category=food',
    destacados: [
      {
        name: 'Selecciones de Comida Favorita',
        href: `/products?category=food`,
        imageSrc: '/nav/food/favorite_picks.jpg',
      },
      {
        name: 'Nuevos Lanzamientos',
        href: '/products?category=food&sort=desc',
        imageSrc: '/nav/food/new_arrivals.jpg',
      },
      {
        name: 'Más Vendidos de Comida',
        href: '/products?category=food',
        imageSrc: '/nav/food/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'Moda y Belleza',
    value: 'fashion_and_beauty' as const,
    href: '/products?category=fashion_and_beauty',
    destacados: [
      {
        name: 'Selecciones del Editor',
        href: `/products?category=fashion_and_beauty`,
        imageSrc: '/nav/fashion_and_beauty/editor_picks.jpg',
      },
      {
        name: 'Nuevos Lanzamientos',
        href: '/products?category=fashion_and_beauty&sort=desc',
        imageSrc: '/nav/fashion_and_beauty/new_arrivals.jpg',
      },
      {
        name: 'Más Vendidos',
        href: '/products?category=fashion_and_beauty',
        imageSrc: '/nav/fashion_and_beauty/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'Servicios',
    value: 'services' as const,
    href: '/products?category=services',
    destacados: [
      {
        name: 'Principales Servicios',
        href: `/products?category=services`,
        imageSrc: '/nav/services/top_services.jpg',
      },
      {
        name: 'Nuevos Lanzamientos',
        href: '/products?category=services&sort=desc',
        imageSrc: '/nav/services/new_arrivals.jpg',
      },
      {
        name: 'Más Vendidos de Servicios',
        href: '/products?category=services',
        imageSrc: '/nav/services/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'Deportes',
    value: 'sports' as const,
    href: '/products?category=sports',
    destacados: [
      {
        name: 'Selecciones Deportivas',
        href: `/products?category=sports`,
        imageSrc: '/nav/sports/sports_picks.jpg',
      },
      {
        name: 'Nuevos Lanzamientos',
        href: '/products?category=sports&sort=desc',
        imageSrc: '/nav/sports/new_arrivals.jpg',
      },
      {
        name: 'Más Vendidos Deportivos',
        href: '/products?category=sports',
        imageSrc: '/nav/sports/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'Bebidas y algo más',
    value: 'beverages' as const,
    href: '/products?category=beverages',
    destacados: [
      {
        name: 'Bebidas Favoritas',
        href: `/products?category=beverages`,
        imageSrc: '/nav/beverages/favorite_beverages.jpg',
      },
      {
        name: 'Nuevos Lanzamientos',
        href: '/products?category=beverages&sort=desc',
        imageSrc: '/nav/beverages/new_arrivals.jpg',
      },
      {
        name: 'Más Vendidos de Bebidas',
        href: '/products?category=beverages',
        imageSrc: '/nav/beverages/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'Arte y Accesorios',
    value: 'art_and_accessories' as const,
    href: '/products?category=art_and_accessories',
    destacados: [
      {
        name: 'Selecciones de Arte',
        href: `/products?category=art_and_accessories`,
        imageSrc: '/nav/art_and_accessories/art_picks.jpg',
      },
      {
        name: 'Nuevos Lanzamientos',
        href: '/products?category=art_and_accessories&sort=desc',
        imageSrc: '/nav/art_and_accessories/new_arrivals.jpg',
      },
      {
        name: 'Más Vendidos de Arte',
        href: '/products?category=art_and_accessories',
        imageSrc: '/nav/art_and_accessories/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'Tareas',
    value: 'tasks' as const,
    href: '/products?category=tasks',
    destacados: [
      {
        name: 'Tareas Principales',
        href: `/products?category=tasks`,
        imageSrc: '/nav/tasks/top_tasks.jpg',
      },
      {
        name: 'Nuevos Lanzamientos',
        href: '/products?category=tasks&sort=desc',
        imageSrc: '/nav/tasks/new_arrivals.jpg',
      },
      {
        name: 'Más Vendidos de Tareas',
        href: '/products?category=tasks',
        imageSrc: '/nav/tasks/bestsellers.jpg',
      },
    ],
  },

];
