"use client";

import { useRef, useState } from "react";
import classNames from "classnames";

const getNextSibling = ({
  element,
  selector,
}: {
  element: HTMLElement | null;
  selector: string;
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
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
  return sibling;
};

const getPreviousSibling = ({
  element,
  selector,
}: {
  element: HTMLElement | null;
  selector: string;
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
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.previousElementSibling;
  }
  return sibling;
};

export default function Home() {
  return (
    <p>
      <Word word="How" />
      <Word word=" " />
      <Word word="is" />
      <Word word=" " />
      <Word word="it" />
      <Word word=" " />
      <Word word="go ing" />
      <br />
      <Word word="This" />
      <Word word=" " />
      <Word word="is" />
      <Word word=" " />
      <Word word="Fun" />
    </p>
  );
}

const Word = ({ word }: { word: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState<string>(word);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const element = target.closest(".word") as HTMLElement | null;
    const prevWord = getPreviousSibling({ element, selector: ".word" });
    const nextWord = getNextSibling({ element, selector: ".word" });

    const start = target.selectionStart || 0;
    const length = target.value.length;

    if (e.key === "Delete" && start === length && nextWord) {
      // delete first character of next word
      const input = nextWord.querySelector("input");
      input?.focus();
      input?.setSelectionRange(0, 0);
    } else if (e.key === "Backspace" && start === 0 && prevWord) {
      // delete last character of previous word
      const input = prevWord.querySelector("input");
      input?.focus();
    } else if (e.key === "ArrowRight" && start === length && nextWord) {
      // jump to second character of next word
      const input = nextWord.querySelector("input");
      input?.focus();
      input?.setSelectionRange(1, 0);
    } else if (e.key === "ArrowLeft" && start === 0 && prevWord) {
      // jump to second to last character of previous word
      const input = prevWord.querySelector("input");
      input?.focus();
      input?.setSelectionRange(input.value.length, input.value.length);
    }
  };

  return (
    <span
      className="word relative inline-flex flex-col text-black h-12"
      ref={ref}
    >
      <span
        className={classNames(
          "pointer-events-none absolute top-0 bg-orange-500 h-6 whitespace-pre",
          { invisible: value === word }
        )}
      >
        {word}
      </span>
      <span className="invisible pointer-events-none whitespace-pre">
        {word}
      </span>
      <span className="invisible pointer-events-none whitespace-pre">
        {value}
      </span>
      <input
        type="text"
        className="absolute bg-green-500 bottom-0 left-0 right-0 border-none focus:outline-none bg-transparent text-inherit h-6 focus:bg-red-500"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        spellCheck={false}
      />
    </span>
  );
};
