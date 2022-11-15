import { getXataClient } from "../../util/xata";

async function handler(req, res)  {
   const xata = getXataClient();
   const { email } = req.body;
   const user = await xata.db.nextauth_users.filter( {email} ).getFirst();
   const user_id = user.id;
   res.send( await xata.db.cart.filter( {user_id} ).getMany())
}

export default handler;