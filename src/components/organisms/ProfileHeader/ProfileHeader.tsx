import { format } from 'date-fns';
import { HttpTypes } from '@medusajs/types';
import {
  Avatar,
  Divider,
  StarRating,
} from '@/components/atoms';
import { DoneIcon } from '@/icons';
import { ProfileHeaderButtons } from '@/components/cells';

export const ProfileHeader = ({
  user,
}: {
  user: HttpTypes.StoreCustomer | null;
}) => {
  return (
    <>
      <div className='border rounded-t-sm p-5 flex justify-between items-center'>
        <div className='flex gap-3'>
          <Avatar
            size='large'
            src={'/images/product/seller-avatar.jpg'}
            className='w-[64px] h-[64px]'
          />
          <div>
            <h2 className='uppercase heading-md text-primary'>
              {`${user?.first_name} ${user?.last_name}`}
            </h2>
            <div className='flex items-center gap-2'>
              <StarRating rate={4} starSize={14} />{' '}
              <span className='label-md'>4</span>
            </div>
          </div>
        </div>
        <div>
          <ProfileHeaderButtons />
        </div>
      </div>
      <div className='border-b border-x rounded-b-sm p-5 flex label-md items-center gap-3'>
        <DoneIcon />
        Verified seller
        <Divider square className='mb-1' />
        Joined in{' '}
        {format(user?.created_at || new Date(), 'yyyy')}
      </div>
    </>
  );
};
