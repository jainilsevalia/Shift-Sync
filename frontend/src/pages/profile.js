import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addUser } from '../features/user/user.reducer';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [name,setName] = useState();
  const [id,setId] = useState();
  const [age,setAge] = useState();
  const [address,setAddress] = useState();
  const [pin,setPin] = useState();

  return (
    <div>
      <label>Name : </label>
      <input 
      type="text" 
      id="name" 
			value={name}  
			placeholder="Name"
			onChange={(e)=>setName(e.target.value)}/>
      <label>Id :</label>
      <input 
      type="text" 
      id="id" 
			value={id} 
			placeholder="ID"
			onChange={(e)=>setId(e.target.value)}/>
      <label>Age :</label>
      <input 
      type="text" 
      id="age" 
			value={age} 
			placeholder="Age"
			onChange={(e)=>setAge(e.target.value)}/>
      <label>address</label>
      <input 
      type="text" 
      id="address" 
			value={address} 
			placeholder="Address"
			onChange={(e)=>setAddress(e.target.value)}/>
      <label>Pin</label>
      <input 
      type="password" 
      id="pin" 
			value={pin} 
			placeholder="Pin"
			onChange={(e)=>setPin(e.target.value)}/>
      <button onClick={()=>{dispatch(addUser({
        name:name,
        id:id,
        age:age,
        address:address,
        pin:pin
      }))
      
      navigate('/')
      }
      
      }>Add User</button>
    </div>
  )
}

export default Profile
