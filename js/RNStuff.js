'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
  TextInput,
  NativeEventEmitter,
} from 'react-native';

import Navigator from 'native-navigation';

const { RNStuffManager } = NativeModules;

class RNStuff extends React.Component {



  constructor(props) {
    super(props);

    this.state = {
      message: props.message,
      text:'placheolder'
    }

    this._subscription = null;
    this._date_subscription = null;
  }

  componentDidMount() {
    const TextEvent = new NativeEventEmitter(RNStuffManager);
    this._subscription = TextEvent.addListener(
      'TextEvent',
      (info) => {
        console.log(JSON.stringify(info));
      }

    );

    const ReminderEvent = new NativeEventEmitter(RNStuffManager);
    this._date_subscription = ReminderEvent.addListener(
      'EventReminder',
   (reminder) => {
       console.log('EVENT');
       console.log('message: ' + reminder.message);
   }
 );


      RNStuffManager.addEvent(this.props.rootTag,"One",
            // successCallback
            (results) => {
              console.log(' in callback ');
              console.log(results);
            }
          );
      // , function(o) {
//     console.log('In Callback')
//     console.dir(o)
//
// });

}


  componentWillUnmount() {
    this._subscription.remove();
    this._date_subscription.remove();
  }

  // _renderScene() {
  //       return (
  //         <View style={styles.content}>
  //           <Text style={styles.welcome}>We're live from React Native!!!</Text>
  //             <TextInput
  //              style={{height: 40, fontSize : 20, borderColor: 'gray', borderWidth: 1, textAlign: 'center'}}
  //              value={this.state.message}
  //              onChangeText={(message) => this.setState({message})}
  //            />
  //         </View>
  //       );
  //     }

// _renderNavTitle(route, navigator, index, navState) {
//   return <Text style={styles.navBarTitleText}>{route.title}</Text>;
// }

// _renderNavLeftItem(route, navigator, index, navState) {
//   return (
//     <TouchableOpacity
//       onPress={() => {
//         RNStuffManager.dismissPresentedViewController(this.props.rootTag);
//       }}
//       style={styles.navBarLeftButton}>
//       <Text style={[styles.navBarText, styles.navBarButtonText]}>
//         Cancel
//       </Text>
//     </TouchableOpacity>
//   );
// }

// _renderNavRightItem(route, navigator, index, navState) {
//   return (
//     <TouchableOpacity
//       onPress={() => {
//           RNStuffManager.save(
//             this.props.rootTag,
//             this.state.message,
//           );
//         }}
//       style={styles.navBarRightButton}>
//       <Text style={[styles.navBarText, styles.navBarButtonText]}>
//         Save
//       </Text>
//     </TouchableOpacity>
//   );
// }

render() {
  return (
    <View style={styles.content}>
      <Text style={styles.welcome}>We're live from React Native!!!</Text>
        <TextInput
         style={{height: 40, fontSize : 20, borderColor: 'gray', borderWidth: 1, textAlign: 'center', padding: 5}}
         value={this.state.message}
         onChangeText={(message) => this.setState({message})}
       />
       <TouchableOpacity
             onPress={() => {
                 RNStuffManager.save(
                   this.props.rootTag,
                   this.state.message,
                 );
               }}>
             <Text style={styles.options}>
               Save
             </Text>
      </TouchableOpacity>

      <TouchableOpacity
            onPress={() => {
              //bridged by native-navigation/ReactNavigation.swift
              Navigator.pop()
            }}>
            <Text style={styles.options}>
              Cancel
            </Text>
      </TouchableOpacity>
    </View>
  );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 30,
    color: 'black',
  },
  options: {
    fontSize: 20,
    color:'blue',
    padding: 5,
  },
  navBar: {
    backgroundColor: 'red',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: 'white',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: 'white',
  },
});
module.exports = RNStuff;
