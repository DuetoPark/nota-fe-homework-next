import { TextareaHTMLAttributes, useCallback, useState } from 'react';
import { PROMPT_INIT } from '@/pages/chat/constants';
import { debounce } from 'lodash';

interface TextareaPropsType extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onTextInput: (text: string) => void;
}

const Textarea = ({ onTextInput, ...props }: TextareaPropsType) => {
  const [text, setText] = useState<string>(PROMPT_INIT);

  const debounceUpdate = useCallback(
    debounce((text) => {
      onTextInput(text);
    }, 500),
    [],
  );

  return (
    <textarea
      onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
        const { value } = e.currentTarget;
        setText(value);
        debounceUpdate(value);
      }}
      value={text}
      {...props}
    ></textarea>
  );
};

export default Textarea;
