# IssueManagerReact
React Native app for GTn Issue Manager

## Running project

Set up your computer according to the React Native documentation

Clone the project repository

In the project folder, run `npm install`

Create the file `src/gtn/Environments.js` with the following contents:
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

Run the project with:
`react-native start` followed by `react-native run-android` or `react-native run-ios`
