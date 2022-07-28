import { images } from './prizeMaps.js'

import './gallery.css';


const Gallery = () => {
  return (
    <div>
      {images.map((image) => (
        <img src={image} alt="prize" className='prize'/>
      ))}
    </div>
  )
}

export default Gallery
