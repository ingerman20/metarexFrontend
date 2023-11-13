import { RemovePreviewButton } from './RemoveButton';
import styles from './index.module.css';

/**
 * Превью прикрепленного файла
 */
export const AttachmentPreview = ({
  imageSrc,
  removeHandler,
}: {
  imageSrc: string;
  removeHandler: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <div className={styles.preview}>
      <RemovePreviewButton removeHandler={removeHandler} />
      <img className={styles.image} alt="uploaded-file" src={imageSrc} />
    </div>
  );
};
