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
};
