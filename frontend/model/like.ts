import firebase, {auth, firestore} from "~/firebase";

export const LikeClient = {
  async upload(postID: string, mode: "add" | "remove"): Promise<void> {
    const authorID = auth.currentUser?.uid || "";

    await firestore.runTransaction(async function(transaction) {
      const ref = firestore.collection(`user/${authorID}/like`).doc(postID);
      const postRef = firestore.collection("post").doc(postID);

      if((await transaction.get(ref)).exists) {
        if(mode === "add") {
          return;
        }

        await transaction.delete(ref);

        await transaction.update(postRef, {
          "liked": firebase.firestore.FieldValue.increment(-1),
        });
      } else {
        if(mode === "remove") {
          return;
        }

        await transaction.set(ref, {
          postID,
        });

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
