import { useState } from "react";
import styles from './Comments.module.css';


const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className={styles["comment-form-textarea"]}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={styles["comment-form-button"]} disabled={isTextareaDisabled}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className={`${styles["comment-form-button"]} ${styles["comment-form-cancel-button"]}`}
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default CommentForm;
