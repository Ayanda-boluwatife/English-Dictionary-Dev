import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { RiSearchLine } from 'react-icons/ri';
import DataWord from './DataWord';

const SearchEngine = () => {
    const [typeWord, setTypeWord] = useState("");
    const [Wordmeaning, setWordMeaning] = useState("");
    const [error, setError] = useState("");

    const handleWordSearch = async (e) => {
        e.preventDefault();

        if (!typeWord) {
            setError("enter a word to search");
            return;
        }

        try {
            const api_url = `https://api.dictionaryapi.dev/api/v2/entries/en/${typeWord}`;
            
            const response = await axios.get(api_url);
            setWordMeaning(response.data);
            setError("")

        } catch (error) {
            if (error.response) {
                setError(`This dictionary does not allow you to search ${typeWord}`);
            } else if (error.request) {
                setError("internet error. Please check your connection and try again.");
            } else {
                setError("Unexpected token. Please try again later.");
            }
            console.error(error);
        }
    }
  return (
    <SearchInput>
        <form action="" onSubmit={handleWordSearch}>
            <InputField>
                <Input type="text" 
                placeholder='Enter a word to search'
                value={typeWord}
                onChange={(e) => setTypeWord(e.target.value)}
                />
                <button><RiSearchLine/></button>
            </InputField>
        </form>
        {error && (<Error>{error}</Error>)}
        <DataWord
            dictionaryData={Wordmeaning}
        />
    </SearchInput>
  )
}

const SearchInput = styled.div`

    width: 100%;
    padding: 30px 0;

`
const Input = styled.input`
    padding: 15px;
    width: 100%;
    border-right: none;
    background-color: var(--secondary-color);
    outline: none;
    border: none;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    color: var(--placeholder);

    &::placeholder{
        color: var(--placeholder);
    }
`;

const InputField = styled.div`

    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;


    button{
        font-size: 28px;
        padding: 5px;
        border-left: none;
        background-color: transparent;
        color: var(--primary);
        background-color: var(--secondary-color);
        outline: none;
        border: none;
        padding-right: 10px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
    }

`;
const Error = styled.div`
    color: red;
`
export default SearchEngine