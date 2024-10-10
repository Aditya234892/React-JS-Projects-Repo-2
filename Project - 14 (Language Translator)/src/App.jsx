import "regenerator-runtime/runtime";
import { useState, useCallback, useRef, useEffect } from "react";
import "./App.css";
import Options from "./components/Options";
import languages from "./assets/Languages";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



function App() {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const passRef = useRef(null);

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return null
  }

  const handleTranslateBtn = async () => {
    console.log(sourceLang, targetLang);
    const apiKey = "56603882bfmsh80493bea8d04405p14c6c5jsn8126bae4ac53";
    const headers = {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "text-translator2.p.rapidapi.com",
      "content-type": "application/x-www-form-urlencoded",
    };
    const url = "https://text-translator2.p.rapidapi.com/translate";
    const data = {
      source_language: sourceLang,
      target_language: targetLang,
      text: sourceText,
    };

    try {
      const response = await axios.post(url, data, { headers });
      const result = await response.data;
      console.log(result);
      setTargetText(result.data.translatedText);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSourceLangChange = (e) => {
    setSourceLang(e.target.value);
  };

  const handleTargetLangChange = (e) => {
    setTargetLang(e.target.value);
  };

  const handleSourceTextChange = (e) => {
    setSourceText(e.target.value);
  };

  const handleTargetTextChange = (e) => {
    setTargetText(e.target.value);
  };

  // console.log(targetText)

  const handleSpeechBtnClick = (text) => {
    const speech = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speech.getVoices();
    const selectedVoice = voices.find(voice => voice.name === 'Microsoft Mark - English (United States)');
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    speech.speak(utterance);
    console.log("Speaking: ", text);
  };
  
  // console.log(window.speechSynthesis.getVoices());

  const handleCopyBtn = useCallback( () => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(targetText);
  }, [targetText])

  // const handleMicBtn = () => {
  //   if (isListening) {
  //     SpeechRecognition.stopListening(); 
  //     setIsListening(false); 
  //   } else {
  //     SpeechRecognition.startListening({ continuous: true });
  //     setIsListening(true);
  //   }
  // };
  
  
  // useEffect(() => {
  //   if (isListening) {
  //     console.log("Listening started");
  //   } else {
  //     console.log("Listening stopped");
  //   }
  // }, [isListening]);
  
  return (
    <div className="bg-red-300 w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-10/12 bg-indigo-400 rounded-3xl p-">
        <div className="bg-red-400 h-24 flex rounded-3xl rounded-bl-none rounded-br-none text-white text-xl font-semibold">
          <div className="w-[50%] h-full flex rounded-3xl">
            <Options
              languages={languages}
              handleChange={handleSourceLangChange}
              selectedLang={sourceLang}
            />
          </div>
          <div className="w-[50%] h-full flex rounded-3xl">
            <Options
              languages={languages}
              handleChange={handleTargetLangChange}
              selectedLang={targetLang}
            />
          </div>
        </div>
        <div className="border-2 border-red-200 w-full h-96 flex">
          <textarea
            className="w-[50%] resize-none text-2xl px-3 py-2 text-red-900 border-2"
            value={sourceText}
            onChange={handleSourceTextChange}
            placeholder="Write text you want to Translate"
          ></textarea>
          <textarea
            className="w-[50%] resize-none px-3 py-2 text-2xl text-blue-900 border-2"
            readOnly
            value={targetText}
            onChange={handleTargetTextChange}
            placeholder="....Translated Text"
            ref={passRef}
          ></textarea>
        </div>
        <div className="w-full bg-white flex justify-around py-2">
          <div className="flex gap-x-8 text-2xl text-gray-500 ">
            {/* <button onClick={handleMicBtn}>
            <i className="hover:text-black  hover:cursor-pointer  duration-300 fa-solid fa-microphone active:text-purple-900 active:scale-90"></i></button> */}
            <button onClick={() => {
                handleSpeechBtnClick(sourceText);
              }}>
            <i className="hover:text-black  hover:cursor-pointer  duration-300 fa-solid fa-volume-high active:text-purple-900 active:scale-90"></i></button>
          </div>
          <div className="flex gap-x-8 text-2xl text-gray-500 ">
            <button onClick={() => {handleSpeechBtnClick(targetText)}}>
            <i className="hover:text-black  hover:cursor-pointer  duration-300 fa-solid fa-volume-high active:text-purple-900 active:scale-90"></i></button>
            <button onClick={handleCopyBtn}>
            <i className="hover:text-black  hover:cursor-pointer  duration-300 fa-solid fa-copy active:text-purple-900 active:scale-90"></i>
            </button>
          </div>
        </div>
        <div className="w-full text-center my-3">
          <button
            className="bg-violet-600 px-5 py-2 text-white font-semibold rounded-xl active:scale-90 active:bg-indigo-400 active:text-blue-900 text-lg duration-200"
            onClick={handleTranslateBtn}
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
