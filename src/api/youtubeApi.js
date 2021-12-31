import axios from 'axios';

const apiKey = 'AIzaSyB5H4I9EHHBLU_VjcNskt17v94cwAzh9vI';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params:{
      part: 'snippet',
      key: apiKey
  }
});

