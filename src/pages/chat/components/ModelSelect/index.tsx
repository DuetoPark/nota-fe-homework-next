import { SelectHTMLAttributes, useEffect, useState } from 'react';
import { Select, Theme } from '@radix-ui/themes';
import { MODEL_ID_NEW } from '@/pages/chat/constants';
import type { ModelDataType } from '@/models/chat';

interface ModelSelectPropsType extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  modelList: ModelDataType[];
  onSelectChange?: (modelId: string) => void;
  modelId: string;
  name?: string;
}

const ModelSelect = ({ modelList, modelId, onSelectChange, name }: ModelSelectPropsType) => {
  const [id, setId] = useState<string>(modelId);

  // 상위 컴포넌트에서 modelId를 바꾼 경우
  useEffect(() => {
    if (modelId === MODEL_ID_NEW) {
      const firstModelId = modelList[0].chat_model_id;
      setId(firstModelId);

      // 상위 컴포넌트의 modelId 바꿔주기
      if (onSelectChange) {
        onSelectChange(firstModelId);
      }
    } else {
      setId(modelId);
    }
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
