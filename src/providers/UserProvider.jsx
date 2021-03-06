import React, { Component, createContext } from "react";
import { auth, createUserProfileDocument, firestore } from "../firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null
  };

  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = firestore;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth);
      console.log(user);
      this.setState({ user });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };
  render() {
    const { user } = this.state;
    const { children } = this.props;
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export default UserProvider;
