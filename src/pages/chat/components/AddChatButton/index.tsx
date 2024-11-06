import Button, { ButtonAttrProps } from '@/components/atoms/Button';

type AddChatButtonPropsType = Omit<ButtonAttrProps, 'disabled' | 'children'>;

const AddChatButton = ({ className, onClick }: AddChatButtonPropsType) => {
  return (
    <Button className={className} onClick={onClick}>
      추가하기
    </Button>
  );
};

export default AddChatButton;
