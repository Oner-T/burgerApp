import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTest } from '../../store/actions/test';
import classes from './Test.css';

class Test extends Component {
  state = {
    test: null,
  };
  componentDidMount() {
    this.props.fetchTest();
    this.setState({ test: this.props.test.testList.data });
    console.log(this.props.test.testList);
  }

  componentDidUpdate(nextProps) {
    if (nextProps.test.testList !== this.props.test.testList)
      this.setState({ test: this.props.test.testList });
  }

  render() {
    return (
      <div className={classes.container}>
        {this.state.test &&
          this.state.test.map((result) => (
            <div className={classes.item}>
              <div className={classes.title}>{result.title}</div>
              <div className={classes.body}>{result.body}</div>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  test: state.test,
});

export default connect(mapStateToProps, { fetchTest })(Test);
