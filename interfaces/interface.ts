export interface Post {
    _id:string,
    caption?: string,
    author: {
        id: string,
        username: string,
        image: string,
        verified: boolean,
    },
    songUrl: string,
    date: Date,
    likes: string[],
    comments_length: number,
}

export interface User {
    _id:string,
    username: string,
    email: string,
    password?: string,
    image: string,
    bio?: string,
    followings: string[],
    followers: string[],
    posts: string[],
    verified: boolean,
    new_notification: number,
    saved_posts: string[],
    personal_link?: string,
    failed_login_attempts: number,
}

export interface Comment {
    _id: string,
    writer: {
        id: string,
        username: string,
        avatar: string,
        verified: boolean,
      },
      postId: string,
      message: string,
      date: Date,
      replies: string[],
      type: string,
}

export interface Notification {
    _id: string,
    owner: string,
  user: {
    id: string,
    username: string,
    image: string,
    verified: boolean,
  },
  postId?: string,
  message: string,
  date: Date,
}

export interface UserSlice {
  users: User[],
  isLoading: boolean,
  error: string
}