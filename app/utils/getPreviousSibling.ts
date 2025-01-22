export const getPreviousSibling = ({
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
