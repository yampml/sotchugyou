
const encodingAlgorithmMap = {
    "1.2.840.113549.2.1": "MD2",
    "1.2.840.113549.1.1.2": "MD2 with RSA",
    "1.2.840.113549.2.5": "MD5",
    "1.2.840.113549.1.1.4": "MD5 with RSA",
    "1.3.14.3.2.26": "SHA1",
    "1.2.840.10040.4.3": "SHA1 with DSA",
    "1.2.840.10045.4.1": "SHA1 with ECDSA",
    "1.2.840.113549.1.1.5": "SHA1 with RSA",
    "2.16.840.1.101.3.4.2.4": "SHA224",
    "1.2.840.113549.1.1.14": "SHA224 with RSA",
    "2.16.840.1.101.3.4.2.1": "SHA256",
    "1.2.840.113549.1.1.11": "SHA256 with RSA",
    "2.16.840.1.101.3.4.2.2": "SHA384",
    "1.2.840.113549.1.1.12": "SHA384 with RSA",
    "2.16.840.1.101.3.4.2.3": "SHA512",
    "1.2.840.113549.1.1.13": "SHA512 with RSA",
    "1.2.840.10045.4.3.2": "SHA256 with EDCSA"
}

const oidMap = {
    "2.5.4.6": "Country",
    "2.5.4.10": "Organization Unit",
    "2.5.4.11": "Organization",
    "2.5.4.3": "Common Name",
    "2.5.4.7": "Locality",
    "2.5.4.8": "State",
    "2.5.4.12": "T",
    "2.5.4.42": "GN",
    "2.5.4.43": "I",
    "2.5.4.4": "Serial Number",
    "2.5.29.1": "old Authority Key Identifier",
    "2.5.29.2": "old Primary Key Attributes",
    "2.5.29.3": "Certificate Policies",
    "2.5.29.4": "Primary Key Usage Restriction",
    "2.5.29.9": "Subject Directory Attributes",
    "2.5.29.14": "Subject Key Identifier",
    "2.5.29.15": "Key Usage",
    "2.5.29.16": "Private Key Usage Period",
    "2.5.29.17": "Subject Alternative Name",
    "2.5.29.18": "Issuer Alternative Name",
    "2.5.29.19": "Basic Constraints",
    "2.5.29.28": "Issuing Distribution Point",
    "2.5.29.29": "Certificate Issuer",
    "2.5.29.30": "Name Constraints",
    "2.5.29.31": "CRL Distribution Points",
    "2.5.29.32": "Certificate Policies",
    "2.5.29.33": "Policy Mappings",
    "2.5.29.35": "Authority Key Identifier",
    "2.5.29.36": "Policy Constraints",
    "2.5.29.37": "Extended key usage",
    "2.5.29.54": "X.509 version 3 certificate extension Inhibit Any-policy"
}

module.exports = {
    encodingAlgorithmMap,
    oidMap
}