import { Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";

interface Props {
  placeholder?: string;
  size?: string;
  onChange?: (value: string) => void;
}
const Search = ({
  placeholder = "Search",
  size = "438px",
  onChange,
}: Props) => {
  return (
    <Input
      placeholder={placeholder}
      className="search-input"
      style={{
        width: size,
        height: "48px",
        borderRadius: "12px",
        backgroundColor: "#ededed",
        marginTop: "-6px",
      }}
      onChange={(e) => onChange?.(e.target.value)}
      suffix={
        <SearchOutlined style={{ fontSize: "28px", marginRight: "5px" }} />
      }
    />
  );
};

export default Search;
