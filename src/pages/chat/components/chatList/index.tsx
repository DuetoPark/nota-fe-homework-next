import axios from 'axios';
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';

import { useChatStore } from '@/store/chat';
import { ChatDataType } from '@/type/chat';
import Button from '@/components/atoms/Button';

import styles from './chatList.module.css';

const cx = classNames.bind(styles);

type GetChatsFuncType = () => Promise<ChatDataType[]>;

const getChats: GetChatsFuncType = async () => {
  return await axios.get('/chats').then((res) => res.data.data);
};

const ChatList = () => {
  const { currentChatId, setCurrentChatId, chatList, setChatList, setClick } = useChatStore();
  const navigate = useNavigate();
  const { chatId } = useParams();

  useEffect(() => {
    getChats().then((data) => {
      setChatList(data);
    });
  }, []);

  return (
    <section>
      <h2>ChatList</h2>

      <Button
        onClick={() => {
          setCurrentChatId('');
          navigate('/');
          setClick();
        }}
      >
        추가하기
      </Button>

      <ol>
        {chatList &&
          chatList.map((item) => (
            <li key={item.chat_id}>
              <article
                onClick={() => {
                  if (chatId === item.chat_id) return;

                  navigate(`/${item.chat_id}`);
                  setCurrentChatId(item.chat_id);
                }}
                id={item.chat_id}
                className={cx(
                  (currentChatId == item.chat_id || chatId == item.chat_id) && 'isActive',
                )}
              >
                <h3>{item.dialogues[0].prompt}</h3>
                <p>{item.chat_model_name}</p>
              </article>
            </li>
          ))}
      </ol>
    </section>
  );
};

export default ChatList;
