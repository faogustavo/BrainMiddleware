import React from 'react';
import { Content, DataTable, TableHeader, Switch } from 'react-mdl';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { receivers } from '../Redux/Actions';

class ReceiverDataTable extends React.Component {
  changeHandlerState(pkg, newValue) {
    if (newValue) {
      if (this.props.activate) {
        this.props.activate(pkg);
      }
    } else if (this.props.deactivate) {
      this.props.deactivate();
    }
  }

  _isRowChecked(pkg) {
    return this.props.activeItem === pkg;
  }

  render() {
    return (
      <Content>
        <DataTable
          style={{ width: '100%' }}
          rowKeyColumn="package"
          rows={this.props.plugins}
          sortable
        >
          <TableHeader
            name="status"
            cellFormatter={(status, row) => (
              <Switch
                id="activated"
                name={row.package}
                checked={this._isRowChecked(row.package)}
                onChange={(event) => {
                  this.changeHandlerState(row.package, event.target.checked);
                }}
              />
            )}
          >
      Status
          </TableHeader>
          <TableHeader name="name">
      Nome
          </TableHeader>
          <TableHeader name="package">
      Pacote
          </TableHeader>
        </DataTable>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  activeItem: state.receivers.activePlugin,
  plugins: state.receivers.plugins,
});

const mapDispatchToProps = dispatch => bindActionCreators(receivers, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverDataTable);
