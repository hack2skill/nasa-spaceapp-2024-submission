import React from 'react';
import Header from '../../components/Header/Header'
import CreateUser from '../../components/CreateUser/CreateUser';
function User({onSelectPlanet}) {
    return (
        <main className="page--outer">
            <div className="content--container">
            <Header onSelectPlanet={onSelectPlanet} title={"User Page"} home={true}/>
            <CreateUser />
            </div>
      </main>
    );
}

export default User;