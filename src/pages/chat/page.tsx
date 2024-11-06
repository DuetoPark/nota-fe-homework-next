import { useNavigate, useParams } from 'react-router-dom';
import useChatsQuery from '@/hooks/queries/useChatsQuery';
import { useChatStore } from '@/store/chat';
import { CHAT_ID_INIT } from './constants';

import ChatDetail from './components/ChatDetail';
import ChatList from './components/ChatList';
import AddChatButton from './components/AddChatButton';

const Chat = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
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
        <h2>ChatDetail</h2>

        <ChatDetail chatId={chatId ?? CHAT_ID_INIT} />
      </section>
    </div>
  );
};

export default Chat;
