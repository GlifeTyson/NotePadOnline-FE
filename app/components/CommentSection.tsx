import React from "react";

type CommentSectionProps = {
  disabled: boolean;
};
const CommentSection = (props: CommentSectionProps) => {
  if (props.disabled === true) {
    return (
      <div className="text-center mx-auto">
        <h1>
          <u>Comment Section</u>
        </h1>
        <input type="text" width={500} />
      </div>
    );
  }
  return (
    <div className="mx-auto text-[14px] mt-4">
      <p>Comment has not been triggered</p>
    </div>
  );
};

export default CommentSection;
