import { StarIcon } from '@/icons';
import tailwindConfig from '../../../../tailwind.config';

export const StarRating = ({
  rate,
  starSize = 20,
  disabled,
}: {
  rate: number;
  starSize?: number;
  disabled?: boolean;
}) => {
  return (
    <div className='flex'>
      {[
        ...Array(5)
          .keys()]
        .map((key) => {
          const starColor =
            key < rate
              ? disabled
                ? tailwindConfig.theme.extend.colors
                  .disabled
                : tailwindConfig.theme.extend.colors
                  .primary
              : tailwindConfig.theme.extend.colors.action
                .on.primary;
          return (
            <StarIcon
              size={starSize}
              key={key}
              color={starColor}
            />
          );
        })}
    </div>
  );
};
