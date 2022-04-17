import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function DreamList() {
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    fetch("/dreams")
      .then((r) => r.json())
      .then(setDreams);
  }, []);

  return (
    <Wrapper>
      {dreams.length > 0 ? (
        dreams.map((dream) => (
          <Dream key={dream.id}>
            <Box>
              <h2>{dream.title}</h2>
              <p>
                <em>Dream date: {dream.date} </em>
                &nbsp;·&nbsp;
                <cite>By {dream.user.username}</cite>
              </p>
              <ReactMarkdown>{dream.description}</ReactMarkdown>
            </Box>
          </Dream>
        ))
      ) : (
        <>
          <h2>No Dream entries</h2>
          <Button as={Link} to="/new">
            Add a new dream entry
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Dream = styled.article`
  margin-bottom: 24px;
`;

export default DreamList;
