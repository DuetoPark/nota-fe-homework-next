import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useChatStore } from '@/store/chat';
import { ChatDataType, DialogueType, ModelDataType } from '@/type/chat';
import {
  DIALOGUES_INIT,
  MODEL_INIT,
  MODEL_LIST_INIT,
  NEW_CHAT_ID,
  PROMPT_INIT,
} from '../../constants';
import Button from '@/components/atoms/Button';

type GetChatFuncType = (chatId: string) => Promise<ChatDataType>;
type GetModelsFuncType = () => Promise<ModelDataType[]>;
type AddChatFuncType = (chatId: string, prompt: string) => Promise<DialogueType[]>;

// 특정 채팅 호출
const getChat: GetChatFuncType = async (chat_id) => {
  return await axios
    .get(`/chats/${chat_id}`) //
    .then((res) => res.data.data);
};

// 모델 리스트 호출
const getModels: GetModelsFuncType = async () => {
  return await axios.get('/chat_model').then((res) => res.data.data);
};

// 특정 채팅에 대화 추가
const addChat: AddChatFuncType = async (chatId, prompt) => {
  return await axios.post(`/chats/${chatId}/dialogues`, { prompt }).then((res) => res.data.data);
};

// 채팅방 추가
const createChat = async (modelId) => {
  return await axios
    .post('/chats', { chat_model_id: modelId }) //
    .then((res) => res.data.data);
};

const ChatDetail = () => {
  const [dialogues, setDialogues] = useState<any[] | null>(DIALOGUES_INIT);
  const [model, setModel] = useState<string>(MODEL_INIT);
  const [text, setText] = useState<string>(PROMPT_INIT);
  const modelList = useRef<ModelDataType[] | null>(MODEL_LIST_INIT);
  const { currentChatId, setCurrentChatId, setChatList, click } = useChatStore();

  const navigate = useNavigate();
  const { state } = useLocation();

  // 모델리스트 호출
  useEffect(() => {
    getModels().then((data) => {
      modelList.current = data;
      if (!model) setModel(data[0].chat_model_id);
    });
  }, []);

  // 채팅 클릭하면,
  useEffect(() => {
    if (currentChatId == '') {
      initChat(state?.model);
      return;
    }

    setText(PROMPT_INIT);

    getChat(currentChatId).then((data) => {
      setDialogues(data.dialogues);
      setModel(data.chat_model_id);
    });
  }, [currentChatId, click, state]);

  // 대화 추가
  const addDialogue = () => {
    if (!text.trim()) return;

    if (!currentChatId) {
      createChat(model)
        .then((res) => res.at(-1))
        .then((data) => {
          // data === 새로 생성한 chat 정보
          addChat(data.chat_id, text)
            .then((res) => {
              const newDialog = res.dialogues.at(-1);
              setDialogues((prev) => {
                if (prev) return [...prev, newDialog];
                return [newDialog];
              });

              return res;
            })
            .then((data) => setChatList(data));

          return data;
        })
        .then((data) => {
          setCurrentChatId(data.chat_id);
        });

      return;
    }

    addChat(currentChatId, text).then((res) => {
      const newDialog = res.dialogues.at(-1);
      setDialogues((prev) => [...prev, { ...newDialog }]);
    });
  };

  // 모델 변경
  const selectModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentChatId(NEW_CHAT_ID);
    navigate('/', { state: { model: e.target.value } });
  };

  // 초기화
  const initChat = (model) => {
    getModels().then((data) => {
      // 모델 첫째값
      setModel(model ?? data[0].chat_model_id);
      // 대화창
      setDialogues(DIALOGUES_INIT);
      // 입력 text
      setText(PROMPT_INIT);
    });
  };

  return (
    <div>
      <h2>ChatDetail</h2>

      {dialogues &&
        dialogues.map((dialogue) => (
          <article key={dialogue.dialogue_id}>
            <div>prompt: {dialogue.prompt}</div>
            <div>completion: {dialogue.completion}</div>
          </article>
        ))}

      <form action="">
        <select name="" id="" value={model} onChange={selectModel}>
          {modelList &&
            modelList.current &&
            modelList.current.map((model) => (
              <option key={model.chat_model_id} value={model.chat_model_id}>
                {model.chat_model_name}
              </option>
            ))}
        </select>

        <p>currentChatId:{currentChatId}</p>

        <textarea
          name=""
          cols="30"
          rows="10"
          placeholder="메세지를 입력하세요"
          disabled={!model}
          onInput={(e) => setText(e.target.value)}
          value={text}
        ></textarea>

        <Button type="button" onClick={addDialogue} disabled={!model}>
          프롬프트 보내기
        </Button>
      </form>
    </div>
  );
};

export default ChatDetail;
