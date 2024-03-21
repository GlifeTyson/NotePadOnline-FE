import React from "react";

type CommentSectionProps = {
  disabled: boolean;
};
const CommentSection = (props: CommentSectionProps) => {
  if (props.disabled === true) {
    return (
      <div className="text-center mx-auto mt-2 w-full">
        <span className="block w-4/5 bg-[#4682b4] h-1 mx-auto rounded-md my-2"></span>
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
