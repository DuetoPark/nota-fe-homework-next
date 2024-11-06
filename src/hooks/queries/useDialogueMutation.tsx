import { useMutation } from '@tanstack/react-query';
import { addDialogue } from '@/apis/chat';

interface AddDialogueParamsType {
  chatId: string;
  prompt: string;
}

const useDialoguesMutation = () => {
  return useMutation({
    mutationKey: ['dialogues'],
    mutationFn({ chatId, prompt }: AddDialogueParamsType) {
      return addDialogue(chatId, prompt);
    },
  });
};

export default useDialoguesMutation;
