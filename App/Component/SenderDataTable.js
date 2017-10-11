import React from 'react';
import { Content, DataTable, TableHeader, Switch } from 'react-mdl';

export default class SenderDataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSender: '',
      tableData: [
        {
          package: 'com.gustavofao.tcp',
          name: 'Socket TCP',
          status: {
            package: 'com.gustavofao.tcp',
          },
        },
        {
          package: 'com.gustavofao.websocket',
          name: 'Websocket',
          status: {
            package: 'com.gustavofao.Websocket',
          },
        },
      ],
    };
  }

  render() {
    return (
      <Content>
        <DataTable
          style={{ width: '100%' }}
          rowKeyColumn="package"
          rows={this.state.tableData}
          sortable
        >
          <TableHeader
            name="status"
            cellFormatter={status => (
              <Switch
                id="activated"
                name={status.package}
                checked={status.package === this.state.currentSender}
                onChange={(event) => {
                  if (this.state.currentSender === status.package) {
                    this.setState({ currentSender: '' });
                  } else {
                    this.setState({ currentSender: status.package });
                  }
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
