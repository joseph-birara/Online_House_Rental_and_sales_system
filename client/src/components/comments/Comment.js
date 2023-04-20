import CommentForm from "./CommentForm";
import avatar from "./avatar.jpg";
import styles from "./Comments.module.css";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  getReplies,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return (
    <div key={comment.id} className={styles.comment}>
      <div className={styles["comment-image-container"]}>
        <img className="rounded-full w-9 h-9" src={avatar} alt="user-profile" />
      </div>
      <div className={styles["comment-right-part"]}>
        <div className={styles["comment-content"]}>
          <div className={styles["comment-author"]}>{comment.username}</div>
          <div>{dateFormatter.format(Date.parse(comment.createdAt))}</div>
        </div>
        {!isEditing && (
          <div className={styles["comment-text"]}>{comment.body}</div>
        )}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className={styles["comment-actions"]}>
          {canReply && (
            <div
              className={styles["comment-action"]}
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className={styles["comment-action"]}
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className={styles["comment-action"]}
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, comment.id)}
          />
        )}
        {replies.length > 0 && (
          <div className={styles.replies}>
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={getReplies(reply.id)}
                getReplies={getReplies}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
