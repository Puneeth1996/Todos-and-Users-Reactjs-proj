import React, { Component } from 'react';
import {  Input, Tooltip, Icon, Popconfirm, Modal, Divider, Button, Table, Menu, } from 'antd';
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
            {
                title: 'Action',
                key: 'action',
                render: (text, record) =>
                    this.state.dataSourceUsers.length >= 1 ? (
                        <>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete1(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        </>
                    ) : null,
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
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) =>
                    this.state.dataSourceTodo.length >= 1 ? (
                        <>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete2(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        </>
                    ) : null,
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


    handleDelete1 = key => {
        console.log('click handleDelete1');
        const dataSourceUsers = [...this.state.dataSourceUsers];
        this.setState({ dataSourceUsers: dataSourceUsers.filter(item => item.key !== key) });
    };


    handleDelete2 = key => {
        console.log('click handleDelete2');
        const dataSourceTodo = [...this.state.dataSourceTodo];
        this.setState({ dataSourceTodo: dataSourceTodo.filter(item => item.key !== key) });
    };


    // onItemClick = (key) => {
    //     console.log('click onItemClick',key);
    // };


    // onRowClick = (record) => {
    //     console.log('click onRowClick',record);
    //     return {
    //         onDoubleClick: () => {
    //             // popup a promt;
    //             alert('Clicking');
    //         },
    //     };
    // };


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
                    {   
                        this.state.current === 'Todos' ?
                        <>
                        <Input
                            placeholder="Enter your Activity"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="Add Your Activity">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                        <Input
                            placeholder="Enter your Activity status"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="Add Your Activity status">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                        </>
                        :
                        <>
                        <Input
                            placeholder="Enter your username"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="Add Your Username">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                        <Input
                            placeholder="Enter your Email"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="Add Your Email">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                        </>
                    }
				</Modal>
                {   
                    this.state.current === 'Todos' ?
                    <Table rowKey={this.state.id} dataSource={this.state.dataSourceTodo} columns={this.state.columnsTodo} bordered /> :
                    <Table rowKey={this.state.id} dataSource={this.state.dataSourceUsers} columns={this.state.columnsUsers} bordered />
                }
            </div>
        )
    }
}

