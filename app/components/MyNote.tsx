import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
interface CommentSectionProps {
  toggleComment: boolean;
  noteId: string;
  comment: any;
}
export const CommentSection = ({ toggleComment, noteId, comment }) => {
  const { accessToken } = useAuth();
  const [content, setContent] = useState<any>([]);
  const [idNote, setIdNote] = useState<string>("");
  const createComment = async (noteId: string) => {
    try {
      setIdNote(noteId);
      const res = await axios.post(
        `//localhost:3000/api/comments/${idNote}`,
        { content: content },
        { headers: { "x-token": accessToken } }
      );
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (toggleComment === true) {
    return (
      <div>
        <span className="block w-4/5 bg-[#4682b4] h-1 mx-auto rounded-md my-2"></span>
        <div>
          <h1 className="text-center">
            <u>Comments</u>
          </h1>
        </div>
        <div className="flex flex-col items-center">
          {/* {<p>{content}</p>} */}
          {!!comment && comment.length > 0 ? (
            <p>Have comment</p>
          ) : (
            <p>Not have comment</p>
          )}
          <input
            className="w-[150px] rounded-md"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></input>
          <button
            onClick={() => {
              if (content.length == 0) {
                return alert("Please fill in comment");
              } else {
                console.log("noteId:", noteId);
                // createComment(noteId);
              }
            }}
            className="w-fit bg-[#337ab7] border-[#2e6da4] text-white rounded-md hover:bg-[#286090] text-right"
          >
            Comment
          </button>
        </div>
      </div>
    );
  }
  return <></>;
};
interface Props {
  note: any;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setNoteId: React.Dispatch<React.SetStateAction<string>>;
  noteId: any;
  toggleComment: boolean;
  setDisableSaveButton: React.Dispatch<React.SetStateAction<boolean>>;
}
const MyNote: React.FC<Props> = ({
  note,
  noteId,
  setTitle,
  setContent,
  setDisabled,
  toggleComment,
  setHidden,
  setNoteId,
  setDisableSaveButton,
  // setComment,
}) => {
  const { accessToken } = useAuth();
  const [comment, setComment] = useState<any>([]);
  const getNote = async (noteElement: any) => {
    try {
      const res = await axios.get(
        `//localhost:3000/api/diaries/${noteElement._id}`,
        {
          headers: { "x-token": accessToken },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCommentByUser = async (id) => {
    try {
      alert(id);
      const res = await axios.get("//localhost:3000/api/comments", {
        params: {
          offset: 0,
          limit: 10,
          orderBy: "createdAt_DESC",
          filter: `{"diaryId":"${id}"}`,
        },
        headers: { "x-token": accessToken },
      });
      setComment(res.data.data.comments);
      if (comment.length > 0) {
        alert("Have comment");
      }
      return alert("Not have any comment");
      // // setComment(res.data[0].content);
      console.log(res.data.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CommentSection
        toggleComment={toggleComment}
        noteId={noteId}
        comment={comment}
      />
      <span className="block w-4/5 bg-[#4682b4] h-1 mx-auto rounded-md my-2"></span>
      <h1 className="text-center">
        <u>My Notes</u>
      </h1>
      <div className="flex flex-row w-full justify-center items-center gap-10">
        {!!note && note.length > 0 ? (
          note.map((value: any, index: number) => {
            return (
              <div
                className="flex items-center justify-center gap-1"
                key={index}
              >
                <a
                  className="hover:underline text-[12px] cursor-pointer"
                  onClick={() => {
                    setTitle(value.title);
                    setContent(value.content);
                    setDisabled(false);
                    setHidden(true);
                    fetchCommentByUser(value._id);
                    setNoteId(value._id);
                    setDisableSaveButton(false);
                  }}
                >
                  {value.title}
                </a>
              </div>
            );
          })
        ) : (
          <p>Not have any note yet</p>
        )}
      </div>
    </div>
  );
};

export default MyNote;
