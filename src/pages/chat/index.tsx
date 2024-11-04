import ChatDetail from './components/chatDetail';
import ChatList from './components/chatList';

const Chat = () => {
  return (
    <div style={{ display: 'flex', columnGap: '24px' }}>
      <ChatList />
      <ChatDetail />
    </div>
  );
};

export default Chat;
