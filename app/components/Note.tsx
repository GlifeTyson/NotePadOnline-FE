import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import MyNote from "./MyNote";
import SharedNote from "./SharedNote";
import SearchUser from "./SearchUser";
import { FaSearch } from "react-icons/fa";

const Note = () => {
  const [user, setUser] = useState<any>([]);
  const [userFind, setUserFind] = useState<any>([]);

  const [note, setNote] = useState<any>([]);
  const [sharedNote, setSharedNote] = useState<any>([]);
  // const [comment, setComment] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const [noteId, setNoteId] = useState<string>("");
  const [viewers, setViewers] = useState<any>([]);
  const [toggleComment, setToggleComment] = useState<boolean>(false);
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);

  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(false);
  const [accessTokenLocal, setAccessToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  // Function to retrieve accessToken from localStorage
  const getDataFromLocalStorage = () => {
    const storedToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (storedToken) {
      setAccessToken(storedToken);
      setUserId(userId);
    }
  };

  // useEffect hook to run once on component mount to get accessToken from localStorage
  useEffect(() => {
    getDataFromLocalStorage();
  }, []);
  const { idUser, accessToken } = useAuth();

  const fetchAllUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users");
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createNote = async (title: string, content: string) => {
    try {
      const res = await axios.post(
        "//localhost:3000/api/diaries",
        {
          title,
          content,
        },
        { headers: { "x-token": accessToken ? accessToken : accessTokenLocal } }
      );
      alert(res.data.message);
      window.location.reload();
      setTitle("");
      setContent("");
    } catch (error) {
      console.log("error");
    }
  };
  const editNote = async (title: string, content: string, idDiary: string) => {
    try {
      const res = await axios.patch(
        `//localhost:3000/api/diaries/${idDiary}`,
        {
          title: title,
          content: content,
        },
        {
          headers: { "x-token": accessToken ? accessToken : accessTokenLocal },
        }
      );
      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteNote = async (noteId: string) => {
    try {
      const res = await axios.delete(`//localhost:3000/api/diaries/${noteId}`, {
        headers: { "x-token": accessToken ? accessToken : accessTokenLocal },
      });
      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("//localhost:3000/api/diaries/", {
          headers: { "x-token": accessToken ? accessToken : accessTokenLocal },
        });
        setNote(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
    const fetchSharedNotes = async () => {
      try {
        const res = await axios.get("//localhost:3000/api/diaries/shared", {
          headers: { "x-token": accessToken ? accessToken : accessTokenLocal },
        });
        setSharedNote(res.data);
        // console.table(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSharedNotes();
    fetchAllUser();
  }, [accessToken, accessTokenLocal]);
  useEffect(() => {
    if (userId && user.length > 0) {
      // get all the viewerID by mapping into viewer
      const viewerIds = (viewers || []).map((viewer: any) => viewer.id);

      const result = (user || []).reduce(
        //intiliaze userList, currentUser
        (userList: any[], currentUser: any) => {
          if (
            //check if (currentUser is login == userID and check if current user is viewer by compare ID )
            currentUser._id === userId ||
            viewerIds.includes(currentUser._id)
          ) {
            return userList;
          } else {
            return [
              ...userList,
              { name: currentUser.name, id: currentUser._id },
            ];
          }
        },
        //initial value for reduce is []
        []
      );
      setUserFind(result);
      // console.log("removeCreatorFromUser:", userFind);
    }
  }, [userId, user, viewers]); // useEffect to handle filtering when userId or user changes

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
        />
      </div>
      <div className="w-full h-fit flex flex-row justify-center items-center px-24 py-10">
        <button
          hidden={hidden || disabled}
          onClick={() => {
            if (disableSaveButton == true) {
              return alert("Button have been disable");
            }
            createNote(title, content);
          }}
          className="w-36 h-12 bg-[#337ab7] border-[#2e6da4] text-white m-auto rounded-md hover:bg-[#286090]"
        >
          Save
        </button>
        <button
          hidden={!hidden}
          onClick={() => {
            editNote(title, content, noteId);
          }}
          className="w-20 h-12 bg-[#337ab7] border-[#2e6da4] text-white m-auto  rounded-md hover:bg-[#286090]"
        >
          Edit
        </button>
        <button
          hidden={!hidden}
          onClick={() => {
            deleteNote(noteId);
          }}
          className="w-20 h-12 bg-[#337ab7] border-[#2e6da4] text-white m-auto rounded-md hover:bg-[#286090]"
        >
          Delete
        </button>
        {hidden && (
          <div className="w-20 h-12 flex justify-center items-center">
            <FaSearch
              className="cursor-pointer w-1/2 h-1/2 m-auto"
              onClick={() => {
                setToggleSearch(!toggleSearch);
              }}
            />
          </div>
        )}
        {toggleSearch && (
          <SearchUser
            user={userFind}
            noteId={noteId}
            accessTokenLocal={accessTokenLocal}
          />
        )}

        <button
          onClick={() => setToggleComment(!toggleComment)}
          className="w-36 h-12 bg-[#337ab7] border-[#2e6da4] text-white text-center m-auto rounded-md hover:bg-[#286090]"
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
        setViewers={setViewers}
      />

      <SharedNote
        sharedNote={sharedNote}
        setContent={setContent}
        setTitle={setTitle}
        setDisabled={setDisabled}
        // setToggleComment={setToggleComment}
        setHidden={setHidden}
        setDisableSaveButton={setDisableSaveButton}
      />
    </div>
  );
};

export default Note;
