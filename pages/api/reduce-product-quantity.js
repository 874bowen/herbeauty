import { getXataClient } from "../../util/xata";


const handler = async (req, res) => {

   const { product_id, quantity } = req.body;

   const xata = getXataClient();

   if (quantity > 0) {
      const item = await xata.db.cart_session.filter({ product_id }).getFirst();

      item.update({ quantity: quantity });
  
   } else {
      const item = await xata.db.cart_session.filter({ product_id }).getFirst();
      await xata.db.cart_session.delete(item.id);
   }
   res.end();
}

export default handler;