
import supertest from "supertest";
import httpStatus from "http-status";
import faker from "@faker-js/faker";
import * as jwt from 'jsonwebtoken'
import app , {init} from "@/app";
import { cleanDb , generateValidToken } from "../helpers";
import { createEnrollmentWithAddress , createTicket , createUser , createTicketType , theHotel } from "../factories";
import { allTickets , clienTicket } from "@/services";


const server = supertest(app);

beforeAll(async () => {
  await init();
  await cleanDb();
});
beforeEach(async () => {
  await cleanDb();
});


describe('GET /hotels', () => {

    it('if no token = 401 error', async () => {

      const response = await server.get('/hotels');
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('if invalid token = 401 error', async () => {
        const token = faker.lorem.word();
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);

      });


      it('if no token for session = 401 error', async () => {

        const login = await createUser();
        const token = jwt.sign({ userId: login.id }, process.env.JWT_SECRET);
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);

      });

    
      it('if no enrollment for user token = 404 error', async () => {

        const login = await createUser();
        const token = await generateValidToken(login);
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.NOT_FOUND);

      });


      it('no ticket = 404 error', async () => {

        const login = await createUser();
        await createEnrollmentWithAddress(login);

        const token = await generateValidToken(login);
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.NOT_FOUND);

      });

    
      it('no ticket paid = 402 error', async () => {

        const login = await createUser();
        await createEnrollmentWithAddress(login);

        const token = await generateValidToken(login);
        const ticketType = await createTicketType();

        await server.post('/tickets').send({ ticketTypeId: ticketType.id }).set('Authorization', `Bearer ${token}`);
        await theHotel();

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);

      });


      it('no room = 402 error', async () => {

        const login = await createUser();
        await createEnrollmentWithAddress(login);

        const token = await generateValidToken(login);
        const ticketType = await createTicketType({ includesHotel: false, isRemote: false });

        await server.post('/tickets').send({ ticketTypeId: ticketType.id }).set('Authorization', `Bearer ${token}`);
        await theHotel();

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);

      });

    
      it('remote event = 402 error', async () => {
        
        const login = await createUser();
        await createEnrollmentWithAddress(login);

        const token = await generateValidToken(login);
        const ticketType = await createTicketType({ includesHotel: false, isRemote: true });

        await server.post('/tickets').send({ ticketTypeId: ticketType.id }).set('Authorization', `Bearer ${token}`);
        await theHotel();

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);

      });


      it('hotels ok = 200 code', async () => {
        const login = await createUser();
        const token = await generateValidToken(login);
        const main = await createEnrollmentWithAddress(login);
        const ticketType = await createTicketType({ includesHotel: true, isRemote: false });

        await createTicket(main.id, ticketType.id, 'PAID');
        await clienTicket(login.id);
        await allTickets();
        await theHotel();

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toHaveLength(1);

      });

    });


    // part2


    describe('GET /hotels/:id', () => {

        it('if no token = 401 error', async () => {

          const response = await server.get('/hotels/1');
      
          expect(response.status).toBe(httpStatus.UNAUTHORIZED);

        });
      

        it('if invalid token = 401 error', async () => {

          const token = faker.lorem.word();
      
          const response = await server.get('/hotels/2').set('Authorization', `Bearer ${token}`);
      
          expect(response.status).toBe(httpStatus.UNAUTHORIZED);

        });

      
        it('if no token for session = 401 error', async () => {

          const login = await createUser();
          const token = jwt.sign({ userId: login.id }, process.env.JWT_SECRET);
      
          const response = await server.get('/hotels/5').set('Authorization', `Bearer ${token}`);
      
          expect(response.status).toBe(httpStatus.UNAUTHORIZED);

        });

        it('if no enrollment for user token = 404 error', async () => {

            const login = await createUser();
            const token = await generateValidToken(login);
            const response = await server.get('/hotels/2').set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toBe(httpStatus.NOT_FOUND);

          });

        
          it('no ticket = 404 error', async () => {

            const login = await createUser();
            await createEnrollmentWithAddress(login);
            const token = await generateValidToken(login);
            const response = await server.get('/hotels/a').set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toBe(httpStatus.NOT_FOUND);

          });


          it('no ticket paid = 402 error', async () => {

            const login = await createUser();

            await createEnrollmentWithAddress(login);

            const token = await generateValidToken(login);
            const ticketType = await createTicketType();

            await server.post('/tickets').send({ ticketTypeId: ticketType.id }).set('Authorization', `Bearer ${token}`);
            await theHotel();

            const response = await server.get('/hotels/x').set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);

          });

        
          it('no room = 402 error', async () => {

            const login = await createUser();
            await createEnrollmentWithAddress(login);

            const token = await generateValidToken(login);
            const ticketType = await createTicketType({ includesHotel: false, isRemote: false });

            await server.post('/tickets').send({ ticketTypeId: ticketType.id }).set('Authorization', `Bearer ${token}`);
            await theHotel();

            const response = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);

          });

          it('remote event = 402 error', async () => {

            const login = await createUser();
            await createEnrollmentWithAddress(login);

            const token = await generateValidToken(login);
            const ticketType = await createTicketType({ includesHotel: false, isRemote: true });

            await server.post('/tickets').send({ ticketTypeId: ticketType.id }).set('Authorization', `Bearer ${token}`);
            await theHotel();
            
            const response = await server.get('/hotels/3').set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);

          });


          it('not found = 404 error', async () => {

            const login = await createUser();
            const token = await generateValidToken(login);
            const main = await createEnrollmentWithAddress(login);

            const ticketType = await createTicketType({ includesHotel: true, isRemote: false });
            await createTicket(main.id, ticketType.id, 'PAID');
            await clienTicket(login.id);
            await allTickets();

            const hotel = await theHotel();
            const response = await server.get(`/hotels/${hotel.id + 1}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(httpStatus.NOT_FOUND);

          });


          it('hotels ok = 200code', async () => {

            const login = await createUser();
            const token = await generateValidToken(login);
            const main = await createEnrollmentWithAddress(login);
            const ticketType = await createTicketType({ includesHotel: true, isRemote: false });

            await createTicket(main.id, ticketType.id, 'PAID');
            await clienTicket(login.id);
            await allTickets();

            const hotel = await theHotel();
            const response = await server.get(`/hotels/${hotel.id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toMatchObject({ name: hotel.name, image: hotel.image });

          });

        });
    