import { Route ,Redirect} from 'react-router-dom';

export default ({ render, ...others }) => {
  return <Route
          {...others}
          render={props => localStorage.getItem('login')
          ?
          render(props)
          :
          <Redirect to={{pathname:'/login',state:{from:props.location.pathname}}}/>
    }
  />;
}
