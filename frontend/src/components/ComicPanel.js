import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0a0a0a;
  padding: 20px;
  box-sizing: border-box;
`;

const ComicImage = styled.img`
  max-width: 90%;
  max-height: 60vh;
  object-fit: contain;
  border: 3px solid #58a6ff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.3);
`;

const DialogueBox = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1.5rem;
  margin: 2rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  cursor: pointer;
  width: 80%;
  max-width: 600px;
  text-align: center;
  border: 1px solid #58a6ff;
`;

const ComicPanel = ({ background, dialogue, onNext }) => {
  return (
    <Container>
      <ComicImage src={background} alt="Comic panel" />
      <DialogueBox onClick={onNext}>
        <p>{dialogue}</p>
        <p><em>(Click to continue...)</em></p>
      </DialogueBox>
    </Container>
  );
};

export default ComicPanel;