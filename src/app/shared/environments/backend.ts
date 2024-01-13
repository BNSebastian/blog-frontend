const baseUrl: String = 'http://localhost:8080/api';

export const backendUrl = {
  register: `${baseUrl}/auth/register`,
  authenticate: `${baseUrl}/auth/authenticate`,
  isAdmin: `${baseUrl}/auth/isAdmin`,

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

  /** USER
   **************************************/
  private static user: string = '/api/user';

  /** PROFILE IMAGES
   **************************************/
  private static image: string = '/api/image';

  static setUserProfileImage(userId: number): string {
    return `${this.backend}${this.image}/setProfileImage/${userId}`;
  }

  static getUserProfileImage(userEmail: string): string {
    return `${this.backend}${this.image}/getProfileImage/${userEmail}`;
  }

  /** VIDEOS
   **************************************/
  private static video: string = '/api/video';

  static uploadVideo(): string {
    return `${this.backend}${this.video}/upload`;
  }

  static playVideo(name: string): string {
    return `${this.backend}${this.video}/play/${name}`;
  }

  static setVideoDescription(name: string): string {
    return `${this.backend}${this.video}/setDescription/${name}`;
  }

  static getVideoDescription(name: string): string {
    return `${this.backend}${this.video}/getDescription/${name}`;
  }

  static getAllVideoNames(): string {
    return `${this.backend}${this.video}/getAllNames`;
  }

  static getAllVideos(): string {
    return `${this.backend}${this.video}/getAll`;
  }

  static getVideoByName(name: string): string {
    return `${this.backend}${this.video}/getByName/${name}`;
  }

  static deleteVideo(name: string): string {
    return `${this.backend}${this.video}/delete/${name}`;
  }

  /** VIDEO COMMENTS
   **************************************/
  private static videoComments: string = '/api/videoComment';

  static createVideoComment(): string {
    return `${this.backend}${this.videoComments}/createComment`;
  }

  static getVideoComment(commentId: number): string {
    return `${this.backend}${this.videoComments}/getComment/${commentId}`;
  }

  static getAllVideoComments(videoName: string): string {
    return `${this.backend}${this.videoComments}/getAllComments/${videoName}`;
  }

  static updateVideoComment(): string {
    return `${this.backend}${this.videoComments}/updateComment`;
  }

  static deleteVideoComment(commentId: number): string {
    return `${this.backend}${this.videoComments}/deleteComment/${commentId}`;
  }

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
