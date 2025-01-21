"use client";

import { useEffect, useRef, useState } from "react";
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
    <p className="p-5 bg-white text-black">
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

const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  const element = target.closest(".word") as HTMLElement | null;
  const prevWord = getPreviousSibling({ element, selector: ".word" });
  const nextWord = getNextSibling({ element, selector: ".word" });

  const start = target.selectionStart || 0;
  const length = target.value.length;

  if (e.code === "Space") {
    // ignore spacebar unless within a word
    const prevChar =
      target.selectionStart !== null && target.selectionStart > 0
        ? target.value.charAt(target.selectionStart - 1)
        : null;
    const nextChar =
      target.selectionStart !== null &&
      target.selectionStart < target.value.length
        ? target.value.charAt(target.selectionStart)
        : null;
    if (
      prevChar === " " ||
      nextChar === " " ||
      prevChar === null ||
      nextChar === null
    ) {
      e.preventDefault();
    }
  } else if (e.key === "Delete" && start === length && nextWord) {
    // delete first character of next word
    const input = nextWord.querySelector("input");
    input?.focus();
    input?.setSelectionRange(0, 0);
  } else if (e.key === "Backspace" && start === 0 && prevWord) {
    // delete last character of previous word
    const input = prevWord.querySelector("input");
    input?.focus();
    input?.setSelectionRange(input.value.length, input.value.length);
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

const Word = ({ word }: { word: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState<string>(word);

  useEffect(() => {
    if (value === "" && word === " ") {
      const prevWord = getPreviousSibling({
        element: ref.current,
        selector: ".word",
      })?.querySelector(".original");
      if (prevWord) {
        (prevWord as HTMLElement).style.visibility = "visible";
      }
      const nextWord = getNextSibling({
        element: ref.current,
        selector: ".word",
      })?.querySelector(".original");
      if (nextWord) {
        (nextWord as HTMLElement).style.visibility = "visible";
      }
    }
  }, [value, word]);

  return (
    <span
      className="word relative inline-flex items-end flex-col h-16"
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
        className="absolute bottom-0 left-0 right-0 border-none focus:outline-none text-inherit h-6"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        value={value}
        spellCheck={false}
      />
    </span>
  );
};
