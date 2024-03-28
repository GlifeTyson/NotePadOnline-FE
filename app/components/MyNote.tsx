import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
interface CommentSectionProps {
  toggleComment: boolean;
  noteId: string;
  comment: any;
}
export const CommentSection = ({ toggleComment, noteId, comment }) => {
  const [content, setContent] = useState<any>([]);
  const [accessTokenLocal, setAccessToken] = useState<string>("");

  // Function to retrieve accessToken from localStorage
  const getAccessTokenFromLocalStorage = () => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  };

  // useEffect hook to run once on component mount to get accessToken from localStorage
  useEffect(() => {
    getAccessTokenFromLocalStorage();
  }, []);
  const createComment = async (noteId: string) => {
    // alert(accessToken);
    console.log("Note id:", noteId);
    console.log("accessToken:", accessTokenLocal);
    if (!noteId) {
      return alert("Please choose a note to comment");
    }
    // try {
    //   setIdNote(noteId);
    //   const res = await axios.post(
    //     `//localhost:3000/api/comments/${idNote}`,
    //     { content: content },
    //     { headers: { "x-token": accessToken } }
    //   );
    //   // console.log(res.data.data);
    //   alert(res.data.data.message);
    // } catch (error) {
    //   alert(error.message);
    // }
  };

  if (toggleComment === true) {
    return (
      <div className="bg-slate-300">
        <span className="block w-4/5 bg-[#4682b4] h-1 mx-auto rounded-md my-2"></span>
        <div>
          <h1 className="text-center">
            <u>Comments</u>
          </h1>
        </div>
        <div className="flex flex-col items-center">
          {!!comment && comment.length > 0 ? (
            comment.map((value, index) => {
              return (
                <div className="flex flex-row gap-2" key={index}>
                  <p>{index + 1}.</p>
                  <p>{value.creator}</p>
                  <p>{value.content.toLowerCase()}</p>
                </div>
              );
            })
          ) : (
            <p>This note doesnt have comment</p>
          )}
          <input
            className="w-[200px] rounded-md"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></input>
          <button
            onClick={() => {
              if (content.length == 0) {
                return alert("Please fill in comment");
              } else {
                // console.log("noteId:", noteId);
                createComment(noteId);
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
  setViewers: React.Dispatch<React.SetStateAction<any>>;
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
  setViewers,
  // setComment,
}) => {
  const [comment, setComment] = useState<any>([]);
  const [accessTokenLocal, setAccessToken] = useState<string>("");
  // const [textColor, setTextColor] = useState<string>("");
  const [colorIndex, setColorIndex] = useState(-1);
  // Function to retrieve accessToken from localStorage
  const getAccessTokenFromLocalStorage = () => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  };
  // useEffect hook to run once on component mount to get accessToken from localStorage
  useEffect(() => {
    getAccessTokenFromLocalStorage();
  }, []);

  const navigate = useRouter();

  const fetchCommentByUser = async (id) => {
    try {
      // alert(id);
      const res = await axios.get("//localhost:3000/api/comments", {
        params: {
          offset: 0,
          limit: 10,
          orderBy: "createdAt_DESC",
          filter: `{"diaryId":"${id}"}`,
        },
        headers: { "x-token": accessTokenLocal },
      });
      const result = res.data.data;
      // console.log(result.comments);
      setComment(res.data.data.comments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return navigate.push("/login");
    } else {
      setAccessToken(accessToken);
    }
  }, [navigate]);

  return (
    <div className="bg-slate-300">
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
                  className={
                    index !== colorIndex
                      ? "underline text-[12px] cursor-pointer"
                      : "underline text-[12px] cursor-pointer bg-white"
                  }
                  onClick={() => {
                    setColorIndex(index);
                    setTitle(value.title);
                    setContent(value.content);
                    setDisabled(false);
                    setHidden(true);
                    fetchCommentByUser(value._id);
                    setNoteId(value._id);
                    setDisableSaveButton(false);
                    setViewers(value.viewers);
                  }}
                >
                  {value.title}
                </a>
              </div>
            );
          })
        ) : (
          <p className="text-[12px]">Not have any note yet</p>
        )}
      </div>
    </div>
  );
};

export default MyNote;
