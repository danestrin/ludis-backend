# ludis-backend

## About
ludis ("Did you see that LUdicruous DISplay last night?") is a simple NBA data mobile app geared for people getting into the sport, displaying teams, rosters, and scores.

[Link to frontend](https://github.com/TomiMustapha/ludis-frontend)

## Backend Documentation

ludis-backend is a webserver built using Node.js and Express. The React-Native frontend makes GET calls to fetch its data from here, which fetches its data from the data.nba.net and stats.nba.net APIs.

The base URL is http://ludis.herokuapp.com/.

  ### Endpoints

  - **/api/teams**

    **Params**: N/A

    **Sample Response**:
    ```
    {"isNBAFranchise":true,"isAllStar":false,"city":"Atlanta","altCityName":"Atlanta","fullName":"Atlanta Hawks","tricode":"ATL","teamId":"1610612737","nickname":"Hawks","urlName":"hawks","confName":"East","divName":"Southeast","logoSvg":"https://stats.nba.com/media/img/teams/logos/ATL_logo.svg","logoPng":"http://ludis.herokuapp.com/logos/ATL_logo.png"}
    ```

  - **/api/teamroster**

    **Params**: teamID

    **Sample Response**:
    ```
    {"name":"Kawhi Leonard","number":"2","position":"Forward","height":"6' 7","weight":"230 lbs","school":"San Diego State","id":"202695","image":"https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202695.png"}
    ```

   - **/api/score**

      **Params**: gameDate

      **Sample Response**:
      ```
      {"date":"20190605","gameId":"0041800403","playoff":true,"round":"4","gameNum":"3","hTeam":{"teamId":"1610612744","triCode":"GSW","logoSvg":"https://stats.nba.com/media/img/teams/logos/GSW_logo.svg","logoPng":"http://ludis.herokuapp.com/logos/GSW_logo.png","score":"109","series":"1"},"vTeam":{"teamId":"1610612761","triCode":"TOR","logoSvg":"https://stats.nba.com/media/img/teams/logos/TOR_logo.svg","logoPng":"http://ludis.herokuapp.com/logos/TOR_logo.png","score":"123","series":"2"}}
      ```

## Notes

- All the data is taken from data.nba.net, with the exception of player headshots and team logos which are taken from stats.nba.net.
- The static folder holds all the team logos in PNG format, since the official NBA stats API keeps them in SVG which we couldn't find a way to display in the frontend. All the current NBA team logo SVGs were manually converted to PNG to be stored on the server and reached by the frontend. 
- Currently the backend only returns scores from the standard season (e.g. the app will not return scores from Summer League games).
