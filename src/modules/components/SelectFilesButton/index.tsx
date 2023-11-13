import { ButtonUI } from '../../shared/ui/Button';
import { IconsEnum } from '../../shared/ui/Icon/enums';

/**
 * Кнопка выбора файлов
 */
export const SelectFilesButton = ({
  selectHandler,
}: {
  selectHandler: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  return (
    <ButtonUI
      type="file"
      multiple
      onChange={selectHandler}
      icon={IconsEnum.Attachment}
    />
  );
};
