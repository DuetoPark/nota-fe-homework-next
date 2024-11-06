import ChatListSection from './components/ChatListSection';
import ChatBoxSection from './components/ChatBoxSection';

const Chat = () => {
  return (
    <div style={{ display: 'flex', columnGap: '24px' }}>
      <ChatListSection className="" />
      <ChatBoxSection className="" />
    </div>
  );
};

export default Chat;
