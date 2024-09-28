import { configureStore } from "@reduxjs/toolkit";
import { LeadsReducer } from "../Reducers/LeadsReducer";
import { ItineraryReducer } from "../Reducers/ItineraryReducer";
import { InvoiceReducer } from "../Reducers/InvoiceReducer";
import { CustomerReducer } from '../Reducers/CustomerReducer'
import { SearchReducer } from "../Reducers/SearchReducer";

export default configureStore({
    reducer: {
        leads: LeadsReducer,
        Itinerary: ItineraryReducer,
        Invoice: InvoiceReducer,
        customer: CustomerReducer,
        searchResults: SearchReducer
    },
});
