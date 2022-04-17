import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewDream({ user }) {
  const [title, setTitle] = useState("My Dream");
  const [dreamDate, setDreamDate] = useState("");
  const [description, setDescription] =
    useState(`Write out all the events you can remember from the beginning to the end. How did you feel? What objects and people did you see? It's ok if you do not remember everything. Try to write down as you can recall.
  `);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/dreams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        date: dreamDate,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Add new dream entry</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="title">Title of your dream</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="dreamDate">
              Date and relative time of your dream
            </Label>
            <Input
              type="text"
              id="dreamDate"
              value={dreamDate}
              onChange={(e) => setDreamDate(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="description">Description of dream</Label>
            <Textarea
              id="description"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit dream entry"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
      <WrapperChild>
        <h1>Why journal your dreams?</h1>
        <p>
          Our dreams allows you to work through unprocessed issues in your
          waking life and come to terms with them. Psychologists believe that
          there's a scientific link between our minds and our behavior; dream
          journaling can give insight into our mind during sleep.
        </p>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;
const p1 = styled.div`
style="line-height: 2
`;
export default NewDream;
