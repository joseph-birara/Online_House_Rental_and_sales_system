import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import styles from "./Comments.module.css";
import axios from "axios";
import { UserContext } from "../../contexts/UserContextProvider";
import { useContext } from "react";

const Comments = ({ houseId, ownerId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const { user, token } = useContext(UserContext);
  console.log("user: ",user);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId = null) => {
    // createCommentApi(text, parentId).then((comment) => {
    //   setBackendComments([comment, ...backendComments]);
    //   setActiveComment(null);
    // });

    const commentData = {
      reviewerId: user._id,
      message: text,
      houseId: houseId,
      ownerId: ownerId,
      parentId: parentId,
      createdAt: new Date().toISOString(),
    };
    axios
      .post(`http://localhost:4000/comment/add`, commentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Comment saved successfully");
        // console.log(commentData);
        console.log("d: ", response.data.newComment);
        setBackendComments([response.data.newComment, ...backendComments]);
        setActiveComment(null);
      })
      .catch((error) => {
        console.log("Error saving comment");
        console.log(error);
      });
  };

  const updateComment = (text, commentId) => {
    // updateCommentApi(text).then(() => {
    //   const updatedBackendComments = backendComments.map((backendComment) => {
    //     if (backendComment.id === commentId) {
    //       return { ...backendComment, body: text };
    //     }
    //     return backendComment;
    //   });
    //   setBackendComments(updatedBackendComments);
    //   setActiveComment(null);
    // });

    const commentData = {
      id: commentId,
      message: text,
    };
    axios
      .put(`http://localhost:4000/comment/edit`, commentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("comment edited succesfully");
        const updatedBackendComments = backendComments.map((backendComment) => {
          if (backendComment._id === commentId) {
            return { ...backendComment, message: text };
          }
          return backendComment;
        });
        setBackendComments(updatedBackendComments);
        setActiveComment(null);
      })
      .catch((error) => {
        console.log("Error on updating comment");
        console.log(commentData);
        console.log(error);
      });
  };
  const deleteComment = (commentId) => {
    // if (window.confirm("Are you sure you want to remove comment?")) {
    //   deleteCommentApi().then(() => {
    //     const updatedBackendComments = backendComments.filter(
    //       (backendComment) => backendComment.id !== commentId
    //     );
    //     setBackendComments(updatedBackendComments);
    //   });
    // }

    axios
      .delete(`http://localhost:4000/comment/delete/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        console.log("comment deleted succesfully");
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment._id !== commentId
        );
        setBackendComments(updatedBackendComments);
      })
      .catch((error) => {
        console.log("Error on deleteing comment");
        console.log(error);
      });
  };

  useEffect(() => {
    // getCommentsApi().then((data) => {
    //   setBackendComments(data);
    // });

    axios
      .get(`http://localhost:4000/comment/getByHouse/${houseId}`)
      .then((response) => {
        console.log("resComments: ", response.data);
        setBackendComments(response.data);
        // console.log(houseData);
        // setHousesList([...HousesList, houseData]); //update house list state
        // setRedirect(true); // redirect to house list page
      })
      .catch((error) => {
        console.log("Error saving comment");
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.comments}>
      <h3 className={styles["comments-title"]}>Reviews</h3>
      {user && user.userType == "tenant" && (
        <>
          <div className={styles["comment-form-title"]}>Write a review</div>
          <CommentForm submitLabel="Write" handleSubmit={addComment} />
        </>
      )}
      <div className={styles["comments-container"]}>
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment._id}
            comment={rootComment}
            replies={getReplies(rootComment._id)}
            getReplies={getReplies}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={user ? user._id : null}
            currentUserType = {user ? user.userType : null}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
