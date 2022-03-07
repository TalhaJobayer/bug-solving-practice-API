const elementById = (id) => {
  return document.getElementById(id);
};

const handleSearch = () => {
  const keyword = elementById("keyword");

  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  
  fetch(url)
    .then(res => res.json())
    .then(data =>showArtists(data.artists));
};

const showArtists = (artists) => {
 
  const artistContainer = elementById("artists");
  artistContainer.innerHTML = "";
  const albumContainer = elementById("albums");
  albumContainer.textContent="";
  artists.forEach(artist => {
    
    console.log(artist);
    const div2 = document.createElement("div");
    div2.classList.add("artist-card");
    div2.innerHTML= `
    <div class="image-container">
     <div class="image-container-inner">
       <img
         src="${artist.strArtistThumb}"
         alt=""
       />
     </div>
   </div>
   <div class="info-container">
     <h1>${artist.strArtist}</h1>
     <p>Country: ${artist.strCountry}</p>
     <p>Style: ${artist.strGenre}</p>
   </div>
   <button class="album-button">
     <i class="fa-solid fa-compact-disc"></i>
     <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
   </button>`
  artistContainer.appendChild(div2)
  });
 
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data.album));
  
 
};

const showAlbum = (albaums) => {
  const albumContainer = elementById("albums");
  
  albaums.forEach((album) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${album.strAlbumThumb}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${album.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
