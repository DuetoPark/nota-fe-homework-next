import { useNavigate } from 'react-router-dom';
import useChatsQuery from '@/hooks/queries/useChatsQuery';
import { useChatStore } from '@/store/chat';

import ChatDetail from './components/chatDetail';
import ChatList from './components/chatList';
import AddChatButton from './components/AddChatButton';

const Chat = () => {
  const navigate = useNavigate();
  const { setClick } = useChatStore();

  const { isLoading, data: chatsQuery } = useChatsQuery();

  return (
    <div style={{ display: 'flex', columnGap: '24px' }}>
      <section>
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

      <section>
        <ChatDetail />
      </section>
    </div>
  );
};

export default Chat;
