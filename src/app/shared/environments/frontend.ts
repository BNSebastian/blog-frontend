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

  /** HOME
   **************************************/

  static getHome(): string {
    return `${this.frontend}/home`;
  }

  /** ADMIN
   **************************************/
  private static admin: string = '/admin';

  static uploadVideos(): string {
    return `${this.frontend}${this.admin}/uploadVideos`;
  }

  static manageVideos(): string {
    return `${this.frontend}${this.admin}/manageVideos`;
  }

  static manageVideo(name: string): string {
    return `${this.frontend}${this.admin}/manageVideos/${name}`;
  }

  /** DONATIONS
   **************************************/
  private static donate: string = '/donate';

  static getDonatePage(): string {
    return `${this.frontend}${this.donate}`;
  }

  /** ERRORS
   **************************************/
  static getPageNotFoundError(): string {
    return `${this.frontend}/404`;
  }

  static getUnauthorizedAccessError(): string {
    return `${this.frontend}/401`;
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
