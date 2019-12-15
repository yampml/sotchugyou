const {invoke} = require('./invoke.js');


const cert = `-----BEGIN CERTIFICATE-----
MIIC9DCCApqgAwIBAgIUYgqWkUH4QsBXzsv04B2aVxQyhjcwCgYIKoZIzj0EAwIw
bTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNh
biBGcmFuY2lzY28xFjAUBgNVBAoTDXVkbi5ia2VjYS5jb20xGTAXBgNVBAMTEGNh
LnVkbi5ia2VjYS5jb20wHhcNMTkxMjE1MTQxNDAwWhcNMjAxMjE0MTQxOTAwWjBJ
MSswDQYDVQQLEwZjbGllbnQwCgYDVQQLEwN1ZG4wDgYDVQQLEwdzdHVkZW50MRow
GAYDVQQDDBFuZGFhZG4yQGdtYWlsLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEH
A0IABNDiXGyi7PvX88NEhoL39vnqli9xwNVT62kx5/alBCkXH1S2xEcjHiEx7+/b
iciSRETl2+90HfhmcLnUG307PBWjggE6MIIBNjAOBgNVHQ8BAf8EBAMCB4AwDAYD
VR0TAQH/BAIwADAdBgNVHQ4EFgQUQ0dsJgYtTqZeKB/5bsUrLClRbY0wKwYDVR0j
BCQwIoAg74C2qWfH7w6Z01HedaEz7lEEw8n0HaXrbhG0H7E7XNEwgckGCCoDBAUG
BwgBBIG8eyJhdHRycyI6eyJkb2IiOiIxOTk3LTA5LTA3VDAwOjAwOjAwLjAwMFoi
LCJlbWFpbCI6Im5kYWFkbjJAZ21haWwuY29tIiwiaGYuQWZmaWxpYXRpb24iOiJ1
ZG4uc3R1ZGVudCIsImhmLkVucm9sbG1lbnRJRCI6Im5kYWFkbjJAZ21haWwuY29t
IiwiaGYuVHlwZSI6ImNsaWVudCIsInVzZXJuYW1lIjoiTmd1eWVuIERpbmggQW4i
fX0wCgYIKoZIzj0EAwIDSAAwRQIhAKS2M8BIIECLD4wgogj/HSI2acD96GQ7FF3C
QOzRnYDqAiALaaAKbEXpcwr69KHpHXmdU6lD4TJaLe1lIi1BjFtmEQ==
-----END CERTIFICATE-----
`;
const key = `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgYr4ZNP+3DA84CcON
kjw+xcLymWGkR4gGSCJbaz/4MEShRANCAATQ4lxsouz71/PDRIaC9/b56pYvccDV
U+tpMef2pQQpFx9UtsRHIx4hMe/v24nIkkRE5dvvdB34ZnC51Bt9OzwV
-----END PRIVATE KEY-----
`;

const encodedPriv = `U2FsdGVkX1/SUqEkygHmxAK00a7fNuiqS/stffMpjkpYfzC6IYWR7FsrGLb6wtL6Y+LPXMgb8TW1E47mEqVssA+78iA19BLssKxS2JIHmedsZAnjmv69Maq85/I7OcDN/FY2zUlFgUrzl2DONwNZhCKg56fd8HRsOnR3ZotW/BF3zwckAsu3QDY03nvMN31NdnRnPI6kSxQsW73mez22lg9AjECdjfpBHAg/RX4QDRfLfLolgTlvDMHM6xBws/veD2Gu8FWx+ygC1FhWKTQ4paMiFiMmduhTU+s5bk9/OSx1UMdSmNHNbWja6enE8Y1kxL6rl5fepAhWJ0MFof4y++oDLYr/Atmy4/Sxs7t/4uo=`;

const argsss = {
    user: 'ndaadn2@gmail.com',
    encodedPriv: encodedPriv,
    kusuri: "foobarpassword",
    cert: cert,
    channel: 'dut-channel',
    contract: 'bkeca',
    // transactionArguments: ["queryStudentTestInfoByEmail", "nguyendinhan97@gmail.com"],
    transactionArguments: ["queryStudentTestInfo", '3']
}

invoke(argsss)