import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/login/Login'
import SignUp from '../screens/signup/SignUp'
import Home from '../screens/home/Home'
import Splash from '../screens/splash/Splash'

const loginStackNavigator = createStackNavigator({
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

const homeStackNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
})

const switchNavigator = createSwitchNavigator(
  {
      Splash: { screen: Splash, navigationOptions: { header: null } },
      App: homeStackNavigator,
      Auth: loginStackNavigator,
  },
  {
      initialRouteName: 'Splash'
  },
);

export default createAppContainer(switchNavigator)

//export default createAppContainer(loginNavigator)

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

