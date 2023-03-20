import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { addUser } from '../features/user/user.reducer';


const TimeTable = () => {
    const userInfo = useSelector((store)=>store.user)
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/profile')
    }
    return (
    <div>
        <label>Shift Table</label>
        <table>
            <tr>
                <th></th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thrusday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
            </tr>
            <tr>
            {
            userInfo.map((user) => (<td>{user.name}</td>))
            }
            </tr>
        </table>
        <button onClick={handleSubmit}>Add User</button>
    </div>
    )
}

export default TimeTable
