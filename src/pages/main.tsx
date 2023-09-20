import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

export const Main = () => {
    const navigate = useNavigate();
    return(
        <>
        {auth?
            <div>
                <p>Home</p>
            </div>
            :navigate('/login')
        }
        </>
        );
}