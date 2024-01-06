import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Container, Draggable } from "@edorivai/react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";
import { question } from "../../../services/quiz/tyles";
import { AppButton } from "../../../components/AppButton";

const DragNDropQuestion = ({
  question,
  submit,
  index,
}: {
  question: question;
  submit: any;
  index: number;
}) => {
  useEffect(() => {
    setRandomized(
      Object.entries(question.answers)
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    );
  }, [question]);

  const [randomized, setRandomized] = useState<any>(null);

  const onDrop = ({ removedIndex, addedIndex }: { [key: string]: number }) => {
    let arr = arrayMoveImmutable(
      Object.values(randomized),
      removedIndex,
      addedIndex
    );
    const newValues: { [key: string]: { text: string } } = {};
    arr.forEach((item, index) => {
      //@ts-ignore
      newValues[Object.keys(randomized)[index]] = item;
    });
    setRandomized(newValues);
  };

  return (
    <Box>
      <Typography variant="h5" className="quiz-passing__single-question-title">
        {question.title}
      </Typography>
      <Typography className="add-questions-modal__quiz-title label">
        <i className="symbol">*&nbsp;</i> Arrange the elements in the correct
        order
      </Typography>
      {randomized && (
        <List>
          <Container
            dragHandleSelector=".drag-handle"
            lockAxis="y"
            //@ts-ignore
            onDrop={onDrop}
          >
            {Object.keys(randomized).map((id) => (
              // @ts-ignore
              <Draggable key={id}>
                <ListItem style={{ padding: "8px 0px" }}>
                  <Typography className="quiz-passing__dnd-question-answer">
                    {randomized[id][1].text}
                  </Typography>
                  <ListItemSecondaryAction className="">
                    <ListItemIcon className="drag-handle _add-quiz-question__secondary">
                      <DragHandleIcon
                        style={{ cursor: "grab", fill: "#6062FF" }}
                      />
                    </ListItemIcon>
                  </ListItemSecondaryAction>
                </ListItem>
              </Draggable>
            ))}
          </Container>
        </List>
      )}
      <AppButton
        className="quiz-passing__single-question-submit"
        onClick={() => {
          submit(question.id, randomized, index);
        }}
      >
        Submit
      </AppButton>
    </Box>
  );
};

export default DragNDropQuestion;