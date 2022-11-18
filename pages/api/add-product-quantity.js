import { getXataClient } from "../../util/xata";


const handler = async (req, res) => {

   const { product_id, quantity } = req.body;

   const xata = getXataClient();

   const item = await xata.db.cart_session.filter({ product_id }).getFirst();

   item.update({ quantity: quantity });

   res.end();
}

export default handler;