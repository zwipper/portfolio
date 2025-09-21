import styled, { keyframes } from "styled-components";
import { PageHeaderStyled } from "../../components/ui";
import { blue, typeScale } from "../../utils";

export const HomeWrapper = styled.main`
  display: grid;
  height: 100vh;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;
  @media screen and (max-width: 920px) {
    grid-template-rows: 1fr 1fr;
  }
`;

export const DogContainer = styled.aside`
  grid-column: 8/13;
  @media screen and (max-width: 920px) {
    grid-column: 1/ 13;
    align-self: start;
    height: 60vh;
    min-height: 400px;
  }

  canvas {
    touch-action: pan-y;
  }
`;

export const TextContainer = styled.section`
  grid-column: 2/ 8;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  @media screen and (max-width: 1204px) {
    gap: 2.5rem;
  }
  @media screen and (max-width: 920px) {
    grid-column: 1/ 13;
    align-self: end;
    padding-inline: 1rem;
    justify-self: center;
    align-self: center;
  }
  @media screen and (max-width: 480px) {
    gap: 1.5rem;
  }
`;

export const Name = styled.h1`
  font-size: ${typeScale.bigDisplay};
  font-weight: bolder;
  margin: 0;
  background: white;
  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, #ddd 100%);
  line-height: 1;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 1204px) {
    font-size: ${typeScale.display};
  }

  @media screen and (max-width: 480px) {
    font-size: ${typeScale.headline};
    text-align: center;
  }
`;

const textCycle = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 40%, 0);
  }
  15% {
    opacity: 1;
    transform: translate3d(0, 0%, 0);
  }
  85% {
    opacity: 1;
    transform: translate3d(0, 0%, 0);
  }
  100% {
    opacity: 0;
    transform: translate3d(0, -20%, 0);
  }
`;

export const Position = styled(PageHeaderStyled)`
  background: unset;
  line-height: unset;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
  margin-block: 0;
  margin-inline: 0;
  margin: 0;
  padding: 0;
  position: relative;
  color: ${blue["50"]};
  cursor: default;

  .text {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0;
    align-items: center;
    animation: ${textCycle} 3.2s ease-in-out both;
  }

  @media screen and (max-width: 1204px) {
    font-size: ${typeScale.title};
  }
  @media screen and (max-width: 480px) {
    font-size: ${typeScale.subtitle};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

export const AnimatedSpan = styled.span`
  display: inline-block;
  will-change: transform;
  transform-style: preserve-3d;
  transform-origin: bottom;
  transition: 0.5s;
  animation-delay: ${(props) => props.index * 0.05}s !important;
  padding: ${(props) => (props.letter === " " ? "0.325rem" : null)};
`;

