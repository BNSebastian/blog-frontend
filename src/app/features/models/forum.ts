export interface ForumCommentCreateInterface {
  postId: number;
  content: string;
  userEmail: string;
}

export interface ForumCommentInterface {
  id: number;
  postId: number;
  content: string;
  userEmail: string;
  createdOn: string;
  likes: number;
  dislikes: number;
}

export interface ForumPostCreateInterface {
  name: string;
  userEmail: string;
  initialCommentContent: string;
}

export interface ForumPostInterface {
  id: number;
  name: string;
  userEmail: string;
  createdOn: string;
  viewerCount: number;
  pinned: boolean;
}
