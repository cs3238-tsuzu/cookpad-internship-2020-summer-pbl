import {auth, firestore} from "~/firebase";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";

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
  createdAt: number | undefined;
}

export type NewPost = Omit<Post, "id" | "author" | "authorID" | "liked" | "cooked" | "comments" | "createdAt">;

export const PostClient = {
  async upload(p: NewPost): Promise<Post> {
    const post: Post = {
      ...p,
      id: "",
      authorID:  auth.currentUser?.uid || "",
      author: auth.currentUser?.displayName || "unknown user",
      createdAt: Date.now(),
      liked: 0,
      cooked: 0,
      comments: 0,
    };

    const batch = firestore.batch();

    const ref = firestore.collection("post").doc();

    post.id = ref.id;
    if (post.linked === "") {
      post.linked = post.id;
    }

    await batch.set(ref, post);

    if(post.linked !== post.id) {
      const linkedRef = firestore.collection("post").doc(post.linked);

      batch.update(linkedRef, {
        "cooked": firebase.firestore.FieldValue.increment(1),
      });
    }

    await batch.commit();

    return post;
  },
  list() {
    return firestore.collection("post").orderBy("createdAt", "desc");
  },
  filter(linked: string) {
    return firestore.collection("post").where("linked", "==", linked);
  },
  getRaw(id: string) {
    return firestore.collection("post").doc(id);
  },
  async get(id: string) {
    const docRef = await firestore.collection("post").doc(id).get();

    if(!docRef.exists) {
      throw "not found";
    }

    const p = docRef.data() as Post;

    return p;
  }
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
    createdAt: 0,
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
    createdAt: 0,
  }
];
