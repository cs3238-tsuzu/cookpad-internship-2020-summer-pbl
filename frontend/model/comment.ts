export interface Comment {
  id: string;
  postID: string;
  authorID: string;
  author: string;
  comment: string;
}

export const seed: Comment[] = [
  {
    id: "foobar",
    postID: "foobar",

    authorID: "tsuzu",
    author: "Tsuzu",

    comment: "すごい！！！"
  },
];
