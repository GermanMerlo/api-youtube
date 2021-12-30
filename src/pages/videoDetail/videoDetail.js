import { Link, useParams } from 'react-router-dom';
import ButtonTag from '../../components/Button/Button';
import '../../App.css';


export default function videoDetail() {
  let parms = useParams();
  console.log('Prueba:' + parms);
  return (
    <div className='container'>
      <Link to="/">
        <ButtonTag type="Button" value="Atrás"/>
      </Link>
      <h2>Prueba</h2>
      <img src={this.props.img} />
      <h5>Prueba</h5>
    </div>
  );
}