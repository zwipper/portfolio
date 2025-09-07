import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { NavbarContext } from "../../context";
import Dog from "./Dog";
import {
  AnimatedSpan,
  DogContainer,
  HomeWrapper,
  Name,
  Position,
  TextContainer,
} from "./Home.styled";

export const Home = () => {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const setPage = useContext(NavbarContext);

  useEffect(() => {
    if (inView) {
      setPage("home");
    }
  }, [inView]);

  const produceSpans = (name) => {
    return name.split("").map((letter, index) => (
      <AnimatedSpan
        index={index}
        letter={letter}
        aria-hidden="true"
        key={index}
      >
        {letter}
      </AnimatedSpan>
    ));
  };
  return (
    <HomeWrapper ref={ref} id="home-page">
      <TextContainer>
        <Name>Ashton Holland</Name>
        <Position>
          <div className="text first" aria-label="Software Engineer">
            {produceSpans("Software Engineer")}
          </div>
          <div className="text second" aria-label="Problem Solver">
            {produceSpans("Problem Solver")}
          </div>
        </Position>
      </TextContainer>
      <DogContainer>
        <Canvas 
          camera={{ position: [0, 2, 5] }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          onPointerMissed={() => {}}
          style={{ touchAction: 'manipulation' }}
        >
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={8}
            target={[0, 0, 0]}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
          <Dog />
        </Canvas>
      </DogContainer>
    </HomeWrapper>
  );
};
