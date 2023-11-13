import { AttachmentPreview } from '../../shared/ui/AttachementPreview';
import styles from './index.module.css';

export const Previews = ({
  previews,
  removeHandler,
}: {
  previews: string[];
  removeHandler: (value: number) => void;
}) => {
  if (!previews || !previews.length) {
    return null;
  }

  return (
    <div className={styles.previews}>
      {previews.map((preview, index) => (
        <AttachmentPreview
          key={`preview-${index}`}
          imageSrc={preview}
          removeHandler={() => removeHandler(index)}
        />
      ))}
    </div>
  );
};
