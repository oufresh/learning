import * as THREE from "three";

let canvas = null;
let renderer = null;
let scene = null;
let cube = null;
let camera = null;

///
function setCanvasSize(width, height) {
  canvas.setAttribute("height", height + "");
  canvas.setAttribute("width", width + "");
}

export function init(c, width, height) {
  canvas = c;

  setCanvasSize(width, height);
  renderer = new THREE.WebGLRenderer({ canvas });
  const fov = 75;
  const aspect = width / height;
  const near = 0.1;
  const far = 5;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;
  scene = new THREE.Scene();

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 }); // greenish blue

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
  
  const needResize = canvas.width !== width || canvas.height !== height;
  console.log("reisze: " +  width+"x"+height);
  console.log(canvas.width);
  console.log(canvas.height);
  if (needResize) {
    setCanvasSize(width, height);
    renderer.setSize(width, height, false);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    setTimeout(render(), 50);
    console.log("Resize done ...");
  }
}

export function dispose() {}
