
import { Router } from 'express';
import { createTicket , allTickets , clienTicket } from '@/controllers';
import { ticketSchema } from '@/schemas';
import { authenticateToken, validateBody } from '@/middlewares';


const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', allTickets)
  .get('/', clienTicket)
  .post('/', validateBody(ticketSchema), createTicket);

export { ticketsRouter };