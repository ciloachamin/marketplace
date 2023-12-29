'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { useEffect, useRef, useState } from 'react'
import NavItem from './NavItem'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
// ... (código anterior)

const NavItems = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<null | number>(null);
  const [activeNavItemIndex, setActiveNavItemIndex] = useState<null | number>(null);

  const [openCategories, setOpenCategories] = useState<boolean[]>(
    new Array(PRODUCT_CATEGORIES.length).fill(false)
  );

  const toggleCategory = (index: number) => {
    if (activeCategoryIndex === index) {
      setActiveCategoryIndex(null);
    } else {
      setActiveCategoryIndex(index);
    }
  };

  const toggleNavItem = (index: number) => {
    if (activeNavItemIndex === index) {
      setActiveNavItemIndex(null);
    } else {
      setActiveNavItemIndex(index);
    }
  };

  const closeCategory = (index: number) => {
    const updatedCategories = [...openCategories];
    updatedCategories[index] = false;
    setOpenCategories(updatedCategories);
    setActiveCategoryIndex(null);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCategoryIndex(null);
        setActiveNavItemIndex(null);
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);

  const isAnyCategoryOpen = activeCategoryIndex !== null;
  const isAnyNavItemOpen = activeNavItemIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className='flex gap-4 h-full'>
      {/* Botón "Category" que abre y cierra las categorías */}
      <div className='relative flex items-center'>
        <Button
         onClick={() => toggleCategory(0)}
          variant={isAnyCategoryOpen ? 'secondary' : 'ghost'}
        >
          Category
          <ChevronDown
            className={cn('h-4 w-4 transition-all text-muted-foreground', {
              '-rotate-180': isAnyCategoryOpen,
            })}
          />
        </Button>

        {/* Muestra todas las categorías si 'activeCategoryIndex' es verdadero */}
        {isAnyCategoryOpen && (
          <div className="absolute mt-12 top-0 left-0 border w-[200px]  bg-secondary overflow-hidden rounded-lg shadow-lg z-10" ref={navRef}>
            {PRODUCT_CATEGORIES.map((category, i) => (
              <NavItem
                category={category}
                close={() => closeCategory(i)}
                key={category.value}
                handleOpen={() => toggleNavItem(i)}
                isOpen={i === activeNavItemIndex}
                isAnyOpen={isAnyNavItemOpen}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavItems;