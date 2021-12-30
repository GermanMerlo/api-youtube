import axios from 'axios';

const apiKey = 'AIzaSyCWG2L0CuZaTn3qQETkijEbmZBZdv7zdeM';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params:{
      part: 'snippet',
      key: apiKey
  }
});

