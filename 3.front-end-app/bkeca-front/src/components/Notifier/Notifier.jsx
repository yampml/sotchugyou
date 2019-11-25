import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import * as actions from '../../store/actions/actionIndexes';

class Notifier extends Component {
    displayed = [];

    storeDisplayed = (id) => {
        this.displayed = [...this.displayed, id];
    };


    removeDisplayed = (id) => {
        this.displayed = this.displayed.filter(key => id !== key)
    }

    componentDidUpdate() {
        this.props.notifications.notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                this.props.closeSnackbar(key)
                return
            }
            // Do nothing if snackbar is already displayed
            if (this.displayed.includes(key)) return;
            // Display snackbar using notistack
            this.props.enqueueSnackbar(message, {
                key,
                ...options,
                onClose: (event, reason, key) => {
                    if (options.onClose) {
                        options.onClose(event, reason, key);
                    }
                },
                onExited: (event, key) => {
                    this.props.removeSnackbar(key);
                    this.removeDisplayed(key)
                }
            });
            // Keep track of snackbars that we've displayed
            this.storeDisplayed(key);
        });
    }

    render() {
        return null;
    }
}

const mapStateToProps = store => ({
    notifications: store.notifications,
});

const mapDispatchToProps = dispatch => bindActionCreators({ removeSnackbar: actions.removeSnackbar }, dispatch);

export default withSnackbar(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Notifier));
