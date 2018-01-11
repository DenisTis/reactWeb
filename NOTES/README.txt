Do not forget to switch PATH for EXPO everytime, IP address is being changed!
set REACT_NATIVE_PACKAGER_HOSTNAME='192.168.0.150'
- that did not work when called from cmd

Install exp to be able to build android standalone package.
Details here: https://docs.expo.io/versions/latest/guides/building-standalone-apps.html

Remember, "create-react-native-app" should use components from EXPO when possible.

DEBUGGING
Remember to shake device to activate dev menu and set "Remote JS Debugging"

To do debug, try to get standalone version of React-devtools:
(Better implement it as a project dependency)
  npm install -g react-devtools
  start by typing react-devtools
(!Learn how to use react-devtools)


Probably Redux should be implemented to update all views once 
language is being changed.

Or I have to find another way to refresh navigation header.
So far it is only refreshed on main page, but not on leaf pages.

Also, language switch only affects navigation bar.
All other elements are re-rendered well.
