import styled from "styled-components";
import { blue } from "../../utils";

export const MemoriesContainer = styled.section`
  grid-column: 1 / 13;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 4rem;

  .wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 4rem;
    justify-content: center;
    width: 100%;
  }

  @media screen and (max-width: 720px) {
    grid-column: 1 / 7;
    .wrapper {
      gap: 3rem;
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(7, 16, 25, 0.85);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1.5rem, 4vw, 3rem);
  z-index: 999;
`;

export const OverlayCard = styled.div`
  position: relative;
  max-width: min(960px, 92vw);
  max-height: min(90vh, 720px);
  background: linear-gradient(155deg, rgba(8, 15, 24, 0.92) 0%, rgba(8, 15, 24, 0.82) 100%);
  border-radius: 1.25rem;
  padding: clamp(2.5rem, 5vw, 3.25rem) clamp(2.75rem, 5.5vw, 3.75rem) clamp(1.75rem, 3.5vw, 2.25rem);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: ${blue["110"]};
`;

export const OverlayClose = styled.button`
  position: absolute;
  top: 1.75rem;
  right: 1.75rem;
  border: none;
  background: rgba(7, 16, 25, 0.55);
  color: ${blue["110"]};
  font-size: 1.5rem;
  line-height: 1;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: scale(1.1);
    background: rgba(255, 77, 77, 0.2);
    color: #ff4d4d;
  }
`;

export const OverlayActions = styled.div`
  display: flex;
  justify-content: flex-end;\r\n  gap: 0.75rem;\r\n  align-items: center;\r\n  padding-right: 3rem;\r\n  margin-top: 0.25rem;
`;

export const OverlayButton = styled.button`
  padding: 0.55rem 1.2rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
  color: ${blue["110"]};
  font-size: 0.9rem;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    background: ${blue["40"]};
    color: ${blue["00"]};
  }
`;

export const OverlayMedia = styled.div`
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.75rem;
  position: relative;

  video,
  img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 0.75rem;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
  }

  video {
    outline: none;
  }
`;

