'use client';

import { Badge, Button } from '@/components/atoms';
import {
  CartDropdownItem,
  Dropdown,
} from '@/components/molecules';
import { Link } from '@/i18n/routing';
import { CartIcon } from '@/icons';
import { convertToLocale } from '@/lib/helpers/money';
import { HttpTypes } from '@medusajs/types';
import { useState } from 'react';

export const CartDropdown = ({
  carts,
}: {
  carts: HttpTypes.StoreCart[];
}) => {
  const [open, setOpen] = useState(false);

  let bagItemCount = 0;
  let bagItemAmount = 0;

  carts.map(cart => {
    bagItemCount += cart.items?.reduce((totalCount, item) => 
      totalCount + item.quantity
    , 0) || 0;

    bagItemAmount += cart.item_total
  })

  const total = convertToLocale({
    amount: bagItemAmount,
    currency_code: carts[0]?.currency_code || 'uyu',
  });

  return (
    <div
      className="relative"
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href="/bag" className="relative">
        <CartIcon size={20} />
        {Boolean(bagItemCount) && (
          <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0">
            {bagItemCount}
          </Badge>
        )}
      </Link>
      <Dropdown show={open}>
        <div className="lg:w-[460px]">
          <h3 className="uppercase heading-md border-b p-4">Shopping cart</h3>
          <div className="p-4">
            {Boolean(bagItemCount) ? (
              <div>
                <div className="overflow-y-scroll max-h-[360px] no-scrollbar">
                  {carts.map((cart) => (
                    <>
                      {cart.seller?.name && <p className='mb-4'>{cart.seller.name}</p>}
                      {cart.items?.map((item) => (
                        <CartDropdownItem
                          key={item.id}
                          item={item}
                          currency_code={cart.currency_code}
                        />
                      ))}
                    </>
                  ))}
                </div>
                <div className="pt-4">
                  <div className="text-secondary flex justify-between items-center">
                    Total <p className="label-xl text-primary">{total}</p>
                  </div>
                  <Link href="/bag">
                    <Button className="w-full mt-4 py-3">Go to cart</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="px-8">
                <h4 className="heading-lg uppercase text-center">
                  Your shopping cart is empty
                </h4>
                <p className="text-lg text-center py-4">
                  Are you looging for inspiration?
                </p>
                <Link href="/">
                  <Button className="w-full py-3">Explore Home Page</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Dropdown>
    </div>
  )
};
