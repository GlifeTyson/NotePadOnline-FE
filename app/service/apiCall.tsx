import axios from "axios";

export const createNote = async (title, content, creator) => {
  try {
    const res = await axios.post("//localhost:3000/api/diaries", {
      title,
      content,
      creator,
    });
    console.log(res.data.message);
  } catch (error) {
    console.log(error.message);
  }
};

export async function fetchNote() {
  try {
    const res = await axios.get("//localhost:3000/api/diaries");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
