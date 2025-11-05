"use client";
import { useState } from "react";
import { StyledDialog } from "./css-in-js/styled-dialog";
import { DialogContent } from "./css-in-js/dialog-content";
import { CloseButton } from "./css-in-js/close-button";
import { JoinButton } from "./css-in-js/join-button";
import { TournamentTitle } from "./css-in-js/description";
import { TournamentImage } from "./css-in-js/image";
import { TournamentDescription } from "./css-in-js/description";
import { Message } from "./css-in-js/description";
import { Tournament } from "@/modules/tournaments-page/list-card-with-tournamets-components/hook/use-torunamets";

interface TournamentModalProps {
  tournament: Tournament;
  onClose: () => void;
}

export function TournamentModal({ tournament, onClose }: TournamentModalProps) {
  const [isJoining, setIsJoining] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleJoin = async () => {
    setIsJoining(true);
    setMessage(null);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = Math.random() > 0.3;
    setMessage(
      success
        ? "You successfully joined the tournament!"
        : "Failed to join. Try again later."
    );

    setIsJoining(false);
  };

  return (
    <StyledDialog>
      <DialogContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>

        <TournamentTitle>{tournament.title}</TournamentTitle>
        <TournamentImage src={tournament.image} alt={tournament.title} />
        <TournamentDescription>{tournament.description}</TournamentDescription>

        <JoinButton onClick={handleJoin} disabled={isJoining}>
          {isJoining ? "Joining..." : "Join Tournament"}
        </JoinButton>

        {message && (
          <Message success={message.includes("successfully")}>
            {message}
          </Message>
        )}
      </DialogContent>
    </StyledDialog>
  );
}
