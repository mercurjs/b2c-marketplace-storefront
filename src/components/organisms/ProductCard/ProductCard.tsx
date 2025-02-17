'use client';
import Image from 'next/image';

import { Button } from '@/components/atoms';
import { HeartIcon } from '@/icons';
import tailwindConfig from '../../../../tailwind.config';
import { HttpTypes } from '@medusajs/types';
import { Link } from '@/i18n/routing';
import { getProductPrice } from '@/lib/helpers/get-product-price';

export const ProductCard = ({
  product,
}: {
  product: HttpTypes.StoreProduct;
}) => {
  const productSize =
    product?.options?.find(
      (option) => option.title === 'Size'
    )?.values?.[0].value || '-';

  const { cheapestPrice } = getProductPrice({
    product,
  });

  return (
    <div className='relative group min-w-[320px] h-[500px] border rounded-sm flex flex-col justify-between'>
      <div className='relative p-1 lg:min-h-[350px] h-full bg-primary'>
        <div className='absolute right-3 top-3 lg:hidden z-10 cursor-pointer'>
          <HeartIcon
            color={
              tailwindConfig.theme.extend.colors.tertiary
            }
          />
        </div>
        <Link href={`/products/${product.handle}`}>
          <div className='overflow-hidden rounded-sm h-full flex justify-center align-center max-w-[400px] lg:max-w-none'>
            <Image
              src={
                product.thumbnail ||
                '/images/product/placeholder.jpg'
              }
              alt={product.title}
              width={400}
              height={424}
              className='object-cover w-full h-auto object-center h-full aspect-[7/8] lg:group-hover:-mt-14 transition-all duration-300 rounded-xs'
              priority
            />
          </div>
        </Link>
        <Button
          className='absolute rounded-sm bg-action text-action-on-primary h-auto lg:h-[48px] lg:group-hover:block hidden w-[calc(100%-8px)] uppercase bottom-1 z-10'
          onClick={() => console.log('Add to cart action')}
        >
          Add to cart
        </Button>
      </div>
      <Link href={`/products/${product.handle}`}>
        <div className='grid grid-cols-1 md:grid-cols-12 p-4'>
          <div className='max-w-full md:col-span-10'>
            <h3 className='heading-sm truncate'>
              {product.title}
            </h3>
            <div className='flex items-center gap-2 mt-2'>
              <p className='font-medium'>
                {cheapestPrice?.calculated_price}
              </p>
              {cheapestPrice?.calculated_price !==
                cheapestPrice?.original_price && (
                <p className='text-sm text-gray-500 line-through'>
                  {cheapestPrice?.original_price}
                </p>
              )}
            </div>
          </div>
          <div className='md:col-span-2 md:flex md:justify-end absolute md:static right-2 bottom-24'>
            <div className='w-10 h-10 label-sm border rounded-sm flex items-center justify-center bg-component whitespace-nowrap'>
              {productSize}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
