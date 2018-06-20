import React, { Component } from 'react';
import { auth, db } from '../firebase';
import { Link, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

const SignUpPage = ({ history }) =>
  <div>
     <div className='logo'><img src={require('../img/vondelbuddies_logo.png')} alt=""/></div>
    <SignUpForm history={history} />
</div>


const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});


class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
        history,
      } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

         // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push('/matches');
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });


      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }


  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
        <form onSubmit={this.onSubmit}>
          <TextField
            value={username}
            onChange={event => this.setState(byPropKey('username', event.target.value))}
            type="text"
            placeholder="Full Name"
            label="Full Name"
            className="text-field"
          />
          <TextField
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
            label="Email Address"
            className="text-field"
          />
         <TextField
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
            placeholder="Password"
            label="Password"
            className="text-field"
          />
         <TextField
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            placeholder="Confirm Password"
            label="Confirm Password"
            className="text-field"
          />
         <button className="btn" disabled={isInvalid} type="submit">
            Sign Up
          </button>

          { error && <p>{error.message}</p> }
        </form>
      );
  }
}

const SignUpLink = () =>
  <p><Link to={'/signup'}>Create account</Link> </p>



export default withRouter(SignUpPage);

export {
    SignUpForm,
    SignUpLink,
  };
