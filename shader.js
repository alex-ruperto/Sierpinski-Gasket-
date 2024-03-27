

// function to initiate shader program
export function initShaderProgram(gl, vsSource, fsSource) {
    // load/compile vertex shader using the helper function loadShader
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);

    // load/compile fragment using the function loadShader.
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram(); // create a shader program
    gl.attachShader(shaderProgram, vertexShader); // attach the vertex shader
    gl.attachShader(shaderProgram, fragmentShader); // attach the fragment shader
    gl.linkProgram(shaderProgram); // link attached shaders for the final shader program

    // check if the shader program was linked successfully 
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

// function to load and compile a shader
function loadShader(gl, type, source){
    // create shader  obj of type VERTEX_SHADER or FRAGMENT_SHADER
    const shader = gl.createShader(type);
    // set source code of shader
    gl.shaderSource(shader, source);
    // compile the shader code into a shader
    gl.compileShader(shader);

    // check if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;

}