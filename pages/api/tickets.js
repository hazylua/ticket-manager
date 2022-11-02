import { isArray } from 'lodash';
import db from 'utils/db';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse } res
 **/
export default async function handler(req, res) {
  const {
    query: { title },
    body,
    method,
  } = req;

  const ticketsRef = db.collection('tickets');
  const tickets = await ticketsRef.get();
  const ticketsData = tickets.docs.map((ticket) => ({
    id: ticket.id,
    ...ticket.data(),
  }));
  const batch = db.batch();

  switch (method) {
    case 'GET':
      /** Apenas filtra por título. */
      if (title) {
        let filtered = ticketsData.filter((ticket) =>
          ticket.title.includes(title),
        );
        res.status(200).json(filtered);
      } else {
        res.status(200).json(ticketsData);
      }
      break;
    case 'DELETE':
      if (body && isArray(body)) {
        /** Apenas deleta sem verificar se existem. Não é ideal mas não gera erros/exceções. */
        body.forEach((id) => {
          const docRef = ticketsRef.doc(id);
          batch.delete(docRef);
        });
        await batch.commit();
        res.status(200).end();
      } else {
        res.status(400).end('Não foi possível deletar os tickets.');
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
