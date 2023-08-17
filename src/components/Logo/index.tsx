import LogoIcon from '@/assets/logo.png';
import classNames from 'classnames';
import { ImgHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export default function Logo({
  className,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <Link to={'/'}>
      <img
        alt={'logo'}
        src={LogoIcon}
        draggable={false}
        className={classNames(styles.logo, className)}
        {...rest}
      />
    </Link>
  );
}
