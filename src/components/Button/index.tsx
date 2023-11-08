import { useEffect, useState } from 'react';
import { useSocketConnect } from '../../api/useSocketConnect';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import styles from './index.module.css';

/**
 * Кнопка "Прикрепить файл"
 */
export const AttachmentButton = () => {
  const socket = useSocketConnect();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [previewImg, setPreviewImg] = useState<string>('');

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFiles([]);
      setPreviews([]);
      return;
    }

    for (const file of e.target.files) {
      setFiles((prev) => [...prev, file]);
      const objectUrl = URL.createObjectURL(file);
      setPreviews((prev) => [...prev, objectUrl]);
    }
  };

  const removePreview = (indexToDelete: number) => {
    setFiles((prev) => {
      const filteredFiles = prev.filter((_, index) => index !== indexToDelete);
      return filteredFiles;
    });
    setPreviews((prev) => {
      const filteredPreviews = prev.filter(
        (_, index) => index !== indexToDelete
      );
      return filteredPreviews;
    });
  };

  const sendFiles = () => {
    socket.emit('sendFiles', files);
  };

  useEffect(() => {
    socket.on('returnDataToClient', (result) => {
      setPreviewImg('data:image/png;base64,' + result.data);
    });
  });

  return (
    <div>
      <div className={styles.previews}>
        {files && files.length
          ? previews.map((preview, index) => (
              <div key={`preview-${index}`} className={styles.preview}>
                <button
                  onClick={() => removePreview(index)}
                  className={styles.deleteButton}
                  title={`Удалить вложение ${index + 1}`}
                >
                  x
                </button>
                <img
                  className={styles.image}
                  alt="uploaded-file"
                  src={preview}
                />
              </div>
            ))
          : null}
      </div>

      <div style={{ margin: '16px', display: 'flex', gap: '10px' }}>
        <div>
          <label htmlFor="attachment-input" className={styles.label}>
            <AttachFileIcon />
          </label>
          <input
            type="file"
            multiple
            id="attachment-input"
            onChange={selectFile}
            className={styles.input}
          />
        </div>

        <div>
          <label htmlFor="send-files" className={styles.label}>
            <SendIcon />
          </label>
          <input
            type="button"
            id="send-files"
            onClick={sendFiles}
            className={styles.input}
          />
        </div>
      </div>

      <hr />
      <div>Загруженные файлы:</div>
      {previewImg ? (
        <img src={previewImg} style={{ maxWidth: '500px' }} />
      ) : (
        <span>Нет файлов</span>
      )}
    </div>
  );
};
