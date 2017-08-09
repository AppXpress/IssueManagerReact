# Issue Manager Mobile

Issue Manager Mobile is a mobile application written in React Native used to access the GT Nexus Issue system from anywhere.

  - View all issues and accompanying information
  - Create and modify issues
  - Make comments on issues
  - Upload/view attachments

## Platforms 

  - iOS 7 and above
  - Android Jelly Bean (API level 16) and above


## Setup
These instructions will get a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project for release.

  1. Set up React-Native environment according to their [documentation](https://facebook.github.io/react-native/docs/getting-started.html)
  2. Clone this repository:
    `git clone  https://github.com/AppXpress/IssueManagerReact.git`
  3. Install dependecies using `npm install` or `yarn`
  4. Create the file `src/gtn/environments.js` with the following contents:
```  
export default [
    {
        name: 'Demo',
        url: 'https://demo.gtnexus.com/rest/310',
        key: '[DATA KEY HERE]',
        issue: '$IssueT3',
        message: '$MessageT4'
    },
    // repeat for additional environments
    ...
];
```

  5. Run the project with:
`react-native start` followed by `react-native run-android` or `react-native run-ios`

## Deployment
  * Android: Created a [signed APK](https://facebook.github.io/react-native/docs/signed-apk-android.html)
  * iOS: Configure release scheme in [xCode](https://facebook.github.io/react-native/docs/running-on-device.html#3-build-app-for-release)

## Dependencies
   * [React Native Fetch Blob](https://github.com/wkh237/react-native-fetch-blob) - For downloading and uploading image attachments to GTN
   * [React Native Navigation](https://github.com/wix/react-native-navigation) - For smooth stack navigation an both Android and iOS
   * [React Native Camera](https://github.com/lwansbrough/react-native-camera) - For accessing native camera