import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ButtonTag from '../../components/Button/Button';
import youtubeApi from '../../api/youtubeApi';
import '../../App.css';

export default () => (
  <VideoDetail
      videoId={useParams().videoId}
  />
);

class VideoDetail extends React.Component {
  constructor() {
    super();
    this.state = { 
      video: [],
     };
  }

  async componentDidMount() {
    const videoid = this.props.videoId;
    const response = await youtubeApi.get('/videos', {
      params: {
        id: videoid
      }
    })
    this.setState({ video: response.data.items });
  }

  render() {
    let videotitle;
    let videoDsc;
    let videoImg
    this.state.video.map(element => {
      videotitle = element.snippet.title;
      videoDsc = element.snippet.description;
      videoImg = element.snippet.thumbnails.high.url;
    })
    return (
      <div className='containerDetail'>
        <Link to="/">
          <ButtonTag type="Button" value="Atrás"/>
        </Link>
        <h2>{videotitle}</h2>
        <img className='image' src={videoImg}></img>
        <h5>{videoDsc}</h5>
      </div>
    );
  }
}