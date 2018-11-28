<!-- # react-project-starter

1. Using the terminal, create the scaffolding for a new React application with the [`create-react-app .`](https://github.com/facebookincubator/create-react-app) generator. You **must** make your app in the _root_ folder of the assignment repo (**not** inside an additional "app" folder):

    ```bash
    # create a react app in _this_ repo
    create-react-app .  # note the period!
    ```

2. I recommend you then "clean up" the `src/` repository, removing the `App.css` and `logo.svg` files and all the content of `App.js`. You can then begin implementing your project fresh with a new `<App>` component.

3. Update the README file to explain what the project is about. You will also track how you both contributed to this stage here.

4. Create a stage-2-yourname folder *in the assignment repo*, and copy in your code so you can have that code for reference!

5. Commit and push your changes to GitHub.

6. Let your partner know it's ready!

#### Your partner shall now do the following:

7. Your partner should join the repo by click on the assignment link and then joining the team created earlier.

8. Your partner should then `clone` the repository so they have a copy on their own machine (and `git pull` if needed).

9. Your partner should similar create a folder _in the repo_ called `stage-2-theirname` that contains their stage-2 code, again to be used as reference.

10. Your partner should `push` this code back to GitHub, which you should `pull` down. 

#### Now you are both ready to go! -->

# MyVote Web Application

## How to Interact in its Current State (Stage 3)
Our web application has two main components, both designed to teach users about voting in Washington state. 

The first section utilizes an external csv file representing the data that will be used to display analytics. Although not implemented at this time, new entries should be added to the csv file every time the user submits a new form. For now, the user should enter a polling location name already present in the csv file and should submit the form to see analytical information about that polling location (eg. "Central Senior Center", "Frank Fire Department", etc). Casing is ignored. Enter a new location name and submit the form again to see new analytical data.

The second section utilizes an external csv file containing data on voter registration and voter turnout rates for each WA state county, and then maps it on a Leaflet map based off of fields chosen by the user on buttons above the map. The user can switch betweeen different years, different ages, and different focuses. 

## Libraries Used
Boostrap, ChartJS, PapaParse, Leaflet, LeafletReact, ChartReact

## Authors
Kyle Avalani
Daniel Lee

Link: https://info340b-a18.github.io/project-daniellee0/
https://github.com/info340b-a18/react-project-voting