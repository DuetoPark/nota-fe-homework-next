import axios from 'axios';

export const useChat = () => {
  const addChat = async (chat_id) => {
    axios
      .post(`/chats/${chat_id}/dialogues`, {
        prompt: '질문이 어디까지 이어지는거에요?',
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const getChat = async (chat_id) => {
    axios.get(`/chats/${chat_id}`).then((res) => {
      console.log('<특정 채팅 상세>=============');
      console.log(res.data.data);
      return res;
    });
  };

  const getChats = async () => {
    return await axios.get('/chats').then((res) => res.data.data);
  };

  return { addChat, getChat, getChats };
};
