import { useMutation } from '@tanstack/react-query';
import { createChat } from '@/apis/chat';

interface CreateChatParamsType {
  modelId: string;
}

const useNewChatMutation = () => {
  return useMutation({
    mutationKey: ['newChat'],
    mutationFn({ modelId }: CreateChatParamsType) {
      return createChat(modelId);
    },
  });
};

export default useNewChatMutation;
