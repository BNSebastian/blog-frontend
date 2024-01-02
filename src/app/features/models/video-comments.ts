export interface VideoCommentInterface {
  id: number;
  parentId: number | null;
  videoName: string;
  userEmail: string;
  content: string;
  createdOn: string;
  replies?: VideoCommentInterface[]; // Adding the 'replies' property
}

export interface VideoCommentRequest {
  videoName: string;
  userEmail: string;
  content: string;
}

export interface CreateVideoCommentInterface {
  parentId: number | null;
  videoName: string;
  userEmail: string;
  content: string;
}

export interface UpdateVideoCommentInterface {
  id: number;
  content: string;
}

export interface ActiveCommentInterface {
  id: number;
  type: ActiveCommentTypeEnum;
}

export enum ActiveCommentTypeEnum {
  replying = 'replying',
  editing = 'editing',
}
