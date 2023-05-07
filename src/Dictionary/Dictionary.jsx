import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 8px;
  margin-right: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 8px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #3e8e41;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [dictionaryData, setDictionaryData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const base_url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
      const response = await axios.get(base_url);
      setDictionaryData(response.data);
      setError(null);
    } catch (error) {
      setDictionaryData(null);
      setError("Word not found. Please try again.");
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Link to={"/latidude"}>Go to my Dictionary</Link>
      <h1>Dictionary</h1>
      <form onSubmit={handleSubmit}>
        <Input type="text" value={word} onChange={(event) => setWord(event.target.value)} />
        <Button type="submit">Search</Button>
      </form>
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      {dictionaryData && (
        <div>
          {dictionaryData.map((result) => (
            result.meanings.map((meaning) => (
              <div key={meaning.partOfSpeech}>
                <h2>{meaning.partOfSpeech}</h2>
                {meaning.definitions.map((definition, index) => (
                  <div key={index}>
                    <p>{definition.definition}</p>
                    {definition.example && <p>Example: {definition.example}</p>}
                    {definition.synonyms && <p>Synonyms: {definition.synonyms.join(", ")}</p>}
                    {definition.antonyms && <p>Antonyms: {definition.antonyms.join(", ")}</p>}
                  </div>
                ))}
                {meaning.pronunciation && (
                  <audio src={meaning.pronunciation.audio} controls></audio>
                )}
              </div>
            ))
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default Dictionary;
