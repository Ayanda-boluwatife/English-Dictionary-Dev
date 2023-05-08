import React from 'react'
import styled from 'styled-components';
import {BsFillPlayFill} from 'react-icons/bs'

const DataWord = ({ dictionaryData }) => {
  return (
    <Meaning>
          {
            dictionaryData && (
              <div className="dictionary-details">
                {
                  dictionaryData.map((define) => (
                    <div>
                        <div className='enclosure'>
                          <div className='one'>
                            <h1>Word: {define.word}</h1>
                            <h3>Phonetic: {define.phonetic}</h3>
                          </div>
                          <div>
                            {define.phonetics && define.phonetics.length > 0 && (
                              <div>
                                {
                                  define.phonetics.map((phonics) => (
                                    <div>
                                      {
                                        phonics.audio && phonics.audio.length > 0 && (
                                          <audio src={phonics.audio} controls>
                                          <BsFillPlayFill />
                                          </audio>
                                        )
                                      }
                                    </div>
                                  ))
                                }
                              </div>
                            )}
                          </div>
                        </div>
                      {
                        define.meanings.map((meaning, index)=>(
                          <Knowledge key={index}>
                            <h3>Part Of Speech: {meaning.partOfSpeech}</h3>
                            <p>Meaning</p>
                            {
                              meaning.definitions.map((definition)=>(
                                <Definition>
                                  <ul>
                                    <li>Definition: {definition.definition}</li>
                                  </ul>
                                  {definition.example && <p>Example: {definition.example}</p>}
                                  {definition.synonyms && definition.synonyms.length > 0 && (
                                    <Synonyms>
                                      Synonyms:
                                      {definition.synonyms.map((synonym, index) => (
                                        <p key={index}>{synonym}, </p>
                                      ))}
                                    </Synonyms>
                                  )}
                                  {definition.antonyms && definition.antonyms.length > 0 && (
                                    <Antonyms>
                                      Antonyms:
                                      {definition.antonyms.map((antonym, index) => (
                                        <p key={index}>{antonym}, </p>
                                      ))}
                                    </Antonyms>
                                  )}
                                </Definition>
                              ))
                            }
                          </Knowledge>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            )
          }
    </Meaning>
  )
}
const Meaning = styled.div`
    
  .enclosure{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
  }
  .dictionary-details{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .one{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .one h1{
    color: var(--placeholder);
  }
  .one h3{
    color: var(--primary);
  }
@media screen and (max-width: 950px){
  .enclosure {
     flex-direction: column;
     gap: 10px;
   }
   .one{
    flex-direction: row;
    Justify-content: space-between;
   }
}
`;
const Definition = styled.div`

  display: flex;
  flex-direction: column;
  gap: 15px;
  ul{
    margin-left: 20px;
    color: var(--paragraph);
  }

`;
const Knowledge = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  h3{
    color: var(--placeholder);
    margin-top: 15px;
  }
  p{
    color: var(--text);
    font-size: 18px;
  }
`
const Synonyms = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  color: var(--primary);
  p{
  color: var(--primary);
  }
`;
const Antonyms = styled.div`
  display: flex;
  flex-direction:row;
  gap: 10px;
  align-items: center;
  color: var(--primary);
  p{
   color: var(--primary);
  }
`
export default DataWord;