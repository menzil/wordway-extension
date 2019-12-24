import React from "react";
import { Select } from "@duik/it";

import options from "./options";

const SelectTranslateEngine = ({ activeOption, ...rest }: any) => {
  const activeOptionIndex = options.findIndex(v => v.value === activeOption);
  const nextActiveOption = activeOptionIndex >= 0 ? options[activeOptionIndex] : options[0];
  return (
    <Select
      activeOption={nextActiveOption}
      options={options}
      placeholder="Action"
      position="bottomRight"
      {...rest}
    />
  );
};

export default SelectTranslateEngine;
