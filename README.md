# French National Assembly React App

This is an example application demonstrating a React data-visualization. It makes partial use of d3, mostly for the scaling and data manipulation functions. The DOM manipulations are handled by React.

The application displays the composition of the French National Assembly as of June 2017. Each deputy is displayed by a circle. Circles are ordered by party orientation. Hovering on a circle will display the deputy's information.
Search & filters can be used to show/hide deputies.

# Live Demo
[Live Demo](https://jonasrenault.github.io/assembly/)

# Sources

* Original idea from Liberation's [Assembly Visulization App](http://www.liberation.fr/apps/2017/06/profil-nouvelle-assemblee-legislative/).

* The data is from Le Monde's similar [Deputies Infography](http://www.lemonde.fr/les-decodeurs/article/2017/06/26/mandats-professions-etudes-des-deputes-la-nouvelle-assemblee-en-douze-infographies_5151014_4355770.html). The code to build the hemicycle was also adapted from this web page.

* Tips on how to integrate React and D3 came from Joel Burget's [D4 experiment](https://github.com/joelburget/d4).


# Development tools
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

# License
Released under the [The MIT License](https://opensource.org/licenses/MIT).
