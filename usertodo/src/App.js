import React, { Component } from 'react';
import { Modal, Button, Table, Menu, Icon } from 'antd';
import './App.css';




export default class App extends Component {

    state = {
        current: 'Todos',
        visible: false,
        columnsUsers: [
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
        dataSourceUsers: [
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
                title: 'Todo Activity',
                dataIndex: 'activity',
                key: 'activity',
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
                activity: 'Should wash clothes',
                status: 'pending',
            },
            {
                key: '2',
                activity: 'Run For 5km in the morning',
                status: 'completed',
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
				<Modal title={"Add New "+this.state.current} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</Modal>
                {this.state.current === 'Todos' ? <Table dataSource={this.state.dataSourceTodo} columns={this.state.columnsTodo} /> : <Table dataSource={this.state.dataSourceUsers} columns={this.state.columnsUsers} />} 
                {/* <Table dataSource={data} columns={colu} />
                <Modal title={modelTitleStr} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</Modal> */}
            </div>
        )
    }
}
