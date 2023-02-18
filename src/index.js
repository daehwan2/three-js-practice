import * as THREE from 'three';
import { DirectionalLightHelper, PointLightHelper } from 'three';
import { WEBGL } from './webgl';

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x004fff);

  // 카메라
  const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);

  // 렌더러
  // 1. html 에 canvas 태그 만들어놓고 서냍ㄱ 후 렌더러 객체 파라미터로 전달
  // const canvas = document.querySelector('#ex-03');
  // const renderer = new THREE.WebGLRenderer({canvas})

  // 2. document body에 그냥 추가하기
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  // 빛
  const pointLight = new THREE.DirectionalLight(0xffffff, 1);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  // 빛 어디서 쏘는지 시각화
  const lightHelper = new DirectionalLightHelper(pointLight, 0.2, 0x99999);
  scene.add(lightHelper);

  // 텍스쳐 추가
  const textureLoader = new THREE.TextureLoader();
  const texture01 = textureLoader.load('../static/images/texture01.jpg');
  const texture02 = textureLoader.load('../static/images/texture02.jpg');
  const texture03 = textureLoader.load('../static/images/texture03.jpg');
  const texture04 = textureLoader.load('../static/images/texture04.jpg');
  const texture05 = textureLoader.load('../static/images/texture05.jpg');

  // 도형 추가하기
  // 매쉬
  const geometry01 = new THREE.SphereGeometry(0.5, 0.5, 0.5);
  const material01 = new THREE.MeshStandardMaterial({
    map: texture01,
    normalMap: texture02,
    displacementMap: texture03,
    displacementScale: 0.1,
    roughnessMap: texture04,
  });
  const obj01 = new THREE.Mesh(geometry01, material01);
  obj01.position.x = 0;
  obj01.position.y = 3;
  scene.add(obj01);

  // 매쉬
  const geometry02 = new THREE.ConeGeometry(0.5, 0.5, 0.5);
  const material02 = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
  });
  const obj02 = new THREE.Mesh(geometry02, material02);
  obj02.position.x = 1;
  obj02.position.y = 3;
  scene.add(obj02);

  // 매쉬
  const geometry03 = new THREE.IcosahedronGeometry(0.4, 0);
  const material03 = new THREE.MeshStandardMaterial({
    color: 0x999999,
  });
  const obj03 = new THREE.Mesh(geometry03, material03);
  obj03.position.x = 3;
  obj03.position.y = 3;
  scene.add(obj03);

  // 매쉬
  const geometry04 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material04 = new THREE.MeshStandardMaterial({
    color: 0xf32321,
    metalness: 0.2,
    transparent: true,
    roughness: 0.5,
    opacity: 0.5,
  });
  const obj04 = new THREE.Mesh(geometry04, material04);
  obj04.position.x = 4;
  obj04.position.y = 3;
  scene.add(obj04);

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: texture01,
  });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.2;
  scene.add(plane);

  function render(time) {
    time *= 0.001;

    obj01.rotation.x = time;
    obj01.rotation.y = time;

    obj02.rotation.x = time;
    obj02.rotation.y = time;

    obj03.rotation.x = time;
    obj03.rotation.y = time;

    obj04.rotation.x = time;
    obj04.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // 반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize);
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
