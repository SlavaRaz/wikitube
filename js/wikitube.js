const WIKI_API_URL = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=beatles&format=json`
const YOUTUBE_API_KEY = 'AIzaSyBKVSi66dSPOPeZ6Pzt9tTdDBRHbkvTN2M'
const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search`


// Fetch YouTube videos
function fetchVideos(query) {
    fetch(`${YOUTUBE_API_URL}?part=snippet&q=${query}&type=video&key=${YOUTUBE_API_KEY}`)
      .then(response => response.json())
      .then(data => displayVideos(data.items))
      .catch(error => console.error('Error fetching videos:', error))
  }

  // Display YouTube videos
function displayVideos(videos) {
    const videoList = document.getElementById('video-list')
    videoList.innerHTML = ''
  
    videos.forEach(video => {
      const videoItem = document.createElement('div')
      videoItem.className = 'video-item'
      videoItem.innerHTML = `
        <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
        <h3>${video.snippet.title}</h3>`
      videoItem.addEventListener('click', () => playVideo(video.id.videoId))
      videoList.appendChild(videoItem)
    })
  }

  // Play the selected video
function playVideo(videoId) {
    const videoPlayer = document.getElementById('video-player')
    videoPlayer.innerHTML = `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`
  }

  function displayWikiResults(results) {
    const wikiResults = document.getElementById('wiki-results');
    wikiResults.innerHTML = '';
  
    results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.className = 'wiki-item';
      resultItem.innerHTML = `
        <h3>${result.title}</h3>
        <p>${result.snippet}</p>
        <a href="https://en.wikipedia.org/wiki/${result.title}" target="_blank">Read more</a>
      `;
      wikiResults.appendChild(resultItem);
    });
  }

  // Fetch Wikipedia results
function fetchWiki(query) {
    fetch(`${WIKI_API_URL}&srsearch=${query}`)
      .then(response => response.json())
      .then(data => displayWikiResults(data.query.search))
      .catch(error => console.error('Error fetching Wikipedia results:', error));
  }

  // Search handler
function search() {
    const query = document.getElementById('search-input').value || 'technology'
    fetchVideos(query)
    fetchWiki(query)
  }
  
  document.getElementById('search-button').addEventListener('click', search);

  window.onload = () => search()