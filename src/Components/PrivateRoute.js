import {Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "../utils/auth";

export default function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={() =>
          isAuthenticated() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }
      />
    );
  }