import { getXataClient } from "../../util/xata";


const handler = async (req, res) => {

   const { email, name } = req.body;

   const xata = getXataClient();

   const user = await xata.db.nextauth_users.filter({ email }).getFirst();
   const product = await xata.db.products.filter({ name }).getFirst();

   const inCart = await xata.db.cart_session.filter({ user_id: user.id, product_id: product.id }).getFirst();

   if (inCart) {
      inCart.update({ quantity: inCart.quantity + 1 });
   } else {
      await xata.db.cart_session.create({ user_id: { id: user.id }, product_id: { id: product.id } });
   }

   res.end();
}

export default handler;