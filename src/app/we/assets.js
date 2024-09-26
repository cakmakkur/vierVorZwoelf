import * as THREE from "three";

const bassPedestal = new THREE.Mesh(
  new THREE.BoxGeometry(9, 50, 7),
  new THREE.MeshStandardMaterial({ color: 0xadadad })
);
bassPedestal.position.set(3, 0, -21);
bassPedestal.rotation.set(10, 0, 0.1);
bassPedestal.castShadow = true;
bassPedestal.receiveShadow = true;

const drumsPedestal = new THREE.Mesh(
  new THREE.BoxGeometry(13, 50, 7),
  new THREE.MeshStandardMaterial({ color: 0xbfbfbf })
);
drumsPedestal.position.set(-8.5, 0, -17);
drumsPedestal.rotation.set(Math.PI / 6, 0, Math.PI / 60);
drumsPedestal.castShadow = true;
drumsPedestal.receiveShadow = true;

const pianoPedestal = new THREE.Mesh(
  new THREE.BoxGeometry(10, 50, 7),
  new THREE.MeshStandardMaterial({ color: 0x5a5a5a })
);
pianoPedestal.position.set(20, -20, -5);
pianoPedestal.rotation.set(Math.PI / 20, Math.PI / 30, 0.3);
pianoPedestal.castShadow = true;
pianoPedestal.receiveShadow = true;

const saxPedestal = new THREE.Mesh(
  new THREE.BoxGeometry(4, 50, 4),
  new THREE.MeshStandardMaterial({ color: 0x3f3f3f })
);
saxPedestal.position.set(-1, 0, 0);
saxPedestal.rotation.set(0, 0, 0);
saxPedestal.castShadow = true;
saxPedestal.receiveShadow = true;

const guitarPedestal = new THREE.Mesh(
  new THREE.BoxGeometry(6, 50, 3),
  new THREE.MeshStandardMaterial({ color: 0x5f5f5f })
);
guitarPedestal.position.set(-12, 0, 7);
guitarPedestal.rotation.set(0, 0.9, -0.2);
guitarPedestal.castShadow = true;
guitarPedestal.receiveShadow = true;

export {
  bassPedestal,
  drumsPedestal,
  pianoPedestal,
  saxPedestal,
  guitarPedestal,
};
