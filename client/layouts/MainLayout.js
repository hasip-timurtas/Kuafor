import React from 'react';
import Nav from '../App/Nav';

export const MainLayout = ({content}) => (
    <div className="main-layout">
        <Nav />

        <div className="container">
            {Meteor.userId() ? content :
                <div>
                    <h2>Login with google account, keep your notes and share..</h2>
                    <h4>For using the application please log in.</h4>
                    <img src="screen.jpg" width="60%"/>
                    <img src="phone.jpg" width="25%"/>
                </div>
            }
        </div>
    </div>
)
