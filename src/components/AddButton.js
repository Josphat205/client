import React from "react";

const AddButton = ({ name }) => {
  return (
    <button class="scale-75 text-xs py-1 px-4 hover:bg-green-900  text-green-100 rounded bg-gradient-to-r from-green-600 to-green-400  dark:hover:bg-gray-700">
      {name}
    </button>
  );
};

export default AddButton;
