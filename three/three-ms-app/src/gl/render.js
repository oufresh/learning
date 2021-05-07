import * as THREE from "three";

let canvas = null;
let renderer = null;
let scene = null;
let cube = null;
let camera = null;
function setCanvasSize(width, height) {
  canvas.setAttribute("height", height + "");
  canvas.setAttribute("width", width + "");
}

export function init(c, width, height) {
  canvas = c;
  setCanvasSize(width, height);
  renderer = new THREE.WebGLRenderer({ canvas });
  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;
  scene = new THREE.Scene();

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 }); // greenish blue

  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  requestAnimationFrame(render);
}

export function render(time) {
  time *= 0.001; // convert time to seconds

  cube.rotation.x = time;
  cube.rotation.y = time;

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

export function resize(width, height) {
  setCanvasSize(width, height);
  setTimeout(render(), 50);
}

export function dispose() {}
