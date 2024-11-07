import classNames from 'classnames/bind';
import { IoRocketSharp } from 'react-icons/io5';
import type { DialogueType } from '@/models/chat';

import Avatar from '@/components/atoms/Avatar';

import styles from './dialogList.module.css';

interface DialogueListPropsType {
  dialogueList: DialogueType[];
}

const cx = classNames.bind(styles);

const Dialoguelist = ({ dialogueList }: DialogueListPropsType) => {
  if (dialogueList.length === 0) return <p>대화 목록이 없습니다.</p>;

  return (
    <section className={cx('dialogues')}>
      <h3 className="visually-hidden">대화 내역</h3>

      {dialogueList.map((dialogue) => (
        <div key={dialogue.dialogue_id}>
          <div className={cx('message-wrapper', 'alignEnd')}>
            <p className={cx('message', 'prompt')}>{dialogue.prompt}</p>
          </div>

          <div className={cx('message-wrapper', 'alignStart')}>
            <Avatar>
              <IoRocketSharp aria-label="답변 아이콘" />
            </Avatar>
            <p className={cx('message', 'completion')}>{dialogue.completion}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Dialoguelist;
