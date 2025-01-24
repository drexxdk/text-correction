import { RefObject, useRef, useState } from "react";

const TextCorrectionV2 = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="p-5 bg-white text-black">
      <h2 className="text-3xl font-bold">TextCorrectionV2</h2>
      <div onClick={(e) => onClick({ e, inputRef })} className="relative">
        <input
          type="text"
          ref={inputRef}
          className="absolute border-black border bg-pink-500 invisible z-10"
        />
        <p>
          <TextCorrectionV2Words word="How" id="1" />
          <TextCorrectionV2Words word=" " id="2" />
          <TextCorrectionV2Words word="is" id="3" />
          <TextCorrectionV2Words word=" " id="4" />
          <TextCorrectionV2Words word="it" id="5" />
          <TextCorrectionV2Words word=" " id="6" />
          <TextCorrectionV2Words word="go ing" id="7" />
        </p>
        <p>&nbsp;</p>
        <p>
          <TextCorrectionV2Words word="This" id="8" />
          <TextCorrectionV2Words word=" " id="9" />
          <TextCorrectionV2Words word="is" id="10" />
          <TextCorrectionV2Words word=" " id="11" />
          <TextCorrectionV2Words word="Fun" id="12" />
        </p>
      </div>
    </div>
  );
};
export default TextCorrectionV2;

const onClick = ({
  e,
  inputRef,
}: {
  e: React.MouseEvent<HTMLDivElement>;
  inputRef: RefObject<HTMLInputElement | null>;
}) => {
  if (!inputRef.current) {
    return;
  }
  const target = e.target as HTMLElement;
  const id = target.dataset.id;
  const type = target.dataset.type as "whitespace" | "word";

  console.log("onClick", target, id, type);
  if (id && type) {
    switch (type) {
      case "word":
        return inputRef.current.classList.add("!visible");
      case "whitespace":
        return inputRef.current.classList.add("!visible");
      default:
        break;
    }
  }
  inputRef.current.classList.remove("!visible");
};

const TextCorrectionV2Words = ({ word, id }: { word: string; id: string }) => {
  const split = word.split(/(\s)/g).filter((item) => item.length);
  return split.map((elem, i) => {
    return (
      <TextCorrectionV2Word
        key={i}
        word={elem}
        id={id}
        type={word === " " ? "whitespace" : "word"}
      />
    );
  });
};

const TextCorrectionV2Word = ({
  word,
  id,
  type,
}: {
  word: string;
  id: string;
  type: "word" | "whitespace";
}) => {
  return (
    <span data-type={type} data-id={id} className="relative">
      {word}
    </span>
  );
};
