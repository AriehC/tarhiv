import { NextRequest, NextResponse } from "next/server";
import {
  getComments,
  addComment,
  deleteComment,
} from "@/lib/firebase/firestore";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postSlug = searchParams.get("postSlug");

  if (!postSlug) {
    return NextResponse.json(
      { error: "postSlug query parameter is required" },
      { status: 400 },
    );
  }

  try {
    const comments = await getComments(postSlug);
    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postSlug, user, comment, parentId } = body;

    if (!postSlug || typeof postSlug !== "string") {
      return NextResponse.json(
        { error: "postSlug is required" },
        { status: 400 },
      );
    }

    if (!user || !user.uid || typeof user.uid !== "string") {
      return NextResponse.json(
        { error: "Valid user with uid is required" },
        { status: 400 },
      );
    }

    if (!comment || typeof comment !== "string" || comment.trim().length === 0) {
      return NextResponse.json(
        { error: "Comment body is required" },
        { status: 400 },
      );
    }

    if (comment.length > 2000) {
      return NextResponse.json(
        { error: "Comment must be 2000 characters or fewer" },
        { status: 400 },
      );
    }

    const commentId = await addComment(
      postSlug,
      {
        uid: user.uid,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
      },
      comment.trim(),
      parentId,
    );

    return NextResponse.json({ id: commentId }, { status: 201 });
  } catch (error) {
    console.error("Failed to add comment:", error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const commentId = searchParams.get("commentId");

  if (!commentId) {
    return NextResponse.json(
      { error: "commentId query parameter is required" },
      { status: 400 },
    );
  }

  try {
    await deleteComment(commentId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 },
    );
  }
}
