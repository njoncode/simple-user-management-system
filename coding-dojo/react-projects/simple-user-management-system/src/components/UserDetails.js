import React from 'react';
import Avatar from 'react-avatar';

import '../styles/user.css';
import { getUser } from '../utils/api';

const UserDetails = ({ match }) => {

    const [userInfo, setUserInfo] = React.useState([])

    React.useEffect(() => {
        getUser(match.params.id)
            .then(res => setUserInfo(res.data))
            .catch(error => console.log(error))
    }, [match.params.id])

    return (
            <div className='user-page'>
            <table>
                 <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                        </tr>
                </thead>
                <tbody>
                    {userInfo.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td className='username'><Avatar className='avatar' name={user.name} size="35" round={true} /><span className='name-user'>{user.name}</span></td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        )
}
  
export default UserDetails;
