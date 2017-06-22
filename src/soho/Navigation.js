import {
    Platform
} from 'react-native';

import {
    getColor
} from './Tools';

import Icon from './Icon';

export function bind(page) {
    page.props.navigator.setOnNavigatorEvent(event => {
        if (page[event.id]) {
            page[event.id]();
        }
    });
}

export function set(page, config) {
    if (!config) {
        config = {};
    }
    if (!config.buttons) {
        config.buttons = [];
    }

    page.props.navigator.setTitle({ title: config.title });

    page.props.navigator.setStyle({
        navBarTextFontFamily: 'soho',
        navBarSubtitleFontFamily: 'soho',
        navBarTextColor: getColor('white-0'),
        navBarBackgroundColor: getColor(config.hue + '-7', 'azure-7'),
        statusBarColor: getColor(config.hue + '-8', 'azure-8'),
        navBarButtonColor: getColor('white-0')
    });

    var buttons = [];
    config.buttons.map(button => {
        buttons.push({
            title: getTitle(button, buttons),
            id: button.id,
            buttonFontFamily: 'soho',
            showAsAction: buttons.length == 0 ? 'always' : 'never'
        });
    });

    page.props.navigator.setButtons({ rightButtons: buttons.reverse() });

    page.props.navigator.setOnNavigatorEvent(event => {
        if (page[event.id]) {
            page[event.id]();
        }
    });
}

function getTitle(button, buttons) {
    if (Platform.OS == 'android' && buttons.length > 0) {
        return Icon.getChar(button.icon) + '   ' + button.id.charAt(0).toUpperCase() + button.id.substring(1);
    } else {
        return Icon.getChar(button.icon);
    }
}
