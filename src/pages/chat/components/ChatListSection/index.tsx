import { HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import useChatsQuery from '@/hooks/queries/useChatsQuery';
import { useChatStore } from '@/store/chat';

import AddChatButton from './AddChatButton';
import ChatList from './ChatList';

type ChatListSectionPropsType = HTMLAttributes<HTMLDivElement>;

const ChatListSection = ({ ...props }: ChatListSectionPropsType) => {
  const navigate = useNavigate();
  const { setClick } = useChatStore();
  const { isLoading, data: chatsQuery } = useChatsQuery();

  return (
    <section {...props}>
      <h2>ChatList</h2>

      <AddChatButton
        className=""
        onClick={() => {
          navigate('/');
          setClick();
        }}
      />

      {isLoading && <p>채팅 리스트를 불러오는 중입니다.</p>}
      {chatsQuery && (
        <ChatList
          chatList={chatsQuery}
          onClick={(currentId) => {
            navigate(`/${currentId}`);
          }}
        />
      )}
    </section>
  );
};

export default ChatListSection;
