import styles from './index.module.css';

/**
 * Панель кнопок
 */
export const ButtonsBar = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.root}>{children}</div>;
};
