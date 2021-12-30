import React, { useState } from 'react';
import ButtonTag from './components/Button/Button';
import youtubeApi from './api/youtubeApi';
import VideoPlayer from './components/VideoPlayer/videoPlayer';
import Alert from './components/Alert/alert';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveData } from './actions';
import './App.css';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);

    const allVideos = this.props.value;
    const dispatch = this.props.dispatch;

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlechangeVideo = this.handlechangeVideo.bind(this);

    if (allVideos.length > 0) {
      this.state = {
        searchInput: '',
        isLoaded: true,
        videos: allVideos,
        videoId: '',
        videoTitle: '',
        videoDsc: ''
      }
    }else{
      this.state = {
        searchInput: '',
        isLoaded: false,
        videos: [],
        videoId: '',
        videoTitle: '',
        videoDsc: ''
  
      }
    }
  }

  handleChangeInput(searchInput) {
    this.setState({
      searchInput: searchInput
    });
  }

  handleSubmit(isLoaded, isEmpty, videoId, videoTitle, videoDsc, videoImg, videos) {
    this.setState({
      isLoaded: isLoaded,
      isEmpty: isEmpty,
      videoId: videoId,
      videoTitle: videoTitle,
      videoDsc: videoDsc,
      videoImg: videoImg,
      videos: videos

    });
  }

  handlechangeVideo(videoId, videoTitle, videoDsc) {
    this.setState({
      videoId: videoId,
      videoTitle: videoTitle,
      videoDsc: videoDsc,

    });
  }

  render() {

    const isLoaded = this.state.isLoaded;
    const videos = this.state.videos;
    const videoId = this.state.videoId;
    const videoTitle = this.state.videoTitle;
    const videoDsc = this.state.videoDsc;
    const isEmpty = this.state.isEmpty;
    const videoImg = this.state.videoImg;

    return (
    <div >
      { isEmpty &&
        <Alert value='Debe completar el campo de busqueda' />
      }
      <SearchInput
        searchInput={this.state.searchInput}
        onInputChange={this.handleChangeInput}
        onhandleSubmit={this.handleSubmit}
      />
      { isLoaded &&
        <div className='container'>
          <VideoContainer 
            videos={videos}
            videoId={videoId} 
            videoTitle={videoTitle} 
            videoImg={videoImg}
            videoDsc ={videoDsc}
          />

          <ListVideos 
            value={videos}
            onChangeVideo={this.handlechangeVideo}
          />
        </div>
      }
    </div>
    );
  }
}

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleChangeInput(e) {
    this.props.onInputChange(e.target.value);
  }

  handleSearchClick = async event => {
    event.preventDefault();

    let videoId;
    let videoTitle;
    let videoDsc;
    let videos; 
    let videoImg;
    let response;
    let isLoaded = false;
    let isEmpty = false;

    if (this.props.searchInput != '') {
      response = await youtubeApi.get('/search', {
        params: {
          type: 'video',
          maxResults: '4',
          q: this.props.searchInput
        }
      })
      
      const allVideos = response.data.items;
    
      allVideos.slice(0, 1).map(video => {
        videoId = video.id.videoId
        videoTitle = video.snippet.title
        videoDsc = video.snippet.description
        videoImg = video.snippet.thumbnails.high.url
      });
  
      videos = allVideos.slice(1)
      isLoaded = true;

    }else{

      isEmpty = true;

    }

    this.props.onhandleSubmit(isLoaded, isEmpty, videoId, videoTitle, videoDsc, videoImg, videos);

  }

  render() {
    return (
      <form className="center" onSubmit={this.handleSearchClick}>
        <input type="text" className="inputImg widht60 form-control" placeholder='Search...' value={this.props.searchInput} onChange={this.handleChangeInput} />
        <ButtonTag type="Submit" value="Search" />
      </form>
    );
  }
}

class ListVideos extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(video) {
    this.props.onChangeVideo(video.id.videoId, video.snippet.title, video.snippet.description);
  }

  render() {
    return (
      <div>
        {this.props.value.map((video) => (
          <div key={video.id.videoId} className='card' style={{width: '20rem'}}>
            <img src={video.snippet.thumbnails.high.url} style={{cursor: 'pointer'}} className='card-img-top' onClick={() => this.handleClick(video) } />
            <div className='card-body'>
              <h5>{video.snippet.title}</h5>
            </div>
          </div>
        ))}
      </div>
    );
  }
}


class VideoContainer extends React.Component {
  render() {
    return(
      <div className='videoPlayer'> 
        <VideoPlayer value={'http://www.youtube.com/embed/' + this.props.videoId + '?enablejsapi=1&origin=http://localhost:3000'} />
        <div className='titleVideo'>
          <h2>{this.props.videoTitle}</h2>
          <Link to={`/videoDetail/${this.props.videoId}`}>
            <ButtonTag type="Button" value="Detalle" onClick={() => useDispatch(saveData(this.props.videos))} />
          </Link>
          <Outlet />
        </div>
      </div>
    )
  }
}

function App() {

  const allVideos = useSelector(state => state.allVideos);
  const dispatch = useDispatch();

  return (
    <MainContainer  value={allVideos} dispatch={dispatch}/>
  );
}

export default App; 

