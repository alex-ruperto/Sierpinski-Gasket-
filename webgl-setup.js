export function initWebGL(canvas) {
    // set the canvas document and webgl as the context
    const gl = canvas.getContext("webgl");

    if(!gl){
        alert("Your browser or machine may not support WebGL. Unable to initialize");
        return null;
    }

    // clear color to white, 100% opaque
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // clear the color buffer with a specified color
    gl.clear(gl.COLOR_BUFFER_BIT);

    return gl;
}