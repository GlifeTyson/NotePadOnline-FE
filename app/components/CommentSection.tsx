import { useEffect, useState } from "react";

interface CommentSectionProps {
  toggleComment: boolean;
  noteId: string;
  comments: any;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  toggleComment,
  noteId,
  comments,
}) => {
  const [commentCreate, setCommentCreated] = useState<any>([]);
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
      <div className="bg-slate-300 h-fit p-10">
        <span className="block w-4/5 bg-[#4682b4] h-1 mx-auto rounded-md"></span>
        <div>
          <h1 className="text-center">
            <u>Comments</u>
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-3/4 h-full flex flex-col justify-center items-center gap-y-6">
            {!!comments ? (
              comments.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-center border-2 border-black flex-row gap-4 w-fit h-fit"
                  >
                    <p>{index + 1}.</p>
                    <p>{value.creator}</p>
                    <p>{value.content.toLowerCase()}</p>
                  </div>
                );
              })
            ) : (
              <p>This note doesnt have comment</p>
            )}
          </div>
          <input
            className="w-[200px] rounded-md"
            value={commentCreate}
            onChange={(e) => setCommentCreated(e.target.value)}
          ></input>
          <button
            onClick={() => {
              createComment(noteId);
              //   if (comments.length == 0) {
              //     return alert("Please fill in comment");
              //   } else {
              //     // console.log("noteId:", noteId);
              //     createComment(noteId);
              //   }
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

export default CommentSection;
