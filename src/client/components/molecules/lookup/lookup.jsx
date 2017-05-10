import React from "react"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RestContentActions from "../../../actions/rest-content.js"

import styles from "./lookup.scss";
import states from "../../../services/us-states.json";
import SimpleSelect from "../../atoms/simple-select/simple-select.jsx";

class Lookup extends React.Component {

  constructor() {
    super();
    this.state = {
      displayedItems: []
    }
  }

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded(this.props.type);
  }

  handleChange(selectValue) {
    let newDisplayedItems = _.filter(this.props.items, {state: selectValue});
    this.setState({displayedItems: newDisplayedItems});
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <h4 className={styles.title}>{this.props.title}</h4>
          <div key={1} className={styles.selectContainer}>
            <SimpleSelect id="lookup-select" options={states} onChange={this.handleChange.bind(this)}/>
          </div>
          <div key={2} className={styles.dataContainer}>{this.state.displayedItems.map(function(item, index) {
              return (
                <p key={index}>
                  {JSON.stringify(item)}
                </p>
              );
            })}</div>
        </div>
      </div>
    )
  }
}

Lookup.propTypes = {
  title: React.PropTypes.string,
  type: React.PropTypes.string,
  display: React.PropTypes.string
}

Lookup.defaultProps = {
  title: "Lookup Title",
  type: "contacts",
  display: "cards",
  items: []
}

function mapReduxStateToProps(reduxState, ownProps) {
  return {
    items: reduxState.restContent[ownProps.type]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RestContentActions, dispatch)
  }
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(Lookup);
