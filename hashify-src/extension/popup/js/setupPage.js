
function leaveMessage(msg) {
  $("#svgDiv").text(msg);
}

function regenAnimation() {
  let hash = $('#hashInputText').val();
  let salt = $('#hashSaltText').val();
  let anim = hashify.seed(hash, salt);
  anim.prepAnimation("#svgDiv");
  anim.animate();
}

$("#sslinfo").prop("disabled", true);
$("#hashInputText").prop("disabled", true);

// Setting up the js events
$("#hashInputText").change(regenAnimation);
$("#hashSaltText").change(regenAnimation);
$("#updateAnimation").click(regenAnimation);

function onError(error) {
  leaveMessage(`Error generating visual stamp: ${error}`);
}

function onGot(tabInfo) {
  let url = tabInfo[0].url; // url is a property from the Tab object, see https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab

  browser.runtime.sendMessage(
    {
      type: "getSSLInfo",
      value: url
    }
  ).then(
    function (message) {
      let certInfo = message.result;

      if (certInfo != null) {
        let sha256 = certInfo.sha256;
        let hexSha = sha256.replace(/:/g, "");
        $('#hashInputText').val(hexSha);
        regenAnimation();
      } else {
        leaveMessage("Unable to load SSL information for this website.\nThis info may be blocked by the browser or the page needs to be reloaded.");
      }
    }
  ).catch(onError);
}

window.onload = function () {
  browser.tabs.query({ currentWindow: true, active: true }).then(onGot, onError);
}