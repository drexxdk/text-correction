import { getNextSibling } from "./getNextSibling";
import { getPreviousSibling } from "./getPreviousSibling";

export const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  const element = target.closest(".word") as HTMLElement | null;

  const prevWordIncludeEmpty = getPreviousSibling({
    element,
    selector: ".word",
    includeEmpty: true,
  });
  const nextWordIncludeEmpty = getNextSibling({
    element,
    selector: ".word",
    includeEmpty: true,
  });

  const prevWordExcludeEmpty = getPreviousSibling({
    element,
    selector: ".word",
    includeEmpty: false,
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
