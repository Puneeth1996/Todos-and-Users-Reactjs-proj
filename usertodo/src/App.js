import React, { Component } from 'react';
import {  Table, Menu, Icon } from 'antd';
import './App.css';


const dataSource = [
    {
        key: '1',
        name: 'Mike',
        email: 32,
    },
    {
        key: '2',
        name: 'John',
        email: 42,
    },
    {
        key: '3',
        name: 'Mike',
        email: 32,
    },
    {
        key: '4',
        name: 'John',
        email: 42,
    },
    {
        key: '5',
        name: 'Mike',
        email: 32,
    },
    {
        key: '6',
        name: 'John',
        email: 42,
    },
    {
        key: '7',
        name: 'Mike',
        email: 32,
    },
    {
        key: '8',
        name: 'John',
        email: 42,
    },

];


const columns = [
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
];



export default class App extends Component {

    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <div className="App">
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="mail">
                        <Icon type="mail" />
                            Todos
                    </Menu.Item>
                    <Menu.Item key="app">
                        <Icon type="appstore" />
                        Users
                    </Menu.Item>
                </Menu>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        )
    }
}
