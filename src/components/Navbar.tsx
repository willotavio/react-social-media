import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
export const Navbar = () => {
    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    }

    return(
        <div className='navbar'>
            <div>
                <p><Link to={'/'}>Home</Link></p>
            </div>
            <div>
                <p><Link to={'/login'}>Login</Link></p>
            </div>
            {user ? 
            <>
                <div>
                    <p>{user.displayName}</p>
                </div>
                <div>
                    <img src={user.photoURL || ""}></img>
                </div>
                <div>
                    <p><Link to={'/'} onClick={signUserOut}>Log Out</Link></p>
                </div>
            </>
            :
            <div>
                <p>Loading...</p>
            </div>
            }
            
        </div>
    );
}