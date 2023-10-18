"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { usePathname } from "next/navigation";

interface Props {
  searchProducts: (formData: FormData) => void;
}

const SearchInput = ({ searchProducts }: Props) => {
  const [searchQueryInput, setSearchQueryInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName !== "/search") {
      setSearchQueryInput("");
      setIsTyping(false);
    }
  }, [pathName]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchQueryInput(inputValue);
    setIsTyping(inputValue.length > 0);
  };

  const handleOnClick = () => {
    setSearchQueryInput("");
    setIsTyping(false);
  };

  return (
    <form action={searchProducts}>
      <div className="form-control flex flex-row gap-2">
        <input
          name="searchQuery"
          placeholder="Search"
          value={searchQueryInput}
          onChange={(e) => handleOnChange(e)}
          className="input input-bordered w-full min-w-[100px]"
        />
        {isTyping && (
          <AiOutlineClose
            className="m-auto cursor-pointer text-xl text-black duration-300 ease-in-out"
            onClick={handleOnClick}
          />
        )}
      </div>
    </form>
  );
};

export default SearchInput;
