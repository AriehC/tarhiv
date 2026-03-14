import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  increment,
  serverTimestamp,
  onSnapshot,
  type Unsubscribe,
  type Timestamp,
} from "firebase/firestore";
import { getFirebaseFirestore } from "./config";

export interface Comment {
  id: string;
  postSlug: string;
  authorUid: string;
  authorName: string;
  authorPhoto: string | null;
  body: string;
  parentId: string | null;
  createdAt: Timestamp | null;
  likes: number;
}

const COMMENTS_COLLECTION = "comments";

export async function getComments(postSlug: string): Promise<Comment[]> {
  const db = getFirebaseFirestore();
  const q = query(
    collection(db, COMMENTS_COLLECTION),
    where("postSlug", "==", postSlug),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Comment[];
}

export async function addComment(
  postSlug: string,
  user: { uid: string; displayName: string | null; photoURL: string | null },
  body: string,
  parentId?: string,
): Promise<string> {
  const db = getFirebaseFirestore();
  const docRef = await addDoc(collection(db, COMMENTS_COLLECTION), {
    postSlug,
    authorUid: user.uid,
    authorName: user.displayName || "Anonymous",
    authorPhoto: user.photoURL || null,
    body,
    parentId: parentId || null,
    createdAt: serverTimestamp(),
    likes: 0,
  });
  return docRef.id;
}

export async function deleteComment(commentId: string): Promise<void> {
  const db = getFirebaseFirestore();
  await deleteDoc(doc(db, COMMENTS_COLLECTION, commentId));
}

export async function likeComment(commentId: string): Promise<void> {
  const db = getFirebaseFirestore();
  await updateDoc(doc(db, COMMENTS_COLLECTION, commentId), {
    likes: increment(1),
  });
}

export function onCommentsSnapshot(
  postSlug: string,
  callback: (comments: Comment[]) => void,
): Unsubscribe {
  const db = getFirebaseFirestore();
  const q = query(
    collection(db, COMMENTS_COLLECTION),
    where("postSlug", "==", postSlug),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Comment[];
    callback(comments);
  });
}
