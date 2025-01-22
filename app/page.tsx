"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { onKeyDown } from "./utils/onKeyDown";
import { getNextSibling } from "./utils/getNextSibling";
import { getPreviousSibling } from "./utils/getPreviousSibling";

export default function Home() {
  return (
    <p className="p-5 bg-white text-black">
      <Words word="How" id="1" />
      <Words word=" " id="2" />
      <Words word="is" id="3" />
      <Words word=" " id="4" />
      <Words word="it" id="5" />
      <Words word=" " id="6" />
      <Words word="go ing" id="7" />
      <br />
      <Words word="This" id="8" />
      <Words word=" " id="9" />
      <Words word="is" id="10" />
      <Words word=" " id="11" />
      <Words word="Fun" id="12" />
    </p>
  );
}

const Words = ({ word, id }: { word: string; id: string }) => {
  const split = word.split(/(\s)/g).filter((item) => item.length);
  return split.map((elem, i) => {
    return <Word key={i} word={elem} id={id} />;
  });
};

const Word = ({ word, id }: { word: string; id: string }) => {
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
          "left-0 right-0 original pointer-events-none absolute bottom-6 bg-orange-300 h-6 whitespace-pre",
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
