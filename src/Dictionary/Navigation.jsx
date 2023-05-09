import React, { useState } from 'react';
import styled from 'styled-components';
import {CiDark} from 'react-icons/ci'
import {RiBook2Line} from 'react-icons/ri';
import {RiArrowDropUpLine} from 'react-icons/ri';
import {RiArrowDropDownLine} from 'react-icons/ri';
import {MdOutlineLightMode} from "react-icons/md"

const fontOptions = [  
  { name: "Serif", value: "serif" },
  { name: "Sans-serif", value: "sans-serif" },
  { name: "Monospace", value: "monospace" },
  { name: "Time-New-Roman", value: "Time-New-Roman" },
];

const Navigation = ({ onChange, checked }) => {
  const [dropdown, setDropdown] = useState(false);
  const [selectedFont, setSelectedFont] = useState("serif");

  const handleDropdown = () => {
    setDropdown(!dropdown)
  }

  const handleFontSelect = (value) => {
    setSelectedFont(value);
    setDropdown(false);
    document.body.style.fontFamily = value;
  }
  
  return (
    <NavigationBar>
      <div>
        <span className="dictionary"><RiBook2Line/></span>
      </div>
      <PositionLeft>
        <Dropdown>
          <div>
            <button onClick={handleDropdown}>{selectedFont}</button>
            {dropdown ? <span onClick={handleDropdown}><RiArrowDropUpLine/></span> : <span onClick={handleDropdown}><RiArrowDropDownLine/></span>}
          </div>
          {dropdown &&
            // <DropdownOptions>
              <div className='flex'>
                {fontOptions.map((option) => (
                <button key={option.value} onClick={() => handleFontSelect(option.value)}>{option.name}</button>
              ))}
              </div>
            /* </DropdownOptions> */
          }
        </Dropdown>
        <TranslateToggle>
          <input type="checkbox" checked={checked} onChange={onChange} />
          <span className='cirlce-main-toggle'></span>
        </TranslateToggle>
        <div>
          {
            checked ? <span className="change-mode-icons" onChange={onChange}><MdOutlineLightMode/></span> : <span className="change-mode-icons" onChange={onChange}><CiDark/></span>
          }
        </div>
      </PositionLeft>
    </NavigationBar>
  )
}

const NavigationBar = styled.div`

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;

  .dictionary{
    font-size: 35px;
    color: var(--tetiary-color);
  }

`
// const DropdownOptions = styled.div``
const TranslateToggle = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .cirlce-main-toggle{
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--toggle-color);
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
  }
  span:before {
    position: absolute;
    content: "";
    padding: 10px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }
  input:checked + span {
    background-color: var(--toggle-color);
    color: #fff;
  }
  input:checked + span:before {
    -webkit-transform: translateX(22px);
    -ms-transform: translateX(22px);
    transform: translateX(22px);
    color: #fff;
  }
`;
const PositionLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  .change-mode-icons{
    font-size: 30px;
    color: var(--switcher);
  }
`
const Dropdown = styled.div`

  div{
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    border-right:  1px solid black;
    padding-right: 10px;
  }
  button{
    border: none;
    background-color: transparent;
    padding: 6px 13px;
    color: var(--placeholder);
    font-weight: 600;
  }
  span{
    font-size: 30px;
    margin-top: 6px;
    color: var(--placeholder);
  }
  .flex{
    display: flex;
    flex-direction: column;
    position: absolute;
  }

`
export default Navigation;