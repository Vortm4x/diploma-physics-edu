function radians (angle) {
  return angle * Math.PI / 180
}

function rotX (x, y, a) {
  return x * Math.cos(a) - y * Math.sin(a)
}

function rotY (x, y, a) {
  return x * Math.sin(a) + y * Math.cos(a)
}

function len (x, y) {
  return Math.sqrt(x * x + y * y)
}

export default {
  radians,
  rotX,
  rotY,
  len
}
