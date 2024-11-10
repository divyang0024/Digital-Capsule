import React from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {

const {user}=useSelector(state=>state.user);
console.log(user.user);
  return (
    <div>
    <h1>
    name : {user.user.name} 
     </h1>
     <h1>
     username : {user.user.username}
     </h1>
     <h1>
     email : {user.user.email}
     </h1>
     <h1>
     gender : {user.user.gender}
     </h1>
     <h1>
     capsules created : {user.user.capsulesCreated.length} capsules
     </h1>
     <h1>
     private capsule access : {user.user.capsulesInvited.length} capsules
     </h1>
    </div>
  )
}

export default Dashboard
