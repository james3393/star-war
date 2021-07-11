import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useReducer } from "react";

import "./styles.css";
import { FilmsPageComponent } from "./Films.component";
import { FilmDetailPageComponent } from "./FilmDetail.component";
import { CharacterDetailPageComponent } from "./CharacterDetail.component";
import { reducer, initialState } from "./state";

/**
 * Implement a Star Wars info application. The application can be built for any platform
(web, iOS, Android, etc.) using any language and framework(s) other than Ruby on
Rails; whatever you are most comfortable with. The application should display a list of
films and upon selecting a film display details for the film: metadata, characters,
vehicles, planets, etc.
The visual aesthetics of the app are not of importance, we will only be reviewing your
code for coding style, clarity, design, architecture, robustness to handle bad data and
errors, etc.

Requirements
 Use Star Wars API ( https://swapi.dev )
 Films list page that displays list of all films
 Film detail page that displays film metadata, characters, vehicles, planets, etc.

Bonus Points
 Implement one or more detail pages for characters, vehicles, planets, etc. The
detail pages should be accessible from the film detail page
 Implement client side search filter on the films list page to filter displayed films by
title, or description

Questions
 Assuming the Star Wars API was slow, what are some optimizations that could
be implemented to improve the user experience?
 Any improvements you would make to your application?

 */

/**
 * Q1:
 *   1. Add loading skeleton to indicate it's loading, and the UI does not move around
 *      when response comes back.
 *   2. Save loaded resources into local storage if possible, so the returning user has
 *      a faster response.
 *   3. Once Films request is completed, start loading characters etc to speed up.
 *   4. Use list endpoint(e.g. /people) rather than indiviual one(e.g. /people/:id) to
 *      reduce network call.
 *   5. Only load resources on the screen. Lazy loading the ones hidden behind the scroll bar.
 *
 * Q2:
 *   1. Do not nuke characters state, only load characters that are not loaded.
 *   2. Use Redux or Context to avoid passing `state` etc down to children component.
 *   3. Instead of loading indiviual character, use the /people endpoint to load
 *      all characters, since many of them are in multiple films.
 *   4. Add test with a mocked network api to check UI and work flow.
 */
export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/films/:id">
            <FilmDetailPageComponent state={state} dispatch={dispatch} />
          </Route>

          <Route exact path="/characters/:id">
            <CharacterDetailPageComponent state={state} />
          </Route>

          <Route path="/">
            <FilmsPageComponent state={state} dispatch={dispatch} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
