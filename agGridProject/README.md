# Redux guide

npm install @reduxjs/toolkit react-redux

-----------------------------------------------------------------------------
src/
│
├── store/                # Redux-related files
│   ├── slices/           # Reducers and actions (using slices)
│   │   └── itemSlice.js  # Example slice for managing grid-related state
│   ├── rootReducer.js    # Combine all reducers here
│   └── store.js          # Configure the Redux store
│
├── components/           # React components
│   ├── GridComponent.js  # Example component for grid
│   └── OtherComponent.js # Another component
│
└── App.js                # Main App component

-------------------------------------------------------------------------

// src/store/slices/itemSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lstItemData: [],
  lstOtherData: [],
  totals: {
    totalTaxableAmount: 0,
    totalTax1: 0,
    totalTax2: 0,
    totalTax3: 0,
  },
  addEditObject: {
    GstType: "GST",
    GrossWt: 0,
    VoucherGoldWt: 0,
    VoucherSilverWt: 0,
  },
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    updateGridRow: (state, action) => {
      const { gridName, rowIndex, updatedRow } = action.payload;
      state[gridName][rowIndex] = updatedRow;
    },
    updateGstType: (state, action) => {
      const gstType = action.payload;
      state.addEditObject.GstType = gstType;

      // Update grid rows based on GST type
      state.lstItemData = state.lstItemData.map((row) =>
        gstType === "GST"
          ? { ...row, Tax1Prc: row.ModalSelectedTax1Prc, Tax2Prc: row.ModalSelectedTax2Prc, Tax3Prc: 0 }
          : { ...row, Tax1Prc: 0, Tax2Prc: 0, Tax3Prc: row.ModalSelectedTax3Prc }
      );
    },
    calculateTotals: (state) => {
      const totalTaxableAmount = state.lstItemData.reduce((sum, row) => sum + row.TaxableAmount || 0, 0);
      const totalTax1 = state.lstItemData.reduce((sum, row) => sum + row.Tax1Prc || 0, 0);
      const totalTax2 = state.lstItemData.reduce((sum, row) => sum + row.Tax2Prc || 0, 0);
      const totalTax3 = state.lstItemData.reduce((sum, row) => sum + row.Tax3Prc || 0, 0);

      state.totals = { totalTaxableAmount, totalTax1, totalTax2, totalTax3 };
    },
  },
});

export const { updateGridRow, updateGstType, calculateTotals } = itemSlice.actions;
export default itemSlice.reducer;

------------------------------------------------------------------------------------------

// src/store/rootReducer.js
import { combineReducers } from "redux";
import itemReducer from "./slices/itemSlice";

const rootReducer = combineReducers({
  items: itemReducer,
  // Add more reducers here if needed
});

export default rootReducer;

---------------------------------------------------------------------------------------

// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;

------------------------------------------------------------------------------------------

// src/App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import GridComponent from "./components/GridComponent";

function App() {
  return (
    <Provider store={store}>
      <GridComponent />
    </Provider>
  );
}

export default App;

--------------------------------------------------------------------------------
// src/store/selectors/itemSelectors.js

// Selector to get the entire `lstItemData` array
export const selectLstItemData = (state) => state.items.lstItemData;

// Selector to get the GST type
export const selectGstType = (state) => state.items.addEditObject.GstType;

// Selector to get totals
export const selectTotals = (state) => state.items.totals;

// Example of a memoized selector using `reselect`
import { createSelector } from "reselect";

// Selector to calculate total Taxable Amount (memoized)
export const selectTotalTaxableAmount = createSelector(
  [selectLstItemData],
  (lstItemData) => lstItemData.reduce((sum, row) => sum + row.TaxableAmount || 0, 0)
);

// Selector to calculate grand total of taxes (Tax1 + Tax2 + Tax3)
export const selectGrandTotalTax = createSelector(
  [selectTotals],
  (totals) => totals.totalTax1 + totals.totalTax2 + totals.totalTax3
);

 -----------------------------------------------------------------------------------

// src/components/GridComponent.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLstItemData, selectGstType, selectTotals } from "../store/selectors/itemSelectors";
import { updateGstType, updateGridRow, calculateTotals } from "../store/slices/itemSlice";

const GridComponent = () => {
  const lstItemData = useSelector(selectLstItemData);
  const gstType = useSelector(selectGstType);
  const totals = useSelector(selectTotals);

  const dispatch = useDispatch();

  const handleGstTypeChange = (selectedGstType) => {
    dispatch(updateGstType(selectedGstType));
    dispatch(calculateTotals());
  };

  const handleCellValueChange = (rowIndex, updatedRow) => {
    dispatch(updateGridRow({ gridName: "lstItemData", rowIndex, updatedRow }));
    dispatch(calculateTotals());
  };

  return (
    <div>
      <select value={gstType} onChange={(e) => handleGstTypeChange(e.target.value)}>
        <option value="GST">GST</option>
        <option value="IGST">IGST</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Taxable Amount</th>
            <th>Tax1</th>
            <th>Tax2</th>
            <th>Tax3</th>
          </tr>
        </thead>
       )
       }

-----------------------------------------------------------------------------------
