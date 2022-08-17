
function asciiToHex(str){
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const hex = str.charCodeAt(i).toString(16);
    result += (hex.length === 2 ? hex : '0' + hex);
  }
  return result;
}

//function by: https://stackoverflow.com/questions/39460182/decode-base64-to-hexadecimal-string-with-javascript
function base64ToHex(str) {
  const raw = window.atob(str);
  return asciiToHex(raw);;
}

// Validates the input before running the animation
function checkAndRun(){
  var validateInput = document.getElementById("hashInputText");
  if (!validateInput.checkValidity() || $('#hashInputText').val() == '') return;
  regenAnimation();
}

// Original Function
function regenAnimation() {
    //let hash = $('#hashInputText').val();
    let hash = asciiToHex($('#hashInputText').val());
    if ($("#chkb64toHex").prop('checked')){
      hash = base64ToHex($('#hashInputText').val());
    }
    //let salt = $('#hashSaltText').val();
    let salt = "";

    let anim1 = hashify.seed(hash, salt);
    anim1.prepAnimation("#svgDiv", [1, 4], [2, 2], { ...DEFAULT_OPTS, x: 0, y: 50 });

    let hashalg = "SHA-256";
    //let dontModifyGeneratorElement = !$("#chkChangeGenerator").prop('checked');
    let dontModifyGeneratorElement = false;
    //let elementToModify = parseInt($("#optnumberToChange").val());
    let elementToModify = 0;
    var modified_sha_gen = function* () {
        var saltHasher = new jsSHA(
            hashalg,
            "TEXT"
        );
        saltHasher.update(salt);
        let saltHex = saltHasher.getHash("HEX");

        var hashObj = new jsSHA(
            hashalg,
            "HEX"
        );

        var i = 0;
        // we set the initial state
        //hashObj.update(hash);
        let current_state = hash;
        while (true) {
            var hashObj = new jsSHA(
                hashalg,
                "HEX"
            );
            hashObj.update(current_state + saltHex);
            current_state = hashObj.getHash("HEX");

            i++;
            if (dontModifyGeneratorElement || i != elementToModify)
                yield BigInt("0x" + current_state);
            else
                yield Add(BigInt("0x" + current_state), BigInt(1));
        }
    }
    // let anim2 = new hashify(modified_sha_gen);
    // let anim2Masks = {
    //     ...DEFAULT_OPTS.masks,
    //     // animate: $("#optAnimate").prop('checked'),
    //     // thinLine: $("#optThinLine").prop('checked'),
    //     // movingLine: $("#optMovingLine").prop('checked')
    //     animate: true,
    //     thinLine: false,
    //     movingLine: true
    // };
    // anim2.prepAnimation("#maskedSvgDiv", [1, 4], [2, 2],
    //     { ...DEFAULT_OPTS, x: 175, y: 50, masks: anim2Masks });

    // here we add both timelines to the same timeline (instead of playing them directly)
    //so they are synchronized
    var t = new mojs.Timeline();
    t.add(anim1.timeline);
    // t.add(anim2.timeline);
    t.play();
}

// $("#optAnimate").prop("checked", true);
// $("#optThinLine").prop("checked", true);
// $("#optMovingLine").prop("checked", true);

// $("#optnumberToChange").val("0");
// $("#optnumberToChange").prop('disabled', true);

function onChangeGenerator() {
    // if ($("#chkChangeGenerator").prop('checked')) {
    //     $("#optnumberToChange").prop('disabled', false);
    // }
    // else {
    //     $("#optnumberToChange").prop('disabled', true);
    // }
    //regenAnimation();
    loopAnimation()
}

var intervalVar; //global variable to restart the setInterval function of the animation

function loopAnimation(){
  clearInterval(intervalVar);

  if ($("#chkLoop").prop('checked')){
    checkAndRun();
    intervalVar = setInterval(checkAndRun, 3500);
  }
  else{
    checkAndRun();
  }
}

function changeToVotePage(){
  window.location.href = "voto.html";
}

function changeToElectionPage(){
  window.location.href = "eleicao.html";
}

// Setting up the js events
$("#hashInputText").change(loopAnimation);
// $("#hashSaltText").change(regenAnimation);
// $("#optAnimate").change(regenAnimation);
// $("#optThinLine").change(regenAnimation);
// $("#optMovingLine").change(regenAnimation);
$("#updateAnimation").click(loopAnimation);
$("#goToVotePage").click(changeToVotePage);
$("#goToElectionPage").click(changeToElectionPage);

// $("#chkChangeGenerator").change(onChangeGenerator);
// $("#optnumberToChange").change(regenAnimation);

//$('#hashInputText').val("m8+Dl1jRifz2jIRw13Sb+gomlFRQTLEhXyQkrRBl3WY").change();
