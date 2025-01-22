"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

const getNextSibling = ({
  element,
  selector,
  includeEmpty,
}: {
  element: HTMLElement | null;
  selector: string;
  includeEmpty: boolean;
}) => {
  if (!element) {
    return null;
  }
  // Get the next sibling element
  let sibling = element.nextElementSibling;
  if (!selector) return sibling;

  // If the sibling matches our selector, use it
  // If not, jump to the next sibling and continue the loop
  while (sibling) {
    if (sibling.matches(selector)) {
      if (includeEmpty) {
        return sibling;
      } else if (sibling.querySelector("input")?.value !== "") {
        return sibling;
      }
    }
    sibling = sibling.nextElementSibling;
  }
  return sibling;
};

const getPreviousSibling = ({
  element,
  selector,
  includeEmpty,
}: {
  element: HTMLElement | null;
  selector: string;
  includeEmpty: boolean;
}) => {
  if (!element) {
    return null;
  }
  // Get the next sibling element
  let sibling = element.previousElementSibling;

  // If there's no selector, return the first sibling
  if (!selector) return sibling;

  // If the sibling matches our selector, use it
  // If not, jump to the next sibling and continue the loop
  while (sibling) {
    if (sibling.matches(selector)) {
      if (includeEmpty) {
        return sibling;
      } else if (sibling.querySelector("input")?.value !== "") {
        return sibling;
      }
    }
    sibling = sibling.previousElementSibling;
  }
  return sibling;
};

export default function Home() {
  return (
    <p className="p-5 bg-white text-black">
      <Word word="How" id="1" />
      <Word word=" " id="2" />
      <Word word="is" id="3" />
      <Word word=" " id="4" />
      <Word word="it" id="5" />
      <Word word=" " id="6" />
      <Word word="go ing" id="7" />
      <br />
      <Word word="This" id="8" />
      <Word word=" " id="9" />
      <Word word="is" id="10" />
      <Word word=" " id="11" />
      <Word word="Fun" id="12" />
    </p>
  );
}

const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  const element = target.closest(".word") as HTMLElement | null;

  const prevWordIncludeEmpty = getPreviousSibling({
    element,
    selector: ".word",
    includeEmpty: true,
  });
  const prevWordExcludeEmpty = getPreviousSibling({
    element,
    selector: ".word",
    includeEmpty: false,
  });

  const nextWordIncludeEmpty = getNextSibling({
    element,
    selector: ".word",
    includeEmpty: true,
  });
  const nextWordExcludeEmpty = getNextSibling({
    element,
    selector: ".word",
    includeEmpty: false,
  });

  const start = target.selectionStart || 0;
  const length = target.value.length;

  if (e.key === "Delete") {
    if (start === length && nextWordExcludeEmpty) {
      const input = nextWordExcludeEmpty.querySelector("input");
      input?.focus();
      input?.setSelectionRange(0, 0);
    }
  } else if (e.key === "Backspace") {
    if (start === 0 && prevWordExcludeEmpty) {
      const input = prevWordExcludeEmpty.querySelector("input");
      input?.focus();
      input?.setSelectionRange(input.value.length, input.value.length);
    }
  } else if (e.key === "ArrowRight") {
    if (start === length && nextWordExcludeEmpty) {
      const input = nextWordExcludeEmpty.querySelector("input");
      input?.focus();
      input?.setSelectionRange(1, 1);
      e.preventDefault();
    }
  } else if (e.key === "ArrowLeft") {
    if (start === 0 && prevWordExcludeEmpty) {
      const input = prevWordExcludeEmpty.querySelector("input");
      input?.focus();
      input?.setSelectionRange(input.value.length - 1, input.value.length - 1);
    }
  } else {
    const prevChar =
      target.selectionStart !== null && target.selectionStart > 0
        ? target.value.charAt(target.selectionStart - 1)
        : null;
    const nextChar =
      target.selectionStart !== null &&
      target.selectionStart < target.value.length
        ? target.value.charAt(target.selectionStart)
        : null;

    if (e.code === "Space") {
      if (
        prevChar === " " ||
        nextChar === " " ||
        (prevWordIncludeEmpty === null && target.selectionStart === 0) ||
        (nextWordIncludeEmpty === null &&
          target.selectionStart === target.value.length)
      ) {
        e.preventDefault();
      } else {
        if (
          prevChar === null &&
          element?.querySelector(".original span")?.innerHTML !== " "
        ) {
          if (
            prevWordIncludeEmpty?.querySelector(".original span")?.innerHTML ===
            " "
          ) {
            const prevInput = prevWordIncludeEmpty?.querySelector("input");
            if (prevInput?.value === "") {
              prevInput?.focus();
            } else {
              e.preventDefault();
            }
          }
        } else if (
          nextChar === null &&
          element?.querySelector(".original span")?.innerHTML !== " "
        ) {
          if (
            nextWordIncludeEmpty?.querySelector(".original span")?.innerHTML ===
            " "
          ) {
            const nextInput = nextWordIncludeEmpty?.querySelector("input");
            if (nextInput?.value === "") {
              nextInput?.focus();
            } else {
              e.preventDefault();
            }
          }
        }
      }
    } else if (
      prevChar === " " &&
      nextWordExcludeEmpty &&
      target.selectionStart !== null &&
      target.selectionStart - 1 === 0
    ) {
      const input = nextWordExcludeEmpty.querySelector("input");
      input?.focus();
      input?.setSelectionRange(0, 0);
    } else if (
      nextChar === " " &&
      prevWordExcludeEmpty &&
      target.selectionStart !== null &&
      target.selectionStart + 1 === target.value.length
    ) {
      const input = prevWordExcludeEmpty.querySelector("input");
      input?.focus();
      input?.setSelectionRange(input.value.length, input.value.length);
    }
  }
};

const Word = ({ word, id }: { word: string; id: string }) => {
  const split = word.split(/(\s)/g).filter((item) => item.length);
  return split.map((elem, i) => {
    return <SplitWord key={i} word={elem} id={id} />;
  });
};

const SplitWord = ({ word, id }: { word: string; id: string }) => {
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
          input.style.backgroundColor = "red";
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
          /** inline-flex justify-center */
          "left-0 right-0 original pointer-events-none absolute bottom-6 bg-orange-500 h-6 whitespace-pre",
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
        className="focus:bg-gray-300 absolute bottom-0 left-0 right-0 border-none focus:outline-none text-inherit h-6"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        value={value}
        spellCheck={false}
      />
    </span>
  );
};
