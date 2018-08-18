import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text, View, TextInput, Image, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './CreateProfileStyles';
import TextField from '../TextField/TextField';
import { TextInputField } from '../../../../Components/Common';

export const CreateProfile =({addAlert, user_id, createProfile,
   handleSubmit, fields: {firstName, lastName, phonenumber, dob, make, model, year, license, color}}) => {
  // const {handleSubmit, fields: {email, password}} = this.props;

   onCreateProfile = (values) => {
    // console.log('submitting form', values)
    console.log(values)
    // console.log(values.email, values.password);
    // addAlert('hello');
    // addAlert('Testing 123');
    // authUser('fakeid');
   //  createProfile(values);
    // var {email, password} = this.props.fields;
      
   }

   onSignUp = (values) => {
    signupUser(values.email, values.password)      
   }

   return (
      <KeyboardAvoidingView behavior="padding"  keyboardVerticalOffset={Platform.select({ios: 0, android: 25})} style={styles.container}>
      <ScrollView>
         <View style={styles.titleContainer}>
            <Image style={styles.logo} source={require('../../../../Assets/img/ButterFLi-logo-header.png')}/>
            {/* <Text style={styles.title}> ButterFLi </Text> */}
         </View>
         <View style={styles.field}>
            <Field
               {...firstName}
               withRef
               refField='firstName'
               ref={(c) => this.firstName = c}
               name="firstName"
               component={TextInputField}
               placeholder="First Name"
               validate={this.renderError}
               returnKeyType="next"
               onEnter={() => { 
                  this.lastName.getRenderedComponent().refs.lastName.focus()
               }}
            />
            
         </View>
         <View style={styles.field}>
            <Field
               {...lastName}
               withRef
               refField='lastName'
               ref={(c) => this.lastName = c}
               name="lastName"
               component={TextInputField}
               placeholder="Last Name"
               validate={this.renderError}
               returnKeyType="next"
               onEnter={() => { 
                  this.phonenumber.getRenderedComponent().refs.phonenumber.focus()
               }}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...phonenumber}
               withRef
               refField='phonenumber'
               ref={(c) => this.phonenumber = c}
               name="phonenumber"
               component={TextInputField}
               placeholder="Phone Number"
               validate={this.renderError}
               returnKeyType="next"
               onEnter={() => { 
                  this.dob.getRenderedComponent().refs.dob.focus()
               }}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...dob}
               withRef
               refField='dob'
               ref={(c) => this.dob = c}
               name="dob"
               component={TextInputField}
               placeholder="Date of Birth"
               returnKeyType="next"
            />
         </View>
         <View style={styles.field}>
            <Field
               {...make}
               name="make"
               component={TextField}
               placeholder="Vehicle Make"
               validate={this.renderError}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...model}
               name="model"
               component={TextField}
               placeholder="Car Model"
               validate={this.renderError}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...year}
               name="year"
               component={TextField}
               placeholder="Year"
               validate={this.renderError}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...license}
               name="license"
               component={TextField}
               placeholder="License Plate"
               validate={this.renderError}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...color}
               name="color"
               component={TextField}
               placeholder="Color of Vehicle"
               validate={this.renderError}
            />
         </View>
         <View style={styles.buttonView}>
            <Button style={styles.signinBtn} onPress={handleSubmit(this.onCreateProfile)}>
               <Text style={styles.btnText}>Submit</Text>
            </Button>
            {/* 
               <Button  style={styles.signup}>
                  <Text style={styles.btnText}>Cancel</Text>
               </Button>
            */}
         </View>
         </ScrollView>
      </KeyboardAvoidingView>
   )
}


var validate = (formProps) => {
   var errors = {};
   if(!formProps.firstName){
      errors.firstName = "Please enter an first name."
   }
   if(!formProps.lastName){
      errors.lastName = "Please enter a last name."
   }
   if(!formProps.phonenumber){
      errors.phonenumber = "Please enter a phone number."
   }
   if(!formProps.dob){
      errors.dob = "Please enter a date of birth."
   }
   return errors;
}

module.exports = reduxForm({
   form: 'createProfile',
   fields: ['firstName', 'lastName', 'phonenumber', 'dob', 'make', 'model', 'year', 'license', 'color'],
   validate: validate
}, null, null)(CreateProfile);