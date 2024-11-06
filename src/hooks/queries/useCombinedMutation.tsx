import { useQueryClient } from '@tanstack/react-query';
import useDialoguesMutation from './useDialogueMutation';
import useNewChatMutation from './useNewChatMutation';
import { useNavigate } from 'react-router-dom';

interface AddNewChatPropsType {
  modelId: string;
  prompt: string;
}

const useCombinedMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutationDialogue = useDialoguesMutation();
  const mutationNewChat = useNewChatMutation();

  const addNewChat = ({ modelId, prompt }: AddNewChatPropsType) => {
    mutationNewChat.mutate(
      { modelId },
      {
        onSuccess: (response) => {
          const newChatId = response.chat_id;

          mutationDialogue.mutate(
            { chatId: newChatId, prompt },
            {
              onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ['chats'] });
                navigate(`/${newChatId}`);

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
