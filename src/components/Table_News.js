import React from 'react';
import './still.css'
import { useState, useEffect } from 'react';

const Table_News = () => { 
  const [technologyNews, setTechnology] = useState([])

  useEffect(() => {
    fetch("https://api.collectapi.com/news/getNews?country=tr&tag=technology", {
      headers: {
        "content-type": "content-type",
        "authorization": "apikey 4NjpTYLAwUIpIXYgEH5wMF:1OHgANkkKmbG5wapcAGdLJ"
      }
    })
      .then(response => response.json())
      .then(response => setTechnology(response.result));
  }, [])

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  return (
    <>
      {technologyNews.map((technology) =>
        <a href={technology.url} key={technology.key}>
          <div className='table_news' key={technology.key}>
            <img src={technology.image} alt="" />
            <div className='table_news_desc' >{truncateText(technology.name, 60)}</div>
          </div>
        </a>
      )}
    </>
  )
};

export default Table_News;
