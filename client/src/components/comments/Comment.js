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
    activeComment.id === comment._id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "replying";
  const canDelete =
    currentUserId === comment.reviewerId._id && replies.length === 0;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.reviewerId._id;
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
          <div className={styles["comment-author"]}>{comment.reviewerId.name}</div>
          <div>{dateFormatter.format(Date.parse(comment.createdAt))}</div>
        </div>
        {!isEditing && (
          <div className={styles["comment-text"]}>{comment.message}</div>
        )}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.message}
            handleSubmit={(text) => updateComment(text, comment._id)}
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
                setActiveComment({ id: comment._id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className={styles["comment-action"]}
              onClick={() =>
                setActiveComment({ id: comment._id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className={styles["comment-action"]}
              onClick={() => deleteComment(comment._id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, comment._id)}
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
                replies={getReplies(reply._id)}
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
