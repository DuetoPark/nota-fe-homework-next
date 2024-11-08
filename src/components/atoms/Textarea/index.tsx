import { TextareaHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';

interface TextareaPropsType extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onTextInput: (text: string) => void;
  value: string;
}

const Textarea = ({ onTextInput, value, ...props }: TextareaPropsType) => {
  const [text, setText] = useState<string>(value);

  const debounceUpdate = useCallback(
    debounce((text) => {
      onTextInput(text);
    }, 200),
    [],
  );

  useEffect(() => {
    setText(value);
  }, [value]);

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
