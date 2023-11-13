import { useCallback, useEffect, useState } from 'react';
import { useSocketConnect } from '../api/useSocketConnect';
import { SelectFilesButton } from './components/SelectFilesButton';
import { SendFilesButton } from './components/SendFilesButton';
import { Previews } from './blocks/Previews';
import { UploadedFiles } from './components/UploadedFiles';
import { ButtonsBar } from './components/ButtonsBar';

/**
 * Кнопка "Прикрепить файл"
 */
export const AttachmentModule = () => {
  const socket = useSocketConnect();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string>('');

  /**
   * Обработчик выбора файлов
   */
  const selectFilesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  /**
   * Обработчик удаления превью
   */
  const removePreviewHandler = useCallback((indexToDelete: number) => {
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
  }, []);

  /**
   * Обработчик отправки файлов на сервер
   */
  const sendFilesHandler = () => {
    socket.emit('sendFiles', files);
  };

  /**
   * Фиксация изображения
   */
  const setImage = (result: { data: string }) => {
    setUploadedImage('data:image/png;base64,' + result.data);
  };

  useEffect(() => {
    socket.on('returnDataToClient', setImage);
    return () => {
      socket.off('returnDataToClient', setImage);
    };
  }, [socket]);

  return (
    <>
      <Previews previews={previews} removeHandler={removePreviewHandler} />

      <ButtonsBar>
        <SelectFilesButton selectHandler={selectFilesHandler} />
        <SendFilesButton sendFilesHandler={sendFilesHandler} />
      </ButtonsBar>

      <hr />
      <UploadedFiles uploadedImage={uploadedImage} />
    </>
  );
};
