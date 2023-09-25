import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import loginIcon1 from '../img/loginIcon1.svg'

export const Login = () => {

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        navigate('/');
    }

    return(
        <table className='login'>
            <tbody>
                <tr>
                    <td><img src={loginIcon1} height={400}/></td>
                    <td>
                        <p>Sign In With Google To Continue</p>
                        <button onClick={signInWithGoogle}>Sign In With Google</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}