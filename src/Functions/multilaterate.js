export const multilaterate = (points, distances) => {
    // Calculate the A, B, C, and D terms for each reference point
    var A = [];
    var B = [];
    var C = [];
    var D = [];
    for (var i = 0; i < points.length; i++) {
      A.push(Math.pow(points[i].x, 2) + Math.pow(points[i].y, 2) - Math.pow(distances[i], 2));
      B.push(-2 * points[i].x);
      C.push(-2 * points[i].y);
      D.push(Math.pow(points[i].x, 2) + Math.pow(points[i].y, 2) - Math.pow(distances[i], 2));
    }
  
    // Calculate the X, Y, and Z terms
    var X = 0;
    var Y = 0;
    var Z = 0;
    var N = points.length;
    for (var i = 0; i < N; i++) {
      X += A[i] * B[i];
      Y += C[i] * B[i];
      Z += A[i] + D[i];
    }
  
    // Calculate the device's location using the X, Y, and Z terms
    var x = -X / (2 * Z);
    var y = -Y / (2 * Z);
  
    return {x, y};
  }