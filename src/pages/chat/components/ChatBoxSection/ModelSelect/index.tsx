import { SelectHTMLAttributes, useEffect, useState } from 'react';
import { Select, Theme } from '@radix-ui/themes';
import classNames from 'classnames/bind';

import { MODEL_ID_NEW } from '@/pages/chat/constants';
import Empty from '@/components/query/Empty';
import type { ModelDataType } from '@/models/chat';

import styles from './modelSelect.module.css';

interface ModelSelectPropsType extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  modelList: ModelDataType[];
  onSelectChange?: (modelId: string) => void;
  modelId: string;
  name?: string;
}

const cx = classNames.bind(styles);

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
  if (modelList.length === 0) {
    return <Empty className="">등록된 모델이 없습니다.</Empty>;
  }

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
        <Select.Trigger
          className={cx('SelectTrigger')}
          placeholder="모델을 선택해주세요"
        ></Select.Trigger>

        <Select.Content className={cx('SelectContent')}>
          <Select.Group>
            {modelList &&
              modelList.map((model) => (
                <Select.Item
                  className={cx('SelectItem')}
                  key={model.chat_model_id}
                  value={model.chat_model_id}
                >
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
