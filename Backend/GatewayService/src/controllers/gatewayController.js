// gateway-service/src/controllers/gatewayController.js
import axios from 'axios';
import 'dotenv/config'

const forwardAuthRequests = async (req, res, next) => {
  try {
    const authServiceUrl = process.env.AUTH_SERVICE_URL;
    const path = req.originalUrl.replace('/auth', ''); 
    const url = `${authServiceUrl}${path}`;

    // Forward the exact method and body
    const response = await axios({
      method: req.method,
      url,
      data: req.body
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    // Error from the microservice or network
    if (error.response) {
      // The microservice responded with an error status
      return res.status(error.response.status).json(error.response.data);
    }
    return next(error);
  }
};

export {
  forwardAuthRequests
};
