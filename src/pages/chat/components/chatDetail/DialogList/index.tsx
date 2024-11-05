import { DialogueType } from '@/models/chat';

interface DialogueListPropsType {
  dialogueList: DialogueType[];
}

const Dialoguelist = ({ dialogueList }: DialogueListPropsType) => {
  return (
    <section>
      <h3>Dialoguelist</h3>

      {dialogueList &&
        dialogueList.map((dialogue) => (
          <article key={dialogue.dialogue_id}>
            <div>prompt: {dialogue.prompt}</div>
            <div>completion: {dialogue.completion}</div>
          </article>
        ))}
    </section>
  );
};

export default Dialoguelist;
