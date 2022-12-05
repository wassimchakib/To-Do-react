import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class TodoItem extends React.Component {
  render() {
    const { todo } = this.props;
    return <li>{todo.title}</li>;
  }
}

TodoItem.propTypes = {
  todo: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default TodoItem;
