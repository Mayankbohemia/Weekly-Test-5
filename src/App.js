
import './App.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
        );
        const data = response.data;
        const newPosts = data.hits.map(hit => ({
          title: hit.title,
          url: hit.url,
          created_at: hit.created_at,
          author: hit.author
        }));
        setPosts(oldPosts => [...oldPosts, ...newPosts]);
        setPage(oldPage => oldPage + 1);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    if(page === 0){
       fetchData();
    }

   

  
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Created At</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={index}>
              <td>{post.title}</td>
              <td>{post.url}</td>
              <td>{post.created_at}</td>
              <td className='gap'>{post.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
