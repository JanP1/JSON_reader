import { invoke } from '@tauri-apps/api/core';
import './JsonDisplayBox.css'
import { useState, useEffect } from 'react'

interface Content {
  title: string;
  text_blocks: string[];
}


export default function JsonDisplayBox() {

  const [contentList, setContentList] = useState<Content[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log('fetchData');
    async function fetchData() {
      try {
        const result: Content[] = await invoke("json_fetching");
        setContentList(result);
      } catch (error) {
        setError(`Error fetching: ${error}`) 
      }
      
    }
    fetchData()
  }, [])


  return (
    <div className='text-box-container'>
      <div className='text-box'>
        {error ? (
          <p>{error}</p>
        ) : contentList.length > 0 ? (
          contentList.map((content, index) => 
          <div key={index}>
            <h1 className='block-title'>{content.title}</h1>
            <ul >
              {content.text_blocks.map((text, idx) => (
                <li key={idx} >
                  {text}
                </li>
              ))}
            </ul>
          </div>
        )) : (<p></p>)}
      </div>
    </div>
  );
}

