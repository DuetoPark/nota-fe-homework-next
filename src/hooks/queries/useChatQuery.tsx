import { getChat } from '@/apis/chat';
import { useQuery } from '@tanstack/react-query';

const useChatQuery = (chatId: string) => {
  return useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => getChat(chatId),
    enabled: !!chatId,
  });
};

export default useChatQuery;
