import { useQuery } from '@tanstack/react-query';
import { getChats } from '@/apis/chat';

const useChatsQuery = () => {
  return useQuery({ queryKey: ['chats'], queryFn: getChats });
};

export default useChatsQuery;
