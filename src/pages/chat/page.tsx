import useChatId from '@/hooks/useChatId';
import { CHAT_ID_INIT } from './constants';

import ChatListSection from './components/ChatListSection';
import ChatDetail from './components/ChatDetail';

const Chat = () => {
  const { chatId } = useChatId();

  return (
    <div style={{ display: 'flex', columnGap: '24px' }}>
      <ChatListSection className="" />

      <section>
        <h2>ChatDetail</h2>

        <ChatDetail chatId={chatId ?? CHAT_ID_INIT} />
      </section>
    </div>
  );
};

export default Chat;
