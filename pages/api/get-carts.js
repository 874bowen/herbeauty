import { getXataClient } from "../../util/xata";

async function handler(req, res) {
   let products = []
   const xata = getXataClient();

   const { email } = req.body;

   const user = await xata.db.nextauth_users.filter({ email }).getFirst();

   const cartItems = await xata.db.cart_session.filter({ user_id: user.id, is_ordered: false }).getMany();

   for (let item of cartItems) {
      const id = item.product_id.id;
      let product = await xata.db.products.filter({ id }).getFirst();
      product = { ...product, quantity: item.quantity };
      products.push(product);
   }
   res.send(products);
}

export default handler;