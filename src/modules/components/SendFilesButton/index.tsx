import { ButtonUI } from '../../shared/ui/Button';
import { IconsEnum } from '../../shared/ui/Icon/enums';

export const SendFilesButton = ({
  sendFilesHandler,
}: {
  sendFilesHandler: React.MouseEventHandler<HTMLInputElement> | undefined;
}) => {
  return (
    <ButtonUI type="button" onClick={sendFilesHandler} icon={IconsEnum.Send} />
  );
};
