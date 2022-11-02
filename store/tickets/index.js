import { faker } from '@faker-js/faker';
import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep, difference, differenceWith } from 'lodash';

export const ticketsInitialState = [];

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: ticketsInitialState,
  reducers: {
    setTickets: (state, action) => {
      const { payload: tickets } = action;
      return tickets;
    },
    addTicket: (state, action) => {
      const uuid = faker.datatype.uuid();
      const { payload: ticket } = action;
      state.push({ id: uuid, ...ticket });
    },
    updateTicket: (state, action) => {
      const { payload: updatedTicket } = action;
      const idx = state.findIndex((ticket) => ticket.id === updatedTicket.id);
      if (idx !== -1) {
        state[idx] = updatedTicket;
      }
    },

    deleteTickets: (state, action) => {
      const { payload: ticketsToExclude } = action;

      return differenceWith(
        state,
        ticketsToExclude,
        (arrVal, othVal) => arrVal.id === othVal.id,
      );
    },
  },
});

export const { setTickets, addTicket, deleteTickets, updateTicket } =
  ticketsSlice.actions;
export default ticketsSlice;
