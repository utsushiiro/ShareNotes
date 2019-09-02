import * as React from "react";
import { Route, Switch } from "react-router-dom";
import NoteListPage from "@pages/NoteListPage";
import Navbar from "@components/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import NotePage from "@pages/NotePage";
import { useSelector } from "@state/store";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { eventsOperations, eventsConstants } from "@state/events";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.eventsState.events);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    events.forEach(event => {
      if (event.type === eventsConstants.eventTypes.LOGGED_IN) {
        enqueueSnackbar("Logged in", {
          variant: "success",
          autoHideDuration: 1000
        });
        dispatch(eventsOperations.deleteEvent(event.id));
      } else if (event.type === eventsConstants.eventTypes.SIGNED_UP) {
        enqueueSnackbar("Welcome!", {
          variant: "success",
          autoHideDuration: 1000
        });
        dispatch(eventsOperations.deleteEvent(event.id));
      }
    });
  });

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container>
        <Switch>
          <Route exact path="/(notes)?" component={NoteListPage} />
          <Route
            exact
            path="/notes/:id"
            render={({
              match,
              location: { state: fromCreateNoteOperation }
            }) => (
              <NotePage
                noteId={match.params.id}
                isEditorMode={!!fromCreateNoteOperation}
              />
            )}
          />
          <Route render={() => <div>Not Found</div>} />
        </Switch>
      </Container>
    </>
  );
};

export default App;
