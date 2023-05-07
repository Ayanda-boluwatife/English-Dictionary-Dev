import React, { useState } from 'react';
import styled from 'styled-components'
import Navigation from './Navigation'
import SearchEngine from './SearchEngine';

const Home = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Wrapper className={`body ${isChecked ? "dark-mode" : "light-mode"}`}>
        <header>
          <Navigation
          checked={isChecked}
          onChange={handleChange}
          />
        </header>
        <main>
          <SearchEngine/>
        </main>
    </Wrapper>
  )
}
const Wrapper = styled.div`

  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;

  header, main{
    max-width: 700px;
    width: 100%;
  }
`
export default Home
