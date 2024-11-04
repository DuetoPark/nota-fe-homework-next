import { useState } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { ChatDataType } from '@/models/chat';

import styles from './chatList.module.css';

interface ChatListPropsType {
  chatList: ChatDataType[];
  onClick?: (chatId: string) => void;
}

const cx = classNames.bind(styles);

const ChatList = ({ chatList, onClick }: ChatListPropsType) => {
  const { chatId } = useParams();
  const [activeChatId, setActiveChatId] = useState<string>('');

  if (chatList.length === 0) return <p>채팅 리스트가 없습니다.</p>;

  return (
    <ol>
      {chatList &&
        chatList.map((item) => (
          <li key={item.chat_id}>
            <article
              id={item.chat_id}
              className={cx(chatId === item.chat_id && 'isActive')}
              onClick={() => {
                // 이전과 동일한 채팅을 선택한 경우
                if (activeChatId === item.chat_id) return;
                setActiveChatId(item.chat_id);

                // 클릭 이벤트
                if (!onClick) return;
                onClick(item.chat_id);
              }}
            >
              <h3>{item.dialogues[0].prompt}</h3>
              <p>[{item.chat_model_name}]</p>
            </article>
          </li>
        ))}
    </ol>
  );
};

export default ChatList;
