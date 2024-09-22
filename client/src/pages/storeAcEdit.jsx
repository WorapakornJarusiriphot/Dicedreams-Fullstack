import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Decoding function (same as above)
const decodeId = (encodedId) => {
  return atob(encodedId);
};

const EditActivity = () => {
  const { encodedId } = useParams(); // Get encoded ID from URL

  useEffect(() => {
    const postId = decodeId(encodedId); // Decode the ID
    console.log("Decoded Post Activity ID:", postId);
    // You can now use `postId` to fetch the activity details for editing
  }, [encodedId]);

  return <div>Edit Activity Page</div>;
};

export default EditActivity;
