import TextCorrectionV1Words from "./components/TextCorrectionV1Words";

const TextCorrectionV1 = () => {
  return (
    <div className="p-5 bg-white text-black">
      <h2 className="text-3xl font-bold">TextCorrectionV1</h2>
      <p>
        <TextCorrectionV1Words word="How" id="1" />
        <TextCorrectionV1Words word=" " id="2" />
        <TextCorrectionV1Words word="is" id="3" />
        <TextCorrectionV1Words word=" " id="4" />
        <TextCorrectionV1Words word="it" id="5" />
        <TextCorrectionV1Words word=" " id="6" />
        <TextCorrectionV1Words word="go ing" id="7" />
        <br />
        <TextCorrectionV1Words word="This" id="8" />
        <TextCorrectionV1Words word=" " id="9" />
        <TextCorrectionV1Words word="is" id="10" />
        <TextCorrectionV1Words word=" " id="11" />
        <TextCorrectionV1Words word="Fun" id="12" />
      </p>
    </div>
  );
};
export default TextCorrectionV1;
