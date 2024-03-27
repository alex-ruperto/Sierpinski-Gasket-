// set the canvas document and webgl as the context
const canvas = document.getElementById("sierpinski-canvas");
const gl = canvas.getContext("webgl")

// if gl is not supported, run the alert
if (!gl) {
    alert("Your browser or machine may not support WebGL. Unable to initialize.");
}

// clear color to black, 100% opaque
gl.clearColor(0.0, 0.0, 0.0, 1.0);

// clear the color buffer with a specified color
gl.clear(gl.COLOR_BUFFER_BIT);

// define what the vertices of the initial triangle are.
const vertices = new Float32Array([ // Float32Array is more efficient because it's fixed size and data type is known. Also directly maps to GPU since they handle floating-point operations in parallel.
    -1.0, -1.0, // 1st vertex
    0.0, 1.0, // 2nd vertex
    1.0, -1.0 // third vertex

])

let numPoints = 5000; // number of points in the sierpinski gasket
let points = []; // store the points in this array

let currentPoint = [0.25, 0.5]; // initial point inside the triangle

for (let i = 0; i < numPoints; i++){ // iterate from 0 to 5000 exclusive
    // pick a random vertex
    let j = Math.floor(Math.random() * 3);
    let vertex = [vertices[j * 2], vertices[j * 2 + 1]];

    currentPoint = [
        (currentPoint[0] + vertex[0]) / 2,
        (currentPoint[1] + vertex[1]) / 2,
    ];

    // add a midpoint to the list of points
    points.push(...currentPoint);
}

// create buffer obj
let bufferId = gl.createBuffer();

// bind buffer object to target
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);

// write data into the buffer object
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

// program for vertex shaders
const vsSource = `
    attribute vec2 aPosition;
    void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
        gl_PointSize = 1.0;
    }
`;

// fragment shader program
const fsSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // white color
    }

`;

// shader program where all the lighting for vertices are made.
const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

gl.useProgram(shaderProgram);

let position = gl.getAttribLocation(shaderProgram, 'aPosition');
gl.enableVertexAttribArray(position)
gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
gl.drawArrays(gl.POINTS, 0, numPoints)