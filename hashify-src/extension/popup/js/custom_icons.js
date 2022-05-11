ICON_GENERATORS = {};

function getStdOpts(shape, size) {
  return {
    isForce3d: true,
    fill: COLORS.black,
    stroke: COLORS.grey,
    strokeWidth: 2,
    shape: shape,
    duration: 2000,
    isYoyo: true,
    isShowStart: true,
    easing: 'elastic.inout',
    repeat: true,
    width: size * 2.2,
    height: size * 2.2,
  }
}

function getStdAnimationOpts(options) {
  let dict = {};
  if (options.thinLine)
    dict.strokeWidth = 0.6;
  if (options.movingLine) {
    dict.strokeDasharray = { 2: 5 };
    dict.strokeDashoffset = { '0': "" + options.customDashArrayOffset };
  }

  return dict;
}

function getColorRotationSizeAnimOpts(options, adaptedIconSize) {
  if (options.animate) {
    c = {}; c[COLORS.green] = COLORS.hotpink;
    r = {}; r[adaptedIconSize] = adaptedIconSize * 1.05;
    a = { 0: 45 };
  }
  else {
    c = COLORS.green;
    r = adaptedIconSize;
    a = 0;
  }
  return { fill: c, radius: r, angle: a };
}

function addShapeToTimeline(timeline, shape, iconSize, baseOpts, shapeOpts) {
  let s = new mojs.Shape({
    ...getStdOpts(shape, iconSize),
    ...baseOpts,
    ...getStdAnimationOpts(baseOpts),
    ...shapeOpts
  });

  timeline.add(s);

  return s;
}

// OK
class icon_sun extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,68.4375,49.999995)"><path d="m 0,0 c 0,-8.146 -6.604,-14.75 -14.75,-14.75 -8.146,0 -14.75,6.604 -14.75,14.75 0,8.146 6.604,14.75 14.75,14.75 C -6.604,14.75 0,8.146 0,0 z" style="fill: none"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,56.521625,39.708245)"><path d="M 0,0 C 2.723,-1.731 4.533,-4.775 4.533,-8.233"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,50,37.812495)"><path d="M 0,0 C 0.579,0 1.146,-0.051 1.697,-0.148"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,44.421375,26.093745)"><path d="M 0,0 4.463,12.875 8.926,0"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,29.151,37.04037)"><path d="M 0,0 -5.948,12.26 6.312,6.312"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,26.09375,55.57862)"><path d="M 0,0 -12.875,4.463 0,8.926"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,37.040375,70.848995)"><path d="m 0,0 -12.26,-5.948 5.948,12.26"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,55.578625,73.906245)"><path d="M 0,0 -4.463,-12.875 -8.926,0"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,70.849,62.95962)"><path d="m 0,0 5.948,-12.26 -12.26,5.948"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,73.90625,44.42137)"><path d="M 0,0 12.875,-4.463 0,-8.926"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,62.959625,29.150995)"><path d="M 0,0 12.26,5.948 6.312,-6.312"></path></g>';
  }
}
mojs.addShape('sun', icon_sun);

ICON_GENERATORS['sun'] = function (timeline, x, y, options) {
  adaptedIconSize = 6 * options.baseIconSize / 5;

  addShapeToTimeline(timeline, 'sun', adaptedIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, adaptedIconSize),
    x: x,
    y: y,
  });
}


// OK
class icon_moon extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,70.811255,71.4925)"><path d="m 0,0 c -18.691,0 -33.843,15.152 -33.843,33.842 0,5.529 1.335,10.743 3.685,15.352 -10.972,-5.597 -18.491,-16.995 -18.491,-30.157 0,-18.691 15.152,-33.843 33.843,-33.843 13.162,0 24.56,7.519 30.157,18.491 C 10.742,1.334 5.528,0 0,0 z"></path></g><g transform="matrix(1.25,0,0,-1.25,25.207005,71.45525)"><path d="M 0,0 C -4.459,5.079 -7.166,11.733 -7.166,19.007"></path></g><g transform="matrix(1.25,0,0,-1.25,31.458255,77.097875)"><path d="M 0,0 C -0.607,0.432 -1.197,0.887 -1.769,1.363"></path></g>';
  }
}
mojs.addShape('moon', icon_moon);

ICON_GENERATORS['moon'] = function (timeline, x, y, options) {
  if (options.animate) {
    c = {}; c[COLORS.yellow] = COLORS.white;
    r = {}; r[options.baseIconSize] = options.baseIconSize * 1.05 + 3;
    a = { 0: 45 };
    xP = 0;
    yP = 0;

    moonBackground = addShapeToTimeline(timeline, 'moon', options.baseIconSize, options, {
      radius: r,
      stroke: 'transparent',
      strokeWidth: 0,
      x: x,
      y: y,
      fill: COLORS.hotpink,
    });
    p = moonBackground.el;
  }
  else {
    c = COLORS.yellow;
    r = options.baseIconSize;
    a = 0;
    xP = x;
    yP = y;
    p = options.parent;
  }

  addShapeToTimeline(timeline, 'moon', options.baseIconSize, options, {
    parent: p,
    radius: options.baseIconSize,
    x: xP,
    y: yP,
    fill: c,
  });
}

class icon_tree extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,59.146625,53.960105)"><path d="m 0,0 c 3.571,-3.865 8.429,-7.719 14.928,-10.498 0,0 -10.608,-4.537 -23.866,-4.47 -13.046,0.068 -23.855,4.47 -23.855,4.47 6.537,2.79 11.404,6.666 14.976,10.543"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,58.33125,40.85148)"><path d="m 0,0 c 2.813,-2.812 6.499,-5.557 11.251,-7.585 0,0 -8.688,-3.72 -19.536,-3.664 -10.675,0.057 -19.527,3.664 -19.527,3.664 4.781,2.039 8.478,4.795 11.29,7.629"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,54.011125,28.415605)"><path d="m 0,0 c 2.361,-2.846 5.789,-5.826 10.598,-7.876 0,0 -6.854,-2.936 -15.427,-2.891 -8.429,0.045 -15.418,2.891 -15.418,2.891 4.829,2.061 8.256,5.053 10.618,7.909"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,47.979125,10.000105)"><path d="m 0,0 c 0,0 -2.542,-8.73 -12.131,-12.823 0,0 5.496,-2.24 12.131,-2.274 6.738,-0.034 12.132,2.274 12.132,2.274 C 2.542,-8.73 0,0 0,0 z"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,51.82675,72.59473)"><path d="m 0,0 1.334,-13.224 c -2.941,-0.934 -5.885,-0.933 -8.832,0 L -6.144,0.03" style="fill: none"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,27.265625,17.031355)"><path d="M 0,0 2.125,0"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,14.453125,17.031355)"><path d="M 0,0 6.75,0"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,74.140625,31.01573)"><path d="M 0,0 9.125,0"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,66.484375,31.01573)"><path d="M 0,0 2,0"></path></g>';
  }
}
mojs.addShape('tree', icon_tree);

ICON_GENERATORS['tree'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'tree', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y,
    angle: 0
  });
}



class icon_house extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,89.999995,50.57713)"><path d="M 0,0 -32,32 -64,0" style="fill:none;"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,17.34812,43.22913)"><path d="m 0,0 0,-36.955 52.244,0 0,36.955" style="fill:none;"></path></g>' +
      '<g><path d="m 59.30587,89.42238 -18.61,0 0,-22.2225 18.61,0 0,22.2225 z"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,65.78987,26.36638)"><path d="m 0,0 0,12.627 8.534,0 0,-21.161"></path></g>' +
      '<g><path d="m 60.84087,56.35863 -21.68125,0 0,-21.68125 21.68125,0 0,21.68125 z"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,50.00062,34.677505)"><path d="M 0,0 0,-17.345" style="fill:none;"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,39.160245,45.51788)"><path d="M 0,0 17.345,0" style="fill:none;"></path></g>';
  }
}
mojs.addShape('house', icon_house);

ICON_GENERATORS['house'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'house', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}

class icon_car extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,67.873,59.935245)"><path d="M 0,0 -31.114,0"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,18.4675,59.935245)"><path d="M 0,0 -1.123,0 -5.727,1.062 C -6.335,1.204 -6.774,1.751 -6.774,2.38 l 0,6.078 c 0,0.521 0.303,0.994 0.777,1.224 1.825,0.865 6.774,2.853 13.928,2.995 2.616,2.015 5.523,3.577 8.606,4.625 3.083,1.054 6.342,1.602 9.642,1.602 3.921,0 7.829,-0.358 11.669,-1.075 3.84,-0.71 7.62,-1.771 11.284,-3.178 L 50.274,14.212 56.056,13.651 57.226,1.61 49.295,0 47.936,0" style="fill:none;"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,78.683625,58.137245)"><path d="m 0,0 c 0,-2.456 -1.991,-4.446 -4.446,-4.446 -2.455,0 -4.447,1.99 -4.447,4.446 0,2.456 1.992,4.446 4.447,4.446 C -1.991,4.446 0,2.456 0,0 z"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,29.276875,58.137245)"><path d="m 0,0 c 0,-2.456 -1.99,-4.446 -4.445,-4.446 -2.456,0 -4.447,1.99 -4.447,4.446 0,2.456 1.991,4.446 4.447,4.446 C -1.99,4.446 0,2.456 0,0 z"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,28.380875,44.088745)"><path d="m 0,0 c 0,0 8.803,-5.089 23.995,-3.914 0.089,0.007 0.177,0.014 0.265,0.021 6.269,0.502 12.351,2.343 17.889,5.323 C 40.626727,1.8306886 16.800827,12.858723 0.52368492,0.12078645"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,54.84575,36.305495)"><path d="M 0,0 -0.713,-10.307"  style="fill:none;"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,49.99825,54.687495)"><path d="M 0,0 6.08,0"></path></g>';

  }
}
mojs.addShape('car', icon_car);

ICON_GENERATORS['car'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'car', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}

class icon_pencil extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,32.7125,80.23859)"><path d="m 0,0 -18.17,-7.809 7.809,18.169 43.685,43.685 c 2.861,2.861 7.499,2.861 10.361,0 2.86,-2.861 2.86,-7.5 0,-10.36 L 0,0 z" style="fill:none;"></path>' +
      '<path d="M 0,0 C -9.9567988,9.9078641 -5.2355021,5.1707745 -10.361,10.36 L 22.616383,43.539414 33.381444,33.583475 z"></path>' +
      '<path d="M -8.699567,-3.7202329 -18.17,-7.809 l 4.172451,9.4816882 c 1.737146,-0.1397898 5.2619336,-3.7129422 5.297982,-5.3929211 z"></path>' +
      '</g>' +
      '<g transform="matrix(1.25,0,0,-1.25,19.7615,67.288215)"><path d="M 0,0 10.361,-10.36" style="fill:none;"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,15.15575,78.004715)"><path d="m 0,0 c 1.184,-0.508 2.293,-1.246 3.259,-2.212 0.967,-0.967 1.704,-2.076 2.213,-3.26" style="fill:none;"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,61.41675,25.632965)"><path d="M 0,0 10.36,-10.361" style="fill:none;"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,67.892,32.10809)"><path d="M 0,0 -33.324,-33.324" style="fill:none;"></path></g>';
  }
}
mojs.addShape('pencil', icon_pencil);

ICON_GENERATORS['pencil'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'pencil', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}



class icon_cloud extends mojs.CustomShape {
  getShape() {
    return '<path d="m 25.253814,45.451763 c 13.131983,-9.596449 14.394673,-10.85914 23.233508,-10.354064 8.838835,0.505077 26.011428,1.515229 28.284271,4.798225 2.272843,3.282996 -45.421382,15.54889 -48.234784,14.394674 -9.848987,-4.04061 -3.282995,-8.838835 -3.282995,-8.838835 z" style="stroke: none;"></path>' +
      '<g transform="matrix(1.25,0,0,-1.25,67.8575,40.80137)"><path d="m 0,0 c 1.452,0.558 3.028,0.864 4.677,0.864 7.2,0 13.037,-5.837 13.037,-13.038 0,-7.201 -5.837,-13.037 -13.037,-13.037 l -40.963,0 c -5.522,0 -10,4.477 -10,10 0,5.522 4.478,10 10,10 2.428,0 4.653,-0.866 6.385,-2.304"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,22.834375,47.32412)"><path d="m 0,0 c 0.239,5.864 5.068,10.544 10.991,10.544 1.821,0 3.538,-0.442 5.051,-1.225"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,39.758125,43.25487)"><path d="m 0,0 c 1.208,7.072 7.368,12.456 14.785,12.456 6.433,0 11.92,-4.049 14.051,-9.738"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,36.104,67.632995)"><path d="M 0,0 20.5,0"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,25.94775,67.632995)"><path d="M 0,0 3.563,0"></path></g>';
  }
}
mojs.addShape('cloud', icon_cloud);

ICON_GENERATORS['cloud'] = function (timeline, x, y, options) {
  if (options.animate) {
    c = {}; c[COLORS.lightGrey] = COLORS.white;
    r = {}; r[options.baseIconSize] = options.baseIconSize * 1.05 + 3;
    a = { 0: 45 };
    xP = 0;
    yP = 0;

    moonBackground = addShapeToTimeline(timeline, 'cloud', options.baseIconSize, options, {
      radius: r,
      stroke: 'transparent',
      strokeWidth: 0,
      x: x,
      y: y,
      fill: COLORS.hotpink,
    });
    p = moonBackground.el;
  }
  else {
    c = COLORS.lightGrey;
    r = options.baseIconSize;
    a = 0;
    xP = x;
    yP = y;
    p = options.parent;
  }

  addShapeToTimeline(timeline, 'cloud', options.baseIconSize, options, {
    parent: p,
    radius: options.baseIconSize,
    x: xP,
    y: yP,
    fill: c,
  });
}


class icon_envelope extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,85,76.874995)"><path d="m 0,0 -56,0 c -2.209,0 -4,1.791 -4,4 l 0,35 c 0,2.209 1.791,4 4,4 l 56,0 c 2.209,0 4,-1.791 4,-4 L 4,4 C 4,1.791 2.209,0 0,0 z" style="fill: none;"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,88.489875,24.546495)"><path d="m 0,0 -28.05,-26.407 c -1.541,-1.45 -3.944,-1.45 -5.484,0 L -61.583,0"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,38.550375,49.99762)"><path d="M 0,0 -21.632,-20.364"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,88.489875,75.453495)"><path d="M 0,0 -21.63,20.363"></path></g>';
  }
}
mojs.addShape('envelope', icon_envelope);

ICON_GENERATORS['envelope'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'envelope', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}

class icon_gear extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,89.999995,55.647505)"><path d="m 0,0 0,9.035 -7.967,0.996 c -0.624,2.727 -1.696,5.281 -3.14,7.581 l 4.929,6.339 -6.388,6.388 -6.339,-4.93 c -2.3,1.445 -4.854,2.518 -7.581,3.141 l -0.996,7.968 -9.035,0 -0.996,-7.968 c -2.727,-0.623 -5.281,-1.696 -7.581,-3.141 l -6.339,4.93 -6.388,-6.388 4.93,-6.339 c -1.444,-2.3 -2.518,-4.854 -3.141,-7.581 L -64,9.035 -64,0 l 7.968,-0.996 c 0.623,-2.727 1.697,-5.281 3.141,-7.581 l -4.93,-6.339 6.388,-6.388 6.339,4.93 c 2.3,-1.444 4.854,-2.518 7.581,-3.141 l 0.996,-7.967 9.035,0 0.996,7.967 c 2.727,0.623 5.281,1.697 7.581,3.141 l 6.339,-4.93 6.388,6.388 -4.929,6.339 c 1.444,2.3 2.516,4.854 3.14,7.581 L 0,0 z m -15.0586,4.5176 c 0,-9.356 -7.584,-16.941 -16.941,-16.941 -9.356,0 -16.941,7.585 -16.941,16.941 0,9.356 7.585,16.941 16.941,16.941 9.357,0 16.941,-7.585 16.941,-16.941 z"></path></g>';
  }
}
mojs.addShape('gear', icon_gear);

ICON_GENERATORS['gear'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'gear', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}

class icon_diamond extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,19.371375,14.179745)"><path d="M 0,0 12.146,-14.784 24.503,0"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,80.6275,14.179745)"><path d="M 0,0 -12.146,-14.784 -24.502,0"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,65.444375,32.65937)"><path d="M 0,0 -12.362,-42.529 -24.712,0"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,90,32.65937)"><path d="M 0,0 -32.007,-42.529 -64,0 0,0 z" style="fill: none;"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,90,32.65937)"><path d="m 0,0 -64,0 7.497,14.784 49.005,0 L 0,0 z" style="fill: none;"></path></g>';
  }
}
mojs.addShape('diamond', icon_diamond);

ICON_GENERATORS['diamond'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'diamond', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}



// OK
class icon_flask extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,88.810966,75.283125)"><path d="m 0,0 -22.083,24.858 0,25.809 -17.932,0 0,-25.809 L -62.097,0 c -2.75,-5.089 0.864,-10.214 5.674,-10.214 l 50.749,0 C -0.865,-10.214 2.749,-5.089 0,0 z" style="fill:none;"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,33.621841,11.949375)"><path d="M 0,0 26.205,0"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,88.810966,75.283125)"><path d="m 0,0 -8.7489864,9.9077423 c -44.1420516,-0.5514237 -16.6853596,8.1212887 -44.6000276,0 L -62.097,0 c -2.75,-5.089 0.864,-10.214 5.674,-10.214 l 50.749,0 C -0.865,-10.214 2.749,-5.089 0,0 z"></path></g>';
  }
}
mojs.addShape('flask', icon_flask);

ICON_GENERATORS['flask'] = function (timeline, x, y, options) {
  options.baseIconSize = 0.8 * options.baseIconSize;
  addShapeToTimeline(timeline, 'flask', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}



class icon_dog extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,42.929995,84.60319)"><path d="m 0,0 -9.209,0 c -1.05,0 -1.9,-0.851 -1.9,-1.9 0,-1.05 0.85,-1.901 1.9,-1.901 l 13.397,0 c 1.17,0 2.119,0.949 2.119,2.119 l 0,2.036 c 2.736,-1.721 5.904,-2.634 9.137,-2.634 l 12.492,0 c 2.78,0 5.554,0.268 8.283,0.8 0.835,0.163 1.437,0.895 1.437,1.745 0,0.983 -0.796,1.778 -1.778,1.778 l -9.234,0 -13.097,0.518 C 12.103,2.618 10.781,3.385 10.015,4.61 9.6,5.274 9.388,6.038 9.357,6.82 8.677,24.104 -6.429,40.082 -6.429,40.082 l 0,14.84 c 0,0.645 -0.398,1.224 -1,1.454 l -7.018,2.687 c -0.525,0.201 -1.117,0.104 -1.55,-0.255 l -2.516,-2.085 c -0.279,-0.231 -0.631,-0.358 -0.993,-0.358 l -4.048,0 c -0.86,0 -1.556,-0.697 -1.556,-1.557 l 0,-2.674 c 0,-0.682 0.441,-1.283 1.092,-1.486 2.126,-0.661 6.61,-2.349 6.61,-4.823 0,-3.243 -10.202,-20.81 -1.217,-30.809 0,0 2.467,-6.959 -3.563,-15.016 l -2.255,0 c -1.05,0 -1.901,-0.851 -1.901,-1.9 0,-1.05 0.851,-1.901 1.901,-1.901 l 6.055,0 c 3.884,5.267 5.979,11.638 5.979,18.182 l 0,13.134"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,42.929995,84.59169)"><path d="m 0,0 c -4.469,0 -8.091,3.622 -8.091,8.091 0,4.468 3.622,8.091 8.091,8.091"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,27.503995,18.20069)"><path d="m 0,0 -0.574,-5.534 c -0.199,-1.919 1.306,-3.587 3.234,-3.587 1.796,0 3.252,1.455 3.252,3.251 l 0,4.316"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,27.41912,55.06894)"><path d="m 0,0 2.047,-5.477 c 0.77,-2.059 2.247,-3.777 4.168,-4.846 l 0,-10e-4"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,24.176995,16.31894)"><path d="M 0,0 0,0"></path></g>';
  }
}
mojs.addShape('dog', icon_dog);

ICON_GENERATORS['dog'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'dog', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y,
    angle: 0
  });
}





class icon_cat extends mojs.CustomShape {
  getShape() {
    return '<g><path d="m 43.03268,60.336875 c 2.62,-2.44375 6.2575,-3.8125 10.2075,-3.40125 5.95125,0.61875 10.80875,5.44125 11.465,11.38875 0.8625,7.8025 -5.22375,14.4075 -12.8525,14.4075 l 9.82125,0 c 2.8275,0 5.12,2.29125 5.12,5.11875 l -39.9725,0 c 0,0 -7.78875,-1.74375 -13.42,-13.6025 -5.30125,-11.16625 2.75625,-18.9125 -2.5175,-24.22375 -0.72,-0.725 -1.005,-1.77875 -0.8375,-2.7875 0.4875,-2.93 4.37125,-3.835 5.98125,-1.34 0.5,0.77625 0.92625,1.69375 1.205,2.7725 1.38,5.3225 -5.6625,24.4175 9.58875,29.34625 0,-18.365 8.45,-37.7075 33.25125,-37.7075 -1.55625,-26.885 19.52625,-28.15875 19.52625,-28.15875 l -2.82875,5.66125 c 0,0 4.38625,-0.425 7.49875,3.1825 3.1125,3.60875 -0.1475,10.4 5.73125,12.66375 0,0 -2.3325,7.715 -9.58125,7.64 -1.25375,-0.01375 -2.39125,0.7325 -2.8475,1.89875 -0.27875,0.7125 -0.275,1.4975 0.0087,2.2075 1.44125,3.61 5.29375,15.565 -3.64,22.355 l 3.96125,14.97375 1.38875,0 c 2.82875,0 5.12,2.29125 5.12,5.11875 l -6.8725,0 c -2.05875,0 -3.97125,-1.07125 -5.0475,-2.82625 l -5.20125,-8.4925 -2.54625,-8.06625"></path></g>' +
      '<g><path d="m 76.37443,28.019375 1.035,1.82375"></path></g>' +
      '<g><path d="m 89.99993,33.657125 c 0,0 -3.45,2.72375 -7.825,0.61375"></path></g>';
  }
}
mojs.addShape('cat', icon_cat);

ICON_GENERATORS['cat'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'cat', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y,
    angle: 0
  });
}



class icon_elephant extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,36.686005,46.71491)"><path d="m 0,0 c 0.22,-7.214 -4.435,-10.933 -4.709,-13.347 -0.274,-2.414 -2.313,-9.365 -3.41,-10.133 0,0 1.728,-2.277 7.132,-0.659 0,0 -0.135,4.912 0.995,7.708 1.857,4.599 11.101,14.84 11.101,18.242"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,67.37263,54.68366)">' +
      '<path d="m -17.382,0.801 c 0,0 2.105,-10.007 3.942,-13.079 1.109,-1.853 1.893,-4.224 0.247,-4.992 0,0 -3.735,-1.427 -6.448,0 l 0.965,2.621 c 0.199,0.541 0.208,1.133 0.024,1.678 l -2.744,8.137"></path>' +
      '<path d="M 1.8687822,3.6365492 C 0.79078216,3.1100492 0.98587696,1.998451 0.12583134,0.00447415 -2.450972,-1.347622 -9.971,-0.076 -11.629,0.801 c -2.862,1.514 -5.753,0 -5.753,0 0,0 4.074797,5.4483338 3.891492,7.4270965"></path>' +
      '</g>' +
      '<g transform="matrix(1.25,0,0,-1.25,69.53938,50.227535)"><path d="m 0,0 c 0,0 -2.078,-2.359 -1.972,-6.844 0.058,-2.107 -0.339,-4.205 -1.063,-6.186 -0.851,-2.291 -2.069,-4.949 -3.5,-6.216 l -0.357,-1.479 c 0,0 3.325,-1.595 7.24,0 0,0 0.332,1.658 0.864,3.023 0.403,1.037 0.823,2.064 1.18,3.119 0.587,1.731 1.477,4.153 2.074,5.585 l 2.508,-6.244 c 0.245,-0.608 0.317,-1.272 0.211,-1.918 l -0.606,-3.675 c 0,0 2.612,-1.126 6.123,1.07 0.709,0.443 1.119,1.244 1.119,2.08 0,0.311 -0.058,0.62 -0.173,0.909 l -2.374,6.037 c -0.849,2.161 -1.161,4.496 -0.909,6.805 l 0.713,6.511 0,0.837 0,3.84 c 0,7.665 -6.214,13.88 -13.88,13.88 -1.878,0 -3.747,-0.204 -5.586,-0.582 -3.03,-0.623 -8.568,-2.13 -11.714,-0.168 -1.947,1.214 -4.856,0.735 -6.757,0.208 -1.346,-0.373 -2.773,-0.271 -4.052,0.287 l -2.138,0.932 c -6.364,1.755 -8.558,-2.049 -8.558,-2.049 l -1.75,-2.832 c -0.629,-1.017 -0.962,-2.19 -0.962,-3.387 0,-0.772 0.139,-1.54 0.411,-2.263 l 0.033,-0.087 c 0.351,-0.936 0.531,-1.927 0.531,-2.927 l 0,-1.177 0,-26.698 c 0,-1.008 0.817,-1.825 1.825,-1.825 0.975,0 1.777,0.766 1.823,1.74 l 0.678,14.494 0.48,7.395 c 3.183,0.208 3.533,3.852 3.533,3.852 l 2.578,0 c 0,0 2.315,-5.588 5.629,-7.704"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,42.28163,23.95366)"><path d="M 0,0 C 0.628,-1.068 1.812,-3.72 1.632,-4.981 1.38,-6.757 -3.32,-9.786 -4.312,-11.17 c -0.993,-1.384 -3.5,-3.578 -3.656,1.802 -0.028,0.961 0.067,1.962 0.243,2.958"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,24.335505,32.372285)"><path d="M 0,0 C 1.085,0.501 2.205,0.389 2.501,-0.252 2.797,-0.893 2.157,-1.819 1.072,-2.32 -0.014,-2.822 -1.133,-2.709 -1.43,-2.068 -1.726,-1.427 -1.085,-0.501 0,0"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,15.359005,52.046285)"><path d="M 0,0 C 0,0 -1.508,-2.537 -4.287,-2.537"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,81.759755,33.82241)"><path d="M 0,0 C 0,0 6.592,-1.882 6.592,-10.305"></path></g>';
  }
}
mojs.addShape('elephant', icon_elephant);

ICON_GENERATORS['elephant'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'elephant', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y,
    angle: 0
  });
}




class icon_bird extends mojs.CustomShape {
  getShape() {
    return '<path d="M 55.178571,43.214286 C 42.142857,59.285715 44.821428,59.642857 44.821428,59.642857 c 0,0 -14.464285,7.857143 -14.642857,11.071429 C 30,73.928572 30.357143,75.535714 37.5,71.071429 44.642857,66.607143 59.821428,65.357143 60,63.035715 c 0.178571,-2.321429 0.892857,-16.25 -0.178572,-17.5 -1.071428,-1.25 -4.642857,-2.321429 -4.642857,-2.321429 z" style="stroke: none;"></path>' +
      '<g transform="matrix(1.25,0,0,-1.25,58.41561,44.907995)"><path d="m 0,0 0.841,5.345 c 0.841,5.344 -11.89,8.647 -11.89,8.647 0.54,-1.021 1.861,-3.603 1.861,-3.603 -5.404,0.84 -13.451,7.086 -13.451,7.086 0.264,-1.989 1.927,-4.483 1.927,-4.483 -6.486,0.721 -18.02,9.598 -18.02,9.598 0,0 8.167,-12.349 14.412,-15.832 -6.451,0.773 -12.216,5.308 -12.216,5.308 0,0 3.366,-11.261 16.329,-14.258 0,0 -5.303,-1.088 -10.354,0.399 0,0 6.811,-4.628 12.286,-5.359 0,0 -3.122,-1.916 -5.525,-1.035 0,0 4.492,-4.244 14.177,-3.523 0,0 -15.458,-8.808 -24.426,-10.089 l 4.099,-2.897 7.286,2.242 m 23.3632,4.1708 c 0,0 3.204,-7.039 6.487,-5.597 3.284,1.441 -0.16,8.167 1.041,10.168 0,0 5.783,-1.949 8.167,3.653 0,0 1.078,1.18 2.763,1.198 2.217,0.023 5.023,-2.28 5.023,-2.851 0,0 2.411,5.735 0.051,8.302 -4.956,5.389 -9.759,1.218 -9.759,1.218 0,0 -9.488,-1.651 -14.472,2.192 m 14.4725,-2.1917 c -1.321,7.526 3.123,5.855 5.72,11.02 2.595,5.164 -1.516,9.728 -2.837,17.054 0,0 -3.013,-8.447 -2.428,-11.73 0,0 -4.244,3.299 -4.244,4.901 0,0 -1.016,-7.479 0.505,-10.522 0,0 -3.366,3.283 -4.461,5.471 0,0 -0.505,-7.154 1.347,-10.185 0,0 -2.862,-0.421 -3.956,1.684 0,0 -0.709,-5.023 1.297,-7.684 m 6.4945,-21.6975 -2.962,-1.241 -0.881,-2.923 m -0.8807,4.164 3.523,-2.482 m -10.8325,-7.6669 0.868,3.564 3.542,1.22 m -5.3466,0.3688 4.148,-3.651 m -29.9556,8.7804 1.936,-3.761 c 0,0 12.821,10.273 18.586,10.914 0,0 -0.72,-11.85 4.244,-12.651 0,0 2.562,0.32 2.482,3.123 -0.08,2.802 -0.08,12.09 2.402,12.891"></path></g>';
  }
}
mojs.addShape('bird', icon_bird);

ICON_GENERATORS['bird'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'bird', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}


class icon_box extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,33.414875,58.780875)"><path d="M 0,0 0,18.533 16.94,25.967 8.839,29.526 -8.195,22.045 -8.195,4 0,0 z"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,90,25.366)"><path d="M 0,0 -32,14.049 -64,0 m 32,-53.4634 32,14.049 0,39.414 -32,-14.048 0,-39.415 z m 0,0 -32,14.049 0,39.414 32,-14.048 0,-39.415 z" style="fill: none;"></path></g>';
  }
}
mojs.addShape('box', icon_box);

ICON_GENERATORS['box'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'box', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}


class icon_calculator extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,76.26,89.999995)"><path d="m 0,0 -42.015,0 c -1.703,0 -3.084,1.381 -3.084,3.084 l 0,57.833 c 0,1.703 1.381,3.083 3.084,3.083 L 0,64 c 1.703,0 3.083,-1.38 3.083,-3.083 l 0,-57.833 C 3.083,1.381 1.703,0 0,0 z" style="fill: none;"></path></g>' +
      '<g><path d="m 64.0725,84.58262 11.04125,0 0,-28.75 -11.04125,0 0,28.75 z m -8.55125,0 -11.04125,0 0,-11.04125 11.04125,0 0,11.04125 z m -19.5925,0 -11.04125,0 0,-11.04125 11.04125,0 0,11.04125 z m 19.5925,-17.7075 -11.04125,0 0,-11.0425 11.04125,0 0,11.0425 z m -19.5925,0 -11.04125,0 0,-11.0425 11.04125,0 0,11.0425 z m 39.185,-17.70875 -11.04125,0 0,-11.04125 11.04125,0 0,11.04125 z m -19.5925,0 -11.04125,0 0,-11.04125 11.04125,0 0,11.04125 z m -19.5925,0 -11.04125,0 0,-11.04125 11.04125,0 0,11.04125 z m -11.0425,-34.1675 50.2275,0 0,15.20875 -50.2275,0 0,-15.20875 z"></path></g>';
  }
}
mojs.addShape('calculator', icon_calculator);

ICON_GENERATORS['calculator'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'calculator', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}


class icon_leaf extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,16.66638,65.399875)"><path d="m 0,0 c -21.6,49.675 51.467,35.67 58.667,39.52 0,0 -8.311,-10.337 -14.133,-26.791 C 37.727,-6.506 14.667,-9.627 0,0"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,53.666505,49.488)"><path d="m 0,0 c 0,0 -13.314,3.33 -21.457,-1.964 m 8.6572,18.9963 c 0,0 1.867,-4.708 0,-10.889 m 18.6665,10.889 c 0,0 -39.467,-18.382 -40.8,-44.642" style="fill: none;"></path></g>';
  }
}
mojs.addShape('leaf', icon_leaf);

ICON_GENERATORS['leaf'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'leaf', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}


// OK
class icon_shield extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,50,10)"><path d="m 0,0 c 0,0 9.237,-10.092 22.455,-10.092 l 0,-28.426 C 22.455,-58.993 0,-64 0,-64 c 0,0 -22.455,5.007 -22.455,25.482 l 0,28.426 C -9.237,-10.092 0,0 0,0 z" style="fill:none"></g></path><g transform="matrix(1.25,0,0,-1.25,50,16.845125)"><path d="m 0,0 c -3.551,-2.923 -10.061,-7.265 -18.418,-8.383 l 0,-18.792 18.418,0 L 0,0 z"></path></g><g transform="matrix(1.25,0,0,-1.25,50,50.813625)"><path d="m 0,0 0,-27.172 c 3.775,1.11 18.417,6.385 18.417,21.305 L 18.417,0 0,0 z"></path></g>';
  }
}
mojs.addShape('shield', icon_shield);

ICON_GENERATORS['shield'] = function (timeline, x, y, options) {
  if (options.animate) {
    a = {}; a[COLORS.green] = COLORS.hotpink;
    r = { 50: 53 };
  }
  else {
    a = COLORS.green;
    r = 50;
  }

  addShapeToTimeline(timeline, 'shield', options.baseIconSize, options, {
    radius: r,
    x: x,
    y: y,
    fill: a,
  });
}



class icon_sword extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,63.23903,27.607565)"><path d="m 0,0 12.57,12.57 m -5.2477,-19.8922 12.57,12.57 m -8.5427,-16.5974 -15.377,15.377 -3.288,-3.288 5.647,-9.73 9.73,-5.647 3.288,3.288 z m 8.543,16.5972 c 2.021,2.022 2.021,5.3 0,7.322 -2.022,2.022 -5.301,2.022 -7.322,0 -2.023,-2.022 -2.023,-5.3 0,-7.322 2.021,-2.022 5.3,-2.022 7.322,0 z"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,10.00053,90.000065)"><path d="M 0,0 22.027,22.028 M 38.1582,45.687 3.9052,15.621 2e-4,0 l 15.62,3.905 30.066,34.254" style="fill: none;"></path></g>';
  }
}
mojs.addShape('sword', icon_sword);

ICON_GENERATORS['sword'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'sword', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}


class icon_medal extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,47.180187,62.084185)"><path d="m 0,0 0,5.406 4.512,0 0,-5.406 m 9.0231,-11.0537 c 0,-6.229 -5.05,-11.279 -11.279,-11.279 -6.23,0 -11.28,5.05 -11.28,11.279 0,6.229 5.05,11.279 11.28,11.279 6.229,0 11.279,-5.05 11.279,-11.279 z" style="fill: none;"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,49.999937,67.157435)"><path d="M 0,0 2.056,-4.165 6.652,-4.833 3.326,-8.075 4.111,-12.653 0,-10.492 l -4.111,-2.161 0.785,4.578 -3.326,3.242 4.596,0.668 L 0,0 z m -0.1045,16.6728 -11.956,22.62 -7.687,0 15.767,-29.828 7.686,0 m 16.0421,29.8282 -39.495,0 4.178,6.433 31.139,0 4.178,-6.433 z"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,54.631937,55.326435)"><path d="m 0,0 -7.687,0 16.042,29.828 7.687,0 L 0,0 z"></path></g>';
  }
}
mojs.addShape('medal', icon_medal);

ICON_GENERATORS['medal'] = function (timeline, x, y, options) {
  options.baseIconSize = options.baseIconSize * 1.2;
  addShapeToTimeline(timeline, 'medal', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}



// in place of the certificate icon we will be adding a changing hexagon-pentagon
ICON_GENERATORS['polygon'] = function (timeline, x, y, options) {
  var points = 4;
  if (options.animate) {
    points = {}; points[3] = 6;
  }
  addShapeToTimeline(timeline, 'polygon', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y,
    points: points,
    angle: 0
  });
}



class icon_printer extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,26.09525,67.603745)"><path d="m -12.785714,18.928571 -0.09029,5.264429 c -0.09193,2.193074 1.778,3.974 3.973,3.974 l 56.052,0 c 2.195,0 3.975,-1.779 3.975,-3.974 -0.01144,-0.325403 -0.0046,-4.335857 -0.16271,-5.478714"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,9.99975,44.062495)"><path d="m 0,0 64,0 m -7.3228,-36.75 -49.355,0 m 7.375,23.792 34.605,0 m 1.1978,-17.8438 -37,0 m 2.3222,5.9483 32.355,0 m -29.98,5.9472 27.605,0 m -38.48,-17.8437 7.375,23.792 m 34.605,0 7.375,-23.792 m -32.3965,64 0,-9.583 -9.583,0 m 9.583,9.583 25.021,0 0,-17.916 -34.604,0 0,8.333 9.583,9.583 z m -11.4043,-46.083 -8.903,0 c -2.195,0 -3.973,1.779 -3.973,3.974 l 0,20.219 c 0,2.195 1.778,3.974 3.973,3.974 l 56.052,0 c 2.195,0 3.975,-1.779 3.975,-3.974 l 0,-20.219 c 0,-2.195 -1.78,-3.974 -3.975,-3.974 l -8.902,0" style="fill: none;"></path></g>';
  }
}
mojs.addShape('printer', icon_printer);

ICON_GENERATORS['printer'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'printer', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y,
    angle: 0
  });
}



class icon_chair extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,39.98325,86.3725)"><path d="m 0,0 c 0,-1.603 -1.299,-2.902 -2.902,-2.902 -1.602,0 -2.902,1.299 -2.902,2.902 0,1.603 1.3,2.902 2.902,2.902 C -1.299,2.902 0,1.603 0,0 z m 10.9151,0 c 0,-1.603 -1.299,-2.902 -2.902,-2.902 -1.602,0 -2.902,1.299 -2.902,2.902 0,1.603 1.3,2.902 2.902,2.902 1.603,0 2.902,-1.299 2.902,-2.902 z m 10.915,0 c 0,-1.603 -1.299,-2.902 -2.902,-2.902 -1.602,0 -2.902,1.299 -2.902,2.902 0,1.603 1.3,2.902 2.902,2.902 1.603,0 2.902,-1.299 2.902,-2.902 z m -34.3657,22.4707 0,18.941 c 0,2.08 1.685,3.765 3.765,3.765 l 2.353,0 m 34.9801,-22.706 0,18.941 c 0,2.08 -1.686,3.765 -3.765,3.765 l -2.353,0 m 3.2548,-25.5693 -35.373,0 c -1.581,0 -2.862,1.282 -2.862,2.863 0,1.581 1.281,2.863 2.862,2.863 l 35.373,0 c 1.581,0 2.863,-1.282 2.863,-2.863 0,-1.581 -1.282,-2.863 -2.863,-2.863 z"></path></g>' +
      '<g><path d="m 53.03875,77.2555 -6.0775,0 0,-15.39125 6.0775,0 0,15.39125 z m -3.039,5.489 0,-5.49 m -13.64375,5.49 0,-5.49 27.2875,0 0,5.49 m 4.39525,-28.03825 -36.0775,0 0,-40 C 31.96125,12.1075 34.0675,10 36.66625,10 l 26.66625,0 c 2.59875,0 4.70625,2.1075 4.70625,4.70625 l 0,40 z" style="fill: none;"></path></g>';
  }
}
mojs.addShape('chair', icon_chair);

ICON_GENERATORS['chair'] = function (timeline, x, y, options) {
  options.baseIconSize = 1.2 * options.baseIconSize;
  addShapeToTimeline(timeline, 'chair', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y,
    angle: 0
  });
}



class icon_book extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,83.3325,27.188125)"><path d="m 0,0 5.334,0 0,-41.833 -64,0 0,41.833 5.005,0"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,42.992,61.145625)"><path d="M 0,0 -16.11,0 M 0,11.583 l -16.11,0 M 0,23.166 l -16.11,0 M 10.8837,0 26.9947,0 m -16.111,11.583 16.111,0 m -16.111,11.583 16.111,0 m -21.5524,-37.833 0,41.833 c 0,2.946 -2.388,5.334 -5.334,5.334 l -21.497,0 0,-41.834 21.497,0 c 2.946,0 5.334,-2.388 5.334,-5.333 z m 0,0 0,41.833 c 0,2.946 2.388,5.334 5.333,5.334 l 21.497,0 0,-41.834 -21.497,0 c -2.945,0 -5.333,-2.388 -5.333,-5.333 z" style="fill: #ededed;"></path></g>';
  }
}
mojs.addShape('book', icon_book);

ICON_GENERATORS['book'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'book', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y,
    angle: 0
  });
}


class icon_hourglass extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,36.62425,64.374995)"><path d="m 0,0 c -1.316,-2.092 -2.202,-4.726 -2.202,-8.042 l 0,-3.18 25.805,0 0,3.18 c 0,3.316 -0.886,5.95 -2.202,8.042 L 0,0 z m 28.9551,-15.2217 -36.509,0 c -1.457,0 -2.639,-1.182 -2.639,-2.639 0,-1.458 1.182,-2.639 2.639,-2.639 l 36.509,0 c 1.458,0 2.639,1.181 2.639,2.639 0,1.457 -1.181,2.639 -2.639,2.639 z m -29.814,39.8052 c 2.833,-6.163 9.352,-8.386 11.575,-8.979 2.238,0.58 8.756,2.763 11.568,8.979 l -23.143,0 z m 29.814,13.6382 -36.509,0 c -1.457,0 -2.639,1.182 -2.639,2.639 0,1.458 1.182,2.639 2.639,2.639 l 36.509,0 c 1.458,0 2.639,-1.181 2.639,-2.639 0,-1.457 -1.181,-2.639 -2.639,-2.639 z"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,50.000125,49.999995)"><path d="m 0,0 0,0 c 0,0 -16.902,-3.169 -16.902,-19.542 l 0,-7.18 33.804,0 0,7.18 C 16.902,-3.169 0,0 0,0 z m 0,0 0,0 c 0,0 -16.902,3.169 -16.902,19.542 l 0,7.18 33.804,0 0,-7.18 C 16.902,3.169 0,0 0,0 z" style="fill: none;"></path></g>';
  }
}
mojs.addShape('hourglass', icon_hourglass);

ICON_GENERATORS['hourglass'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'hourglass', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}


class icon_axe extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,42.24436,27.067125)"><path d="m 0,0 c 0,0 5.918,-3.448 7.835,-8.268 1.917,-4.818 13.317,-13.939 14.613,-15.234 1.296,-1.296 9.483,-10.831 10.882,-12.333 1.399,-1.503 5.596,-4.56 4.767,-6.115 l -2.487,-2.487 -6.115,-0.311 c 0,0 -3.264,9.897 -10.26,15.028 -6.995,5.13 -22.688,17.809 -24.869,25.279"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,12.759485,37.360125)"><path d="m 0,0 c 0.576,-0.717 4.817,-5.684 13.021,-6.691 m -15.2285,4.6368 c 0,0 17.498,16.461 22.109,18.344 l 5.476,-5.475 c 0,0 -1.675,-1.987 -2.556,-4.111 -0.882,-2.125 -4.18,-1.901 -6.063,-3.783 -0.784,-0.785 -4.457,-5.597 -3.679,-13.007 0,0 -10.105,0.017 -15.287,8.032 z" style="fill: none;"></path></g>';
  }
}
mojs.addShape('axe', icon_axe);

ICON_GENERATORS['axe'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'axe', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}


class icon_boomerang extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.0101715,0,0,-1.0101715,86.177065,73.626925)"><path d="m 0,0 c -1.807,0.088 -3.206,1.617 -3.129,3.424 0.42,9.857 1.064,39.055 -5.621,45.741 -6.749,6.748 -37.758,7.355 -47.775,7.373 -1.757,0.003 -3.198,1.382 -3.284,3.137 -0.09,1.846 1.348,3.405 3.195,3.459 11.28,0.329 47.531,0.773 55.069,-6.764 C 5.996,48.828 4.199,13.89 3.444,3.056 3.32,1.269 1.79,-0.087 0,0 z" style="fill: none;"></path></g>' +
      '<g transform="matrix(1.0101715,0,0,-1.0101715,77.173306,13.170484)"><path d="M -3.351,-8.491 0,0 c 6.2403236,-1.3181335 9.9378481,-4.8612163 10.8452,-10.8457 l -8.491,-3.351 c -0.7484892,3.516442 -3.3601408,4.4244562 -5.7052,5.7057 z m 9.3736997,-37.9485 6.8830003,0 0.1812,8.5508 -7.1310003,0 z M -30.2325,-3.8155996 l 0,7.172 -8.6318,0.0742 0,-6.884 z"></path></g>' +
      '<g transform="matrix(1.0101715,0,0,-1.0101715,70.014625,90.294442)"><path d="m 0,0 c -1.807,0.088 -3.206,1.617 -3.129,3.424 0.42,9.857 1.064,39.055 -5.621,45.741 -6.749,6.748 -37.758,7.355 -47.775,7.373 -1.757,0.003 -3.198,1.382 -3.284,3.137 -0.09,1.846 1.348,3.405 3.195,3.459 11.28,0.329 47.531,0.773 55.069,-6.764 C 5.996,48.828 4.199,13.89 3.444,3.056 3.32,1.269 1.79,-0.087 0,0 z" style="fill: none;"></path></g>' +
      '<g transform="matrix(1.0101715,0,0,-1.0101715,61.010866,29.838001)"><path d="M -3.351,-8.491 0,0 c 6.2403236,-1.3181335 9.9378481,-4.8612163 10.8452,-10.8457 l -8.491,-3.351 c -0.7484892,3.516442 -3.3601408,4.4244562 -5.7052,5.7057 z m 9.3736997,-37.9485 6.8830003,0 0.1812,8.5508 -7.1310003,0 z M -30.2325,-3.8155996 l 0,7.172 -8.6318,0.0742 0,-6.884 z"></path></g>';
  }
}
mojs.addShape('boomerang', icon_boomerang);

ICON_GENERATORS['boomerang'] = function (timeline, x, y, options) {
  angle = 0;
  if (options.animate) {
    angle = {}; angle[0] = 360;
  }
  addShapeToTimeline(timeline, 'boomerang', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y,
    angle: angle
  });
}


class icon_boat extends mojs.CustomShape {
  getShape() {
    return '<g><path d="m 52.818625,65.00006 -5.63625,0 0,-55 5.63625,0 0,55 z M 81.25,89.999935 c 0,0 -60.98375,0 -71.25,-25 l 80,0 -8.75,25 z" style="fill: none;"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,47.182,17.187435)"><path d="m 0,0 c 0,0 -24.283,-2.375 -25.908,-38.25 0,0 12.954,13 25.908,4 0,0 -10.842,20.75 0,34.25 z m 4.5088,-34.25 23.333,0 C 27.8418,-13.78 4.5088,0 4.5088,0 c 0,0 12.167,-21.875 0,-34.25 z"></path></g>';
  }
}
mojs.addShape('boat', icon_boat);

ICON_GENERATORS['boat'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'boat', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y
  });
}


class icon_temple extends mojs.CustomShape {
  getShape() {
    return '<g><path d="m 31.50238,73.33256 -10.10375,0 0,-30.10375 10.10375,0 0,30.10375 z m 23.55125,0 -10.10375,0 0,-30.10375 10.10375,0 0,30.10375 z m 23.55125,0 -10.10375,0 0,-30.10375 10.10375,0 0,30.10375 z m 7.8125,4.94875 -72.83125,0 0,5.85875 72.83125,0 0,-5.85875 z"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,9.99888,32.031185)"><path d="m 0,0 64,0 m -44.0892,-8.9581 -13.5,0 0,3.958 13.5,0 0,-3.958 z m 0,-28.042 -13.5,0 0,3.958 13.5,0 0,-3.958 z m 18.841,28.042 -13.5,0 0,3.958 13.5,0 0,-3.958 z m 0,-28.042 -13.5,0 0,3.958 13.5,0 0,-3.958 z m 18.841,28.042 -13.5,0 0,3.958 13.5,0 0,-3.958 z m 0,-28.042 -13.5,0 0,3.958 13.5,0 0,-3.958 z M 0,0 32,17.625 64,0 64,-5 0,-5 0,0 z m 64.0018,-46.3751 -64,0 0,4.687 64,0 0,-4.687 z" style="fill: none;"></path></g>';
  }
}
mojs.addShape('temple', icon_temple);

ICON_GENERATORS['temple'] = function (timeline, x, y, options) {
  addShapeToTimeline(timeline, 'temple', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y,
    angle: 0
  });
}

class icon_lamp_bulb extends mojs.CustomShape {
  getShape() {
    return '<g transform="matrix(1.25,0,0,-1.25,40.9767,79.34272)"><path d="m 0,0 -3.287,0 m 17.724,0 3.288,0 m -10.5062,-8.5259 0,0 c -3.987,0 -7.219,3.232 -7.219,7.218 l 0,5.855 14.437,0 0,-5.855 c 0,-3.986 -3.232,-7.218 -7.218,-7.218 z" style="fill: none;"></path></g>' +
      '<g transform="matrix(1.25,0,0,-1.25,45.48845,73.65922)"><path d="m 0,0 0,7.043 c 0,5.619 -1.232,11.169 -3.609,16.26 l 0,10e-4 c 2.833,-2.956 7.218,-1.478 7.218,-1.478 0,0 4.386,-1.478 7.219,1.478 L 10.827,23.303 C 8.45,18.212 7.218,12.662 7.218,7.043 L 7.218,0 m 16.929,30.3897 c 0,11.776 -9.912,21.238 -21.849,20.497 -10.405,-0.646 -18.797,-9.245 -19.21,-19.662 -0.207,-5.23 1.543,-10.047 4.577,-13.779 3.997,-4.917 6.092,-11.108 6.092,-17.446 l 19.704,0 0,0.001 c 0,6.381 2.179,12.569 6.173,17.545 2.824,3.517 4.513,7.983 4.513,12.844 z"></path></g>';
  }
}
mojs.addShape('lamp_bulb', icon_lamp_bulb);

ICON_GENERATORS['lamp_bulb'] = function (timeline, x, y, options) {
  if (options.animate) {
    c = {}; c[COLORS.yellow] = COLORS.white;
    r = {}; r[options.baseIconSize] = options.baseIconSize * 1.05 + 3 + 3;
    a = { 0: 45 };
    xP = 0;
    yP = 0;

    moonBackground = addShapeToTimeline(timeline, 'lamp_bulb', options.baseIconSize, options, {
      radius: r,
      stroke: 'transparent',
      strokeWidth: 0,
      x: x,
      y: y,
      fill: COLORS.hotpink,
    });
    p = moonBackground.el;
  }
  else {
    c = COLORS.yellow;
    r = options.baseIconSize;
    a = 0;
    xP = x;
    yP = y;
    p = options.parent;
  }

  addShapeToTimeline(timeline, 'lamp_bulb', options.baseIconSize, options, {
    parent: p,
    radius: options.baseIconSize,
    x: xP,
    y: yP,
    fill: c,
  });
}

// the last icon is a circle
ICON_GENERATORS['circle'] = function (timeline, x, y, options) {
  var innerRadius = options.baseIconSize / 3;
  if (options.animate) {
    innerRadius = {}; innerRadius[options.baseIconSize / 3] = options.baseIconSize * 0.9;
  }
  addShapeToTimeline(timeline, 'circle', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y,
    angle: 0
  });
  addShapeToTimeline(timeline, 'circle', options.baseIconSize, options, {
    ...getColorRotationSizeAnimOpts(options, options.baseIconSize),
    x: x,
    y: y,
    angle: 0,
    radius: innerRadius,
    fill: '#ffffff'
  });
}


