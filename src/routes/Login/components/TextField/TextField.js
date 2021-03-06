import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from './TextFieldStyles';


export const TextField = ({ input: { value, onChange}, ...field } ) => {
      return (
         <View>
            <TextInput
               {...field}
               style={[styles.textInput]}
               autoCapitalize="none"
               autoCorrect={false}
               onChangeText={(value) => onChange(value)} 
               value={value} underlineColorAndroid="transparent" selectTextOnFocus={true} {...this.props}
               onSubmitEditing={() => this.passwordInput.focus()}
            />
            {(field.meta.touched && field.meta.error) &&
                <Text style={styles.formError}>{field.meta.error}</Text>
            }
         </View>
      );
}
  export default TextField;