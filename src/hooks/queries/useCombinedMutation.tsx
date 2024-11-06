import { useQueryClient } from '@tanstack/react-query';
import useDialoguesMutation from './useDialogueMutation';
import useNewChatMutation from './useNewChatMutation';

interface AddNewChatPropsType {
  modelId: string;
  prompt: string;
  callback: (chatId: string) => void;
}

const useCombinedMutation = () => {
  const queryClient = useQueryClient();

  const mutationDialogue = useDialoguesMutation();
  const mutationNewChat = useNewChatMutation();

  const addNewChat = ({ modelId, prompt, callback }: AddNewChatPropsType) => {
    mutationNewChat.mutate(
      { modelId },
      {
        onSuccess: (response) => {
          const newChatId = response.chat_id;

          mutationDialogue.mutate(
            { chatId: newChatId, prompt },
            {
              onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: ['chats'] });

                callback(variables.chatId);

                return data;
              },
            },
          );
        },
      },
    );
  };

  return { addNewChat, mutationDialogue, mutationNewChat };
};

export default useCombinedMutation;
