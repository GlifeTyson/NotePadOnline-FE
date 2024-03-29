import React, { useEffect, useState } from "react";
import MyNote from "./MyNote";
import SharedNote from "./SharedNote";
import CommentSection from "./CommentSection";

interface Props {
  noteId: string;
  comment: any;
  toggleComment: boolean;
  notes: any;
  sharedNotes: any;
  setToggleSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setNoteId: React.Dispatch<React.SetStateAction<string>>;
  setDisableSaveButton: React.Dispatch<React.SetStateAction<boolean>>;
  setViewers: React.Dispatch<React.SetStateAction<any>>;
}
const ParentComponent: React.FC<Props> = ({
  noteId,
  // comment,
  toggleComment,
  sharedNotes,
  notes,
  setTitle,
  setContent,
  setDisabled,
  setHidden,
  setNoteId,
  setDisableSaveButton,
  setViewers,
  setToggleSearch,
}) => {
  const [colorIndex, setColorIndex] = useState<number>(-1);
  const [comments, setComments] = useState<any>([]);
  const [selected, setSelect] = useState<boolean>(false);
  useEffect(() => {
    // console.log(1111, comments);
  }, [comments]);
  return (
    <div>
      <CommentSection
        toggleComment={toggleComment}
        noteId={noteId}
        comments={comments}
      />
      <MyNote
        notes={notes}
        noteId={noteId}
        setTitle={setTitle}
        setContent={setContent}
        setDisabled={setDisabled}
        setHidden={setHidden}
        setNoteId={setNoteId}
        toggleComment={toggleComment}
        setDisableSaveButton={setDisableSaveButton}
        setViewers={setViewers}
        setComments={setComments}
        colorIndex={colorIndex}
        setColorIndex={setColorIndex}
        selected={selected}
        setSelect={setSelect}
      />

      <SharedNote
        sharedNotes={sharedNotes}
        setContent={setContent}
        setTitle={setTitle}
        setDisabled={setDisabled}
        setToggleSearch={setToggleSearch}
        setHidden={setHidden}
        setDisableSaveButton={setDisableSaveButton}
        setComments={setComments}
        colorIndex={colorIndex}
        setColorIndex={setColorIndex}
        selected={selected}
        setSelect={setSelect}
      />
    </div>
  );
};

export default ParentComponent;
