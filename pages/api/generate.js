/** @description Rota apenas para gerar dados com faker-js para popular a store. */
import { faker } from '@faker-js/faker';
import db from 'utils/db';

const pickRandom = faker.helpers.arrayElement;

function generateClients() {
  const clients = [];
  for (let idx = 0; idx < 3; idx++) {
    clients.push(faker.name.firstName());
  }
  return clients;
}

function generateTicket(client) {
  const title = `Ticket - ${faker.random.alpha(10)}`;
  const description = `Description - ${faker.random.alpha(10)}`;

  return {
    title,
    description,
    client,
  };
}

function generateTickets() {
  const clients = generateClients();
  const tickets = [];
  for (let idx = 0; idx < 3; idx++) {
    tickets.push(generateTicket(pickRandom(clients)));
  }

  return tickets;
}

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse } res
 **/
export default async function handler(req, res) {
  try {
    const ticketsRef = db.collection('tickets');
    const tickets = await ticketsRef.get();

    /** Delete */
    tickets.docs.forEach(async (ticket) => await ticket.ref.delete());

    /** Generate */
    const newTickets = generateTickets();
    const batch = db.batch();

    newTickets.forEach(async (ticket) => {
      const docRef = db
        .collection('tickets')
        .doc(String(faker.datatype.uuid()));
      batch.set(docRef, ticket);
    });
    await batch.commit();

    res.status(200).json(newTickets);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
}
