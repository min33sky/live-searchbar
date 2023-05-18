import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import getPerson from "../api/getPerson.ts";
import useDebounce from "../hooks/useDebounce.ts";
import { useQuery } from "@tanstack/react-query";

export default function LiveSearch() {
  const [input, setInput] = useState("");
  const debounceText = useDebounce(input, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isLoading } = useQuery({
    queryKey: ["person", debounceText],
    queryFn: () => getPerson(debounceText),
    enabled: !!debounceText,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log("Error: ", error);
    },
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className={`relative z-50 flex w-10/12 max-w-lg items-center rounded-full border-2 border-gray-500 px-4 py-3 text-lg transition duration-300 
      ${input ? "border-transparent bg-slate-900" : "bg-transparent"}`}
    >
      <MagnifyingGlassIcon className={`h-5 w-5 flex-shrink-0 text-gray-300`} />
      <input
        ref={inputRef}
        placeholder={"검색어를 입력해 주세요"}
        className={`flex-1 truncate bg-transparent px-3 py-2 text-gray-300 outline-none`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => {
          console.log("focus");
        }}
      />

      {input && isLoading && (
        <div
          className={`h-4 w-4 animate-spin rounded-full border-2 border-gray-100`}
        />
      )}

      {input && (
        <button
          onClick={() => {
            setInput("");
            inputRef.current?.focus();
          }}
        >
          <XMarkIcon className={`h-5 w-5 text-gray-300`} />
        </button>
      )}
    </div>
  );
}
