const baseUrl: String = '';

export const frontendUrl = {
  home: `${baseUrl}/home`,

  signup: `${baseUrl}/user/signup`,
  login: `${baseUrl}/user/login`,
  profile: `${baseUrl}/user/profile`,

  videos: `${baseUrl}/video`,

  chat: `${baseUrl}/chat`,

  forum: `${baseUrl}/forum`,

  // admin
  videoUpload: `${baseUrl}/admin/videoUpload`,
};

export class FRONTEND {
  private static frontend: string = '';

  static getHome(): string {
    return `${this.frontend}/home`;
  }

  /** FORUM
   **************************************/
  private static forumPost: string = '/forum';

  static getForumPosts(): string {
    return `${this.frontend}${this.forumPost}`;
  }

  static getForumPostById(postId: number): string {
    return `${this.frontend}${this.forumPost}/${postId}`;
  }
}
