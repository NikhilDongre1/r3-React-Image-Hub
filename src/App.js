
import React, { useState} from'react';
import axios from 'axios';
import './App.css';
import Masonry from 'react-masonry-css';
function App() {
  const [search,setSearch] = useState('');
  const [images,setImages] = useState([]);
  const url = 'https://api.unsplash.com/search/photos';
  const api_key = process.env.REACT_APP_API_KEY;

  const fetchImages = async ()=>{
    try{
      const response = await axios.get(`${url}?query=${search}&page=1&per_page=20&client_id=${api_key}`)
      setImages(response.data.results);
      // console.log(response.data.results);
    }catch(err){
      console.error(err);
    }
  }


  function handleSearch(e){
    e.preventDefault();
    fetchImages();
    setSearch('');
  }

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  return (
    <div className="container">
    <h1 className='heading'>Image<span>Hub</span></h1>
    <div className='search'>
      <input className='input' type="text" placeholder="Search images..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
    {
      images.length?<Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((image) => (
        <div key={image.id} className="image-container">
          <img className="image" src={image.urls.regular} alt={image.alt_description} />
        </div>
      ))}
    </Masonry>:<div className='not-found'>
        <h1>No Result Found</h1>
    </div>
}
  </div>
  );
}

export default App;
