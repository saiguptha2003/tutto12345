import React, { useState } from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import st from './st';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();



const Sigin = ({ navigation }) => {
  const [Username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('./assets/Images/img.png')} />
      </View>

      <TextInput
        style={styles.InputText}
        placeholder={'Username'}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.InputText}
        placeholder={'Password'}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Sign In</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.SingInText}>
          No Account?{' '}
          <Text onPress={() => navigation.navigate('signup')}>Register</Text>
        </Text>
      </View>
    </View>
  );
};

//sigup 

const Signup = ({navigation}) => {
  const [SignupUsername, setSignupUsername] = useState('');
  const [SignupEmail, setSignupEmail] = useState('');
  const [SignupPassword, setSignupPassword] = useState('');
  // @ts-ignore
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('./assets/Images/img.png')} />
      </View>

      <TextInput style={styles.InputText} placeholder={'Username'} />
      <TextInput
        style={styles.InputText}
        placeholder={'Email'}
        keyboardType={'email-address'}
        onChangeText={text => setSignupEmail(text)}
      />
      <TextInput
        style={styles.InputText}
        placeholder={'Username'}
        onChangeText={text => setSignupUsername(text)}
      />

      <TextInput
        style={styles.InputText}
        placeholder={'Password'}
        secureTextEntry={true}
      />

      <TextInput
        style={styles.InputText}
        placeholder={'Re-Password'}
        secureTextEntry={true}
        onChangeText={text => {
          if (text === SignupPassword) {
            return setSignupPassword(text);
          } else {
            console.log('Password not match');
          }
        }}
      />
      <TouchableOpacity style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Register</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.SingInText}>
          Already have an account?{' '}
          <Text onPress={() => navigation.navigate('signin')}> SignIn </Text>
        </Text>
      </View>
    </View>
  );
};


const LinkProvider = ({route, navigation}) => {
  const Props = route.params;
  const [CodeChefLink, setCodeChefLink] = useState('');
  const [CodeForcesLink, setCodeForcesLink] = useState('');
  const [LeetCodeLink, setLeetCodeLink] = useState('');
  const [HackerEarthLink, setHackerEarthLink] = useState('');
  const [HackerRankLink, setHackerRankLink] = useState('');
  const [GeeksForGeeks, setGeeksForGeeks] = useState('');

  return (
    <View>
      <Text style={styles.linksHeader}>
        Hi {Props.username}! Please Provide Profile Links to Make Easy Checkout
      </Text>
      <View style={styles.LinksContainer}>
        <View style={styles.LinkInputText}>
          <TextInput
            placeholder={'CodeChef Profile Link'}
            value={'https://www.codechef.com/'}
            onChangeText={text => setCodeChefLink(text)}
          />
        </View>
        <View style={styles.LinkInputText}>
          <TextInput
            value={'https://codeforces.com/'}
            placeholder={'CodeForces Profile Link'}
            onChangeText={text => setCodeForcesLink(text)}
          />
        </View>
        <View style={styles.LinkInputText}>
          <TextInput
            value={'https://leetcode.com/'}
            placeholder={'LeetCode Profile Link'}
            onChangeText={text => setLeetCodeLink(text)}
          />
        </View>
        <View style={styles.LinkInputText}>
          <TextInput
            value={'https://www.hackerearth.com/'}
            placeholder={' Hackerearth Profile Link'}
            onChangeText={text => setHackerEarthLink(text)}
          />
        </View>
        <View style={styles.LinkInputText}>
          <TextInput
            value={'https://www.hackerrank.com/'}
            placeholder={' Hackerrank Profile Link'}
            onChangeText={text => setHackerRankLink(text)}
          />
        </View>
        <View style={styles.LinkInputText}>
          <TextInput
            value={'www.geeksforgeeks.com'}
            placeholder={' GeeksforGeeks Profile Link'}
            onChangeText={text => setGeeksForGeeks(text)}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.appButtonContainerLinks}
            onPress={() => {
              if (true) {
                console.log('Links Submitted');
                navigation.navigate('signin');
              }
            }}>
            <Text style={styles.appButtonText}>Submit Links</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Dashboard = (route, navigation) => {
  let f4 = route.params;
  const userLinks={
    codecheflink:'https://www.codechef.com/',
    codeforceslink:'https://codeforces.com/',
    leetcodelink:'https://leetcode.com/',
    hackerearthlink:'https://www.hackerearth.com/',
    hackerranklink:'https://www.hackerrank.com/',
    geeksforgeekslink:'https://www.geeksforgeeks.com/',

  }
  const data = [
    {
      code: 'CodeChef',
      img: require('./assets/Images/icons8-codechef-250.png'),
      link: userLinks.codecheflink,
    },
    {
      code: 'CodeForces',
      img: require('./assets/Images/code-forces.png'),
      link: userLinks.codeforceslink,
    },
    {
      code: 'LeetCode',
      img: require('./assets/Images/leetcode.png'),
      link: userLinks.leetcodelink,
    },
    {
      code: 'GeeksForGeeks',
      img: require('./assets/Images/icons8-geeksforgeeks-240.png'),
      link: userLinks.geeksforgeekslink,
    },
    {
      code: 'HackerRank',
      img: require('./assets/Images/4373234_hackerrank_logo_logos_icon.png'),
      link: userLinks.hackerranklink,
    },
    {
      code: 'HackerEarth',
      img: require('./assets/Images/hackerearth.223x256.png'),
      link: userLinks.hackerearthlink,
    },
  ];
  return (
    <ScrollView style={st.container}>
      <View>
        {data.map((item, index) => (
          <TouchableOpacity
            onPress={navigation.navigate('CodeChefDashBoard', {
              link: item.link,
            })}>
            <View key={index} style={st.content}>
              <Image style={st.image} source={item.img} />
              <Text style={st.heading}>{item.code}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const CodeChefDashBoard = ({route}) => {
  let f4 = route.params;
  return (
    <View>
      <Text>{f4.link}</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="signup"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="signin" component={Sigin} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="LinkProvider" component={LinkProvider} />
        <Stack.Screen name="CodeChefDashBoard" component={CodeChefDashBoard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;