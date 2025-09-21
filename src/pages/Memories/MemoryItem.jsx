import React from "react";
import { useInView } from "react-intersection-observer";
import { Cube, Face } from "../Projects/ProjectItem.styled";

export const MemoryItem = ({ data, index, onSelect }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const imageSource = data.mediaType === "image" ? data.media : data.poster;
  const description = data.description || "";
  const tag = data.tag || "";
  const cubeClassName = inView ? "fadeIn" : undefined;

  const handleActivate = () => {
    if (typeof onSelect === "function") {
      onSelect(data);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
  };

  return (
    <Cube
      ref={ref}
      className={cubeClassName}
      index={index}
      role="button"
      tabIndex={0}
      aria-label={`Open memory: ${data.title}`}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
    >
      <Face className="face-1" image={imageSource}>
        <div className="img no-dim">
          {data.mediaType === "video" && data.media ? (
            <video
              src={data.media}
              playsInline
              autoPlay
              loop
              muted
            />
          ) : null}
        </div>
        <div className="content">
          <h3 className="text-h">{data.title}</h3>
          {data.caption ? <p className="text-p">{data.caption}</p> : null}
        </div>
      </Face>
      <Face className="face-2">
        <div className="text">{description}</div>
      </Face>
      <Face className="face-3">
        <div className="text">{tag}</div>
      </Face>
    </Cube>
  );
};
