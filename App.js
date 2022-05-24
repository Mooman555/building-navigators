import * as React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./src/Navigators/StackNavigation";
import { Provider } from "react-redux";
import mainReducer from "./src/Redux/reducer";
import { legacy_createStore as createStore } from "redux";
const store = createStore(mainReducer);
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isReady: false,
    };
  }

  render() {
    return (
      <Provider store={store}>
        <NativeBaseProvider>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    );
  }
}
