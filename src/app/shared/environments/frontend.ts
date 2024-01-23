const baseUrl: String = '';

export const frontendUrl = {
  home: `${baseUrl}/home`,

  signup: `${baseUrl}/user/signup`,
  login: `${baseUrl}/user/login`,
  profile: `${baseUrl}/user/profile`,

  videos: `${baseUrl}/video`,

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
  private static forum: string = '/forum';

  static getForum(): string {
    return `${this.frontend}${this.forum}`;
  }

  static getForumPostById(postId: number): string {
    return `${this.frontend}${this.forum}/${postId}`;
  }

  /** CHAT
   **************************************/
  private static chat: string = '/chat';

  static getChat(): string {
    return `${this.frontend}${this.chat}`;
  }
}
