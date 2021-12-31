import React from 'react';
import youtubeApi from './api/youtubeApi';
import VideoPlayer from './components/VideoPlayer/videoPlayer';
import Alert from './components/Alert/alert';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);


    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlechangeVideo = this.handlechangeVideo.bind(this);

    const stateVideos = this.props.allVideos;
    const searchInput = this.props.searchInput;
    const counter = this.props.value;
    const dispatch = this.props.dispatch;
    const videoId = this.props.videoId;
      
    if (stateVideos.length > 0) {

      let videoTitle;
      let videoDsc;

      const counter = this.props.counter;
      const allVideos = stateVideos.slice();
      let indexItem;

      stateVideos.map((video, index) => {
        if (videoId == video.id.videoId){

          videoTitle = video.snippet.title
          videoDsc = video.snippet.description
          indexItem = index

        }
      });
      
      if (indexItem !== -1) {
        stateVideos.splice(indexItem, 1);      
      }

      this.state = {
        searchInput: searchInput,
        isLoaded: true,
        listVideos: stateVideos,
        videoId: videoId,
        videoTitle: videoTitle,
        videoDsc: videoDsc,
        counter: counter,
        dispatch: dispatch,
        allVideos: allVideos

      }

    }else{

      this.state = {
        searchInput: '',
        isLoaded: false,
        listVideos: [],
        allVideos: [],
        videoId: '',
        videoTitle: '',
        videoDsc: '',
        counter: counter,
        dispatch: dispatch
      }

    }
  }

  handleChangeInput(searchInput) {
    this.setState({
      searchInput: searchInput
    });
  }

  handleSubmit(isLoaded, isEmpty, videoId, videoTitle, videoDsc, videoImg, allVideos) {

    let videos;

    if (allVideos.length > 0){
      videos = allVideos.slice(1);
    }else{
      videos = [];
    }

    const counter = this.props.counter;

    this.props.dispatch({ type: "SAVE_VIDEOS_WATCHED"})

    this.setState({
      isLoaded: isLoaded,
      isEmpty: isEmpty,
      videoId: videoId,
      videoTitle: videoTitle,
      videoDsc: videoDsc,
      videoImg: videoImg,
      allVideos: allVideos,      
      listVideos: videos,
      counter: counter

    });

  }

  handlechangeVideo(videoId, videoTitle, videoDsc) {

    const allVideos = this.state.allVideos.slice();
    const counter = this.props.counter;
    let indexItem;

    allVideos.map((video, index) => {
      if (videoId == video.id.videoId){
        indexItem = index
      }
    });

    if (indexItem !== -1) {
      allVideos.splice(indexItem, 1);      
    }
    
    this.setState({
      videoId: videoId,
      videoTitle: videoTitle,
      videoDsc: videoDsc,
      counter: counter,
      listVideos: allVideos
    });

  }

  render() {

    const isLoaded = this.state.isLoaded;
    const videos = this.state.listVideos;
    const allVideos = this.state.allVideos;
    const videoId = this.state.videoId;
    const videoTitle = this.state.videoTitle;
    const videoDsc = this.state.videoDsc;
    const isEmpty = this.state.isEmpty;
    const videoImg = this.state.videoImg;
    const searchInput = this.state.searchInput;
    const counter = this.state.counter;
    const dispatch = this.state.dispatch;
    

    return (
    <div >
      { isEmpty &&
        <Alert value='Debe completar el campo de busqueda' />
      }
      <SearchInput
        searchInput={searchInput}
        counter={counter}
        dispatch={dispatch}
        onInputChange={this.handleChangeInput}
        onhandleSubmit={this.handleSubmit}
      />
      { isLoaded &&
        <div className='container'>
          <VideoContainer 
            allVideos={allVideos}
            videoId={videoId} 
            videoTitle={videoTitle} 
            videoImg={videoImg}
            videoDsc={videoDsc}
            searchInput={searchInput}
            dispatch={dispatch}            
          />          
          <ListVideos 
            value={videos}
            counter={counter}
            dispatch={dispatch}
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

  serachInput = () => {
    this.props.dispatch({ type: "SAVE_SEARCH_INPUT", payload: this.props.searchInput})
  }

  handleSearchClick = async event => {
    event.preventDefault();

    let videoId;
    let videoTitle;
    let videoDsc;
    let videoImg;
    let response;
    let isLoaded = false;
    let isEmpty = false;
    let allVideos;
    let counter = this.props.counter;

    if (this.props.searchInput != '') {
      response = await youtubeApi.get('/search', {
        params: {
          type: 'video',
          maxResults: '4',
          q: this.props.searchInput
        }
      })
      
      allVideos = response.data.items;
    
      allVideos.slice(0, 1).map(video => {
        videoId = video.id.videoId
        videoTitle = video.snippet.title
        videoDsc = video.snippet.description
        videoImg = video.snippet.thumbnails.high.url
      });
  
      isLoaded = true;

    }else{

      allVideos = [];
      isEmpty = true;

    }

    this.props.onhandleSubmit(isLoaded, isEmpty, videoId, videoTitle, videoDsc, videoImg, allVideos, counter);

  }

  render() {
    return (
      <form className="center" onSubmit={this.handleSearchClick}>
        <input type="text" className="inputImg widht60 form-control" placeholder='Search...' value={this.props.searchInput} onChange={this.handleChangeInput} />
        <input className="btn btn-primary" type="Submit" value="Buscar" onClick={this.serachInput}></input>
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
    window.scrollTo(0, 0);
    this.props.dispatch({ type: "SAVE_VIDEOS_WATCHED"})
    this.props.onChangeVideo(video.id.videoId, video.snippet.title, video.snippet.description);
  }

  render() {
    const counter = this.props.counter;
    return (
      <div className='listVideos'>
        <span className='counter'>Videos watched: {counter}</span>
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

  saveData = () => {
    this.props.dispatch({ type: "SAVE_DATA", payload: this.props.allVideos })
    {this.props.dispatch({ type: "SAVE_VIDEO_ID", payload: this.props.videoId })}
  }


  render() {
    return(
      <div className='containerVideo'>
        <div className='videoPlayer'> 
          <VideoPlayer value={'http://www.youtube.com/embed/' + this.props.videoId + '?enablejsapi=1&origin=http://localhost:3000'} />
        </div>
        <div className='titleVideo'>
          <h2>{this.props.videoTitle}</h2>
          <Link to={`/videoDetail/${this.props.videoId}`}>
            <input className="btn btn-primary" type="Button" value="Detalle" onClick={this.saveData}></input>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allVideos: state.allVideos,
  searchInput: state.searchInput,
  counter: state.counter,
  videoId: state.videoId

});

export default connect(mapStateToProps)(App);

