export interface DialogueType {
  completion: string;
  dialogue_id: string;
  prompt: string;
}

export interface ChatDataType {
  chat_id: string;
  chat_model_id: string;
  chat_model_name: string;
  dialogues: DialogueType[];
}

export interface ModelDataType {
  chat_model_id: string;
  chat_model_name: string;
}

export interface NewChatDataType {
  chat_id: string;
  chat_model_id: string;
  chat_model_name: string;
  dialogues: [];
}
