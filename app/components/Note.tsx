import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import MyNote from "./MyNote";
import SharedNote from "./SharedNote";
import SearchUser from "./SearchUser";

const Note = () => {
  const [user, setUser] = useState<any>([]);
  const [note, setNote] = useState<any>([]);
  const [sharedNote, setSharedNote] = useState<any>([]);
  const [comment, setComment] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const [noteId, setNoteId] = useState<string>("");
  const [toggleComment, setToggleComment] = useState<boolean>(false);
  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(false);

  const navigate = useRouter();

  const { idUser, accessToken } = useAuth();

  const fetchAllUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users");
      // console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchNotes = async () => {
    try {
      const res = await axios.get("//localhost:3000/api/diaries/", {
        headers: { "x-token": accessToken },
      });
      setNote(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSharedNotes = async () => {
    try {
      const res = await axios.get("//localhost:3000/api/diaries/shared", {
        headers: { "x-token": accessToken },
      });
      setSharedNote(res.data);
      // console.table(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const createNote = async (
    title: string,
    content: string,
    creator: string
  ) => {
    try {
      const res = await axios.post(
        "//localhost:3000/api/diaries",
        {
          title,
          content,
          creator,
        },
        { headers: { "x-token": accessToken } }
      );
      alert(res.data.message);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log("error");
    }
  };
  const editNote = async (title: string, content: string, idDiary: string) => {
    console.log(title);
    console.log(content);
    console.log(idDiary);
    try {
      const res = await axios.patch(
        `//localhost:3000/api/diaries/${idDiary}`,
        {
          title: title,
          content: content,
        },
        {
          headers: { "x-token": accessToken },
        }
      );
      return alert(res.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteNote = async (noteId: string) => {
    try {
      const res = await axios.delete(`//localhost:3000/api/diaries/${noteId}`, {
        headers: { "x-token": accessToken },
      });
      return alert(res.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      return navigate.push("/login");
    }
    fetchNotes();
    fetchSharedNotes();
    fetchAllUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <div className=" flex flex-col mt-10  text-[#10589b] w-full h-screen">
      <div className="flex flex-col justify-center items-center">
        <input
          disabled={disabled}
          type="text"
          required
          value={title}
          placeholder="Name Title"
          onChange={(e) => setTitle(e.target.value)}
          className="h-10 w-4/5 placeholder:px-4 text-justify rounded-md"
        ></input>
        <div className="flex flex-row justify-evenly items-center p-5">
          {hidden && (
            <button
              onClick={() => {
                setHidden(false);
                setContent("");
                setTitle("");
                setDisabled(false);
                setToggleComment(false);
              }}
              className="w-fit bg-[#337ab7] border-[#2e6da4] text-white p-[12px] rounded-md hover:bg-[#286090]"
            >
              Created new note
            </button>
          )}
          <h1 className="p-3">
            <b>Content Part</b>
          </h1>
        </div>
        <textarea
          disabled={disabled}
          className="h-80 w-4/5 rounded-md placeholder:px-4 placeholder:py-2"
          placeholder="Note Content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      {/* <CommentSection
        noteId={noteId}
        setComment={setComment}
        disabled={toggleComment}
      /> */}
      <div className="flex flex-row justify-center items-center gap-10">
        <button
          hidden={hidden}
          onClick={() => {
            if (disableSaveButton == true) {
              return alert("Button have been disable");
            }
            createNote(title, content, idUser);
          }}
          className="w-20 bg-[#337ab7] border-[#2e6da4] text-white ml-36 mt-10 px-[6px] py-[12px] rounded-md hover:bg-[#286090]"
        >
          Save
        </button>
        <button
          hidden={!hidden}
          onClick={() => {
            editNote(title, content, noteId);
          }}
          className="w-20 bg-[#337ab7] border-[#2e6da4] text-white ml-36 mt-10 px-[6px] py-[12px] rounded-md hover:bg-[#286090]"
        >
          Edit
        </button>
        <button
          hidden={!hidden}
          onClick={() => {
            deleteNote(noteId);
          }}
          className="w-20 bg-[#337ab7] border-[#2e6da4] text-white mt-10 py-[12px] rounded-md hover:bg-[#286090]"
        >
          Delete
        </button>
        {hidden && <SearchUser user={user} noteId={noteId} />}

        <button
          onClick={() => setToggleComment(!toggleComment)}
          className="w-fit h-12 bg-[#337ab7] border-[#2e6da4] text-white mr-36 mt-10 py-[12px] rounded-md hover:bg-[#286090]"
        >
          Show Comments
        </button>
      </div>

      <MyNote
        note={note}
        noteId={noteId}
        setTitle={setTitle}
        setContent={setContent}
        setDisabled={setDisabled}
        setHidden={setHidden}
        setNoteId={setNoteId}
        toggleComment={toggleComment}
        setDisableSaveButton={setDisableSaveButton}
      />

      <SharedNote
        sharedNote={sharedNote}
        setContent={setContent}
        setTitle={setTitle}
        setDisabled={setDisabled}
        setToggleComment={setToggleComment}
        setHidden={setHidden}
        setDisableSaveButton={setDisableSaveButton}
      />
    </div>
  );
};

export default Note;
