import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import MyNote from "./MyNote";
import SharedNote from "./SharedNote";
import CommentSection from "./CommentSection";
import Cookies from "js-cookie";
import SearchUser from "./SearchUser";

const Note = () => {
  const [user, setUser] = useState<any>([]);
  const [note, setNote] = useState<any>([]);
  const [sharedNote, setSharedNote] = useState<any>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useRouter();
  const { idUser, accessToken } = useAuth();
  // const idUser = Cookies.get("id_login");
  // const accessToken = Cookies.get("accessToken-login");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const fetchAllUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users");
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const createNote = async (title, content, creator) => {
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
      console.log(res.data.message);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log("error");
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get("//localhost:3000/api/diaries/", {
        headers: { "x-token": accessToken },
      });
      setNote(res.data);
      console.log(res.data);
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
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const filterByName = (user, setViewer, viewer) => {
    const userSearch = user.filter((user) =>
      user.email.toLowerCase().includes(viewer.toLowerCase())
    );
    setViewer(userSearch);
    console.log(viewer);
  };

  useEffect(() => {
    if (!accessToken) {
      return navigate.push("/login");
    }
    fetchNotes();
    fetchSharedNotes();
    fetchAllUser();
    // console.log(accessToken);
  }, [accessToken]);

  // console.log("viewer", viewer);

  return (
    <div className=" flex flex-col mt-10  text-[#10589b] w-full h-screen">
      <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          required
          value={title}
          placeholder="Name Title"
          onChange={(e) => setTitle(e.target.value)}
          className="≈ h-10 w-4/5 placeholder:px-4 text-justify rounded-md"
        ></input>
        <h1 className="p-3">
          <b>Content Part</b>
        </h1>
        <textarea
          className="h-80 w-4/5 rounded-md placeholder:px-4 placeholder:py-2"
          placeholder="Note Content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="flex flex-row">
        <button
          hidden={hidden}
          onClick={() => {
            createNote(title, content, idUser);
          }}
          className="w-20 bg-[#337ab7] border-[#2e6da4] text-white ml-36 mt-10 px-[6px] py-[12px] rounded-md hover:bg-[#286090]"
        >
          Save
        </button>
        <button
          hidden={!hidden}
          onClick={() => {
            // createNote(title, content, idUser);
          }}
          className="w-20 bg-[#337ab7] border-[#2e6da4] text-white ml-36 mt-10 px-[6px] py-[12px] rounded-md hover:bg-[#286090]"
        >
          Edit
        </button>
        <button
          hidden={!hidden}
          onClick={() => {
            // createNote(title, content, idUser);
          }}
          className="w-fit bg-[#337ab7] border-[#2e6da4] text-white ml-36 mt-10 px-[6px] py-[12px] rounded-md hover:bg-[#286090]"
        >
          Add Viewer
        </button>
        <SearchUser user={user} />
      </div>
      <CommentSection disabled={disabled} />
      <span className="block w-4/5 bg-[#4682b4] h-1 mx-auto rounded-md my-2"></span>
      <MyNote
        note={note}
        setTitle={setTitle}
        setContent={setContent}
        setDisabled={setDisabled}
        setHidden={setHidden}
      />
      <SharedNote sharedNote={sharedNote} />
      {/* <button
        onClick={() => {
          setDisabled(!disabled);
        }}
      >
        show Comment Section
      </button> */}
    </div>
  );
};

export default Note;
