import styles from './index.module.css';

/**
 * Загруженные файлы
 */
export const UploadedFiles = ({
  uploadedImage,
}: {
  uploadedImage?: string;
}) => {
  if (!uploadedImage) {
    return <div>Нет файлов</div>;
  }

  return (
    <>
      <div>Загруженные файлы:</div>
      <div className={styles.root}>
        <img alt={uploadedImage} src={uploadedImage} width="100%" />
      </div>
    </>
  );
};
