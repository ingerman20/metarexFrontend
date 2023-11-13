import React, { useId } from 'react';
import { IconUI } from '../Icon';
import { IconsEnum } from '../Icon/enums';

import styles from './index.module.css';

interface ButtonUIProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: IconsEnum;
}

/**
 * Кнопка
 */
export const ButtonUI: React.FC<ButtonUIProps> = ({ icon, ...rest }) => {
  const id = useId();

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        <IconUI icon={icon} />
      </label>
      <input {...rest} id={id} className={styles.input} />
    </div>
  );
};
