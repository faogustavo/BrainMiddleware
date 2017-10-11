import React from 'react';
import { Content, DataTable, TableHeader, Switch } from 'react-mdl';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { handlers } from '../Redux/Actions';

class HandlerDataTable extends React.Component {
  changeHandlerState(pkg, newValue) {
    if (newValue) {
      if (this.props.activate) {
        this.props.activate(pkg);
      }
    } else if (this.props.deactivate) {
      this.props.deactivate(pkg);
    }
  }

  _isRowChecked(pkg) {
    return _.findIndex(this.props.activeItems || [], item => item === pkg) >= 0;
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
  activeItems: state.handlers.activePlugins,
  plugins: state.handlers.plugins,
});

const mapDispatchToProps = dispatch => bindActionCreators(handlers, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HandlerDataTable);
