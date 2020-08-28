import firebase, {auth, firestore} from "~/firebase";
import { Post } from "./post";
import {NotificationClient} from "~/model/notification";

interface Like {
  postID: string;
  userID: string;
  notificationID: string | null;
}

export const LikeClient = {
  async upload(post: Pick<Post, "title" | "id" | "authorID" | "imageURL">, mode: "add" | "remove"): Promise<void> {
    const authorID = auth.currentUser?.uid || "";
    const author = auth.currentUser?.displayName || "unknown user";

    await firestore.runTransaction(async function(transaction) {
      const ref = firestore.collection(`user/${authorID}/like`).doc(post.id);
      const postRef = firestore.collection("post").doc(post.id);

      const like = await transaction.get(ref);
      if(like.exists) {
        if(mode === "add") {
          return;
        }

        const lk = like.data() as Like;

        if(lk.notificationID) {
          NotificationClient.removeTransaction(transaction, lk.userID, lk.notificationID)
        }

        await transaction.delete(ref);

        await transaction.update(postRef, {
          "liked": firebase.firestore.FieldValue.increment(-1),
        });
      } else {
        if(mode === "remove") {
          return;
        }

        if(post.authorID !== authorID) {
          const n = NotificationClient.addTransaction(transaction, {
            authorID,
            author,
            postID: post.id,
            userID: post.authorID,
            imageURL: post.imageURL,
            text: `${author}さんが「${post.title}」にいいねしました`
          })

          await transaction.set(ref, {
            postID: post.id,
            userID: post.authorID,
            notificationID: n.id,
          });
        } else {
          await transaction.set(ref, {
            postID: post.id,
            userID: post.authorID,
            notificationID: null,
          });
        }


        await transaction.update(postRef, {
          "liked": firebase.firestore.FieldValue.increment(1),
        });
      }
    })
  },
  list() {
    const userID = auth.currentUser?.uid || "";

    return firestore.collection(`user/${userID}/like`);
  },
  get(postID: string) {
    const userID = auth.currentUser?.uid || "";
    if(userID ==="") {
      alert("empty id");
    }

    return firestore.collection(`user/${userID}/like`).where("postID", "==", postID);
  },
}
