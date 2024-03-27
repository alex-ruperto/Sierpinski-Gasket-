// define what the vertices of the initial triangle are.


export function generateSierpinskiPoints(gl, numPoints, zoomLevel, centerX, centerY) {
    const vertices = new Float32Array([ // Float32Array is more efficient because it's fixed size and data type is known. Also directly maps to GPU since they handle floating-point operations in parallel.
        (-1.0 / zoomLevel) + centerX, (-1.0 /zoomLevel) + centerY, // vertex 1
        (0.0 / zoomLevel) + centerX, (1.0 /zoomLevel) + centerY, // vertex 2
        (1.0 / zoomLevel) + centerX, (-1.0 /zoomLevel) + centerY, // vertex 3

    ]) 
    
    let points = [];
    let currentPoint = [(0.25 / zoomLevel) + centerX, (0.5 / zoomLevel) + centerY]; // initial point will be adjusted based on zoom and center.

    for (let i = 0; i < numPoints; i++){ // iterate from 0 to 5000 exclusive
        // pick a random vertex
        let j = Math.floor(Math.random() * 3);
        let vertex = [vertices[j * 2], vertices[j * 2 + 1]];

        currentPoint = [
            ((currentPoint[0] + vertex[0]) / 2),
            ((currentPoint[1] + vertex[1]) / 2),
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