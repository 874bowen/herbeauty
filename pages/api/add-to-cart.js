import { getXataClient } from "../../util/xata";


const handler = async (req, res) => {

   const { email, name } = req.body;

   const xata = getXataClient();

   const user = await xata.db.nextauth_users.filter({ email }).getFirst();
   const product = await xata.db.products.filter({ name }).getFirst();

   await xata.db.cart.create({ user_id: { id: user.id }, product_id: { id: product.id } });
   res.end();
}

export default handler;