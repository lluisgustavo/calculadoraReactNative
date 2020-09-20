import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button,
  TouchableOpacity
} from 'react-native';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';


export default class App extends Component {

  constructor() {
    super()
    this.state = {
      resultText: "",
      calculationText: ""
    }
    this.operations = ['DEL', 'C', '+', '-', '*', '/']
  }  

  calculateResult(){
    var text = this.state.resultText
    if(text.endsWith('+') || text.endsWith('-') || text.endsWith('*') || text.endsWith('/')){
      return
    }

    this.setState({
      calculationText:eval(text)
    })
  }

  buttonPressed(text){
    if(text === '='){
      return this.calculateResult()
    } 

    if(this.state.resultText.includes('.')) return
    
    this.setState({
        resultText: this.state.resultText + text
    })
  }

  operate(operation){
    switch(operation){
      case 'DEL':
        let text = this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText: text.join('')
        })
        break
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.resultText.split('').pop()
        if(this.operations.indexOf(lastChar) > 0) return
        if(this.state.text == "") return
        this.setState({
          resultText: this.state.resultText + operation
        })
        case 'C':
          if (this.state.resultText > 0){
            this.setState({
              resultText: "",
              calculationText: ""
            })
          }
    }
  }
  render() {
    let rows = [];
    let nums = [[7, 8, 9], [4, 5, 6], [1, 2, 3], ['.', 0, '=']]
    for(let i = 0; i < 4; i++){
      let row = []
      for(let j = 0; j < 3; j++){
        row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>)
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    let ops = []
    for(let i = 0; i < 6; i++){
      ops.push(<TouchableOpacity key={this.operations[i]} style={styles.btn}>
        <Text onPress={() => this.operate(this.operations[i])} style={styles.btnText}>{this.operations[i]}</Text>
      </TouchableOpacity>)
    }
    
    return (
      <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.resultText}>{this.state.resultText}</Text>
      </View>
      <View style={styles.calculation}>
        <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
      <View style={styles.buttons}>
        <View style={styles.numbers}>
          {rows}
        </View>
        <View style={styles.operations}>
          {ops}
        </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultText: {
    fontSize: 50,
    color: 'black'
  },
  btnText:{
    fontSize: 30,
    color: 'white'
  },
  white: {
    color: 'white'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent:'center',
  },
  calculationText: {
    fontSize: 50,
    color: 'black'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  result: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation: {  
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343',
  }, 
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#636363',
  }
});
