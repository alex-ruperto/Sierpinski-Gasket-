// define what the vertices of the initial triangle are.


export function generateSierpinskiPoints(gl, numPoints) {
    const vertices = new Float32Array([ // Float32Array is more efficient because it's fixed size and data type is known. Also directly maps to GPU since they handle floating-point operations in parallel.
    -1.0, -1.0, // 1st vertex
    0.0, 1.0, // 2nd vertex
    1.0, -1.0 // third vertex
    ])
    
    let points = [];
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

    // create buffer obj, upload points data
    const bufferId = gl.createBuffer();

    // bind buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);

    // write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    return bufferId
}