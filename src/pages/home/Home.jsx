import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useContext, useEffect, useRef } from "react";
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
  const controlsRef = useRef();

  const handlePointerDown = (event) => {
    if (!controlsRef.current) return;
    
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const touchX = event.clientX - rect.left;
    const touchY = event.clientY - rect.top;
    
    const distance = Math.sqrt(
      Math.pow(touchX - centerX, 2) + Math.pow(touchY - centerY, 2)
    );
    
    const maxDistance = Math.min(rect.width, rect.height) * 0.3; // 30% of canvas size
    
    if (distance > maxDistance) {
      controlsRef.current.enabled = false;
      setTimeout(() => {
        if (controlsRef.current) controlsRef.current.enabled = true;
      }, 100);
    }
  };

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
          onPointerDown={handlePointerDown}
          style={{ touchAction: 'pan-y' }}
        >
          <OrbitControls 
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={8}
            target={[0, 0, 0]}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
            rotateSpeed={0.5}
            zoomSpeed={0.8}
            enableDamping={true}
            dampingFactor={0.05}
          />
          <Dog />
        </Canvas>
      </DogContainer>
    </HomeWrapper>
  );
};
