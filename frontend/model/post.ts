export interface Post {
  id: string;
  linked: string;

  authorID: string;
  author: string;

  title: string;
  description: string;
  imageURL: string;
  liked: number;
  cooked: number;
  comments: number;
}

export const seed: Post[] = [
  {
    id: "foobar",
    linked: "foobar",

    authorID: "tsuzu",
    author: "Tsuzu",

    title: "鶏の照り焼き",
    description: "セールになっていたXXXを買ってきてXXXするだけで簡単に作れました！\nああああ",
    imageURL: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    liked: 15,
    cooked: 3,
    comments: 10,
  },
  {
    id: "foobar",
    linked: "foobar",

    authorID: "tsuzu",
    author: "Tsuzu",

    title: "カレーライス",
    description: "セールになっていたXXXを買ってきてXXXするだけで簡単に作れました！",
    imageURL: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    liked: 15,
    cooked: 3,
    comments: 10,
  }
];
