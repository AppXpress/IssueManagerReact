import { Navigation } from 'react-native-navigation';

import Login from './src/pages/Login';
import IssueList from './src/pages/IssueList';
import FilterIssues from './src/pages/FilterIssues';
import IssueDetails from './src/pages/IssueDetails';
import CreateIssue from './src/pages/CreateIssue';
import CreateMessage from './src/pages/CreateMessage';
import CameraScreen from './src/pages/CameraScreen';


/**
* Entry-point for Android devices. Registers all necesarry pages
* to the navigation library.
*/
Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('IssueList', () => IssueList);
Navigation.registerComponent('FilterIssues', () => FilterIssues)
Navigation.registerComponent('IssueDetails', () => IssueDetails);
Navigation.registerComponent('CreateIssue', () => CreateIssue);
Navigation.registerComponent('CreateMessage', () => CreateMessage);
Navigation.registerComponent('CameraScreen', () => CameraScreen);

Navigation.startSingleScreenApp({
	screen: { screen: 'Login' }
});
