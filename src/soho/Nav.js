import {
    getColor
} from './Tools';

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
            title: button.title,
            id: button.id,
            buttonFontFamily: 'soho',
            showAsAction: 'always'
        });
    });

    page.props.navigator.setButtons({ rightButtons: buttons });

    page.props.navigator.setOnNavigatorEvent(event => {
        if (page[event.id]) {
            page[event.id]();
        }
    });
}
