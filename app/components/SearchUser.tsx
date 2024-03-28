import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

const SearchUser = ({ user, noteId, accessTokenLocal }: any) => {
  const [viewer, setViewer] = useState<any>([]);

  // filter by name without creator
  function handleSearchChange(value: string) {
    const result = user.filter((user: any) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setViewer(result);
  }

  async function handleAddViewer(userId: string) {
    try {
      const res = await axios.patch(
        `//localhost:3000/api/diaries/${noteId}/addViewer`,
        { userId: userId },
        {
          headers: { "x-token": accessTokenLocal },
        }
      );
      if (res.status !== 200) {
        return alert(res.data.message);
      }
      alert(res.data.message);
      // console.log(noteId);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-slate-300 flex items-center gap-5 w-1/3">
      <p>Find User</p>
      <input
        className="w-[100px] border-2 border-[#2e6da4] rounded-md"
        type="text"
        placeholder="Username"
        onChange={(e: any) => {
          handleSearchChange(e.target.value);
        }}
      />
      <div className="w-32 border-2 border-[#2e6da4] rounded-md flex justify-start items-center gap-5 overflow-x-auto">
        {!!viewer && viewer.length > 0 ? (
          viewer.map((value, index) => {
            return (
              <div key={index} className="text-center w-[100px]">
                <p>{value.name}</p>
                {/* <p>{value.id}</p> */}
                <button
                  onClick={() => {
                    handleAddViewer(value.id);
                    // console.log(value);
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
