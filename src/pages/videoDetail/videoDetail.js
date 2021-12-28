import React from 'react';
import { Link } from 'react-router-dom';
import ButtonTag from '../../components/Button/Button';

class videoDetail extends React.Component {
  //componentDidMount(){
 // }

  render(){
    return (
      <div>
        <Link to="/">
          <ButtonTag type="Button" value="Detalle"/>
        </Link>
        <h2>Titulo del video de Youtube en cuestión</h2>
        <img src='https://i.ytimg.com/vi/XMW3giznx-U/hqdefault.jpg' />
        <h5>Descripción del video en cuestión</h5>
      </div>
    );
  }

}

export default videoDetail;