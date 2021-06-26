const functions = require("firebase-functions");
// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51HQ9l9Bl9xvRzSgFgDR5kHcwvOUGcpvskOIdLzB9O5HmVzQi4RIiFCj0UhLLZdTTuX0yfXly8174Ex64ybwOU3xC00d8KcrDHA");

exports.payWithStripe = functions.https.onRequest((request, response) => {
  stripe.charges.create({
    amount: request.body.amount,
    currency: request.body.currency,
    source: request.body.token,
  }).then((charge) => {
    response.send(charge);
  })
      .catch((err) =>{
        console.log(err);
      });
});
