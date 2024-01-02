export interface ChatCommentInterface {
  id: number;
  parentId: number | null;
  videoName: string;
  userEmail: string;
  content: string;
  createdOn: string;
}

export interface CreateChatCommentInterface {
  parentId: number | null;
  videoName: string;
  userEmail: string;
  content: string;
}