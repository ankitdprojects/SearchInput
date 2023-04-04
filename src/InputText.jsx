import React, { useState, useRef, useEffect } from 'react'

const InputText = () => {
  const [tagValue, setTagValue] = useState('')
  const [tags, setTags] = useState([])
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null)
  const addTags = (e) => {
    if (e.keyCode === 13 && tagValue) {
      let selectedCountry = countries.find(country => country.Name.toLowerCase() === tagValue.toLowerCase());
      if(selectedCountry){
        setTags([...tags, selectedCountry.Name]);
        setTagValue('');
        setSuggestions([])
      }
    } else if (e.keyCode === 38 && suggestions.length > 0) { 
      e.preventDefault();
      const lastIndex = suggestions.length - 1;
      const currentIndex = suggestions.findIndex(suggestion => suggestion.Name === tagValue);
      const newIndex = currentIndex <= 0 ? lastIndex : currentIndex - 1;
      setTagValue(suggestions[newIndex].Name);
    } else if (e.keyCode === 40 && suggestions.length > 0) {
      e.preventDefault();
      const lastIndex = suggestions.length - 1;
      const currentIndex = suggestions.findIndex(suggestion => suggestion.Name === tagValue);
      const newIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
      setTagValue(suggestions[newIndex].Name);
    }
  };
  useEffect(() => {
    const clearSuggestions = () => {
      setSuggestions([]);
    };
    
    window.addEventListener("blur", clearSuggestions);
    return () => window.removeEventListener("blur", clearSuggestions);
  }, []);  
  

  const deleteTag = (val) => {
    let remainTags = tags.filter((t) => t !== val)
    setTags(remainTags)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 8 && !tagValue && tags.length > 0) {
      setTags((prevTags) => prevTags.slice(0, -1))
      inputRef.current.focus()
    }
  }

  const countries = [
    { "Name": "Australia", "Code": "AU" },
    { "Name": "Bermuda", "Code": "BM" },
    { "Name": "Canada", "Code": "CA" },
    { "Name": "Cameroon", "Code": "CM" },
    { "Name": "Denmark", "Code": "DK" },
    { "Name": "France", "Code": "FR" },
    { "Name": "Finland", "Code": "FI" },
    { "Name": "Germany", "Code": "DE" },
    { "Name": "Greenland", "Code": "GL" },
    { "Name": "Hong Kong", "Code": "HK" },
    { "Name": "India", "Code": "IN" },
    { "Name": "Italy", "Code": "IT" },
    { "Name": "Japan", "Code": "JP" },
    { "Name": "Mexico", "Code": "MX" },
    { "Name": "Norway", "Code": "NO" },
    { "Name": "Poland", "Code": "PL" },
    { "Name": "Switzerland", "Code": "CH" },
    { "Name": "United Kingdom", "Code": "GB" },
    { "Name": "United States", "Code": "US" }
    ]
    const handleInputChange = (e) => {
        const input = e.target.value;
        const filteredSuggestions = countries.filter(
          (country) =>
            country.Name.toLowerCase().startsWith(input.toLowerCase()) ||
            country.Code.toLowerCase().startsWith(input.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      };
      const handleSuggestionClick = (suggestion) => {
        setTagValue(suggestion.Name);
        setTags([...tags, suggestion.Name]);
        setSuggestions([]);
        setTagValue('')
      };
      
  
  return (
    <div className='flex justify-center items-center w-full'>
      <div className='w-2/4 h-1/3 p-24'>
        <div className='w-full h-auto border-solid border-2 border-l-sky-50 focus-within:border-solid p-3 flex flex-wrap'>
          {tags.map((item, i) => {
            return (
              <div key={i}>
                <button className='bg-purple-600 outline-none border-none m-1 rounded text-white'>
                  {item}{' '}
                  <span
                    className='ml-2 text-r bg-purple-950 cursor-pointer rounded'
                    onClick={() => deleteTag(item)}
                  >
                    X
                  </span>
                </button>
              </div>
            )
          })}
          <div className='relative'>
          
<input
  ref={inputRef}
  className="w-full bg-transparent border-none outline-none text-white block"
  type="text"
  value={tagValue}
  placeholder="Type the tag"
  onChange={(e) => {
    setTagValue(e.target.value);
    handleInputChange(e);
  }}
  onKeyDown={(e) => {
    addTags(e);
    handleKeyDown(e);
  }}
/>
{suggestions.length > 0 && (
    <div className='absolute'>
  <ul className="absolute z-50 bg-gray-700 text-white mt-5 p-2">
    {suggestions.map((suggestion) => (
      <li
        key={suggestion.Code}
        className="cursor-pointer hover:bg-gray-600 py-1 px-2"
        onClick={() => handleSuggestionClick(suggestion)}
      >
        {suggestion.Name} ({suggestion.Code})
      </li>
    ))}
  </ul>
  </div>
)}
</div>
        </div>
      </div>
    </div>
  )
}

export default InputText
