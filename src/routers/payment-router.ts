
import { Router } from 'express';
import { pAnalysis, thePayment } from '@/controllers';
import { paymentSchema } from '@/schemas';
import { authenticateToken, validateBody } from '@/middlewares';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', pAnalysis)
  .post('/process', validateBody(paymentSchema), thePayment);
  

export { paymentsRouter };