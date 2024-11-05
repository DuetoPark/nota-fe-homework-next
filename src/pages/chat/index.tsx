import { useNavigate } from 'react-router-dom';
import useChatsQuery from '@/hooks/queries/useChatsQuery';
import { useChatStore } from '@/store/chat';
import Button from '@/components/atoms/Button';
import ChatDetail from './components/chatDetail';
import ChatList from './components/chatList';

const Chat = () => {
  const { setClick } = useChatStore();
  const navigate = useNavigate();

  const { isLoading, data: chatsQuery } = useChatsQuery();

  return (
    <div style={{ display: 'flex', columnGap: '24px' }}>
      <section>
        <h2>ChatList</h2>

        <Button
          onClick={() => {
            navigate('/');
            setClick();
          }}
        >
          추가하기
        </Button>

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

      <ChatDetail />
    </div>
  );
};

export default Chat;
