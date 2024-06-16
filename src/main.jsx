import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
          ROUTING
-with routing, we match different URLs to different UI viewa (react components):routes
   -routung in react is handeled by a3rd party library called React Router
   -routing allows us to build single page applications

         SINGLE PAGE APPLICATIONS(SPAs)
-Application that is excuted entirely on the client (browser)
 Routes: different URLs correspond to different views (components)
     Javascript(react) used to update the page(DOM)
    *** the page is never reloaded
 USER CLICKS A ROUTER LINK => URL IS CHANGED =>DOM IS UPDATED - react component corresponding to the new URL id rendered   
 additional data might be loaded form a web API(no need to reload)
 ****WE CAN SAY THAT ALL REACT APPS ARE SINGLE PAGE APPLICATIONS(NEVER RELOADED)***
*/

/*
   styling options in react
1.inline CSS to JSX elements(locally scoped)
2.CSS or sass file(entire app - globally scoped)
3.CSS modules(scoped to a certain component)
4.CSS-in-Js
5.Utility-first CSS = tailwindcss
6.diffeent UI libraries ( pre-styled - no need to write css)
*/

/*
The URL is an excellent place to store UI state and alternative to useState in some situations!
   eg:open/closed panels, currently selected list item, list sorting order, applied list filters
1. Easy way to store state in a global place, accesibble to all components in the app
2. Good way to "PASS DATA" from one page into the next page 
3. Makes it possible to bookmark and share the page with the exact state it had at the time
*/

/*
        THE BUNDLE AND CODE SPLITTING
 -Bundle : javascript file containing the entire application code. downloading the bundle will loaDs the entire app at once, turning it into a SPA(single page application)
      produced by like webpack (inside create-react-app) or vite
   *the CLIENT (browsers) dowload the BUNDLE from the SERVER (INITIAL LOAD ONLY)
 -bundle-size : amount of javascript users hae to dowload to start using the app. one of the most important things to be optimmized, so that the bundle takes less time to download
 YAHHHH CODESPLITTING: splitting bundle into multiple parts that can be dowloaded over time ("lazy dowloading")
    * each file will be dowloaded when they are really needed (the app continues to work with the downloaded files )
 */
