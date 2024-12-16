import { useEffect, React} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
export default function Card({ title, description , video}) {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // You can set the duration here
}, []);
  return (
    <div className="card shadow-sm text-center p-3 mb-4" data-aos="fade-up" style={{width:"100%" , height:"100%"}}  >
      <div className="card-body" >
        <div className="card-icon mb-3">
          <img src={video} autoPlay loop muted style={{width:"100%" , height:"100%" , objectFit:"cover" }} ></img> 
        </div>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}