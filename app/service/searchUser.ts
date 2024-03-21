export const filterByEmail = (user:any[],setViewer:React.Dispatch<React.SetStateAction<any[]>>,viewer:string) => {
    const userSearch = user.filter((user) =>
      user.email.toLowerCase().includes(viewer.toLowerCase())
    );
    setViewer(userSearch);
};


// const filterByName = () => {
//     const roomSearch = duplicateRoom.filter((duplicateRoom) =>
//       duplicateRoom.name.toLowerCase().includes(roomName.toLowerCase())
//     );
//     setRoom(roomSearch);
//   };