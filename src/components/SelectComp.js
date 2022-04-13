import React from "react";
import AsyncSelect from "react-select/async";

const tableRow = ({ style, title, value, load, placeHolder, change }) => {
  return (
    <>
      <AsyncSelect
        styles={style}
        cacheOptions
        defaultOptions
        getOptionLabel={title}
        getOptionValue={value}
        loadOptions={(e) => load(e)}
        placeholder={placeHolder}
        onChange={change}
      />
    </>
  );
};

export default tableRow;
