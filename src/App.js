import React, { Component } from 'react'
import axios from 'axios';
import Table from './Table'
import Form from './Form';
class App extends Component {
  state = {
    characters:[
      {
        name: 'Charlie',
        job: 'Janitor',
      },
      {
        name: 'Mac',
        job: 'Bouncer',
      },
      {
        name: 'Dee',
        job: 'Aspring actress',
      },
      {
        name: 'Dennis',
        job: 'Bartender',
      },
    ]
   }
   componentDidMount(){
    axios.get('http://localhost:5000/users')
    .then(res => {
      const characters = res.data.users_list;
      this.setState({ characters });
    })
    .catch(function (error) {
      console.log(error);
    });
   }
    render() {
       const { characters } = this.state; 
      return (
         <div className = "container">
            <Table characterData={characters} removeCharacter = {this.removeCharacter} />
            <Form handleSubmit = {this.handleSubmit}/>
         </div>
      );
   }
  
  removeCharacter = index => {
   const { characters } = this.state
   this.setState({
      characters: characters.filter((character, i) => {
         return i !== index
      }), 
   })
  }
  handleSubmit = character => {
   this.makePostCall(character).then( callResult => {
      if (callResult.status === 201) {
         this.setState({ characters: [...this.state.characters, callResult.data] });
         console.log("Hello")
      }
   });
 }
makePostCall(character){
   return axios.post('http://localhost:5000/users', character)
    .then(function (response) {
      console.log(response);
      return (response);
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
 }



}






export default App
