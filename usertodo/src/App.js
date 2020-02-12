import React, { Component } from 'react';
import { Modal, Button, Table, Menu, Icon } from 'antd';
import './App.css';

export default class App extends Component {

    state = {
        current: 'Todos',
        visible: false,
        columnsUser: [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
        ],
        dataSourceUser: [
            {
                key: '1',
                name: 'Mike',
                email: 'Mike@gmail.com',
            },
            {
                key: '2',
                name: 'John',
                email: 'John@gmail.com',
            },
        ],
        columnsTodo: [
            {
                title: 'Todo Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Todo Status',
                dataIndex: 'status',
                key: 'status',
            },
        ],
        dataSourceTodo: [            
            {
                key: '1',
                name: 'Should wash clothes',
                email: 'pending',
            },
            {
                key: '2',
                name: 'Run For 5km in the morning',
                email: 'completed',
            },
        ],
        
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
	
    showModal = () => {
		this.setState({
			visible: true,
		});
	};

	handleOk = e => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

	handleCancel = e => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

    render() {
        const dataSource =[]
        const columnsSource =[]
        const modelTitle=''
        console.log(this.state.current)
        console.log(this.state.current=='Todos')
        if(this.state.current=='Todos'){
            const dataSource = this.state.dataSourceTodo.slice();
            const columnsSource = this.state.columnsSourceTodo.slice();
            const modelTitle="Insert New "+this.state.current
        }

        console.log(dataSource,columnsSource,modelTitle)

        return (
            <div className="App">
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="Todos">
                        <Icon type="Todos" />
                            Todos
                    </Menu.Item>
                    <Menu.Item key="Users">
                        <Icon type="Users" />
                        Users
                    </Menu.Item>
                </Menu>
				
				<Button onClick={this.showModal}>Add {this.state.current}</Button>
				
                <Table dataSource={dataSource} columns={columnsSource} />

                <Modal title={modelTitle} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</Modal>
            </div>
        )
    }
}
