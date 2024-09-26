"use client";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import {
  bassPedestal,
  drumsPedestal,
  pianoPedestal,
  saxPedestal,
  guitarPedestal,
} from "./assets";

export default function Page() {
  const canvasRef = useRef(null);

  const saxRef = useRef(null);
  const guitarRef = useRef(null);
  const bassRef = useRef(null);
  const drumsRef = useRef(null);
  const pianoRef = useRef(null);

  // useEffect(() => {
  //   window.addEventListener('resize', function() {
  //     camera.aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  // });

  //   return () => {
  //     second
  //   }
  // }, [third])

  useEffect(() => {
    if (!canvasRef.current) {
      console.error("Canvas not found");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      85,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000);
    // renderer.setClearColor(0xffb83d);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.update();

    // HELPER
    // const gridHelper = new THREE.GridHelper(100, 100);
    // scene.add(gridHelper);

    // LIGHT
    const spotLight = new THREE.SpotLight(0xffffff, 1721.0);
    spotLight.position.set(4, 3, 18);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    const spotlightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotlightHelper);
    scene.add(spotLight);

    // ASSETS
    const assetLoader = new GLTFLoader();
    assetLoader.load("/3DModels/piano/scene.gltf", (gltf) => {
      const piano = gltf.scene;
      piano.scale.set(3, 3, 3);
      piano.rotation.set(Math.PI / 20, Math.PI / 30, 0.3);
      piano.position.set(12, -6, 0);
      pianoRef.current = piano;
      piano.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      scene.add(piano);
    });
    assetLoader.load("/3DModels/saxophone_alto/scene.gltf", (gltf) => {
      const sax = gltf.scene;
      sax.position.set(-2, -4, 0);
      // sax.scale.set(0.06, 0.06, 0.06);
      sax.rotation.set(0, Math.PI / 2, 0);
      saxRef.current = sax;
      scene.add(sax);
      sax.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      console.log(sax);
    });
    assetLoader.load("/3DModels/guitar/scene.gltf", (gltf) => {
      const guitar = gltf.scene;
      guitar.position.set(-9, -4, 3);
      guitar.rotation.set(0, Math.PI / 2.5, -0.2);
      guitarRef.current = guitar;
      guitar.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      scene.add(guitar);
    });
    assetLoader.load("/3DModels/bass/scene.gltf", (gltf) => {
      const bass = gltf.scene;
      bass.position.set(5, 5, -7);
      bass.scale.set(5, 5, 5);
      bass.rotation.set(Math.PI / 5.5, 0, -0.1);
      bassRef.current = bass;
      bass.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      scene.add(bass);
    });
    assetLoader.load("/3DModels/drums/scene.gltf", (gltf) => {
      const drums = gltf.scene;
      drums.position.set(-10, 2, -5);
      drums.scale.set(1.7, 1.7, 1.7);
      drums.rotation.set(Math.PI / 5.5, Math.PI / 6, 0);
      drumsRef.current = drums;
      drums.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      scene.add(drums);
    });

    // PEDESTALS
    scene.add(bassPedestal);
    scene.add(drumsPedestal);
    scene.add(pianoPedestal);
    scene.add(saxPedestal);
    scene.add(guitarPedestal);

    // ANIMATION
    const time = new THREE.Clock();
    const animate = () => {
      const delta = time.getDelta();
      const elapsedTime = time.getElapsedTime();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      // console.log(time.getElapsedTime());

      if (bassRef.current) {
        bassRef.current.position.y = Math.sin(elapsedTime + 0.7) * 2 + 4;
      }
      bassPedestal.position.y = Math.sin(elapsedTime + 0.7) * 2 - 16.5;

      if (drumsRef.current) {
        drumsRef.current.position.y = Math.sin(elapsedTime) * 2 + 4;
      }
      drumsPedestal.position.y = Math.sin(elapsedTime) * 2 - 18;

      if (pianoRef.current) {
        pianoRef.current.position.y = Math.sin(elapsedTime) * 2 - 1;
      }
      pianoPedestal.position.y = Math.sin(elapsedTime) * 2 - 24;

      if (saxRef.current) {
        saxRef.current.position.y = Math.sin(elapsedTime + 0.8) * 2 - 1;
      }
      saxPedestal.position.y = Math.sin(elapsedTime + 0.8) * 2 - 30.5;

      if (guitarRef.current) {
        guitarRef.current.position.y = Math.sin(elapsedTime + 0.4) * 2 - 3;
      }
      guitarPedestal.position.y = Math.sin(elapsedTime + 0.4) * 2 - 29.25;

      spotLight.target.updateMatrixWorld();
    };

    animate();
    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div className="we_main_div">
      <canvas ref={canvasRef} id="canvas"></canvas>
    </div>
  );
}
