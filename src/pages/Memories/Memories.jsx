import React, { useEffect, useRef, useState } from "react";
import { Page } from "../../components/Page";
import { memories } from "../../data";
import {
  MemoriesContainer,
  Overlay,
  OverlayCard,
  OverlayClose,
  OverlayMedia,
  OverlayActions,
  OverlayButton,
} from "./Memories.styled";
import { MemoryItem } from "./MemoryItem";
import { Carasoul } from "../Projects/Projects.styled";
import { NextButton } from "../Projects/carasoulButton";

export const Memories = () => {
  const [activeMemory, setActiveMemory] = useState(null);
  const mediaRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!activeMemory) {
      mediaRef.current = null;
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveMemory(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeMemory]);

  const handleFullscreen = () => {
    if (!mediaRef.current) {
      return;
    }
    const element = mediaRef.current;
    const requestFullscreen =
      element.requestFullscreen ||
      element.webkitRequestFullscreen ||
      element.msRequestFullscreen;

    if (requestFullscreen) {
      requestFullscreen.call(element);
    }
  };

  const scrollCarouselBy = (amount) => {
    if (!carouselRef.current) {
      return;
    }

    if (typeof carouselRef.current.scrollBy === "function") {
      carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
      return;
    }

    carouselRef.current.scrollLeft += amount;
  };

  const moveNext = () => {
    scrollCarouselBy(600);
  };

  const movePrev = () => {
    scrollCarouselBy(-650);
  };

  return (
    <Page header="Memories">
      <MemoriesContainer>
        <div className="wrapper" ref={carouselRef}>
          {memories.map((moment, index) => (
            <MemoryItem
              key={`${moment.title}-${index}`}
              data={moment}
              index={index}
              onSelect={setActiveMemory}
            />
          ))}
        </div>
      </MemoriesContainer>
      <Carasoul>
        <NextButton flip onClick={movePrev} />
        <NextButton onClick={moveNext} />
      </Carasoul>

      {activeMemory ? (
        <Overlay role="dialog" aria-modal="true" onClick={() => setActiveMemory(null)}>
          <OverlayCard onClick={(event) => event.stopPropagation()}>
            <OverlayClose
              type="button"
              onClick={() => setActiveMemory(null)}
              aria-label="Close memory view"
            >
              X
            </OverlayClose>
            <OverlayActions>
              <OverlayButton type="button" onClick={handleFullscreen}>
                View Fullscreen
              </OverlayButton>
            </OverlayActions>
            <OverlayMedia>
              {activeMemory.mediaType === "video" ? (
                <video
                  ref={mediaRef}
                  src={activeMemory.media}
                  autoPlay
                  loop
                  muted
                  controls
                  playsInline
                />
              ) : (
                <img
                  ref={mediaRef}
                  src={activeMemory.media}
                  alt={activeMemory.caption || activeMemory.title}
                  loading="lazy"
                />
              )}
            </OverlayMedia>
            <div className="meta">
              <h3>{activeMemory.title}</h3>
              {activeMemory.caption ? (
                <p className="caption">{activeMemory.caption}</p>
              ) : null}
              {activeMemory.description ? (
                <p className="description">{activeMemory.description}</p>
              ) : null}
              {activeMemory.tag ? <span className="tag">{activeMemory.tag}</span> : null}
            </div>
          </OverlayCard>
        </Overlay>
      ) : null}
    </Page>
  );
};



