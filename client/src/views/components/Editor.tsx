import * as React from "react";
import { Note } from "@state/notes/types";
import { useState } from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Divider, Box, Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textarea: {
      display: "block",
      boxSizing: "border-box",
      width: "100%",
      height: "calc(100vh - 48px - 1px - 1px - 52px)",
      resize: "none",
      padding: "20px",
      border: "none",
      outline: "none"
    },
    footer: {
      display: "flex",
      flexDirection: "row-reverse"
    }
  })
);

type Props = {
  note: Note;
  onUpdate: (content: string) => void;
};

const Editor: React.FC<Props> = props => {
  const classes = useStyles();
  const [content, setContent] = useState(props.note.content);
  return (
    <div>
      <form>
        <textarea
          name="content"
          className={classes.textarea}
          value={content}
          onChange={e => setContent(e.currentTarget.value)}
        />
      </form>
      <Divider />
      <Box p={1} className={classes.footer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.onUpdate(content)}
        >
          Update
        </Button>
      </Box>
    </div>
  );
};

export { Editor };
