import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './styles';
import st from './st';
import {getCodeChefProfileInfo} from './api/solveddata';
import axios from 'axios';

const Stack = createNativeStackNavigator();

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkUser = async () => {
    try {
      let req = await fetch('http://10.1.89.118:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await req.json();
      setUser(data);
    } catch (err) {
      console.warn(err);
    }
  };

  const [user, setUser] = useState();

  const handleSignIn = async () => {
    await checkUser();
    console.log('User:', user);
    navigation.navigate('Dashboard', user);
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('./assets/Images/img.png')} />
      </View>

      <TextInput
        style={styles.InputText}
        placeholder={'Email'}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.InputText}
        placeholder={'Password'}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.appButtonContainer}
        onPress={handleSignIn}>
        <Text style={styles.appButtonText}>Sign In</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.SingInText}>
          No Account?{' '}
          <Text onPress={() => navigation.navigate('Signup')}>Register</Text>
        </Text>
      </View>
    </View>
  );
};

// Signup Component

const Signup = ({navigation}) => {
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [CodeChefLink, setCodeChefLink] = useState('');
  const [CodeForcesLink, setCodeForcesLink] = useState('');
  const [LeetCodeLink, setLeetCodeLink] = useState('');
  const handleRegistration = () => {
    // Prepare data to send to the server
    const data = {
      username: signupUsername,
      email: signupEmail,
      password: signupPassword,
      codecheflink: CodeChefLink,
      codeforceslink: CodeForcesLink,
      leetcodelink: LeetCodeLink,
    };

    // Make a POST request to the server
    axios
      .post('your_server_endpoint/signup', data)
      .then(response => {
        // Handle the response from the server
        if (response.data.success) {
          console.log('Registration successful');
          navigation.navigate('signin');
        } else {
          console.log('Registration failed');
        }
      })
      .catch(error => {
        console.error('Error during registration:', error);
      });
  };
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Image source={require('./assets/Images/img.png')} />
          </View>

          <TextInput
            style={styles.InputText}
            placeholder={'Username'}
            onChangeText={text => setSignupUsername(text)}
          />
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
            onChangeText={text => setSignupPassword(text)}
          />

          <TextInput
            style={styles.InputText}
            placeholder={'Re-Password'}
            secureTextEntry={true}
            onChangeText={text => {
              if (text === signupPassword) {
                setSignupPassword(text);
              } else {
                console.log('Password not match');
              }
            }}
          />
          <TextInput
            style={styles.InputText}
            placeholder={'CodeChef Profile Link'}
            value={'https://www.codechef.com/'}
            onChangeText={text => setCodeChefLink(text)}
          />
          <TextInput
            style={styles.InputText}
            value={'https://codeforces.com/'}
            placeholder={'CodeForces Profile Link'}
            onChangeText={text => setCodeForcesLink(text)}
          />
          <TextInput
            style={styles.InputText}
            value={'https://leetcode.com/'}
            placeholder={'LeetCode Profile Link'}
            onChangeText={text => setLeetCodeLink(text)}
          />

          <TouchableOpacity style={styles.appButtonContainer}>
            <Text style={styles.appButtonText} onPress={handleRegistration}>
              Register
            </Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.SingInText}>
              Already have an account?{' '}
              <Text onPress={() => navigation.navigate('SignIn')}>SignIn</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const Dashboard = ({route, navigation}) => {
  const userLinks = route.params;
  const [codeChefProfile, setCodeChefProfile] = useState();
  const [codeForcesProfile, setCodeForcesProfile] = useState();

  const getCodeChefProfile = async () => {
    try {
      let req = await fetch('http://10.1.89.118:3000/getdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: userLinks.codecheflink,
        }),
      });
      const data = await req.json();
      setCodeChefProfile(data);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getCodeChefProfile();
  }, [userLinks.codecheflink]);

  const getCodeForcesProfile = async () => {
    try {
      let req = await fetch('http://10.1.89.118:3000/getCodeForcesData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: userLinks.codeforceslink,
        }),
      });
      const data = await req.json();
      setCodeForcesProfile(data);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getCodeForcesProfile();
  }, [userLinks.codeforceslink]);

  const data = [
    {
      code: 'CodeChef',
      img: require('./assets/Images/icons8-codechef-250.png'),
      link: userLinks.codecheflink,
      component: 'CodeChefDashboard',
      profile: codeChefProfile,
      description: 'Competitive Programming on CodeChef',
    },
    {
      code: 'CodeForces',
      img: require('./assets/Images/code-forces.png'),
      link: userLinks.codeforceslink,
      component: 'CodeForcesDashboard',
      profile: codeForcesProfile,
      description: 'Algorithmic Challenges on CodeForces',
    },
    {
      code: 'LeetCode',
      img: require('./assets/Images/leetcode.png'),
      link: userLinks.leetcodelink,
      component: 'LeetCodeDashBoard',
      description: 'LeetCode Problem Solving',
    },
    // {
    //   code: 'GeeksForGeeks',
    //   img: require('./assets/Images/icons8-geeksforgeeks-240.png'),
    //   link: userLinks.geeksforgeekslink,
    //   component: 'GeeksForGeeksDashBoard',
    //   description: 'GeeksForGeeks Practice',
    // },
    // {
    //   code: 'HackerRank',
    //   img: require('./assets/Images/4373234_hackerrank_logo_logos_icon.png'),
    //   link: userLinks.hackerranklink,
    //   component: 'HackerRankDashBoard',
    //   description: 'HackerRank Challenges',
    // },
    // {
    //   code: 'HackerEarth',
    //   img: require('./assets/Images/hackerearth.223x256.png'),
    //   link: userLinks.hackerearthlink,
    //   component: 'HackerEarthDashBoard',
    //   description: 'HackerEarth Competitions',
    // },
  ];

  return (
    <ScrollView style={st.container}>
      <View>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              // Perform necessary actions on item press
              navigation.navigate(item.component, item.profile);
            }}>
            <View style={st.content}>
              <Image style={st.image} source={item.img} />
              <Text style={st.heading}>{item.code}</Text>
              <Text>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// CodeChefDashboard Component

const CodeChefDashboard = ({route}) => {
  const result = route.params;

  const [stars, setStars] = useState('');

  const printStarsEmoji = numStars => {
    if (numStars < 0) {
      console.log('Please provide a non-negative number of stars.');
      return;
    }

    const stars = '⭐️';
    let starString = '';

    for (let i = 0; i < numStars; i++) {
      starString += stars;
    }
    setStars(starString);
  };

  useEffect(() => {
    printStarsEmoji(result.stars);
  }, [result.stars]);

  return (
    <View style={styles.codechefbackground}>
      <View style={styles.userNameBox}>
        <Text style={styles.username}>{result.username}</Text>
        <Text style={styles.ranking}>Ranking: {result.ranking}</Text>
        <Text style={styles.ranking}>{stars}</Text>
      </View>
      <View style={{flex: 1, paddingTop: 20}}>
        <Text style={styles.tittle}>Recent Problems Solved</Text>
        <FlatList
          data={result.practiceProblems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.listofPractice}>
              <Text style={styles.listofText}>{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

// CodeForcesDashboard Component

const CodeForcesDashboard = ({route}) => {
  const result = route.params;
  const [stars, setStars] = useState('');

  const printStarsEmoji = numStars => {
    if (numStars < 0) {
      console.log('Please provide a non-negative number of stars.');
      return;
    }

    const stars = '⭐️';
    let starString = '';

    for (let i = 0; i < numStars; i++) {
      starString += stars;
    }
    setStars(starString);
  };

  useEffect(() => {
    printStarsEmoji(result.stars);
  }, [result.stars]);

  console.warn('create :', result);
  return (
    <View style={styles.codeforcesbackground}>
      <View style={styles.codeforcesuserNameBox}>
        <Text style={styles.codeforcesusername}>{result.username}</Text>
        <Text style={styles.codeforcesranking}>Ranking: {result.rating}</Text>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          Contests Participated: {result.contestsParticipatedIn}
        </Text>
        <Text style={styles.ranking}>{stars}</Text>
      </View>
      <View style={{paddingTop: 20}}>
        <ScrollView>
          <Text style={styles.codeforcestittle}>Recent Problems Solved</Text>

          <FlatList
            data={result.recentlySolvedProblems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.codeforceslistofPractice}>
                <Text style={styles.codeforceslistofText}>{item}</Text>
              </View>
            )}
          />
          <Text style={styles.codeforcestittle}>Participated Contests</Text>
          <FlatList
            data={result.contestsParticipated}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.codeforceslistofPractice}>
                <Text style={styles.codeforceslistofText}>{item}</Text>
              </View>
            )}
          />
          <ScrollView>
            <Text style={styles.codeforcestittle}>Upcoming Contests</Text>
            <FlatList
              data={result.upcomingContests}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={styles.codeforceslistofPractice}>
                  <Text style={styles.codeforceslistofTextContest}>
                    {item.id}
                  </Text>
                  <Text style={styles.codeforceslistofTextContest}>
                    {item.name}
                  </Text>
                  <Text style={styles.codeforceslistofTextContest}>
                    {item.type}
                  </Text>
                  <Text style={styles.codeforceslistofTextContest}>
                    {item.relativeTimeHours}
                  </Text>
                  <Text style={styles.codeforceslistofTextContest}>
                    {item.durationHours} Hrs
                  </Text>
                  <Text style={styles.codeforceslistofTextContest}>
                    {item.startTime}
                  </Text>
                </View>
              )}
            />
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CodeChefDashboard" component={CodeChefDashboard} />
        <Stack.Screen
          name="CodeForcesDashboard"
          component={CodeForcesDashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
