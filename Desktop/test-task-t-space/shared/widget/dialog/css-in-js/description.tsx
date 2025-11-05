import styled from "styled-components";

  export const TournamentTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
  `;

  export const TournamentDescription = styled.p`
    color: #555;
  `;

  export const Message = styled.p<{ success: boolean }>`
    color: ${(props) => (props.success ? "green" : "red")};
    font-weight: 500;
  `;

