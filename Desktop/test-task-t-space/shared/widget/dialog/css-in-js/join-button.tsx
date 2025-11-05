import styled from "styled-components";

export const JoinButton = styled.button`
  padding: 0.75rem;
  background: #3b82f6;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  &:disabled {
    background: #93c5fd;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #2563eb;
  }
`;