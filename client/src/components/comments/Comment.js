import CommentForm from "./CommentForm";
import avatar from "./avatar.jpg";
import styles from "./Comments.module.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";

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
  currentUserType,
}) => {
  const {user} = useContext(UserContext);
  const isEditing =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "replying";
  const canDelete =
    currentUserId === comment.reviewerId._id && replies.length === 0 && currentUserType === "tenant";
  const canReply = Boolean(currentUserId) && currentUserType === "tenant";
  const canEdit = currentUserId === comment.reviewerId._id && currentUserType === "tenant";
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return (
    <div key={comment.id} className={styles.comment}>
      <div className={styles["comment-image-container"]}>
      <img
          className="rounded-full w-11 h-11"
          src={user && user.image}
          onError={(e) => {
            e.target.src = 'https://media.gettyimages.com/id/1227618807/vector/human-face-avatar-icon-profile-for-social-network-man-vector-illustration.jpg?s=1024x1024&w=gi&k=20&c=-Iz47dY99Hx3S8JAkVLKvzQN65Qn8m7UPFAMbJvfd1Y=';
          }}
          alt="user-profile"
        />
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
                key={reply._id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment._id}
                replies={getReplies(reply._id)}
                getReplies={getReplies}
                currentUserId={currentUserId}
                currentUserType={currentUserType}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
