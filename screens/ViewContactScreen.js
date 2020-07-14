import React, { Component } from 'react';
import { Text, 
         View,
         AsyncStorage, 
         StyleSheet, 
         platform, 
         ScrollView, 
         TouchableOpacity, 
         Linking, 
         Alert} 
         from 'react-native';
import {Card, CardItem} from 'native-base';
import { Entypo } from '@expo/vector-icons';

export default class ViewContactScreen extends Component {

//defining constructer
  constructor(props){
    super(props);
    this.state = {
      fname: "DummyText" , 
      lname: "DummyText" ,
      phone: "DummyText" ,
      email: "DummyText" ,
      address: "DummyText" ,
      key: ""
    }
  }

  static navigatioOptions = {
    title:"Contact Manager"
}

UNSAFE_componentWillMount() {
  const {navigation} = this.props;
  navigation.addListener("focus", ()=>{
    var key = this.props.route.params;
    // this.key = this.props.navigation.getParam("key" , "");
    
    //TODO: call a method to use key
    	this.getContact(key);
  })
  }
    //fetching contact
  getContact = async key =>{
    await AsyncStorage.getItem(key.key)
    .then(contactjsonString =>{
      var contact = JSON.parse(contactjsonString);    //converrting string into JSON
      contact["key"] = key;
      this.setState(contact)
    })
    .catch(error =>{
      console.log(error)
    })
  };
      //calling intent
  callAction = phone =>{
    let phoneNumber = phone;
    if (platform.OS !="android") {
      phoneNumber= `telpromt:${phone}`;
    }else{
      phoneNumber= `tel: ${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
    .then(  supported =>{
      if (!supported) {
        Alert.alert("Phone number isn't Available")
      }else{
        return
              Linking.openURL(phoneNumber)
      }
    })
    .catch(error =>{
      console.log(error)
    })
  };

      //sms intent
  smsAction = () =>{
    let phoneNumber = phone;
    phoneNumber = `sms: ${phone}` //checking OS supporting using the above variable phone
    Linking.canOpenURL(phoneNumber)
    .then(  supported =>{
      if (!supported) {
        Alert.alert("Phone number isn't Available")
      }else{
        return
              Linking.openURL(phoneNumber)
      }
    })
    .catch(error =>{
      console.log(error)
    })
  }
  
  //EDIT method
  editContact = () =>{
    this.props.navigation.navigate('Edit' , {key: key});
  }

  deleteContact = (key) =>{
    Alert.alert(
      "Delete contact ?",
      `${this.state.fname} ${this.state.lname}`,
      [
        {
          text: "Cancel" , onPress: () => console.log("Cancel tapped")
        },
        {
          text: "OK" ,
          onPress: async ()=>{
            await AsyncStorage.removeItem(key)
            .then( () =>{
              this.props.navigation.goBack();
            } )
            .catch(error =>{
              console.log(error)
            })
              
          }
        }
      ]

    )
  }



  render() {
    return (
      <ScrollView style={styles.container}>
        <View style = {styles.contactIconContainer}>
          <Text style = {styles.contactIcon}>
            {this.state.fname[0].toUpperCase()}
          </Text>
          <View style = {styles.nameContainer}>
          <Text style = {styles.name}>
            {this.state.fname} {this.state.lname}
          </Text>
          </View>
        </View>
        <View style = {styles.infoContainer}>
          <Card>
            <CardItem
              bordered  >
                <Text style = {styles.infoText}>
                  Phone
                </Text>
            </CardItem>
            <CardItem
              bordered
            >
                <Text style = {styles.infoText}>
                  {this.state.phone}
                </Text>
            </CardItem>
          </Card><Card>
            <CardItem
              bordered  >
                <Text style = {styles.infoText}>
                  Email
                </Text>
            </CardItem>
            <CardItem
              bordered
            >
                <Text style = {styles.infoText}>
                  {this.state.email}
                </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem
              bordered  >
                <Text style = {styles.infoText}>
                  Address
                </Text>
            </CardItem>
            <CardItem
              bordered
            >
                <Text style = {styles.infoText}>
                  {this.state.address}
                </Text>
            </CardItem>
          </Card>
        </View>
        <Card style = {styles.actionContainer}>
          <CardItem bordered style = {styles.actionButton}>
            <TouchableOpacity
              onPress = { ()=>{
                this.smsAction(this.state.phone)
              }}
            >
              <Entypo
                name = "message"
                size = {50}
                color = '#B83227'
              />
              <Text style = {styles.actionText}>Message</Text>
            </TouchableOpacity>
          </CardItem>
          <CardItem bordered style = {styles.actionButton}>
            <TouchableOpacity
              onPress = { ()=>{
                this.callAction(this.state.phone)
              }}
            >
              <Entypo
                name = "phone"
                size = {50}
                color = '#45CE30'
              />
              <Text style = {styles.actionText}>Phone</Text>
            </TouchableOpacity>
          </CardItem>
        </Card>
        <Card style = {styles.actionContainer}>
          <CardItem bordered style = {styles.actionButton}>
            <TouchableOpacity
              onPress = { ()=>{
                this.editContact(this.state.key)
              }}
            >
              <Entypo
                name = "edit"
                size = {50}
                color = '#B83227'
              />
              <Text style = {styles.actionText}>Edit</Text>
            </TouchableOpacity>
          </CardItem>
          <CardItem bordered style = {styles.actionButton}>
            <TouchableOpacity
              onPress = { ()=>{
                this.deleteContact(this.state.key);
              }}
            >
              <Entypo
                name = "trash"
                size = {50}
                color = '#B83227'
              />
              <Text style = {styles.actionText}>Trash</Text>
            </TouchableOpacity>
          </CardItem>
        </Card>       
      </ScrollView>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#B83227",
    alignItems: "center",
    justifyContent: "center"
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff"
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900"
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900"
  },
  infoContainer:{
    flexDirection:'column'
  }
});;