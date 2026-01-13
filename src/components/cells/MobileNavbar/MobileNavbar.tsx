'use client';

import { HttpTypes } from '@medusajs/types';
import {
  CategoryNavbar,
  HeaderCategoryNavbar,
} from '@/components/molecules';
import { CloseIcon, HamburgerMenuIcon } from '@/icons';
import { useEffect, useState } from 'react';
import { IconButton } from '@/components/atoms';
import { MobileCategoryNavbar } from './components';

export const MobileNavbar = ({
  categories,
  parentCategories,
}: {
  categories: HttpTypes.StoreProductCategory[];
  parentCategories: HttpTypes.StoreProductCategory[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenuHandler = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div className='lg:hidden'>
      <div onClick={() => setIsOpen(true)}>
        <HamburgerMenuIcon />
      </div>
      {isOpen && (
        <div className='fixed w-full h-full bg-primary top-0 left-0 z-20'>
          <div className='flex justify-between items-center border-b p-4'>
            <h2 className='heading-md uppercase text-primary'>Menu</h2>
            <IconButton
              icon={<CloseIcon size={20} />}
              onClick={() => closeMenuHandler()}
              variant='icon'
              size='small'
            />
          </div>
          <div className=''>
            <HeaderCategoryNavbar
              onClose={closeMenuHandler}
              categories={categories}
              parentCategories={parentCategories}
            />
            <div className='p-4'>
              <MobileCategoryNavbar
                onClose={closeMenuHandler}
                categories={categories}
                parentCategories={parentCategories}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
