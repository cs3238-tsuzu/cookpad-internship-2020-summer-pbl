import  {auth, firestore} from "~/firebase";
import firebase from "firebase";

export interface Notification {
  id: string;
  userID: string;
  authorID: string;
  author: string;
  imageURL: string;
  postID: string;
  text: string;

  createdAt: number;
}

export type NewNotification = Omit<Notification, "id" | "createdAt">;

export const NotificationClient = {
  list() {
    const userID = auth.currentUser?.uid || "";

    return firestore.collection(`user/${userID}/notification`).orderBy("createdAt", "desc");
  },
  addBatch(batch: firebase.firestore.WriteBatch, not: NewNotification): Notification {
    const notification: Notification = {
      ...not,
      createdAt: Date.now(),
      id: "",
    }

    const ref = firestore.collection(`user/${not.userID}/notification`).doc();
    notification.id = ref.id

    batch.set(ref, notification);

    return notification;
  },
  addTransaction(batch: firebase.firestore.Transaction, not: NewNotification): Notification {
    const notification: Notification = {
      ...not,
      createdAt: Date.now(),
      id: "",
    }

    const ref = firestore.collection(`user/${not.userID}/notification`).doc();
    notification.id = ref.id

    batch.set(ref, notification);

    return notification;
  },
  removeBatch(batch: firebase.firestore.WriteBatch, userID: string, id: string) {
    const ref = firestore.collection(`user/${userID}/notification`).doc(id);

    batch.delete(ref);
  },
  removeTransaction(batch: firebase.firestore.Transaction, userID: string, id: string) {
    const ref = firestore.collection(`user/${userID}/notification`).doc(id);

    batch.delete(ref);
  }
}
