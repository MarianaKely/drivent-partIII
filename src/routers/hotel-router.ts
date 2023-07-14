
import { Router } from "express";
import { hotelList , theRoom } from "@/controllers";
import { authenticateToken } from "@/middlewares";



const hotelRoutes = Router();

hotelRoutes.all('/*', authenticateToken).get('/', hotelList).get('/:hotelId', theRoom);


export {hotelRoutes}
