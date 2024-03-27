import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";

const SearchUser = (
  { user, noteId }: any,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [viewer, setViewer] = useState<any>([]);
  const { accessToken } = useAuth();

  // filter by name
  function handleSearchChange(value: string) {
    const result = user.filter((user: any) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setViewer(result);
    console.log(viewer);
  }
  async function handleAddViewer(userId: string) {
    try {
      const res = await axios.patch(
        `//localhost:3000/api/diaries/${noteId}/addViewer`,
        { userId: userId },
        {
          headers: { "x-token": accessToken },
        }
      );
      if (res.status !== 200) {
        return alert(res.data.message);
      }
      alert(res.data.message);
      console.log(res.data);
      // console.log("Note id: ", noteId);
      // console.log("User id: ", userId);
      // console.log("accessToken: ", accessToken);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mt-10 flex items-center gap-5 w-3/6">
      <p>Find User</p>
      <input
        className="w-2/5 border-2 border-[#2e6da4] rounded-md"
        type="text"
        placeholder="Username"
        onChange={(e: any) => {
          handleSearchChange(e.target.value);
        }}
      />
      <div className="w-[215px] border-2 border-[#2e6da4] rounded-md flex justify-start items-center gap-5 overflow-x-auto">
        {!!viewer && viewer.length > 0 ? (
          viewer.map((value, index) => {
            return (
              <div key={index} className="text-center w-[100px]">
                <p>{value.name}</p>
                <button
                  onClick={() => {
                    handleAddViewer(value._id);
                  }}
                  className="w-24 h-6 text-white rounded-md bg-[#337ab7] hover:bg-[#286090]"
                >
                  Add viewer
                </button>
              </div>
            );
          })
        ) : (
          <p className="w-fit">User not found</p>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
