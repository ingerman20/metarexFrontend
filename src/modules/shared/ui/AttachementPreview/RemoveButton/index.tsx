import styles from './index.module.css';

export const RemovePreviewButton = ({
  removeHandler,
}: {
  removeHandler: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <button
      onClick={removeHandler}
      className={styles.removeButton}
      title={`Удалить вложение`}
    >
      x
    </button>
  );
};
