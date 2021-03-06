import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import AuthContext from '../context/auth-context';

class App extends Component {
  // 1. Lifecycle #1
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  /* State can be set inside the constructor 'this.state = ...' however it is done implicitly with below code */
  state = {
    persons: [
      { id: 'djue3', name: 'Max', age: 28 },
      { id: 'cije3',name: 'Manu', age: 29 },
      { id: 'hfcd5', name: 'Stephanie', age: 26 }
    ],
    showPeople: false,
    changeCounter: 0,
    auth: false
  };

  // 2. Lifecycle #2
  static getDerivedStateFromProps(props, state) 
  {
    console.log(`[App.js] getDerivedStateFromProps, props: ${props}`)
    return state;
  }

  // Updating State
  componentDidMount = () => console.log('[App.js] componentDidMount');

  shouldComponentUpdate(nextProps, prevProps) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  nameChangedHandler = (event, id) => {
    // Get a copy of the persons state
    const persons = [...this.state.persons];

    // Get the ID of the current person
    const personIndex = persons.findIndex(p => p.id === id);

    // * Get the person out of the state using the ID - immutably
    const person = {
      ...persons[personIndex]
    };

    // Change the value of the name of the current person
    person.name = event.target.value;

    // Update the persons array
    persons[personIndex] = person;

    // Update the persons state
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
    })

    console.log(`Counter: ${this.state.changeCounter}`);
  }

  usernameChangedHandler = (event) => {
    this.setState({
      usernames: [event.target.value, 'Bob']
    });
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  displayPeopleChangedHandler = () => {
    const doesShow = this.state.showPeople;
    this.setState({showPeople: !doesShow});
  };

  loginHandler = () => {
    this.setState({auth: true});
  }

  // 3. Lifecycle #3
  render() {
    console.log('[App.js] render');
    let people = null;
    

    if (this.state.showPeople) {
      people = <div>
          <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuth={this.state.auth}> 
          </Persons>
        </div>;
    }

    return (
      <div className={classes.App}>
        <Cockpit
        showPersons={this.state.showPeople}
        persons={this.state.persons}
        clicked={this.displayPeopleChangedHandler}
        login={this.loginHandler}/>
        {people}
      </div>
    );
  }
}

export default App;
