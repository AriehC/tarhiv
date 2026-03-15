import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  increment,
  serverTimestamp,
  onSnapshot,
  arrayUnion,
  arrayRemove,
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

// ─── Post Stats (views, likes) ───

const POSTS_COLLECTION = "posts";
const USER_DATA_COLLECTION = "userData";

export interface PostStats {
  views: number;
  likes: number;
}

export async function getPostStats(postSlug: string): Promise<PostStats> {
  const db = getFirebaseFirestore();
  const docSnap = await getDoc(doc(db, POSTS_COLLECTION, postSlug));
  if (docSnap.exists()) {
    const data = docSnap.data();
    return { views: data.views ?? 0, likes: data.likes ?? 0 };
  }
  return { views: 0, likes: 0 };
}

export async function incrementPostViews(postSlug: string): Promise<void> {
  const db = getFirebaseFirestore();
  const ref = doc(db, POSTS_COLLECTION, postSlug);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    await updateDoc(ref, { views: increment(1) });
  } else {
    await setDoc(ref, { views: 1, likes: 0 });
  }
}

export async function togglePostLike(
  postSlug: string,
  uid: string,
): Promise<boolean> {
  const db = getFirebaseFirestore();

  // Check if user already liked
  const userRef = doc(db, USER_DATA_COLLECTION, uid);
  const userSnap = await getDoc(userRef);
  const likedPosts: string[] = userSnap.exists()
    ? userSnap.data().likedPosts ?? []
    : [];

  const alreadyLiked = likedPosts.includes(postSlug);
  const postRef = doc(db, POSTS_COLLECTION, postSlug);
  const postSnap = await getDoc(postRef);

  if (alreadyLiked) {
    // Unlike
    await updateDoc(userRef, { likedPosts: arrayRemove(postSlug) });
    if (postSnap.exists()) {
      await updateDoc(postRef, { likes: increment(-1) });
    }
    return false;
  } else {
    // Like
    if (userSnap.exists()) {
      await updateDoc(userRef, { likedPosts: arrayUnion(postSlug) });
    } else {
      await setDoc(userRef, { likedPosts: [postSlug], viewedPosts: [] });
    }
    if (postSnap.exists()) {
      await updateDoc(postRef, { likes: increment(1) });
    } else {
      await setDoc(postRef, { views: 0, likes: 1 });
    }
    return true;
  }
}

export function onPostStatsSnapshot(
  postSlug: string,
  callback: (stats: PostStats) => void,
): Unsubscribe {
  const db = getFirebaseFirestore();
  return onSnapshot(doc(db, POSTS_COLLECTION, postSlug), (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback({ views: data.views ?? 0, likes: data.likes ?? 0 });
    } else {
      callback({ views: 0, likes: 0 });
    }
  });
}

// ─── User Data (viewed posts, liked posts) ───

export interface UserPostData {
  viewedPosts: string[];
  likedPosts: string[];
}

export async function getUserPostData(uid: string): Promise<UserPostData> {
  const db = getFirebaseFirestore();
  const docSnap = await getDoc(doc(db, USER_DATA_COLLECTION, uid));
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      viewedPosts: data.viewedPosts ?? [],
      likedPosts: data.likedPosts ?? [],
    };
  }
  return { viewedPosts: [], likedPosts: [] };
}

export async function markPostAsViewed(
  postSlug: string,
  uid: string,
): Promise<void> {
  const db = getFirebaseFirestore();
  const userRef = doc(db, USER_DATA_COLLECTION, uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    await updateDoc(userRef, { viewedPosts: arrayUnion(postSlug) });
  } else {
    await setDoc(userRef, { viewedPosts: [postSlug], likedPosts: [] });
  }
}

export function onUserPostDataSnapshot(
  uid: string,
  callback: (data: UserPostData) => void,
): Unsubscribe {
  const db = getFirebaseFirestore();
  return onSnapshot(doc(db, USER_DATA_COLLECTION, uid), (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback({
        viewedPosts: data.viewedPosts ?? [],
        likedPosts: data.likedPosts ?? [],
      });
    } else {
      callback({ viewedPosts: [], likedPosts: [] });
    }
  });
}
