import React from 'react';
import { Content, Button, Badge, Icon } from 'react-mdl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { add, subtract } from '../Redux/Actions';

class HomeContent extends React.Component {
  render() {
    return (
      <Content>
        <br />
        <Badge text={this.props.value || 0} overlap>
          <Icon name="confirmation_number" />
        </Badge>
        <br />
        <Button raised colored onClick={this.props.add}>Add</Button>
        <br />
        <Button raised colored onClick={this.props.subtract}>Subtract</Button>
      </Content>
    );
  }
}

const mapStateToProps = state => ({ value: state.value });
const mapDispatchToProps = dispatch => bindActionCreators({ add, subtract }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);
