import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

interface SearchProps {
  userFind: any;
  noteId: string;
  accessTokenLocal: string;
}
const SearchUser: React.FC<SearchProps> = ({
  userFind,
  noteId,
  accessTokenLocal,
}) => {
  const [viewer, setViewer] = useState<any>([]);

  // filter by name without creator
  function handleSearchChange(value: string) {
    const result = userFind.filter((user: any) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setViewer(result);
    console.log("viewer:", viewer);
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
      // window.location.reload();
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
      <div className="w-32 border-2 border-[#2e6da4] rounded-md flex justify-stretch items-center gap-5 overflow-x-auto">
        {!!viewer && viewer.length > 0 ? (
          viewer.map((value: any, index: number) => {
            return (
              <div key={index - 1} className="text-center w-[100px]">
                <p>{value.name}</p>
                <button
                  onClick={() => {
                    handleAddViewer(value.id);
                  }}
                  className="w-24 h-6 text-white rounded-md bg-[#337ab7] hover:bg-[#286090]"
                >
                  Add viewer
                </button>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="text-center text-[12px]">Already shared</p>
            <p className="text-center text-[12px]">Not found user</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
