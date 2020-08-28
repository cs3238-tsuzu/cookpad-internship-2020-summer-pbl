import firebase, {auth, firestore} from "~/firebase";

export interface Comment {
  id: string;
  postID: string;
  authorID: string;
  author: string;
  comment: string;
  createdAt: number;
}

export const seed: Comment[] = [
  {
    id: "foobar",
    postID: "foobar",

    authorID: "tsuzu",
    author: "Tsuzu",

    comment: "すごい！！！",
    createdAt: 0,
  },
];

export type NewComment = Omit<Comment, "id" | "author" | "authorID" | "createdAt">;

export const CommentClient = {
  async upload(p: NewComment): Promise<Comment> {
    const comment: Comment = {
      ...p,
      id: "",
      authorID:  auth.currentUser?.uid || "",
      author: auth.currentUser?.displayName || "unknown user",
      createdAt: Date.now(),
    };

    const batch = firestore.batch();

    const ref = firestore.collection(`post/${p.postID}/comment`).doc();

    comment.id = ref.id;
    batch.set(ref, comment);

    batch.update(
      firestore.collection("post").doc(p.postID),
      {
        "comments": firebase.firestore.FieldValue.increment(1),
      }
    )

    await batch.commit();

    return comment;
  },
  list(postID: string) {
    return firestore.collection(`post/${postID}/comment`).orderBy("createdAt", "desc");
  },
  async get(postID: string, id: string) {
    const docRef = await firestore.collection(`post/${postID}/comment`).doc(id).get();

    if(!docRef.exists) {
      throw "not found";
    }

    return docRef.data() as Comment;
  }
}
