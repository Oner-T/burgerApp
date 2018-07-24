import React, { Component } from 'react';
import './App.css';
import Person from './Person'

class App extends Component {
  state = {
    persons: [
      { id: 0, name: "Öner", age: "34" },
      { id: 1, name: "Mehmet", age: "20" },
      { id: 2, name: "Fatma", age: "25" }
    ],
    showpersons: true

  };

  nameChangedHandler = (personIndex, event) => {
    const persons = [...this.state.persons];
    persons[personIndex].name = event.target.value;;
    this.setState({ persons: persons })

  };

  deletePersonHandler = (personIndex) => {

    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });

  };

  render() {

    let persons = null;
    if (this.state.showpersons) {
      persons =
        (<div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              change={(event) => this.nameChangedHandler(index, event)}
              name={person.name}
              age={person.age}
              key={person.id} />
          })}
        </div>)

    };
    return (
      <div>{persons}</div>
    );
  }
}

export default App;
