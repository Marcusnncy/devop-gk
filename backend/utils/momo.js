// backend/utils/momo.js
const crypto = require('crypto');
const axios = require('axios');

const config = {
  partnerCode: "MOMO",
  accessKey: "F8BBA842ECF85",
  secretKey: "K951B6PE1waDMi640xX08PD3vg6EkVlz",
  redirectUrl: "http://localhost:3000/payment/momo-return",
  ipnUrl: "http://localhost:3000/payment/momo-ipn",
  requestType: "payWithMethod"
};

exports.createPayment = async (orderId, amount) => {
  const requestId = Date.now().toString();
  const orderInfo = "Thanh toán đơn hàng MyShop #" + orderId;
  const extraData = "";

  const rawSignature = `accessKey=${config.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${config.ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${config.partnerCode}&redirectUrl=${config.redirectUrl}&requestId=${requestId}&requestType=${config.requestType}`;

  const signature = crypto.createHmac('sha256', config.secretKey)
    .update(rawSignature)
    .digest('hex');

  const body = {
    partnerCode: config.partnerCode,
    accessKey: config.accessKey,
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl: config.redirectUrl,
    ipnUrl: config.ipnUrl,
    extraData,
    requestType: config.requestType,
    signature,
    lang: "vi"
  };

  try {
    const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', body);
    return response.data;
  } catch (error) {
    throw new Error('Lỗi kết nối MoMo: ' + error.message);
  }
};