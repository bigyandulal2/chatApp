import React, { useState } from "react";
import axios from "axios";

const LANGUAGES = [
  { code: "English", label: "English" },
  { code: "Spanish", label: "Spanish" },
  { code: "French", label: "French" },
  { code: "German", label: "German" },
  { code: "Chinese", label: "Chinese" },
  { code: "Arabic", label: "Arabic" },
  { code: "Japanese", label: "Japanese" },
];

export default function MessageTranslator({ text }) {
  const [showOptions, setShowOptions] = useState(false);
  const [translatedText, setTranslatedText] = useState(null);
  const [loading, setLoading] = useState(false);

  const OPENAI_API_KEY = import.meta.env.VITE_TRANSLATE_API; // **Don't expose this in prod!**

  const handleTranslate = async (langLabel) => {
    setLoading(true);
    setTranslatedText(null);

    try {
      const prompt = `Translate the following text to ${langLabel}:\n\n${text}`;

      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // Or "gpt-4" or "gpt-3.5-turbo"
          messages: [
            { role: "system", content: "You are a helpful translator." },
            { role: "user", content: prompt },
          ],
          temperature: 0.3,
          max_tokens: 200,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const translated = res.data.choices[0].message.content.trim();
      setTranslatedText(translated);
    } catch (error) {
      console.error(error);
      setTranslatedText("Translation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-1 text-sm text-gray-400">
      {!showOptions && (
        <button
          className="text-blue-400 hover:underline"
          onClick={() => setShowOptions(true)}
        >
          🈯 Translate
        </button>
      )}

      {showOptions && (
        <div className="mt-1 space-y-1">
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded"
                onClick={() => handleTranslate(lang.label)}
                disabled={loading}
              >
                {lang.label}
              </button>
            ))}
          </div>
          {loading && <div className="text-yellow-400 mt-1">Translating...</div>}
          {translatedText && (
            <div className="bg-gray-800 p-2 rounded text-green-400 mt-2 whitespace-pre-wrap">
              {translatedText}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
