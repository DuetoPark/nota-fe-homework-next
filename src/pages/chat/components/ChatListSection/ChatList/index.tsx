import classNames from 'classnames/bind';

import Tag from '@/components/atoms/Tag';
import Empty from '@/components/query/Empty';
import type { ChatDataType } from '@/models/chat';

import styles from './chatList.module.css';

interface ChatListPropsType {
  chatList: ChatDataType[];
  chatId: string;
  onClick?: (chatId: string) => void;
}

const cx = classNames.bind(styles);

const ChatList = ({ chatList, chatId, onClick }: ChatListPropsType) => {
  // empty
  if (chatList.length === 0) {
    return <Empty>등록된 채팅이 없습니다.</Empty>;
  }

  return (
    <ol className={cx('list')}>
      {chatList.map((item) => (
        <li key={item.chat_id}>
          <article
            id={item.chat_id}
            className={cx('card', chatId === item.chat_id && 'isActive')}
            onClick={() => {
              // 이전과 동일한 채팅을 선택한 경우
              if (chatId === item.chat_id) return;

              // 클릭 이벤트
              if (!onClick) return;
              onClick(item.chat_id);
            }}
          >
            <h3 className={cx('card-title')}>{item.dialogues[0].prompt}</h3>
            <Tag text={item.chat_model_name} />
          </article>
        </li>
      ))}
    </ol>
  );
};

export default ChatList;
