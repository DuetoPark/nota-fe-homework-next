import { ChatDataType, DialogueType, ModelDataType } from '@/models/chat';
import { apiRequest } from './axiosRequest';

interface ApiType {
  GetChats: () => Promise<ChatDataType[]>;
  GetChat: (chatId: string) => Promise<ChatDataType>;
  GetModels: () => Promise<ModelDataType[]>;
  AddDialogue: (chatId: string, prompt: string) => Promise<DialogueType[]>;
  CreateChat: (modelId: string) => Promise<ChatDataType>;
}

// 채팅 목록
export const getChats: ApiType['GetChats'] = async () => {
  return await apiRequest.get('/chats');
};

// 특정 채팅의 상세내역
export const getChat: ApiType['GetChat'] = async (chatId) => {
  return await apiRequest.get(`/chats/${chatId}`);
};

// 모델
export const getModels: ApiType['GetModels'] = async () => {
  return await apiRequest.get('/chat_model');
};

// 특정 채팅에 대화 추가
export const addDialogue: ApiType['AddDialogue'] = async (chatId, prompt) => {
  return await apiRequest
    .post<ChatDataType, { prompt: string }>(`/chats/${chatId}/dialogues`, { prompt })
    .then((res) => res.dialogues);
};

// 채팅방 생성
export const createChat: ApiType['CreateChat'] = async (modelId) => {
  return await apiRequest
    .post<ChatDataType[], { chat_model_id: string }>('/chats', { chat_model_id: modelId })
    .then((res) => res.at(-1) ?? res[res.length - 1]);
};
