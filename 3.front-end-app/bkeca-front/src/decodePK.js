const atob = require('atob');
const asn1js = require('asn1js');
const pkijs = require('pkijs');
const pvutils = require('pvutils')

const Certificate = pkijs.Certificate

let certificateBuffer = new ArrayBuffer(0);

function certificateInfo (certString) {
    // let pemFile = fs.readFileSync('f.pem','utf8');
    certificateBuffer = convertPemToBinary(certString);
    return printCertificate(certificateBuffer);
}

function convertPemToBinary(pem) {
    var lines = pem.split('\n');
    var encoded = '';
    for(var i = 0;i < lines.length;i++){
      if (lines[i].trim().length > 0 &&
          lines[i].indexOf('-BEGIN RSA PRIVATE KEY-') < 0 && 
          lines[i].indexOf('-BEGIN RSA PUBLIC KEY-') < 0 &&
          lines[i].indexOf('-BEGIN PUBLIC KEY-') < 0 &&
          lines[i].indexOf('-BEGIN CERTIFICATE-') < 0 &&
          lines[i].indexOf('-BEGIN PRIVATE KEY-') < 0 &&
          lines[i].indexOf('-END PRIVATE KEY-') < 0 &&
          lines[i].indexOf('-END CERTIFICATE-') < 0 &&
          lines[i].indexOf('-END PUBLIC KEY-') < 0 &&
          lines[i].indexOf('-END RSA PRIVATE KEY-') < 0 &&
          lines[i].indexOf('-END RSA PUBLIC KEY-') < 0) {
        encoded += lines[i].trim();
      }
    }
    return base64StringToArrayBuffer(encoded);
  }

  function base64StringToArrayBuffer(b64str) {
    let byteStr = atob(b64str);

    let bytes = new Uint8Array(byteStr.length);
    for (let i = 0; i < byteStr.length; i++) {
      bytes[i] = byteStr.charCodeAt(i);
    }
    return bytes.buffer;
  }
  
function printCertificate (certificateBuffer) {
    let asn1 = asn1js.fromBER(certificateBuffer);
    if(asn1.offset === (-1)) {
        console.log("Can not parse binary data");
    } 

    const certificate = new Certificate({ schema: asn1.result });

    let res = {
      serialNumber: pvutils.bufferToHexCodes(certificate.serialNumber.valueBlock.valueHex),
      algorithm: certificate.signature.algorithmId,
      validFrom: certificate.notBefore.value.toString(),
      validUntil: certificate.notAfter.value.toString(),
      subject: certificate.subject.typesAndValues.map((e, i) => {
        return {
          type: e.type,
          value: e.value.valueBlock.value
        }
      }),
      issuer: certificate.issuer.typesAndValues.map((e, i) => {
        return {
          type: e.type,
          value: e.value.valueBlock.value
        }
      })
    }
    return res;


    // console.log('Subject Public Key info: ', certificate.subjectPublicKeyInfo);
    // console.log(certificate);
}

module.exports.decodeCertificateInfo = certificateInfo;
