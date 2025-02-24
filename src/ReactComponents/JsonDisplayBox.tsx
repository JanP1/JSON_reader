import { invoke } from '@tauri-apps/api/core';
import { useState, useEffect } from 'react'
import './JsonDisplayBox.css'


interface Style {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  width?: string;
  borderRadius?: string;
}

interface Block {
  content_type: "title" | "content" | "image";
  value: string;
  style: Style;
}

export default function JsonDisplayBox() {

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log('fetchData');
    async function fetchData() {
      try {
        const result: Block[] = await invoke("json_fetching");
        setBlocks(result);
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
        ) : blocks.length > 0 ? (
          blocks.map((block, index) =>{
            const {content_type, value, style} = block;

            console.log("Style: ", style);

            switch (content_type) {
              case "title":
                return (
                  <h1 key={index} style={style} className="full-page-width">
                    {value}
                  </h1>
              );

              case "content":
                return (
                  <div className='content-text wrap-text' key={index} style={style}>
                    {value}
                  </div>
              );

                case "image":
                  return (
                    <div className="full-page-width">
                    <img 
                      key={index}
                      src={value}
                      alt="Image not found"
                      style={style}
                    />
                    </div>
                  );

                default:
                  return null;
            }
          })) : (<p></p>)}
      </div>
    </div>
  );
}

