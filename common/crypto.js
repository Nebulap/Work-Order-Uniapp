import CryptoJS from 'crypto-js'

/**
 * 加密方法
 * @returns {string}
 */
export function encrypt(str, key) {
	var keyHex = CryptoJS.enc.Utf8.parse(key);
	var encrypted = CryptoJS.DES.encrypt(str, keyHex, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.ciphertext.toString();
}

/**
 * 解密方法
 * @returns {string}
 */
export function decrypt(str, key) {
	var keyHex = CryptoJS.enc.Utf8.parse(key);
	var decrypted = CryptoJS.DES.decrypt({
		ciphertext: CryptoJS.enc.Hex.parse(str)
	}, keyHex, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	var result_value = decrypted.toString(CryptoJS.enc.Utf8);
	return result_value;
}