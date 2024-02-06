import { PropsWithChildren, memo, useState } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';
import { Icon } from '@/6_shared/ui/Icon';
import StarIcon from '@/6_shared/assets/icons/star.svg';
import style from './StarsRating.module.scss';

const stars = [1, 2, 3, 4, 5];

type Props = PropsWithChildren<{
  className?: string;
  size?: number;
  selectedStars?: number;
  // eslint-disable-next-line no-unused-vars
  onStarClick?: (star: number) => void;
}>;

export const StarsRating = memo((props: Props) => {
  const { className, size = 30, selectedStars = 0, onStarClick } = props;
  const [currentStars, setCurrentStars] = useState(selectedStars);
  const [isSelected, setIsSelected] = useState(selectedStars > 0);

  const handleStarFocus = (star: number) => {
    setCurrentStars(star);
  };

  const handleStarBlur = () => {
    setCurrentStars(0);
  };

  const handleStarClick = () => {
    onStarClick?.(currentStars);
    setIsSelected(true);
  };

  const getStarModes = (star: number) => ({
    [style.hovered]: currentStars >= star,
    [style.selected]: isSelected,
  });

  return (
    <div className={getClassNames(style.starsRating, {}, [className])}>
      {stars.map((star) => (
        <Button
          className={getClassNames(style.star, getStarModes(star), [])}
          theme={ButtonTheme.CLEAR}
          hasHover={false}
          tabIndex={isSelected ? -1 : undefined}
          key={star}
          onMouseEnter={isSelected ? undefined : () => handleStarFocus(star)}
          onMouseLeave={isSelected ? undefined : handleStarBlur}
          onFocus={isSelected ? undefined : () => handleStarFocus(star)}
          onBlur={isSelected ? undefined : handleStarBlur}
          onClick={isSelected ? undefined : handleStarClick}
        >
          <Icon
            Svg={StarIcon}
            width={size}
            height={size}
          />
        </Button>
      ))}
    </div>
  );
});
