export interface ChatCommentInterface {
  id: number;
  userEmail: string;
  content: string;
  createdOn: string;
}

export interface CreateChatCommentInterface {
  userEmail: string;
  content: string;
}
