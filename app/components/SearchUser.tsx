import React, { useState } from "react";

const SearchUser = ({ user }: any) => {
  const [viewer, setViewer] = useState<any>([]);

  function handleSearchChange(value: string) {
    // console.log("value", value);
    // filter by name
    const result = user.filter((user: any) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setViewer(result);
    console.log(viewer);
  }
  return (
    <div className="flex flex-row">
      <input
        className="w-full h-fit"
        type="text"
        onChange={(e: any) => {
          handleSearchChange(e.target.value);
        }}
      />
      {!!viewer && viewer.length > 0 ? (
        viewer.map((value, index) => {
          return (
            <div key={index}>
              <p>{value.name}</p>
            </div>
          );
        })
      ) : (
        // <p>have user</p>
        <p>Not found any user</p>
      )}
    </div>
  );
};

export default SearchUser;
