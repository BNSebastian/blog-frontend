const baseUrl: String = 'http://localhost:8080/api';

export const backendUrl = {
  register: `${baseUrl}/auth/register`,
  authenticate: `${baseUrl}/auth/authenticate`,
  isAdmin: `${baseUrl}/auth/isAdmin`,

  saveVideo: `${baseUrl}/video`,
  getAllVideoNames: `${baseUrl}/video/all`,
  getVideoByName: `${baseUrl}/video/`,

  createComment: `${baseUrl}/videoComment/createComment`,
  getComment: `${baseUrl}/videoComment/getComment/`, // {commentId}
  getAllComments: `${baseUrl}/videoComment/getAllComments/`, // {videoName}
  updateComment: `${baseUrl}/videoComment/updateComment`,
  deleteComment: `${baseUrl}/videoComment/deleteComment/`, // {commentId}

  createChatComment: `${baseUrl}/chat/createComment`,
  getChatCommentById: `${baseUrl}/chat/getComment/`, // {commentId}
  getAllChatComments: `${baseUrl}/chat/getAllComments`,

  createForumPost: `${baseUrl}/forumPost/createPost`,
  getForumPostById: `${baseUrl}/forumPost/`, // {id}
  getAllForumPosts: `${baseUrl}/forumPost/getAllPosts`,
  deleteForumPost: `${baseUrl}/forumPost/deletePost/`, // {postId}

  createForumComment: `${baseUrl}/forumComment/createComment`,
  getAllForumComments: `${baseUrl}/forumComment/getAllComments/`, // {id}
  deleteForumComment: `${baseUrl}/forumComment/deleteComment`,

  webSocketBrokerUrl: 'http://localhost:8080/ws',
  webSocketListen: '/topic/public',
  webSocketEmit: '/chat.sendMessage',
};

export class BACKEND {
  private static backend: string = 'http://localhost:8080';

  /** FORUM POSTS
   **************************************/
  private static forumPost: string = '/api/forumPost';

  static createForumPost(): string {
    return `${this.backend}${this.forumPost}/create`;
  }

  static getForumPostById(postId: number): string {
    return `${this.backend}${this.forumPost}/getById/${postId}`;
  }

  static getAllForumPosts(): string {
    return `${this.backend}${this.forumPost}/getAll`;
  }

  static deleteForumPost(postId: number): string {
    return `${this.backend}${this.forumPost}/delete/${postId}`;
  }

  /** FORUM COMMENTS
   **************************************/

  private static forumComment: string = '/api/forumComment';

  static createForumComment(): string {
    return `${this.backend}${this.forumComment}/create`;
  }

  static getAllForumComments(postId: number): string {
    return `${this.backend}${this.forumComment}/getAll/${postId}`;
  }

  static deleteForumComment(): string {
    return `${this.backend}${this.forumComment}/delete`;
  }

  static likeForumComment(commentId: number): string {
    return `${this.backend}${this.forumComment}/like/${commentId}`;
  }

  static dislikeForumComment(commentId: number): string {
    return `${this.backend}${this.forumComment}/dislike/${commentId}`;
  }
}
