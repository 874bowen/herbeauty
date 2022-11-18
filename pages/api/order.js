import { getXataClient } from "../../util/xata";

async function handler(req, res) {
   const xata = getXataClient();

   const { total, email } = req.body;

   const user = await xata.db.nextauth_users.filter({ email }).getFirst();

   const order = await xata.db.orders.create({ total_amount: total });

   const cartItems = await xata.db.cart_session.filter({ user_id: user.id, is_ordered: false }).getMany();

   for (let item of cartItems) {
      item.update({ is_ordered: true, order: order.id });
   }

   res.end();
}

export default handler;