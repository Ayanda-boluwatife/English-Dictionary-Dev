import React, { useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';


const PracticeDictionary = () => {
  const [word, setWord] = useState("");
  const [information, setInformation] = useState();
  const [error, setError] = useState();
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!word) {
      setError("Please enter a word");
      return;
    }

    try {

      const api_url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

      const response = await axios.get(api_url);
      setInformation(response.data)
      setError(null)
      
    } catch (error) {
      setError("Bad internet connection please try again");
      setInformation(null);
      console.error(error)
    }

  }

  return (
    <div>
      {/* <Link to={'/'}>Go to Home</Link> */}
      <div>
        <form action="" onSubmit={handleSubmit}>
          <input 
          type="search" 
          value={word}
          onChange={(e) => setWord(e.target.value)}
          id="" />
          <button type="submit">Search</button>
        </form>
        {error && (<p>{error}</p>)}
        <div className="information">
          {
            information && (
              <div className="dictionary-details">
                {
                  information.map((define) => (
                    <div>
                      <div>
                        <h3>Word: {define.word}</h3>
                        <h3>Phonetic: {define.phonetic}</h3>
                      </div>
                      {
                        define.meanings.map((meaning, index)=>(
                          <div key={index}>
                            <h3>PartOfSpeech:{meaning.partOfSpeech}</h3>
                            {
                              meaning.definitions.map((definition)=>(
                                <div>
                                  <h4>Definition: {definition.definition}</h4>
                                  {definition.example && (<p>Example: {definition.example}</p>)}
                                  {definition.synonyms && (<p>Synonyms: {definition.synonyms.join(", ")}</p>)}
                                  {definition.antonyms && (<p>Antonyms: {definition.antonyms.join(", ")}</p>)}
                                </div>
                              ))
                            }
                          </div>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
    // catch (error) {
    // if (error.response) {
    //   // The request was made and the server responded with a status code
    //   // that falls out of the range of 2xx
    //   setError(`Server Error: ${error.response.status}`);
    // } else if (error.request) {
    //   // The request was made but no response was received
    //   setError("Network Error. Please try again.");
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   setError("Unexpected Error. Please try again.");
    // }
  )
}

export default PracticeDictionary