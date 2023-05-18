import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import getPerson from "../api/getPerson.ts";
import useDebounce from "../hooks/useDebounce.ts";
import { useQuery } from "@tanstack/react-query";

export default function LiveSearch() {
  const [input, setInput] = useState("");
  const debounceText = useDebounce(input, 500);
  const [isVisible, setIsVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { data: results, isLoading } = useQuery({
    queryKey: ["person", debounceText],
    queryFn: () => getPerson(debounceText),
    enabled: !!debounceText,
    keepPreviousData: true,
    onSuccess: (data) => {
      console.log(data);
      setIsVisible(true);
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
      className={`relative z-50 flex w-10/12 max-w-lg items-center border-2 px-4 py-3 text-lg transition duration-300
      ${
        input
          ? "border-transparent bg-slate-900"
          : "rounded-full border-gray-500 bg-transparent"
      }`}
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
          aria-label={"Loader"}
          className={`mr-4 h-4 w-4 animate-spin rounded-full border-2 border-gray-100`}
        />
      )}

      {input && (
        <button
          onClick={() => {
            setInput("");
            setIsVisible(false);
            inputRef.current?.focus();
          }}
        >
          <XMarkIcon className={`h-5 w-5 text-gray-300`} />
        </button>
      )}
      {isVisible && results && input && (
        <ul className="absolute -left-[2px] -right-[2px] top-full border-0 border-slate-900 bg-slate-900">
          {results?.map((item) => (
            <li
              key={item.name}
              className="my-2 flex cursor-pointer items-center justify-between rounded-md p-4 transition duration-300 hover:bg-slate-700"
              onClick={() => {
                // onClose?.();
              }}
            >
              <span>{item.name}</span>
              <span className={`text-sm`}>{item.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
