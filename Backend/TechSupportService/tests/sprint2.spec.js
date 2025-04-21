import { expect } from 'chai';
import {
  getAllTechReports,
  addOneDbTicket,
  editOneDbTicket,
  deleteOneDbTicket
} from '../src/data-access/db.js';

describe('Tickets DB', () => {
  let createdTicketId;

  describe('POST - addOneDbTicket', () => {
    it('should add a new ticket successfully', async () => {
      const name = 'Test User';
      const content = 'This is a test ticket';

      const result = await addOneDbTicket(name, content);

      expect(result.success).to.be.true;
      expect(result.ticket).to.include({ name, content });
      expect(result.ticket).to.have.property('id');

      createdTicketId = result.ticket.id;
    });
  });

  describe('GET - getAllTechReports', () => {
    it('should return an array of tickets', async () => {
      const tickets = await getAllTechReports();

      expect(tickets).to.be.an('array');
      if (tickets.length > 0) {
        expect(tickets[0]).to.have.keys(['id', 'name', 'content']);
      }
    });
  });

  describe('PATCH - editOneDbTicket', () => {
    it('should update the content of the ticket', async () => {
      const newContent = 'Updated test content';

      const result = await editOneDbTicket(createdTicketId, newContent);

      expect(result.success).to.be.true;
      expect(result.updatedTicket).to.have.property('id', createdTicketId);
      expect(result.updatedTicket).to.have.property('content', newContent);
    });
  });

  describe('DELETE - deleteOneDbTicket', () => {
    it('should delete the ticket successfully', async () => {
      const result = await deleteOneDbTicket(createdTicketId);

      expect(result.success).to.be.true;
      expect(result.deletedTicket).to.have.property('id', createdTicketId);
    });
  });
});
