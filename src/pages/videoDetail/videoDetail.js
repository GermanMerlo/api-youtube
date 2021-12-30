import { Link, useParams } from 'react-router-dom';
import ButtonTag from '../../components/Button/Button';
import '../../App.css';

export default function VideoDetail() {

  let param = useParams();
  const videoIde = param.videoId;
  let videoImg;
  let videoDsc;

  return (
    <div className='container'>
    <Link to="/">
      <ButtonTag type="Button" value="Atrás"/>
    </Link>
    <h2>{videoTitle}</h2>
    <img src={videoImg}></img>
    <h5>{videoDsc}</h5>
  </div>

  );

}