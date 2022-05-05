  'use strict';

  // Global variables that are set and used
  // across the application
  let gl;

  // The programs
  let sphereGlobeProgram,sphereGlobeProgram2;

  // the textures
  let worldTexture;
  let myTexture;
  let lampTexture;
  // VAOs for the objects
  var mySphere = null;
  var myCube = null;
  var myCylinder = null;
  var myCone = null;

  // what is currently showing
  let nowShowing = 'Sphere';

  // what texure are you using
  // valid values = "globe", "myimage" or "proc"
  let curTexture = "globe";

  var anglesReset = [30.0, 30.0, 0.0];
  var cube_angles = [30.0, 30.0, 0.0];
  var sphere_angles = [180.0, 180.0, 0.0];
  var angles = sphere_angles;
  var angleInc = 5.0;


//
// load up the textures you will use in the shader(s)
// The setup for the globe texture is done for you
// Any additional images that you include will need to
// set up as well.
//
function setUpTextures(){
    
    // get some texture space from the gpu
    worldTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, worldTexture);
    
    // load the actual image
    var worldImage = document.getElementById ('world-texture')
   
    worldImage.crossOrigin = "";
    worldImage.onload = () =>{
        
    // bind the texture so we can perform operations on it
    gl.bindTexture (gl.TEXTURE_2D, worldTexture);
        
    // load the texture data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, worldImage.width, worldImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, worldImage);
        
    // set texturing parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);}

    // get some texture space from the gpu
    myTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, myTexture);
    
    // load the actual image
    var myImage = document.getElementById ('my-texture')
   
    myImage.crossOrigin = "";
    myImage.onload = () =>{
        
    // bind the texture so we can perform operations on it
    gl.bindTexture (gl.TEXTURE_2D, myTexture);
        
    // load the texture data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, myImage.width, myImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, myImage);
        
    // set texturing parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);}


    lampTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, lampTexture);

    // load the actual image
    var lampImage = document.getElementById ('3-texture')

    lampImage.crossOrigin = "";
    lampImage.onload = () =>{
        
    // bind the texture so we can perform operations on it
    gl.bindTexture (gl.TEXTURE_2D,lampTexture);
        
    // load the texture data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, lampImage.width, lampImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, lampImage);
        
    // set texturing parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);}
  
  
  
  
    
    

    

    






    
}

//
// Draws the current shape with the
// current texture
//
function drawCurrentShape () {
    
    // which shape are we drawing
    var object = mySphere;
    if (nowShowing == "Cube") object = myCube;
    
    // may need to set different parameters based on the texture
    // you are using...The current texture is found in the global variable
    // curTexture.   If will have the value of "globe", "myimage" or "proc"
    var texture=worldTexture
   

    // which program are we using
    var program = sphereGlobeProgram;
    if (curTexture=="proc") {program=sphereGlobeProgram2;}
    // set up your uniform variables for drawing
    gl.useProgram (program);
    
    // set up texture uniform & other uniforms that you might
    // have added to the shader
    gl.activeTexture (gl.TEXTURE0);
    gl.bindTexture (gl.TEXTURE_2D, texture);
    gl.uniform1i (program.uTheTexture, 0);

    
    
    // set up rotation uniform
    gl.uniform3fv (program.uTheta, new Float32Array(angles));


    let modelMatrix = glMatrix.mat4.create();
    
 




    // left plot
  
    modelMatrix = glMatrix.mat4.create();
      
    // drawing the teapot rotating around Y  180 degrees
    
    glMatrix.mat4.rotateX (modelMatrix,  modelMatrix, radians(-30.0))
    glMatrix.mat4.scale (modelMatrix,  modelMatrix, [0.2,0.2,0.2])
    glMatrix.mat4.translate (modelMatrix,  modelMatrix, [2,0,0])
    glMatrix.mat4.rotateX (modelMatrix,  modelMatrix, radians(-30.0))
    glMatrix.mat4.rotateY (modelMatrix,  modelMatrix, radians(-30.0))
    // send the model matrix to the shader and draw.
    gl.uniformMatrix4fv (program.uModelT, false, modelMatrix);

    //Bind the VAO and draw
    gl.bindVertexArray(object.VAO);
    gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);


    // left plot
  
    modelMatrix = glMatrix.mat4.create();
      
    // drawing the teapot rotating around Y  180 degrees
    //glMatrix.mat4.rotateX (modelMatrix,  modelMatrix, radians(20.0))
    
    glMatrix.mat4.scale (modelMatrix,  modelMatrix, [4,0.2,2])
    glMatrix.mat4.translate (modelMatrix,  modelMatrix, [0,-1,0])
    // send the model matrix to the shader and draw.
    gl.uniformMatrix4fv (program.uModelT, false, modelMatrix);
    // set up texture uniform & other uniforms that you might
    // have added to the shader
    gl.activeTexture (gl.TEXTURE0);
    gl.bindTexture (gl.TEXTURE_2D, myTexture);
    gl.uniform1i (program.uTheTexture, 0);

    //Bind the VAO and draw
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);




    // left plot
  
    modelMatrix = glMatrix.mat4.create();
      
    // drawing the teapot rotating around Y  180 degrees
    //glMatrix.mat4.rotateX (modelMatrix,  modelMatrix, radians(20.0))
    
    
    glMatrix.mat4.scale (modelMatrix,  modelMatrix, [0.05,0.5,0.05])
    glMatrix.mat4.translate (modelMatrix,  modelMatrix, [-2,0.4,0])
    
    // send the model matrix to the shader and draw.
    gl.uniformMatrix4fv (program.uModelT, false, modelMatrix);
    // set up texture uniform & other uniforms that you might
    // have added to the shader
    gl.activeTexture (gl.TEXTURE0);
    gl.bindTexture (gl.TEXTURE_2D, lampTexture);
    gl.uniform1i (program.uTheTexture, 0);

    //Bind the VAO and draw
    gl.bindVertexArray(myCylinder.VAO);
    gl.drawElements(gl.TRIANGLES, myCylinder.indices.length, gl.UNSIGNED_SHORT, 0);




    // left plot
  
    modelMatrix = glMatrix.mat4.create();
      
    // drawing the teapot rotating around Y  180 degrees
    //glMatrix.mat4.rotateX (modelMatrix,  modelMatrix, radians(20.0))
    
    
    glMatrix.mat4.scale (modelMatrix,  modelMatrix, [0.4,0.05,0.4])
    glMatrix.mat4.translate (modelMatrix,  modelMatrix, [-0.25,-1.3,0])
   
    // send the model matrix to the shader and draw.
    gl.uniformMatrix4fv (program.uModelT, false, modelMatrix);
    // set up texture uniform & other uniforms that you might
    // have added to the shader
    gl.activeTexture (gl.TEXTURE0);
    gl.bindTexture (gl.TEXTURE_2D, lampTexture);
    gl.uniform1i (program.uTheTexture, 0);

    //Bind the VAO and draw
    gl.bindVertexArray(myCylinder.VAO);
    gl.drawElements(gl.TRIANGLES, myCylinder.indices.length, gl.UNSIGNED_SHORT, 0);



    // left plot
  
    modelMatrix = glMatrix.mat4.create();
      
    // drawing the teapot rotating around Y  180 degrees
    glMatrix.mat4.translate (modelMatrix,  modelMatrix, [0,0.34,0])
    glMatrix.mat4.rotateZ (modelMatrix,  modelMatrix, radians(45.0))
    
    
    glMatrix.mat4.scale (modelMatrix,  modelMatrix, [0.3,0.3,0.3])
    
   
    // send the model matrix to the shader and draw.
    gl.uniformMatrix4fv (program.uModelT, false, modelMatrix);
    // set up texture uniform & other uniforms that you might
    // have added to the shader
    gl.activeTexture (gl.TEXTURE0);
    gl.bindTexture (gl.TEXTURE_2D, lampTexture);
    gl.uniform1i (program.uTheTexture, 0);

    //Bind the VAO and draw
    gl.bindVertexArray(myCone.VAO);
    gl.drawElements(gl.TRIANGLES, myCone.indices.length, gl.UNSIGNED_SHORT, 0);








    let projMatrix = glMatrix.mat4.create();
    //glMatrix.mat4.ortho(projMatrix, -5, 5, -5, 5, 1, 300.0);
    glMatrix.mat4.perspective(projMatrix, 90, 1, 1 / 256, 256)
    gl.uniformMatrix4fv (program.uProjT, false, projMatrix);

  
    // set up your view
    // defaut is at (0,0,-5) looking at the origin
    let viewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(viewMatrix, [0,0, 0.5], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);




    gl.uniform3fv(program.ambientLight,[0.5, 0, 0])
    gl.uniform3fv(program.baseColor,[0, 0, 0])
    gl.uniform3fv(program.specHighlightColor,[1, 1, 1])
    gl.uniform3fv(program.lightColor,[1, 1, 1])
    gl.uniform3fv(program.lightPosition,[-0.6,0.6,0])
    gl.uniform1f(program.ka,0.5);
    gl.uniform1f(program.kd,0.5);
    gl.uniform1f(program.ks,1);
    gl.uniform1f(program.ke,2);
    gl.uniform1f(program.op,1);
    if (curTexture=="myimage"){
      gl.uniform1f(program.op,0);
    }
    


   
    
}


//
// Set up your camera and your projection matrices
//
// function setUpCamera() {
//   var program=sphereGlobeProgram
//   gl.useProgram (program);
//   // set up your projection
//   // defualt is orthographic projection
//   let projMatrix = glMatrix.mat4.create();
//   glMatrix.mat4.ortho(projMatrix, -10, 10, -10, 10, 1, 300.0);
//   //glMatrix.mat4.perspective(projMatrix, 90, 1, 1 / 256, 256)
//   gl.uniformMatrix4fv (program.uProjT, false, projMatrix);

  
//   // set up your view
//   // defaut is at (0,0,-5) looking at the origin
//   let viewMatrix = glMatrix.mat4.create();
//   glMatrix.mat4.lookAt(viewMatrix, [6,0, 0], [0, 0, 0], [0, 1, 0]);
//   gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);
// }

// Create a program with the appropriate vertex and fragment shaders
function initProgram (vertexid, fragmentid) {
    
  // set up the per-vertex program
  const vertexShader = getShader(vertexid);
  const fragmentShader = getShader(fragmentid);
 
 
  
  
  
  

  // Create a program
  let program = gl.createProgram();
  
  // Attach the shaders to this program
  gl.attachShader(program, vertexShader);
  
  gl.attachShader(program, fragmentShader);
  
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Could not initialize shaders');
  }

  // Use this program instance
  gl.useProgram(program);
  // We attach the location of these shader values to the program instance
  // for easy access later in the code
  program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
  program.aUV = gl.getAttribLocation(program, 'aUV');
  program.aNormal = gl.getAttribLocation(program, 'aNormal');
    
  // uniforms - you will need to add references for any additional
  // uniforms that you add to your shaders
  program.uTheTexture = gl.getUniformLocation (program, 'theTexture');
  program.uTheta = gl.getUniformLocation (program, 'theta');
  program.uModelT = gl.getUniformLocation (program, 'modelT');
  program.uViewT = gl.getUniformLocation (program, 'viewT');
  program.uProjT = gl.getUniformLocation (program, 'projT');

  program.ambientLight = gl.getUniformLocation (program, 'ambientLight');
  program.lightPosition = gl.getUniformLocation (program, 'lightPosition');
  program.lightColor = gl.getUniformLocation (program, 'lightColor');
  program.baseColor = gl.getUniformLocation (program, 'baseColor');
  program.specHighlightColor = gl.getUniformLocation (program, 'specHighlightColor');
  program.ka = gl.getUniformLocation (program, 'ka');
  program.kd = gl.getUniformLocation (program, 'kd');
  program.ks = gl.getUniformLocation (program, 'ks');
  program.ke = gl.getUniformLocation (program, 'ke');
  program.op = gl.getUniformLocation (program, 'op');
  
  
    
  return program;
}

///////////////////////////////////////////////////////////////////
//
//  No need to edit below this line.
//
////////////////////////////////////////////////////////////////////

// general call to make and bind a new object based on current
// settings..Basically a call to shape specfic calls in cgIshape.js
function createShapes() {
    
    // the sphere
    mySphere = new Sphere (20,20);
    mySphere.VAO = bindVAO (mySphere, sphereGlobeProgram);
    
    // the cube
    myCube = new Cube (20);
    myCube.VAO = bindVAO (myCube, sphereGlobeProgram);

     // the cube
     myCone = new Cone (20,20);
     myCone.VAO = bindVAO (myCone, sphereGlobeProgram);
      
     // the cube
    myCylinder = new Cylinder (20,20);
    myCylinder.VAO = bindVAO (myCylinder, sphereGlobeProgram);

    
    
}



  // Given an id, extract the content's of a shader script
  // from the DOM and return the compiled shader
  function getShader(id) {
    const script = document.getElementById(id);
    const shaderString = script.text.trim();

    // Assign shader depending on the type of shader
    let shader;
    if (script.type === 'x-shader/x-vertex') {
      shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else if (script.type === 'x-shader/x-fragment') {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else {
      return null;
    }

    // Compile the shader using the supplied shader code
    gl.shaderSource(shader, shaderString);
    gl.compileShader(shader);

    // Ensure the shader is valid
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Compiling shader " + id + " " + gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }

//
// Creates a VAO for a given object and return it.
//
// shape is the object to be bound
// program is the program (vertex/fragment shaders) to use in this VAO
//
//
// Note that the program object has member variables that store the
// location of attributes and uniforms in the shaders.  See the function
// initProgram for details.
//
// You can see the definition of the shaders themselves in the
// HTML file assn6-shading.html.   Though there are 2 sets of shaders
// defined (one for per-vertex shading and one for per-fragment shading,
// each set does have the same list of attributes and uniforms that
// need to be set
//
function bindVAO (shape, program) {
    
    //create and bind VAO
    let theVAO = gl.createVertexArray();
    gl.bindVertexArray(theVAO);
    
    // create, bind, and fill buffer for vertex locations
    // vertex locations can be obtained from the points member of the
    // shape object.  3 floating point values (x,y,z) per vertex are
    // stored in this array.
    let myVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    
    // create, bind, and fill buffer for uv's
    // uvs can be obtained from the uv member of the
    // shape object.  2 floating point values (u,v) per vertex are
    // stored in this array.
    let uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(program.aUV);
    gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);


    // create, bind, and fill buffer for normal values
    // normals can be obtained from the normals member of the
    // shape object.  3 floating point values (x,y,z) per vertex are
    // stored in this array.
    let myBaryBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, myBaryBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.normals), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(program.aNormal);
    gl.vertexAttribPointer(program.aNormal, 3, gl.FLOAT, false, 0, 0);
    
    // Setting up element array
    // element indicies can be obtained from the indicies member of the
    // shape object.  3 values per triangle are stored in this
    // array.
    let myIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

    // Do cleanup
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    
    return theVAO;
}



  
  // We call draw to render to our canvas
  function draw() {
    // Clear the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
 
    // draw your shapes
    drawCurrentShape ();

    // Clean
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  // Entry point to our application
  function init() {
      
    // Retrieve the canvas
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) {
      console.error(`There is no canvas with id ${'webgl-canvas'} on this page.`);
      return null;
    }

    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);

    // Retrieve a WebGL context
    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error(`There is no WebGL 2.0 context`);
        return null;
      }
      
    // Set the clear color to be black
    gl.clearColor(0, 0, 0, 1);
      
    // some GL initialization
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.pixelStorei (gl.UNPACK_FLIP_Y_WEBGL, true);
      
    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);

    // Read, compile, and link your shaders
    sphereGlobeProgram = initProgram('sphereMap-V', 'sphereMap-F');
    sphereGlobeProgram2 = initProgram('sphereMap-V', 'sphereMap-E');

    //setUpCamera();
    
    // create and bind your current object
    createShapes();
    
    // set up your textures
    setUpTextures();

    
    
    // do a draw
    draw();
  }
