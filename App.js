import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button,
  TouchableOpacity
} from 'react-native';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      //construindo o texto do display
      resultText: "",
      //construindo o texto do cálculo
      calculationText: ""
    }
    //definindo operações
    this.operations = ['DEL', '+', '-', '*', '÷']
  }  

  calculateResult(){
    //variavel com o texto do display
    var text = this.state.resultText
    //caso o texto termine com os operadores, não fazer a operação
    if(text.endsWith('+') || text.endsWith('-') || text.endsWith('*') || text.endsWith('÷')) ReloadInstructions

    //trocar depois para uma função não eval
    if(text.endsWith('%')){
      let evaluation = eval(text.slice(0, -1))
      this.setState({
        calculationText:eval(text.slice(0, -1))/100
      })
    } else {
      this.setState({
        calculationText:eval(text)
      })
    }
  }

  buttonPressed(text){
    
    /*this.setState({
      resultText: this.state.resultText + text
    })*/
    switch(text){
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case '%':
        return(
          this.setState({ 
            resultText: this.state.resultText + text
          })
        )
        break
      case '=':
        return this.calculateResult()    
      case 'C':
        //se o display tiver algum número, reseta (clear)
        if (this.state.resultText.length > 0){
          return(
            this.setState({ 
              resultText: "",
              calculationText: ""
            })
          )
        }
        break
      case '.':
        //não deixar multiplos '.' seguidos
        if(this.state.resultText.endsWith('.')) return
        //se houver algum '.', não deixar colocar - exemplo: 34.34.34
        else if(this.state.resultText.split(".").length - 1 > 0) return
        //caso validado, texto + '.'
        else{
          this.setState({
            resultText: this.state.resultText + text
          })
        }
        break
      case '⁺∕₋': 
        console.log(parseFloat(this.state.resultText), this.state.resultText.type)
        //existe numero a ser calculado?
        if(this.state.resultText.length > 0){
        //verifica se o número é maior ou menor que 0
        if(parseFloat(this.state.resultText) > 0){
          this.setState({
            resultText: '-' + this.state.resultText
          })
        } else if(parseFloat(this.state.resultText) < 0) {
          this.setState({
            //retira o primeiro caracter da string resultText
            resultText: this.state.resultText.substring(1)
          })
          console.log('working')
        } else if(this.state.resultText == '0') return
        break;
        
      }
    }
  }

  operate(operation){
    switch(operation){
      case 'DEL':
        //separa o resultText em uma array com todos os caracteres
        let text = this.state.resultText.split('')
        //retira o ultimo elemento da array
        text.pop()

        //remonta em uma string
        this.setState({
          resultText: text.join('')
        })
        break
      case '+':
      case '-':
      case '*':
      case '÷':
        //caso as operações forem * ou /
        if(operation === "*" || operation === "/"){
          //checar se tem algum número antes
          if(this.state.resultText == "") return
        }
        //não colocar mais de um operador junto, se o .indexOf do último caracter der algum retorno > 0 
        // significa que o ultimo caracter está constado na array de operações inicialmente construido
        const lastChar = this.state.resultText.split('').pop()
        if(this.operations.indexOf(lastChar) > 0) return

        if(this.state.text == "") return
        this.setState({
          resultText: this.state.resultText + operation
        })
        break
    }
  }

  render() {
    let rows = [];
    //No inicio tinha só numeros, decidi colocar mais funções
    let nums = [['C', '⁺∕₋', '%'], [7, 8, 9], [4, 5, 6], [1, 2, 3], ['.', 0, "="]]
    for(let i = 0; i < 5; i++){
      let row = []
      for(let j = 0; j < 3; j++){
        row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>)
        }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    let ops = []
    for(let i = 0; i < 5; i++){
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
    fontSize: 40,
    color: '#bcbabc'
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
