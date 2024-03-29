import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

interface SharedNoteProps {
  sharedNotes: any;
  colorIndex: number;
  selected: boolean;
  setSelect: React.Dispatch<React.SetStateAction<boolean>>;
  setColorIndex: React.Dispatch<React.SetStateAction<number>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setDisableSaveButton: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setComments: React.Dispatch<React.SetStateAction<any>>;
}

const SharedNote: React.FC<SharedNoteProps> = ({
  sharedNotes,
  colorIndex,
  selected,
  setSelect,
  setColorIndex,
  setTitle,
  setContent,
  setDisabled,
  setHidden,
  setDisableSaveButton,
  setToggleSearch,
  setComments,
}) => {
  const fetchCommentByUser = async (
    id: string,
    accessTokenLocal: string,
    setComments: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
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
      console.log(result);
      setComments(result.comments);
      // // console.log(result.comments);
      // setComment(res.data.data.comments);
    } catch (error) {
      console.log(error);
    }
  };
  // const [colorIndex, setColorIndex] = useState<number>(-1);
  const { accessToken } = useAuth();
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

  const getNote = async () => {
    try {
      const res = await axios.get(`//localhost:3000/api/diaries/shared`, {
        headers: { "x-token": accessTokenLocal },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-300 h-fit p-10">
      <span className="block w-4/5 bg-[#4682b4] h-1 mx-auto rounded-md"></span>
      <div>
        <h1 className="text-center">
          <u>Shared Notes</u>
        </h1>
        <div className="flex flex-row w-full justify-center items-center gap-10">
          {!!sharedNotes && sharedNotes.length > 0 ? (
            sharedNotes.map((value: any, index: number) => {
              return (
                <div
                  className="flex items-center justify-center gap-1"
                  key={index}
                >
                  <a
                    className={
                      selected || index !== colorIndex
                        ? "text-sm cursor-pointer"
                        : "underline text-sm cursor-pointer "
                    }
                    onClick={() => {
                      setColorIndex(index);
                      setSelect(false);
                      getNote();
                      fetchCommentByUser(
                        value._id,
                        accessTokenLocal,
                        setComments
                      );
                      setTitle(value.title);
                      setContent(value.content);
                      setDisabled(true);
                      setHidden(false);
                      setDisableSaveButton(true);
                      setToggleSearch(false);
                    }}
                  >
                    {value.title}
                  </a>
                </div>
              );
            })
          ) : (
            <p className="text-[12px]">Not have any shared note yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedNote;
