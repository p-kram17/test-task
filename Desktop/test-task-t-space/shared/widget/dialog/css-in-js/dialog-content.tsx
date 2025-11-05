import styled from "styled-components";

export const DialogContent = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  gap:25px;
  border-radius: 16px;
  padding: 24px;
  width: 90%;
  max-width: 480px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 10000;
`;
