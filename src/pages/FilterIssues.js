import React, { Component } from 'react';

import {
    View
} from 'react-native';

import {
    Button,
    Card,
    Navigation,
    Page,
    TextInput,
    Picker,
    Loading
} from '../soho/All';

import {
    AppX,
    OrgPicker,
    Utilities
} from '../gtn/All';

export default class FilterIssues extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        Navigation.set(this, {
            title: 'Filter'
        });
    }

    setFilter() {
        constraints = [];

        if (this.state.subject) {
            constraints.push(`subject CONTAINS "${this.state.subject}"`);
        }
        if (this.state.severity) {
            if (this.state.severity == '0') {
                constraints.push(`severity IS NULL`);
            } else {
                constraints.push(`severity = "${this.state.severity}"`);
            }
        }
        if (this.state.status) {
            constraints.push(`state = "${this.state.status}"`);
        }
        if (this.state.issueType) {
            if (this.state.issueType == '0') {
                constraints.push(`issueType IS NULL`);
            } else {
                constraints.push(`issueType = "${this.state.issueType}"`);
            }
        }
        if (this.state.assignedTo) {
            constraints.push(`assignedTo.memberId = "${this.state.assignedTo}"`);
        }
        if (this.state.description) {
            constraints.push(`description CONTAINS "${this.state.description}"`);
        }

        query = '';
        constraints.forEach(item => {
            if (query.length > 0) {
                query += ' AND ';
            }
            query += item;
        });

        this.props.navigator.pop();
        this.props.setFilter(query);
    }

    render() {
        return (
            <Page>
                <Card>
                    <TextInput
                        label='Subject'
                        value={this.state.subject}
                        onChangeText={(text) => this.setState({ subject: text })}
                    />
                    <Picker
                        label='Severity'
                        selectedValue={this.state.severity}
                        onValueChange={item => this.setState({ severity: item })}
                    >
                        <Picker.Item label='High' value='3' />
                        <Picker.Item label='Medium' value='2' />
                        <Picker.Item label='Low' value='1' />
                        <Picker.Item label='Not Set' value='0' />
                        <Picker.Item label='None' value={null} />
                    </Picker>
                    <Picker
                        label='Status'
                        selectedValue={this.state.status}
                        onValueChange={item => this.setState({ status: item })}
                    >
                        <Picker.Item label='Opened' value='opened' />
                        <Picker.Item label='Assigned' value='assigned' />
                        <Picker.Item label='Resolved' value='resolved' />
                        <Picker.Item label='Closed' value='closed' />
                        <Picker.Item label='None' value={null} />
                    </Picker>
                    <Picker
                        label='Issue Type'
                        selectedValue={this.state.issueType}
                        onValueChange={item => this.setState({ issueType: item })}
                    >
                        <Picker.Item label='Shipping' value='1' />
                        <Picker.Item label='Factory Supply' value='2' />
                        <Picker.Item label='Quality Control' value='3' />
                        <Picker.Item label='Not Set' value='0' />
                        <Picker.Item label='None' value={null} />
                    </Picker>
                    <OrgPicker
                        label='Assigned To'
                        selectedValue={this.state.assignedTo}
                        onValueChange={item => this.setState({ assignedTo: value })}
                    />
                    <TextInput
                        label='Description'
                        value={this.state.description}
                        onChangeText={(text) => this.setState({ description: text })}
                        multiline
                        rows={3}
                    />
                    <Button
                        title='Set filter'
                        onPress={() => this.setFilter()}
                        primary
                    />
                </Card>
            </Page>
        );
    }
}
