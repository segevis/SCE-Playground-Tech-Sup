// gateway-service/src/controllers/gatewayController.js
import axios from 'axios';
import 'dotenv/config';

const forwardAuthRequests = async (req, res, next) => {
  try {
    const authServiceUrl = process.env.AUTH_SERVICE_URL;
    const path = req.originalUrl.replace('/auth', '');
    const url = `${authServiceUrl}${path}`;

    console.log('Forwarding request to ' + url, ' body: ' + req.body);

    // Forward the exact method and body
    const response = await axios({
      method: req.method,
      url,
      data: req.body
    });
    console.log('response: ', response.data);

    return res.status(response.status).json(response.data);
  } catch (error) {
    // Error from the microservice or network
    console.log('Error while forwarding request to auth service. Error: ', error, error?.data);

    if (error.response) {
      // The microservice responded with an error status
      return res.status(error.response.status).json(error.response.data);
    }
    return next(error);
  }
};

async function getTechSup(req, res, next) {

  try {
    const techSupServiceUrl = process.env.TECH_SUP_SERVICE_URL + '/techsupport';
    const response = await axios.get(techSupServiceUrl);
    return res.status(response.status).json(response.data);
  } catch (error) {
    // Error from the microservice or network
    console.log('Error while forwarding request to techSup service. Error: ', error, error?.data);

    if (error.response) {
      // The microservice responded with an error status
      return res.status(error.response.status).json(error.response.data);
    }
    return next(error);
  }
}

async function addOneTicket(req, res, next) {

  const name = req.query.name;
  const content = req.query.content;

  if (!name || !content) {
    return res.status(400).json({ error: 'Ticket name and content is required as a query param' });
  }

  try {
    const techSupServiceUrl = `${process.env.TECH_SUP_SERVICE_URL}/techsupportadd?name=${name}&content=${content}`;
    const response = await axios.post(techSupServiceUrl);
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error forwarding post request:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return next(error);
  }
}

async function editOneTicket(req, res, next) {
  const id = parseInt(req.query.id, 10);
  const content = req.query.content;

  if (!id || !content) {
    return res.status(400).json({ error: 'Ticket id and content is required as a query param' });
  }

  try {
    const techSupServiceUrl = `${process.env.TECH_SUP_SERVICE_URL}/techsupportedit?id=${id}&content=${content}`;
    const response = await axios.patch(techSupServiceUrl);
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error forwarding patch request:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return next(error);
  }
}

async function delOneTicket(req, res, next) {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ error: 'Ticket ID is required as a query param ?id=1' });
  }

  try {
    const techSupServiceUrl = `${process.env.TECH_SUP_SERVICE_URL}/techsupportdel?id=${id}`;
    const response = await axios.delete(techSupServiceUrl);
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error forwarding delete request:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return next(error);
  }
}


export { forwardAuthRequests, getTechSup, delOneTicket, addOneTicket, editOneTicket };
