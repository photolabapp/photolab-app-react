import { AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/login/Login'
import SignUp from '../screens/signup/SignUp'
import Home from '../screens/home/Home'


const loginNavigator = createStackNavigator({
  Login: {
    screen: Login,
  },
  SignUp: {
    screen: SignUp,
  }
}, {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
)

const homeNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
})

export default createAppContainer(loginNavigator)

/*
const navigator = () => {
  AsyncStorage.getItem('ACCESS_TOKEN', function (err, value) {
    //JSON.parse(value) // boolean false
    if (value == null){
      export default createAppContainer(this.loginNavigator)
    } else {
      export default createAppContainer(this.homeNavigator)
    }
  })
}
*/

//this.navigator()
/*

  console.log("LOG ------ call ");
  const retrieve = async (key) => await AsyncStorage.getItem(key);
  console.log("LOG ------ token " + retrieve('ACCESS_TOKEN'));
  export default createAppContainer(navigator())
  /*
  let token = AsyncStorage.getItem('ACCESS_TOKEN');
  token = async () => {
    try {
      return await AsyncStorage.getItem('ACCESS_TOKEN');
      console.log("LOG ------ token " + token);
    } catch (error) {
      console.log("LOG ------ error " + token);
    }
    return null
  }
  */

  //return (token() == null)? loginNavigator : homeNavigator
  //return loginNavigator
//}

