import TextCorrectionV1Word from "./TextCorrectionV1Word";

const TextCorrectionV1Words = ({ word, id }: { word: string; id: string }) => {
  const split = word.split(/(\s)/g).filter((item) => item.length);
  return split.map((elem, i) => {
    return <TextCorrectionV1Word key={i} word={elem} id={id} />;
  });
};
export default TextCorrectionV1Words;
