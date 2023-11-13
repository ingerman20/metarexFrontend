import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { IconsEnum } from './enums';

function assertUnreachable(x: never): never {
  throw new Error(
    `Что-то не то пришло в x, ожидалось never, а пришло ${typeof x}`
  );
}

export const IconUI = ({ icon }: { icon: IconsEnum }): React.ReactNode => {
  switch (icon) {
    case IconsEnum.Attachment:
      return <AttachFileIcon />;
    case IconsEnum.Send:
      return <SendIcon />;
  }

  return assertUnreachable(icon);
};
