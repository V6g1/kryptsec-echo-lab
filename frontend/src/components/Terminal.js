import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const TerminalContainer = styled.div`
  background-color: #000;
  color: #33ff33;
  padding: 1rem;
  border-radius: 5px;
  font-family: 'Courier New', monospace;
  height: 300px;
  overflow-y: auto;
`;

const OutputLine = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
`;

const Prompt = styled.span`
  margin-right: 0.5rem;
  color: #ff3366;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  color: #33ff33;
  font-family: 'Courier New', monospace;
  width: 100%;
  outline: none;
  caret-color: #33ff33;
`;

const Terminal = ({ output, onCommand }) => {
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    // Allow Ctrl+C to copy and other standard shortcuts
    if (e.ctrlKey && e.key === 'c') {
      return;
    }
  };

  return (
    <TerminalContainer ref={terminalRef} onClick={() => inputRef.current.focus()}>
      {output.map((line, index) => (
        <OutputLine key={index}>{line}</OutputLine>
      ))}
      <InputLine>
        <Prompt>{'>'}</Prompt>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </form>
      </InputLine>
    </TerminalContainer>
  );
};

export default Terminal;