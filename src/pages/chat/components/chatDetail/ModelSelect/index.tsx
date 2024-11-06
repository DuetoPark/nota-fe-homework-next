import { SelectHTMLAttributes, useEffect, useState } from 'react';
import { Select, Theme } from '@radix-ui/themes';
import type { ModelDataType } from '@/models/chat';

interface ModelSelectPropsType extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  modelList: ModelDataType[];
  onSelectChange?: (modelId: string) => void;
  modelId?: string;
  name?: string;
}

const ModelSelect = ({ modelList, modelId, onSelectChange, name }: ModelSelectPropsType) => {
  const [id, setId] = useState<string>(modelId ?? modelList[0].chat_model_id);

  useEffect(() => {
    if (!modelId) return;

    setId(modelId);
  }, [modelId]);

  // empty
  if (modelList.length === 0) return <p>모델 리스트가 없습니다.</p>;

  return (
    <Theme>
      <Select.Root
        name={name}
        value={id}
        onValueChange={(selectedId) => {
          if (id === selectedId) return;
          setId(selectedId);

          if (!onSelectChange) return;
          onSelectChange(selectedId);
        }}
      >
        <Select.Trigger />

        <Select.Content>
          <Select.Group>
            {modelList &&
              modelList.map((model) => (
                <Select.Item key={model.chat_model_id} value={model.chat_model_id}>
                  {model.chat_model_name}
                </Select.Item>
              ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Theme>
  );
};

export default ModelSelect;
