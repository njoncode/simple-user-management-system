import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'react-avatar';
import '../styles/user.css';

import {getAllUsers, deleteUser} from '../utils/api';


const Users = () => {

    const [user, setUser] = React.useState([]);

    console.log('user - Users Page: ', user)

    const handleDeleteUser = (id) => {
        console.log('handleDeleteUser: user is: ', id);
        deleteUser(id)
            .then(res => setUser(user.filter(user => user._id === id)))
            .catch(err => console.log('ERROR: ', err))
    }
    
    React.useEffect(() => {
        getAllUsers()
            .then(res => {
                console.log('res is: ', res.data)
                setUser(res.data)
            })
            .catch(error => console.log(error))
    }, [user.length])

    return (
        <div className='user-page'>
              <Link to='/add-user' className='add-user'>Add User</Link>
        <table>
            <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                    </tr>
            </thead>
            <tbody>
                {user.map(user => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td className='username'><Avatar className='avatar' name={user.name} size="35" round={true} /><span className='name'>{user.name}</span></td>
                        <td>
                            <Link to={`/user/${user._id}`} className='link-btn'><button>View</button></Link>
                            <Link to={`/user/edit/${user._id}`} className='link-btn'><button>Edit ✎</button></Link>
                            <button onClick={() => handleDeleteUser(user._id)}>Delete X</button>   
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default Users;




