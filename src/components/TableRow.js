import React from "react";

const tableRow = ({ date, total_success, total_failed, placeHolder }) => {
  return (
    <>
      <tr className="text-center">
        <td>{date}</td>
        <td>{placeHolder ? placeHolder : total_success}</td>
        <td>{total_failed}</td>
      </tr>
    </>
  );
};

export default tableRow;
