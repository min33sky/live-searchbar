import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useRef, useState } from 'react';
import getPerson from '../api/getPerson.ts';
import useDebounce from '../hooks/useDebounce.ts';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function LiveSearch() {
  const navigate = useNavigate();

  const [input, setInput] = useState(''); // 검색어 입력
  const debounceText = useDebounce(input, 500); // input의 변경이 멈추면 500ms 후에 debounceText가 변경된다.
  const [isVisible, setIsVisible] = useState(false); // 검색 결과창 보이기 여부
  const [results, setResults] = useState<Profile[]>([]); // 검색 결과

  const [cursorIndex, setCursorIndex] = useState(-1); // 키보드 커서 위치

  const inputRef = useRef<HTMLInputElement>(null); // input에 포커스를 주기 위한 ref
  const selectedCursorRef = useRef<HTMLLIElement>(null); // 커서 위치의 스크롤 이동을 위한 ref

  /**
   * debounceText가 변경될 때마다 API를 호출한다.
   */
  const { isFetching } = useQuery({
    queryKey: ['person', debounceText],
    queryFn: () => getPerson(debounceText),
    enabled: !!debounceText && cursorIndex === -1, // 커서가 선택되면 API 호출을 중단한다.
    onSuccess: (data) => {
      setResults(data);
      setIsVisible(true);
    },
    onError: (error) => {
      console.log('Error: ', error);
    },
  });

  /**
   * 검색 결과 선택을 위한 키보드 핸들러
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!results || results.length === 0) return;

      let nextIndexCount = -1;

      switch (e.key) {
        case 'ArrowUp':
          nextIndexCount =
            cursorIndex === -1
              ? results.length - 1
              : (cursorIndex + results.length - 1) % results.length;
          break;
        case 'ArrowDown':
          nextIndexCount = (cursorIndex + 1) % results.length;
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          return;
        case 'Enter':
          navigate(`/search/${results[cursorIndex].name}`);
          return;
        case 'Escape':
          setInput('');
          setResults([]);
          break;
        default:
          // 커서를 초기화해서 API 호출을 허용한다.
          nextIndexCount = -1;
      }

      setCursorIndex(nextIndexCount);
    },
    [cursorIndex, navigate, results],
  );

  /**
   * 마운트 될 때 inputRef에 포커스를 준다.
   */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /**
   * input이 비어있으면 커서 위치를 -1로 초기화한다.
   */
  useEffect(() => {
    if (!input || input.trim() === '') {
      setCursorIndex(-1);
    }
  }, [input]);

  /**
   * 커서 위치가 변경되면 스크롤을 중앙으로 이동한다.
   */
  useEffect(() => {
    if (!selectedCursorRef.current) return;

    selectedCursorRef.current.scrollIntoView({
      block: 'center',
    });

    setInput(results?.[cursorIndex]?.name || '');
  }, [cursorIndex, results]);

  return (
    <div
      aria-label="Search Container"
      className={`relative z-50 flex w-10/12 max-w-lg items-center border-2 px-4 py-3 text-lg transition duration-300
      ${
        input
          ? 'border-slate-900 border-r-slate-800 bg-gradient-to-r from-slate-900 to-slate-800'
          : 'rounded-full border-gray-500 bg-transparent'
      }`}
    >
      <MagnifyingGlassIcon className={`h-5 w-5 flex-shrink-0 text-gray-300`} />
      <input
        ref={inputRef}
        aria-label="Search Input"
        placeholder={'검색어를 입력해 주세요'}
        className={`flex-1 truncate bg-transparent px-3 py-2 text-gray-300 outline-none`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setIsVisible(false);
        }}
        onFocus={() => {
          setIsVisible(true);
        }}
      />

      {input && isFetching && (
        <div
          aria-label="Loader"
          className={`mr-4 h-4 w-4 animate-spin rounded-full border-2 border-gray-100 border-b-blue-500`}
        />
      )}

      {input && (
        <button
          aria-label="Reset Input Button"
          onClick={() => {
            setInput('');
            setIsVisible(false);
            inputRef.current?.focus();
          }}
        >
          <XMarkIcon className={`h-5 w-5 text-gray-300`} />
        </button>
      )}

      {isVisible && results && input && (
        <ul
          aria-label="Search Result View"
          className="custom-scrollbar absolute -left-[2px] -right-[2px] top-full max-h-72 overflow-y-scroll border-0 border-t-2 border-slate-900 border-t-slate-600 bg-gradient-to-r from-slate-900 to-slate-800"
        >
          {results?.map((item, index) => (
            <li
              ref={cursorIndex === index ? selectedCursorRef : null}
              key={item.name}
              className={`my-2 flex cursor-pointer items-center justify-between rounded-md p-4 transition duration-300 hover:bg-slate-700
                          ${index === cursorIndex && 'bg-slate-700'}`}
              onClick={() => {
                setInput(item.name);
                navigate(`/search/${item.name}`);
              }}
            >
              <span className="flex items-center">
                <MagnifyingGlassIcon className={`mr-3 h-5 w-5`} />
                {item.name}
              </span>
              <span className={`truncate pl-2 text-xs font-light`}>
                {item.email}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
