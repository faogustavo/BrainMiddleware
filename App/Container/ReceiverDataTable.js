import React from 'react';
import { Content, DataTable, TableHeader, Switch } from 'react-mdl';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { receivers } from '../Redux/Actions';

class ReceiverDataTable extends React.Component {
  _changeHandlerState(pkg, newValue) {
    if (this.props.running) {
      return;
    }

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
        >
          <TableHeader
            name="status"
            cellFormatter={(status, row) => (
              <Switch
                id="activated"
                name={row.info.package}
                checked={this._isRowChecked(row.info.package)}
                disabled={this.props.running}
                onChange={(event) => {
                  this._changeHandlerState(row.info.package, event.target.checked);
                }}
              />
            )}
          >
            Status
          </TableHeader>
          <TableHeader
            name="name"
            cellFormatter={(name, row) => name || row.info.name}
          >
            Nome
          </TableHeader>
          <TableHeader
            name="package"
            cellFormatter={(pkg, row) => pkg || row.info.package}
          >
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
  running: state.app.running,
});

const mapDispatchToProps = dispatch => bindActionCreators(receivers, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverDataTable);
