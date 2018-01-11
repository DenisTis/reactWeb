import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import '../styles.css';

import I18n from 'i18n-js';

export default class Menupage extends React.Component {
  render() {
    return (
      <div className='container'>
        <NavLink to="/">{I18n.t('home')}</NavLink>
        <h1>{I18n.t('menu')} </h1>
        <div className="btn-group-vertical" aria-label="Options">
          <NavLink to="/map">
            <button className="btn btn-primary" type="button">{I18n.t('mapNavigation')}</button>
          </NavLink>
          <Link to="/talk">
            <button className="btn btn-primary" type="button">Dialogs</button>
          </Link>
        </div>
      </div>
    ); 
  }
}


//Nested views declaration example
// export default class Menupage extends React.Component {
//   render() {
//     return (
//       <div className='container'>
//         <NavLink to="/">{I18n.t('home')}</NavLink>
//         <h1>{I18n.t('menu')} </h1>
//         <div class="btn-group-vertical" aria-label="Options">
//           <Link to="/menu/map">
//             <button class="btn btn-primary" type="button">{I18n.t('mapNavigation')}</button>
//           </Link>
//           <Link to="/menu/talk">
//             <button class="btn btn-primary" type="button">Dialogs</button>
//           </Link>
//         </div>
//         <div>
//             <Route path="/menu/map" component={MapNavigation} />
//             <Route path="/menu/talk" component={TalkDialog} />
//         </div>
//       </div>
//     ); 
//   }
// }
