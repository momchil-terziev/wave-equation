var h, k, c;
var u0 = new Array(new Array(100), new Array(100));
var u1 = new Array(new Array(100), new Array(100));
var u2 = new Array(new Array(100), new Array(100));
var al = [];
function setup() {
  dimx = 200;
  dimy = 200;

  cellsize = 1;
  c = 0.5;
  h = 1;
  kk = 1;
  al = pow((c * kk) / h, 2);
  pixelDensity(2);

  createCanvas(dimx, dimy);
  loadPixels();

  for (var i = 0; i < dimx; i++) {
    // for (var j = 0; j < dimy; j++) {
    //   for (var k = 0; k < 3; k++) {
    u0[i] = new Array(100);
    u1[i] = new Array(100);
    u2[i] = new Array(100);
    //  u[(i, j, k)] = 0;
    //   }
    // }
  }
    for (var i = 0; i < dimx; i++) {
      for (var j = 0; j < dimy; j++) {
        u0[i][j] = 0;
        u1[i][j] = 0;
        u2[i][j] = 0;
      }
    }
  
  disturbancex = round(random(dimx - 1));
  disturbancey = round(random(dimx - 1));
  u0[disturbancex][disturbancey] = 1;
  u1[disturbancex][disturbancey] = 1;
  u2[disturbancex][disturbancey] = 1;


  x = 0;
  y = 0;

  //  for (let k = 0; k < pixels.length; k+= 2) {
  ii = ind(disturbancex, disturbancey);
  set(disturbancex, disturbancey, 255);
  //  m = map(u[(x, y, 0)], 0, 1, 0, 255);
  // pixels[ii] = 255;
  // pixels[ii + 1] = 225;
  // pixels[ii + 2] = 225;
  // pixels[ii + 3] = 225;
  //  if (ii % 4 === 0) {

  //   }
  // }
  updatePixels();
}

function draw() {
  // background(255 / 2);
  loadPixels();
  //kl++

  for (var i = 1; i < dimx - 2; i++) {
    for (var j = 1; j < dimy - 2; j++) {
      u2[i][j] = u1[i][j];
      u1[i][j] = u0[i][j];
      u0[i][j] = 0.95 * u0[i][j];
    }
  }

  for (let i = 1; i < dimx - 2; i++) {
    for (let j = 1; j < dimy - 2; j++) {
      u0[i][j] =
        al *
          (u1[i + 1][j] +
            u1[i - 1][j] +
            u1[i][j + 1] +
            u1[i][j - 1] -
            4 * u1[i][j]) +
        2 * u1[i][j] -
        u2[i][j];
      //
      
      c = color(map(u0[i][j], -0.02, 0.02, 0, 225), map(u0[i][j], -0.02, 0.02, 0, 225), map(u0[i][j], -0.02, 0.02, 0, 225),[0]);
      set(i, j, c);

    }
  }
if (random(1)< 0.01) {
    disturbancex = round(random(dimx - 1));
  disturbancey = round(random(dimx - 1));
  u0[disturbancex][disturbancey] = 1;
}
  // for (let k = 0; k < pixels.length; k += 4) {
  //  ii = ind(x, y);
  //  m = map(u[(x, y, 0)], -1, 1, 0, 255);
  //  pixels[k] = m;
  //  x++;
  //  if (x === dimx) {
  //    x = 0;
  //    y++;
  //  }
  // }
  updatePixels();
}

function ind(i, j) {
  ii = (i + j * dimx) * 4;
  return ii;
}
