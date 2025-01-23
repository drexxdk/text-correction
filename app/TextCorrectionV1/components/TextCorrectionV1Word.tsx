import classNames from "classnames";
import { useRef, useState, useEffect } from "react";
import { getNextSibling } from "../utils/getNextSibling";
import { getPreviousSibling } from "../utils/getPreviousSibling";
import { onKeyDown } from "../utils/onKeyDown";

const TextCorrectionV1Word = ({ word, id }: { word: string; id: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState<string>(word);

  useEffect(() => {
    if (word === " ") {
      const prevWord = getPreviousSibling({
        element: ref.current,
        selector: ".word",
        includeEmpty: false,
      })?.querySelector(".original");
      const nextWord = getNextSibling({
        element: ref.current,
        selector: ".word",
        includeEmpty: false,
      })?.querySelector(".original");
      const input = ref.current?.querySelector("input");
      if (value === "") {
        if (input) {
          input.classList.add("bg-red-300");
        }
        if (prevWord) {
          (prevWord as HTMLElement).style.visibility = "visible";
        }
        if (nextWord) {
          (nextWord as HTMLElement).style.visibility = "visible";
        }
      } else {
        if (input) {
          input.style.backgroundColor = "";
        }
        if (prevWord) {
          (prevWord as HTMLElement).style.visibility = "";
        }
        if (nextWord) {
          (nextWord as HTMLElement).style.visibility = "";
        }
      }
    }
  }, [value, word]);

  return (
    <span
      className="word relative inline-flex items-end flex-col h-16"
      data-id={id}
      ref={ref}
    >
      <span
        className={classNames(
          "left-0 right-0 original pointer-events-none absolute bottom-6 bg-orange-300 h-6 whitespace-pre select-none",
          { invisible: value === word }
        )}
      >
        <span>{word}</span>
      </span>
      <span className="invisible pointer-events-none whitespace-pre h-0">
        {word}
      </span>
      <span className="invisible pointer-events-none whitespace-pre h-0">
        {value}
      </span>
      <input
        type="text"
        className={classNames(
          "absolute bottom-0 left-0 right-0 border-none focus:outline-none text-inherit h-6",
          { "focus:bg-gray-200": value.length }
        )}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        value={value}
        spellCheck={false}
      />
    </span>
  );
};
export default TextCorrectionV1Word;
