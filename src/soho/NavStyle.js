import {
    getColor
} from './Tools';

export default class NavStyle {
    constructor(config) {
        if (!config) {
            config = {};
        }

        this.navBarTextFontFamily = 'soho';
        this.navBarSubtitleFontFamily = 'soho';
        this.navBarTextColor = getColor('white-0');
        this.navBarBackgroundColor = getColor(config.hue + '-7', 'azure-7');
        this.statusBarColor = getColor(config.hue + '-8', 'azure-8');
        this.navBarButtonColor = getColor('white-0');
    }
}
