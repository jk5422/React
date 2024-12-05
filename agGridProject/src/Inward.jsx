import { useEffect, useRef, useState } from "react";

import Select, { components } from 'react-select';

import { useLocation, useNavigate } from "react-router-dom";

import { ActionColumn, customStyles } from "../../Utility/CommonInputJson";

// import { selectCustomStyles } from "../../Utility/CommonInputJson";

import "ag-grid-community/styles/ag-grid.css";

import "ag-grid-community/styles/ag-theme-quartz.css";

import { AgGridReact } from "ag-grid-react";



import camera1 from "@assets/img/accountmaster/addphoto/camera1.svg";

import Folder from "@assets/img/accountmaster/addphoto/Folder.svg";

import mobileapp from "@assets/img/accountmaster/addphoto/mobileapp.svg";

import Noimage from "@assets/img/accountmaster/addphoto/Noimage.svg";

import camera from "../../assets/img/productmaster/camera.svg";

import { AlpVoucherNo } from "../../CommonController/AlpVoucherNo";

import AlpButton from "../../CommonModule/AlpButton";

import CustomDropdown from "../../CommonModule/CustomDrop";

import CollumnGroupModal from "./CollumnGroupModal";

/*new */

import { AlpDate } from '@AlpLib';

import { AddEdit } from "@Utility/CommonServerServicesFunctions";

import Swal from "sweetalert2";

import { AlpPercentage } from "../../../AlpLib/index";

import API, { FilterAPI, TransactionAPI } from "../../APIConfig/API";

import APIGard from "../../APIConfig/APIGard";

import AlpAccountMasterHelp from "../../CommonController/AlpAccountMasterF2Help";

import GridModelcolumnHelp from "../../CommonModule/GridModelcolumnHelp";

import { FormSaveShortCut, UnlockLayoutShortCut } from "../../Utility/CommonShortcut";

import { action, EnterNextCellFocus, FocusedOnLastRow } from "../../Utility/GridCommonFunctions";

import ReportType from "./ReportType";







function PageInwardchallan(props) {



    //#region static code



    const [Flag, setFlag] = useState(false);

    const [ID, setID] = useState(0);

    const [ReRenderGrid, setReRenderGrid] = useState(false);

    const [Required, setRequired] = useState([]);

    const OtherItemGridRef = useRef(null);

    const [voucherDetails, setvoucherDetails] = useState({ prefix: "", vno: "" });

    const [AccountDetails, setAccountDetails] = useState({});



    const [Show, SetShow] = useState(false);



    const [lstItemRow, setlstItemRow] = useState({

        "FromKarigarIInOuttemID": 0,

        "FromKarigarInOutID": 0,

        "SrNo": 0,

        "IrType": "",

        "ItemGroupID": 0,

        "ItemID": 0,

        "ItemCodeID": 0,

        "ItemDescription": "",

        "TagNoGenerateID": 0,

        "TagNoID": 0,

        "HSNCode": "",

        "DesignNo": "0",

        "AccountingStockType": "",

        "DesignCodeID": 0,

        "CounterID": 0,

        "SizeID": 0,

        "Labels": 0,

        "Pcs": 0,

        "GrossWt": 0,

        "GrossWt2": 0,

        "IsOther": false,

        "LessWt": 0,

        "NetWt": 0,

        "TagNetWt": "",

        "Touch": 0,

        "WastagePrc": 0,

        "ProcessLossNetWt": 0,

        "ProcessLossFineWt": 0,

        "NetLabourAmount": 0,

        "TotalAmtWithTax": 0,

        "FineWt": 0,

        "PackingWeight": 0,

        "WithPackingWeight": 0,

        "RateType": "",

        "Rate": 0,

        "Amount": 0,

        "LabourRateType": "",

        "LabourRateCodeID": 0,

        "LabourRate": 0,

        "LabourAmount": 0,

        "LabourDiscPrc": 0,

        "LabourDiscAmount": 0,

        "OtherAmount": 0,

        "ConvertTaxableAmount": 0,

        "ConvertAmountWithTax": 0,

        "OtherTaxableAmount": 0,

        "OtherAmountWithTax": 0,

        "RofAmount": 0,

        "TaxableAmount": 0,

        "TaxID": 0,

        "TaxPrc1": 0,

        "TaxPrc2": 0,

        "TaxPrc3": 0,

        "TaxPrc4": 0,

        "TaxPrc5": 0,

        "TaxPrc6": 0,

        "TaxAmount1": 0,

        "TaxAmount2": 0,

        "TaxAmount3": 0,

        "TaxAmount4": 0,

        "TaxAmount5": 0,

        "TaxAmount6": 0,

        "TotalTaxAmount": 0,

        "TaxROFAmount": 0,

        "AmountWithTax": 0,

        "TotalAmountWithTax": 0,

        "SalesmanEmployeeID": 0,

        "ItemRemarks": "",

        "LstOther": [

            // {

            // "KarigarInOutOtherID": 0,

            // "KarigarInOutItemID": 0,

            // "KarigarInOutID": 0,

            // "SrNo": 0,

            // "ItemGroupID": 0,

            // "ItemID": 0,

            // "ItemCodeID": 0,

            // "SizeID": 0,

            // "Pcs": 0,

            // "ActualWeight": 0,

            // "VariationPrc": 0,

            // "VariationWt": 0,

            // "Weight": 0,

            // "TagWeight": 0,

            // "Touch": 0,

            // "WastagePrc": 0,

            // "FineWt": 0,

            // "OtherRateType": "",

            // "Rate": 0,

            // "Amount": 0,

            // "LabourRateType": "",

            // "LabourRate": 0,

            // "LabourAmount": 0,

            // "TaxableAmount": 0,

            // "TaxID": 0,

            // "TaxPrc1": 0,

            // "TaxPrc2": 0,

            // "TaxPrc3": 0,

            // "TaxPrc4": 0,

            // "TaxPrc5": 0,

            // "TaxPrc6": 0,

            // "TaxAmount1": 0,

            // "TaxAmount2": 0,

            // "TaxAmount3": 0,

            // "TaxAmount4": 0,

            // "TaxAmount5": 0,

            // "TaxAmount6": 0,

            // "AmountWithTax": 0,

            // "Remarks": "",

            // "FromKarigarID": 0,

            // "FromKarigarItemID": 0,

            // "FromKarigarOtherID": 0,

            // "SessionID": 0,

            // "UserID": 0

            // },



        ],

        "OtherDeletedIDs": [

        ]

    });



    const lstOtherRow = {

        "FromKarigarInOutOtherID": 0,

        "FromKarigarIInOuttemID": 0,

        "FromKarigarInOutID": 0,

        "SrNo": 0,

        "ItemGroupID": 0,

        "ItemID": 0,

        "ItemCodeID": 0,

        "SizeID": 0,

        "Pcs": 0,

        "ActualPcs": 0,

        "ActualWeight": 0,

        "VariationPrc": 0,

        "VariationWt": 0,

        "Weight": 0,

        "WeightGrm": 0,

        "TagWeight": 0,

        "Touch": 0,

        "WastagePrc": 0,

        "FineWt": 0,

        "OtherRateType": "",

        "Rate": 0,

        "Amount": 0,

        "LabourRateType": "",

        "LabourRate": 0,

        "LabourAmount": 0,

        "TaxableAmount": 0,

        "TotalOther": 0,

        "TaxID": 0,

        "TaxPrc1": 0,

        "TaxPrc2": 0,

        "TaxPrc3": 0,

        "TaxPrc4": 0,

        "TaxPrc5": 0,

        "TaxPrc6": 0,

        "TaxAmount1": 0,

        "TaxAmount2": 0,

        "TaxAmount3": 0,

        "TaxAmount4": 0,

        "TaxAmount5": 0,

        "TaxAmount6": 0,

        "AmountWithTax": 0,

        "Remarks": "",

        "FromKarigarID": 0,

        "FromKarigarItemID": 0,

        "FromKarigarOtherID": 0,

        "SessionID": 0,

        "UserID": 0



    }

    const [InwardGridRowIndex, setInwardGridRowIndex] = useState(0);

    const [lstitemData, setLstItemData] = useState([lstItemRow])

    const [lstotherData, setLstOtherData] = useState([lstOtherRow])

    const [pinnedBottomRowDataOtherItem, setpinnedBottomRowDataOtherItem] = useState([{

        ActualWeight: 0,

        Pcs: 0,

        VariationWt: 0,

        Weight: 0,

        WeightGrm: 0,

        FineWt: 0,

        Amount: 0,

        LabourAmount: 0,

        TaxableAmount: 0,

        AmountWithTax: 0,

        TaxAmount1: 0,

        TaxAmount2: 0,

        TaxAmount3: 0,

        TaxAmount4: 0,

        TaxAmount5: 0,

        TaxAmount6: 0,

        TotalOther: 0,

    }]);



    const [pinnedBottomRowDataInwardGrid, setpinnedBottomRowDataInwardGrid] = useState([

        {

            NetWt: 0,

            FineWt: 0,

            Labels: 0,

            Pcs: 0,

            GrossWt: 0,

            GrossWt2: 0,

            LessWt: 0,

            TagNetWt: 0,

            ProcessLossNetWt: 0,

            ProcessLossFineWt: 0,

            PackingWeight: 0,

            WithPackingWeight: 0,

            Amount: 0,

            LabourAmount: 0,

            LabourDiscAmount: 0,

            NetLabourAmount: 0,

            OtherAmount: 0,

            TaxableAmount: 0,

            TaxAmount1: 0,

            TaxAmount2: 0,

            TaxAmount3: 0,

            TaxAmount4: 0,

            TaxAmount5: 0,

            TaxAmount6: 0,

            ItemNetAmount: 0,

            OtherTaxableAmount: 0,

            OtherAmountWithTax: 0,

            TotalAmtWithTax: 0,

            TotalNetAmt: 0,

            TotalAmountWithTax: 0,

            RofAmount: 0,

        },

    ])



    const vchdropdown = [

        { value: "-", label: "-" },

        { value: "A", label: "A" },

        { value: "B", label: "B" },

        { value: "C", label: "C" },

        { value: "Z", label: "Z" },

    ];

    const RofDrop = [



        { value: "Mannual", label: "Mannual" },

        { value: "auto", label: "Auto" },

        { value: "10", label: "10" },

        { value: "50", label: "50" },

    ]



    const reporttype = [

        { value: "1", label: "Basic" },

    ];



    const gsttypeType = [

        { ShortName: 'C', Name: 'Composion' },

        { ShortName: 'G', Name: 'GST' },

        { ShortName: 'I', Name: 'IGST' },

        { ShortName: 'R', Name: 'RCM' },

    ]



    const colDef = [{ field: "ShortName", headerName: "Short Name" }, { field: "Name", headerName: "Name" }]

    // Coldef Custom Option component

    const CustomOption = (props) => {

        return (

            <components.Option {...props}>

                <div style={{ display: 'grid', gridTemplateColumns: '80px 80px', gap: '5px' }} className='gsttype-option'>

                    {

                        colDef?.map(({ field }) => (

                            <span key={field} style={{ whiteSpace: 'nowrap' }}>{props.data[field]}</span>

                        ))

                    }



                </div>

            </components.Option>

        );

    };



    // Custom Header component

    const CustomHeader = () => (

        <div style={{ display: 'grid', gridTemplateColumns: '80px 80px', gap: '5px', fontWeight: 'bold' }} className='Mlticolumn_Grid_Header gsttype-dropdown'>

            {

                colDef?.map(({ headerName }) => (

                    <span key={headerName}>{headerName}</span>

                ))

            }



        </div>

    );



    const [today, setToday] = useState(new Date());

    const defaultAddEditForInWard = {

        "KarigarInOutID": 0,

        "SessionID": 0,

        "CompanyID": 0,

        "BranchID": 0,

        "DayBookID": 0,

        "FinYearID": 0,

        "VoucherSrNo": 0,

        "AccountID": "",

        "BookAccountID": 0,

        "CreditDays": AccountDetails?.CreditDays,

        "Tcsid": 0,

        "Tdsid": 0,

        "UserID": 0,

        "DayBookGroup": "",

        "DayBookSeries": "",

        "VoucherNo": "",

        "PartyBillNo": "",

        "GstType": "G",

        "Remarks": "",

        "TotalAmountROFType": "",

        "EntryUser": "",

        "VoucherDate": today?.toISOString()?.split('T')[0],

        "PartyBillDate": "",

        "TotalTaxableAmount": 0,

        "TotalTax1Amount": 0,

        "TotalTax2Amount": 0,

        "TotalTax3Amount": 0,

        "TotalTax4Amount": 0,

        "TotalTax5Amount": 0,

        "TcsTaxPrc": 0,

        "TcsOnAmount": 0,

        "TcsAmount": 0,

        "RofAmount": 0,

        "TotalAmount": 0,

        "TdsPrc": 0,

        "TdsOnAmount": 0,

        "TdsAmount": 0,

        "TdsrofAmount": 0,

        "CashPaymentAmount": 0,

        "CashReceiptAmount": 0,

        "BankPaymentAmount": 0,

        "BankReceiptAmount": 0,

        "OsAmount": 0,

        "IsVoucherCancel": true,

        "Lstitem": [

            {

                "KarigarInOutItemID": 0,

                "KarigarInOutID": 0,

                "SrNo": 0,

                "IrType": "string",

                "ItemGroupID": 0,

                "ItemID": 0,

                "ItemCodeID": 0,

                "ItemDescription": "string",

                "TagNoGenerateID": 0,

                "TagNoID": 0,

                "HsnCode": "string",

                "DesignNo": "string",

                "AccountingStockType": "string",

                "DesignCodeID": 0,

                "CounterID": 0,

                "SizeID": 0,

                "Labels": 0,

                "Pcs": 0,

                "GrossWt": 0,

                "GrossWt2": 0,

                "IsOther": true,

                "LessWt": 0,

                "NetWt": 0,

                "TagNetWt": "string",

                "Touch": 0,

                "WastagePrc": 0,

                "ProcessLossNetWt": 0,

                "ProcessLossFineWt": 0,

                "FineWt": 0,

                "PackingWeight": 0,

                "WithPackingWeight": 0,

                "RateType": "string",

                "Rate": 0,

                "Amount": 0,

                "LabourRateType": "string",

                "LabourRateCodeID": 0,

                "LabourRate": 0,

                "LabourAmount": 0,

                "LabourDiscPrc": 0,

                "LabourDiscAmount": 0,

                "OtherAmount": 0,

                "ConvertTaxableAmount": 0,

                "ConvertAmountWithTax": 0,

                "OtherTaxableAmount": 0,

                "OtherAmountWithTax": 0,

                "RofAmount": 0,

                "TaxableAmount": 0,

                "TaxID": 0,

                "TaxPrc1": 0,

                "TaxPrc2": 0,

                "TaxPrc3": 0,

                "TaxPrc4": 0,

                "TaxPrc5": 0,

                "TaxPrc6": 0,

                "TaxAmount1": 0,

                "TaxAmount2": 0,

                "TaxAmount3": 0,

                "TaxAmount4": 0,

                "TaxAmount5": 0,

                "TaxAmount6": 0,

                "TotalTaxAmount": 0,

                "TaxROFAmount": 0,

                "AmountWithTax": 0,

                "TotalAmountWithTax": 0,

                "SalesmanEmployeeID": 0,

                "ItemRemarks": "string",

                "LstOther": [

                    {

                        "KarigarInOutOtherID": 0,

                        "KarigarInOutItemID": 0,

                        "KarigarInOutID": 0,

                        "SrNo": 0,

                        "ItemGroupID": 0,

                        "ItemID": 0,

                        "ItemCodeID": 0,

                        "SizeID": 0,

                        "Pcs": 0,

                        "ActualWeight": 0,

                        "VariationPrc": 0,

                        "VariationWt": 0,

                        "Weight": 0,

                        "TagWeight": 0,

                        "Touch": 0,

                        "WastagePrc": 0,

                        "FineWt": 0,

                        "OtherRateType": "string",

                        "Rate": 0,

                        "Amount": 0,

                        "LabourRateType": "string",

                        "LabourRate": 0,

                        "LabourAmount": 0,

                        "TaxableAmount": 0,

                        "TaxID": 0,

                        "TaxPrc1": 0,

                        "TaxPrc2": 0,

                        "TaxPrc3": 0,

                        "TaxPrc4": 0,

                        "TaxPrc5": 0,

                        "TaxPrc6": 0,

                        "TaxAmount1": 0,

                        "TaxAmount2": 0,

                        "TaxAmount3": 0,

                        "TaxAmount4": 0,

                        "TaxAmount5": 0,

                        "TaxAmount6": 0,

                        "AmountWithTax": 0,

                        "Remarks": "string",

                        "FromKarigarID": 0,

                        "FromKarigarItemID": 0,

                        "FromKarigarOtherID": 0,

                        "SessionID": 0,

                        "UserID": 0

                    }

                ],

                "OtherDeletedIDs": [



                ]

            }

        ],

        "DeletedItemIDs": [

        ]

    }



    const voucherref = useRef();

    const daybookref = useRef()

    const reportTypeRef = useRef();

    const accountHelpRef = useRef();

    const gstTypeHelpRef = useRef();

    const inWardGridref = useRef();

    const ItemGroupHelpRefInGrid = useRef();

    const ItemGroupHelpRefInOtherItemGrid = useRef();

    const ItemHelpRefInGrid = useRef();

    const SizeHelpRefInGrid = useRef();

    const SizeHelpRefInOtherItem = useRef();

    const ItemHelpRefInOtherItemGrid = useRef();

    const HSNHelpRefInGrid = useRef();

    const ItemCodeHelpRefInGrid = useRef();

    const ItemCodeHelpRefInOtherItemGrid = useRef();

    const CounterHelpRefInGrid = useRef();

    const StockTypeHelpRefInGrid = useRef();

    const SalesmanHelpRefInGrid = useRef();

    const RateTypeHelpRefInGrid = useRef();

    const RateTypeHelpRefInOtherItemGrid = useRef();

    const LaboutRateTypeHelpRefInGrid = useRef();

    const LaboutRateTypeHelpRefInOtherItemGrid = useRef();

    const TaxHelpRefInGrid = useRef();

    const TaxHelpRefInGridInOtherItemGrid = useRef();



    const [TotalsOfItemGrid, setTotalsOfItemGrid] = useState({});

    const [TotalsOtherItemGrid, setTotalsOtherItemGrid] = useState({});



    const [Layoutunlock1, setLayoutunlock1] = useState(false);

    const [GridLayoutID, setGridLayoutID] = useState(0);

    const [ShortCutKey, setShortCutKey] = useState("");



    const [DaybookHelp, setDaybookHelp] = useState([]);

    const [TaxTypeHelp, setTaxTypeHelp] = useState([]);

    const [InwardChallanAddEdit, setAddEditInwardChallan] = useState(defaultAddEditForInWard)

    const [VoucherNoInput, setVoucherNoInput] = useState({

        SessionID: 0,

        DayBookID: InwardChallanAddEdit?.DayBookID ? InwardChallanAddEdit?.DayBookID : 0,

        TableName: "trnKarigarInOut",

        DayBookSeries: InwardChallanAddEdit?.DayBookSeries ? InwardChallanAddEdit?.DayBookSeries : "",

        BranchID: 0,

        FinyearID: 0,

        VoucherNo: "",

    });

    const navigate = useNavigate();

    const location = useLocation();

    const { InoutGetById, Mode } = location?.state || {}



    const voucherLayout = [

        {

            field: "DayBookSeries",

            headerName: "DayBookSeries",

            width: 10,

        },

        {

            field: "Amount",

            headerName: "Amount",

            width: 160,

        },

        {

            field: "Remarks",

            headerName: "Remarks",

            width: 100,

        },

        {

            field: "VoucherNo",

            headerName: "VoucherNo",

            width: 170,

        },

        {

            field: "VoucherDate",

            headerName: "VoucherDate",

            width: 160,

        },

    ];

    const ItemGroupLayout = [

        {

            field: "ItemGroupName",

            headerName: "Group Name",

            width: 160,

        },

        {

            field: "DefaultTouch",

            headerName: "Touch",

            width: 100,

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(e?.value).toFixed(2)

                }

            }

        },

        {

            field: "ItemGroupID",

            headerName: "ID",

            width: 10,

        },

    ];

    const ItemLayout = [

        {

            field: "ItemName",

            headerName: "Name",

            width: 190,

        },

        {

            field: "ItemID",

            headerName: "ID",

            width: 120,

        },

    ];

    const SizeLayout = [

        {

            field: "SizeName",

            headerName: "Size Name",

            width: 190,

        },

        {

            field: "SizeID",

            headerName: "Size ID",

            width: 120,

        },

    ]

    const HsnCodeHelpLayout = [

        {

            field: "HSNName",

            headerName: "HSN Name",

            width: 190,

        },

        {

            field: "HSNCode",

            headerName: "HSN Code",

            width: 120,

        },



    ];

    const ItemCodeLayout = [

        {

            field: "ItemCodeName",

            headerName: "Code Name",

            width: 190,

        },

        {

            field: "ItemCodeID",

            headerName: "ID",

            width: 120,

        },

    ];

    const CounterLayout = [

        {

            field: "CounterName",

            headerName: "Counter Name",

            width: 190,

        },

        {

            field: "CounterID",

            headerName: "ID",

            width: 120,

        },

    ];

    const StockTypeLayout = [

        {

            field: "AccountingStockTypeDesc",

            headerName: "Stock Type Desc",

            width: 190,

        },

        {

            field: "AccountingStockType",

            headerName: "Stock Type",

            width: 120,

        },

    ];

    const MultiColumnObjVoucherno = {

        AddNewVisible: true,

        InputName: "VoucherNo",

        Attribut: { name: "DayBookSeries", id: "VoucherNo" },

        NextID: "voucherdate",

        PrevInputRef: daybookref,

        GridRef: voucherref,

        Gridwidth: "600px",

        ID: "VoucherNo",

        AddEditData: InwardChallanAddEdit,

        SetAddEditData: setAddEditInwardChallan,

        InputID: "VoucherReview",

        F2ButtonID: "F2ID",

        F2HelpAPI: TransactionAPI?.KarigarVoucherForHelp,

        APIInput: {

            PageSize: 999,

            PageNo: 1,

            Search: "",

            SortBy: "",

            DayBookSeries: voucherDetails?.prefix,

        },

        HelpColumnLayout: voucherLayout,

    };

    const SalesmanLayout = [

        {

            field: "EmployeeName",

            headerName: "Salesman Name",

            width: 160,

        },

        {

            field: "EmployeeID",

            headerName: "ID",

            width: 10,

        },

    ];

    const RateTypeLayout = [

        {

            field: "RateTypeName",

            headerName: "RateType Name",

            width: 160,

        },

        {

            field: "RateType",

            headerName: "RateType",

            width: 100,

        },

    ];

    const TaxHelpLayout = [

        {

            field: "TaxName",

            headerName: "Tax Name",

            width: 160,

        },

        {

            field: "Tax1Prc",

            headerName: "Tax1(%)",

            width: 100,

        },

        {

            field: "Tax2Prc",

            headerName: "Tax2(%)",

            width: 100,

        },

        {

            field: "Tax3Prc",

            headerName: "Tax3(%)",

            width: 100,

        },

        {

            field: "Tax4Prc",

            headerName: "Tax4(%)",

            width: 100,

        },

        {

            field: "Tax5Prc",

            headerName: "Tax5(%)",

            width: 100,

        },

        {

            field: "Tax6Prc",

            headerName: "Tax6(%)",

            width: 100,

        },

        {

            field: "TaxID",

            headerName: "Tax ID",

            width: 100,

        },



    ];



    const MultiColumnHelpObjAcc = {

        InputName: "AccountName",

        ID: "AccountID",

        required: true,

        InputID: "InpAccID",

        setAccountDetailsState: setAccountDetails,

        NextID: "Grid",

        GridRef: accountHelpRef,

        PreviousID: reportTypeRef,

        Attribut: { name: "AccountName", id: "AccountID" },

        F2HelpAPI: FilterAPI.AccountForHelp,

        SetAddEditData: setAddEditInwardChallan,

        AddEditData: InwardChallanAddEdit,

        F2ButtonID: "AccountF2",

        F3ButtonID: "AccountF3",

        Gridwidth: "600px",

        F2AccountTypeID: "1,2,3",

        F3AccountTypeID: "",

        NextGridRef: inWardGridref,

    };



    useEffect(() => {

        try {

            APIGard?.post(FilterAPI?.DayBookForHelp, {

                PageSize: 999,

                PageNo: 1,

                Search: "",

                SortBy: "",

                DayBookGroup: "KINC",

            }).then((res) => {

                if (res?.data !== undefined) {

                    let tempData = [];

                    for (let i = 0; i < res?.data?.lstResult?.length; i++) {

                        tempData.push({

                            value: res?.data?.lstResult[i]["DayBookID"],

                            label: res?.data?.lstResult[i]["DayBookName"],

                            ...res?.data?.lstResult[i],

                        });

                    }

                    setDaybookHelp(tempData);

                }

            });

        }

        catch (err) {

            console.log("Error in api of daybookfor help in inout chaallan", err)

        }



        /* taxtype help */

        try {

            APIGard?.post(API?.TaxTypeForHelp, {

                PageSize: 999,

                PageNo: 1,

                Search: "",

                SortBy: "",

            }).then((res) => {

                if (res?.data !== undefined) {

                    setTaxTypeHelp(res?.data?.lstResult)

                }

            });

        }

        catch (err) {

            console.log("Error in api of TaxTypeForHelp in inout chaallan", err)

        }



    }, [])


    useEffect(() => {

        if (InoutGetById > 0) {

            APIGard?.post(TransactionAPI?.KarigarIRGetByID, { KarigarInOutID: InoutGetById }).then(

                (res) => {

                    if (res?.data) {

                        setAddEditInwardChallan(res?.data?.DetailObj || {})

                        setLstItemData(res?.data?.DetailObj?.lstitem || [])

                        setLstOtherData(res?.data?.DetailObj?.lstitem[0]?.lstOther || [])

                    }



                })

            daybookref?.current?.setValue(

                DaybookHelp?.filter((val) => {

                    return val.DayBookID == InwardChallanAddEdit?.DayBookID;

                })[0]

            );

        }

    }, [InoutGetById])



    useEffect(() => {

        if (InwardChallanAddEdit?.DayBookID && InwardChallanAddEdit?.DayBookID > 0) {

            try {

                APIGard?.post(TransactionAPI?.VoucherNoForHelp, {

                    ...VoucherNoInput,

                    ["DayBookSeries"]: InwardChallanAddEdit?.DayBookSeries,

                    ['DayBookID']: InwardChallanAddEdit?.DayBookID

                }).then((res) => {

                    if (res?.data !== undefined && res?.data !== null && res?.data !== "") {

                        setAddEditInwardChallan((prev) => {

                            return { ...prev, ["VoucherNo"]: res?.data?.DetailObj?.VoucherNo };

                        });



                        /* set daybook name at that time of get by id call */

                        daybookref?.current?.setValue(

                            DaybookHelp?.filter((val) => InwardChallanAddEdit?.DayBookID === val.DayBookID)[0]

                        );

                    }

                });

            } catch (error) {

                console.log(error, "error in on change of daybook or daybook series vouchernoforhelp api");

            }

        }

    }, [InwardChallanAddEdit?.DayBookID, InwardChallanAddEdit?.DayBookSeries]);



    useEffect(() => {

        if (Object.keys(AccountDetails)?.length > 0) {

            setAddEditInwardChallan((prev) => {

                return {

                    ...prev,

                    ['CreditDays']: AccountDetails?.CreditDays

                }

            })

        }

    }, [AccountDetails])


    function ValueFormmaterForDropDown(e, placeHolder, helpData) {

        if (e?.newValue != "" && e?.newValue != undefined && e?.newValue != placeHolder) {

            return helpData.find((f) => f.value.toString() == e?.newValue)?.label;

        } else if (e?.value != "" && e?.value != undefined && e?.value != placeHolder) {

            return helpData.find((f) => f.value.toString() == e?.value)?.label;

            // return JSON.parse(e.value).TaxName

        } else {

            return e?.value;

        }

    }



    function onInputChange(e) {

        if (e) {

            setAddEditInwardChallan((prev) => {

                return { ...prev, [e?.target?.name]: e?.target?.value }

            })

        }

    }


    const FindNextCell = (ref, e) => {

        let TotalColLength = ref.current.props.columnDefs.filter((x) => {

            if (x.field != 'SrNo') {

                return x;

            }

        }).length;


        let NextIndex = ref.current.props.columnDefs.findIndex((x) => x.field == e?.column?.colId) + 1;

        const CurrentIndex = NextIndex - 1;

        const columnDefs = ref?.current?.api?.getColumnDefs();

        const NextFiledName = columnDefs[NextIndex]?.field

        const PrevFiledName = columnDefs[CurrentIndex - 1]?.field

        const CurrentFiledName = e?.column?.colId;



        return {

            TotalColLength, CurrentIndex, NextIndex, NextFiledName, CurrentFiledName, PrevFiledName

        }

    }


    function inWardGridEnterKeyEvent(e) {

        e?.event?.preventDefault();



        if (e?.event?.key === 'Enter') {

            const { TotalColLength, NextFiledName, CurrentFiledName, CurrentIndex, PrevFiledName } = FindNextCell(inWardGridref, e)

            setInwardGridRowIndex(e?.node?.rowIndex);



            if (TotalColLength === CurrentIndex) {

                setLstItemData((prev) => {

                    return [...prev, lstItemRow]

                })



            }

            else {

                if (CurrentFiledName === "IsOther") {

                    if (lstitemData[e?.node?.rowIndex]?.IsOther === true) {

                        setLstOtherData((prev) => {

                            return [...prev, lstOtherRow]

                        })

                        document.querySelector(':focus')?.blur()

                        setTimeout(() => {

                            // OtherItemGridRef?.current?.api?.setFocusedCell(

                            // // OtherItemGridRef?.current?.props?.rowData

                            // // ?.length - 1,

                            // 0,

                            // OtherItemGridRef?.current?.props?.columnDefs[1]?.field

                            // );

                            // OtherItemGridRef?.current?.api?.startEditingCell(

                            // {

                            // rowIndex:0,

                            // // OtherItemGridRef?.current?.props?.rowData

                            // // ?.length - 1,

                            // colKey: OtherItemGridRef?.current?.props?.columnDefs[1]?.field

                            // }

                            // );

                            document.getElementById(`other${OtherItemGridRef?.current?.props?.columnDefs[1]?.field}id${e.rowIndex}`).focus()

                        }, 100);

                    }

                    else if (lstitemData[e?.node?.rowIndex]?.IsOther === false) {

                        if (lstotherData.length <= 0) {

                            setLstOtherData([]);

                        }

                    }

                }

                else {

                    // if (

                    // NextFiledName === "AccountingStockType" ||

                    // NextFiledName === 'ItemGroupName' ||

                    // NextFiledName === 'ItemName' ||

                    // NextFiledName === "HsnCode" ||

                    // NextFiledName === "Touch" ||

                    // NextFiledName === "ItemCodeName"

                    // ) {

                    // if (e?.value) {

                    // setTimeout(() => {

                    // document.querySelector(':focus')?.blur()

                    // inWardGridref.current.api.setFocusedCell(e.node.rowIndex, NextFiledName);

                    // document.getElementById(`${NextFiledName}id${e.node.rowIndex}`)?.focus();

                    // }, 100);

                    // }

                    // }

                    // else if (NextFiledName === 'ItemDescription') {

                    // setTimeout(() => {

                    // inWardGridref.current.api.setFocusedCell(e.node.rowIndex, 'ItemDescription');

                    // inWardGridref.current.api.startEditingCell({

                    // rowIndex: e.node.rowIndex,

                    // colKey: inWardGridref.current.api.getFocusedCell().column.colId,

                    // });

                    // }, 100);

                    // }

                    // else {

                    // EnterNextCellFocus(inWardGridref, e.rowIndex);

                    // }

                    // EnterNextCellFocus(inWardGridref, e.rowIndex);

                    if (!e.colDef.type) {

                        FocusedOnLastRow(inWardGridref, e.rowIndex, NextFiledName)

                    }



                }

            }





        }



    }


    function OtherItemGridEnterKeyEvent(e) {

        if (e?.event?.key === 'Enter') {

            const { TotalColLength, NextIndex, NextFiledName, CurrentFiledName, CurrentIndex } = FindNextCell(OtherItemGridRef, e)

            // setInwardGridRowIndex(e?.node?.rowIndex);



            if (TotalColLength === CurrentIndex) {

                setLstOtherData((prev) => {

                    return [...prev, lstOtherRow]

                })



            }

            else {

                if (

                    NextFiledName === "AccountingStockType" ||

                    NextFiledName === 'ItemGroup' ||

                    NextFiledName === 'Item' ||

                    NextFiledName === "Touch"

                ) {

                    setTimeout(() => {

                        document.querySelector(':focus')?.blur()

                        document.getElementById(`other${NextFiledName?.toLowerCase()}id${e.node.rowIndex}`)?.focus();

                    }, 100);

                }

                else if (NextFiledName === 'ItemDescription') {

                    setTimeout(() => {

                        OtherItemGridRef.current.api.setFocusedCell(e.node.rowIndex, 'ItemDescription');

                        OtherItemGridRef.current.api.startEditingCell({

                            rowIndex: e.node.rowIndex,

                            colKey: OtherItemGridRef.current.api.getFocusedCell().column.colId,

                        });

                    }, 100);

                }

                else {



                    EnterNextCellFocus(OtherItemGridRef, e.rowIndex);

                }

            }



            setTotalOfOtherItemGrid()

        }





    }

    const DefaultCellRenderHelpObj = {

        ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "", SortBy: "" },

        ['SetAddEditData']: '',

        ['AddEditData']: '',

        ['hidden']: true,

        ["Show"]: true,

        ['ExtraParam']: "",

        ['required']: false,

        ['NextGridID']: inWardGridref,

        ["PreviousID"]: "",

        Gridwidth: 400,

        TabAction: "",

    }



    function handlecellrenderitemGroup(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(inWardGridref, e)



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: API.ItemGroupForHelp,

                    ["HelpColumnLayout"]: ItemGroupLayout,

                    ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "", InventoryType: "I", ItemCodeID: lstitemData[e.node.rowIndex]?.ItemCodeID, ItemID: lstitemData[e.node.rowIndex]?.ItemID },

                    ['SetAddEditData']: setLstItemData,

                    ['AddEditData']: lstitemData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "ItemGroupName",

                    ['ID']: "ItemGroupID",

                    ['MultiAttribute']: { ItemGroupID: "ItemGroupID", ItemGroupName: "GroupName", Touch: "Touch", RateTypeName: "RateTypeName", RateType: "PurchaseRateType" },

                    ['InputID']: `${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: inWardGridref,

                    ["defvalue"]: e?.data?.ItemGroupName,

                    ["PreviousID"]: `${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "InpAccID",

                    GridRef: ItemGroupHelpRefInGrid,

                    F2ButtonID: "itemgroupF2" + e.node.rowIndex,

                }}

            />

        );

    }



    function cellrenderitemGroupInOtherGrid(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(OtherItemGridRef, e)

        return (



            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: API.ItemGroupForHelp,

                    ["HelpColumnLayout"]: ItemGroupLayout,

                    ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "", InventoryType: "I", ItemCodeID: lstotherData[e.node.rowIndex]?.ItemCodeID, ItemID: lstotherData[e.node.rowIndex]?.ItemID }, // MetalType: "O"

                    ['SetAddEditData']: setLstOtherData,

                    ['AddEditData']: lstotherData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "GroupName",

                    ['ID']: "ItemGroupID",

                    ['MultiAttribute']: { MetalType: "MetalType", ItemGroupID: "ItemGroupID", GroupName: "GroupName", Touch: "Touch", OtherRateTypeName: "RateTypeName", OtherRateType: "PurchaseRateType", OtherRateTypeCode: "PurchaseRateType" },

                    ['InputID']: `other${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `other${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: OtherItemGridRef,

                    ["defvalue"]: e?.data?.GroupName,

                    ["PreviousID"]: `other${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "InpAccID",

                    GridRef: ItemGroupHelpRefInOtherItemGrid,

                    F2ButtonID: "otheritemgroupF2" + e.node.rowIndex,

                }}

                key={Math.random}

            />

        );

    }


    function handlecellrenderitem(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(inWardGridref, e)



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: FilterAPI.mstItem_ItemPrefixForHelp,

                    ["HelpColumnLayout"]: ItemLayout,

                    ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "", ItemGroupID: lstitemData[e.node.rowIndex]?.ItemGroupID, ItemCodeID: lstitemData[e.node.rowIndex]?.ItemCodeID },

                    ['SetAddEditData']: setLstItemData,

                    ['AddEditData']: lstitemData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "ItemName",

                    ['ID']: "ItemID",

                    ['MultiAttribute']: { ItemID: "ItemID", ItemName: "ItemName", AccountingStockTypeDesc: "AccountingStockTypeDesc", LabourRateType: "LabourRateTypeCode", LabourRateName: "LabourRateType", HsnCode: "HSNCode", AccountingStockType: "DefaultAccountingStockType" },

                    ['InputID']: `${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: inWardGridref,

                    ["defvalue"]: e?.data?.ItemName,

                    ["PreviousID"]: `${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "",

                    GridRef: ItemHelpRefInGrid,

                    F2ButtonID: "itemF2" + e.node.rowIndex,

                }}

            />

        );

    }



    function handlecellrenderitemInOtherGrid(e) {

        const { NextFiledName, PrevFiledName, CurrentFiledName } = FindNextCell(OtherItemGridRef, e)



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: FilterAPI.mstItem_ItemPrefixForHelp,

                    ["HelpColumnLayout"]: ItemLayout,

                    ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "", ItemGroupID: lstotherData[e.node.rowIndex]?.ItemGroupID, ItemCodeID: lstotherData[e.node.rowIndex]?.ItemCodeID },

                    ['SetAddEditData']: setLstOtherData,

                    ['AddEditData']: lstotherData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "ItemName",

                    ['ID']: "ItemID",

                    ['InputID']: `other${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `other${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: OtherItemGridRef,

                    ["defvalue"]: e?.data?.ItemName,

                    ["PreviousID"]: `other${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "",

                    GridRef: ItemHelpRefInOtherItemGrid,

                    F2ButtonID: "otheritemF2" + e.node.rowIndex,

                }}

            />

        );

    }


    function handlecellrenderSizeHelp(e) {

        const { NextFiledName, PrevFiledName, CurrentFiledName } = FindNextCell(inWardGridref, e)



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: TransactionAPI?.SizeItemForHelp,

                    ["HelpColumnLayout"]: SizeLayout,

                    ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "", ItemID: lstitemData[e.node.rowIndex]?.ItemCodeID },

                    ['SetAddEditData']: setLstItemData,

                    ['AddEditData']: lstitemData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "SizeName",

                    ['ID']: "SizeID",

                    ['MultiAttribute']: { SizeName: "SizeName", SizeID: "SizeID" },

                    ['InputID']: `${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: inWardGridref,

                    ["defvalue"]: e?.data?.SizeName,

                    ["PreviousID"]: `${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "",

                    GridRef: SizeHelpRefInGrid,

                    F2ButtonID: "SizeNameF2" + e.node.rowIndex,

                }}

            />

        );

    }



    function handlecellrenderSizeHelpInOtherGrid(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(OtherItemGridRef, e)



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: TransactionAPI?.SizeItemForHelp,

                    ["HelpColumnLayout"]: SizeLayout,

                    ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "", ItemID: lstitemData[e.node.rowIndex]?.ItemCodeID },

                    ['SetAddEditData']: setLstOtherData,

                    ['AddEditData']: lstotherData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "SizeName",

                    ['ID']: "SizeID",

                    ['MultiAttribute']: { SizeName: "SizeName", SizeID: "SizeID" },

                    ['InputID']: `other${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `other${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: OtherItemGridRef,

                    ["defvalue"]: e?.data?.SizeName,

                    ["PreviousID"]: `other${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "",

                    GridRef: SizeHelpRefInOtherItem,

                    F2ButtonID: "otherSizeNameF2" + e.node.rowIndex,

                }}

            />

        );

    }


    function handlecellrenderitemcode(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(inWardGridref, e)



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: TransactionAPI?.ItemCodeKarigarForHelp,

                    ["HelpColumnLayout"]: ItemCodeLayout,

                    ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "", ItemGroupID: lstitemData[e.node.rowIndex]?.ItemGroupID, ItemID: lstitemData[e.node.rowIndex]?.ItemID },

                    ['SetAddEditData']: setLstItemData,

                    ['AddEditData']: lstitemData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "ItemCodeName",

                    ['ID']: "ItemCodeID",

                    ['MultiAttribute']: { ItemCodeID: "ItemCodeID", ItemCodeName: "ItemCodeName", MakingTypeAtrib: "MakingTypeAtrib", SubItemAtrib: "SubItemAtrib", StyleAtrib: "StyleAtrib" },

                    ['InputID']: `${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: inWardGridref,

                    ["defvalue"]: e?.data?.ItemCodeName,

                    ["PreviousID"]: `${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "",

                    GridRef: ItemCodeHelpRefInGrid,

                    F2ButtonID: "itemCodeF2" + e.node.rowIndex,

                }}

            />

        );

    }



    function handlecellrenderitemcodeInOtherGrid(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(OtherItemGridRef, e)



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: TransactionAPI?.ItemCodeKarigarForHelp,

                    ["HelpColumnLayout"]: ItemCodeLayout,

                    ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "", ItemGroupID: lstotherData[e.node.rowIndex]?.ItemGroupID, ItemID: lstotherData[e.node.rowIndex]?.ItemID },

                    ['SetAddEditData']: setLstOtherData,

                    ['AddEditData']: lstotherData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "ItemCodeName",

                    ['ID']: "ItemCodeID",

                    ['InputID']: `other${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `other${NextFiledName.toLowerCase()}id${e.node.rowIndex}`,

                    ['NextGridID']: OtherItemGridRef,

                    ["defvalue"]: e?.data?.ItemCodeName,

                    ["PreviousID"]: `other${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "",

                    GridRef: ItemCodeHelpRefInOtherItemGrid,

                    F2ButtonID: "otheritemCodeF2" + e.node.rowIndex,

                }}

            />

        );

    }



    function handlecellrenderHSNCode(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(inWardGridref, e)

        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: API?.HSNCodeForHelp,

                    ["HelpColumnLayout"]: HsnCodeHelpLayout,

                    ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "" },

                    ['SetAddEditData']: setLstItemData,

                    ['AddEditData']: lstitemData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "HSNCode",

                    ['ID']: "hsnCode",

                    ['InputID']: `${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: inWardGridref,

                    ["defvalue"]: e?.data?.HsnCode,

                    ["PreviousID"]: `${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "",

                    GridRef: HSNHelpRefInGrid,

                    F2ButtonID: "HsnF2" + e.node.rowIndex,

                }}

            />

        );

    }



    function handlecellrenderCounterHelp(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(inWardGridref, e)



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: API?.CounterForHelp,

                    ["HelpColumnLayout"]: CounterLayout,

                    ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "" },

                    ['SetAddEditData']: setLstItemData,

                    ['AddEditData']: lstitemData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "CounterName",

                    ['ID']: "CounterID",

                    ['InputID']: `${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `${NextFiledName.toLowerCase()}id${e.node.rowIndex}`,

                    ['NextGridID']: inWardGridref,

                    ["defvalue"]: e?.data?.CounterName,

                    ["PreviousID"]: `${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "",

                    GridRef: CounterHelpRefInGrid,

                    F2ButtonID: "CounterF2" + e.node.rowIndex,

                }}

            />

        );

    }


    function handlecellrenderStockTypeHelp(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(inWardGridref, e);



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: TransactionAPI?.AccountStockTypeForHelp,

                    ["HelpColumnLayout"]: StockTypeLayout,

                    ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "" },

                    ['SetAddEditData']: setLstItemData,

                    ['AddEditData']: lstitemData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "AccountingStockTypeDesc",

                    ['ID']: "AccountingStockType",

                    ['InputID']: `${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: inWardGridref,

                    ["defvalue"]: e?.data?.AccountingStockTypeDesc,

                    ["PreviousID"]: `${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "",

                    GridRef: StockTypeHelpRefInGrid,

                    F2ButtonID: "StockTypeF2" + e.node.rowIndex,

                }}

            />

        );

    }


    function handlecellrenderSalesManHelp(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(inWardGridref, e)



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: TransactionAPI?.SalesManForHelp,

                    ["HelpColumnLayout"]: SalesmanLayout,

                    ['SetAddEditData']: setLstItemData,

                    ['AddEditData']: lstitemData,

                    ['Index']: e.node.rowIndex,

                    // ['InputName']: "EmployeeName",

                    ['InputName']: "SalesmanEmployeeName",

                    // ['ID']: "EmployeeID",

                    ['ID']: "SalesmanEmployeeID",

                    ['InputID']: `${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: inWardGridref,

                    ["defvalue"]: e?.data?.EmployeeName,

                    ["PreviousID"]: `${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "InpAccID",

                    GridRef: SalesmanHelpRefInGrid,

                    F2ButtonID: "salesmanF2" + e.node.rowIndex,

                    ["attribute"]: {

                        id: "EmployeeID",

                        name: "EmployeeName"

                    }

                }}

            />

        );

    }



    function handlecellrenderRateTypeHelp(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(inWardGridref, e)



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: FilterAPI?.RateTypeForHelp,

                    ["HelpColumnLayout"]: RateTypeLayout,

                    ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "", RateCodeType: "R" },

                    ['SetAddEditData']: setLstItemData,

                    ['AddEditData']: lstitemData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "RateTypeName",

                    ['ID']: "RateType",

                    ['InputID']: `${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: inWardGridref,

                    ["defvalue"]: e?.data?.RateTypeName,

                    ["PreviousID"]: `${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "InpAccID",

                    GridRef: RateTypeHelpRefInGrid,

                    F2ButtonID: "ratetypeF2" + e.node.rowIndex,

                }}

            />

        );

    }


    function handlecellrenderRateTypeHelpInOtherItem(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(OtherItemGridRef, e)



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: FilterAPI?.RateTypeForHelp,

                    ["HelpColumnLayout"]: RateTypeLayout,

                    ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "", RateCodeType: "O" },

                    ['SetAddEditData']: setLstOtherData,

                    ['AddEditData']: lstotherData,

                    ['Index']: e?.node?.rowIndex,

                    ['InputName']: "OtherRateTypeName",

                    ['ID']: "RateType",

                    ['MultiAttribute']: { OtherRateTypeName: "RateTypeName", OtherRateType: "RateType", OtherRateTypeCode: "RateType" },

                    ['InputID']: `${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: OtherItemGridRef,

                    ["defvalue"]: e?.data?.OtherRateTypeName,

                    ["PreviousID"]: `${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "InpAccID",

                    GridRef: RateTypeHelpRefInOtherItemGrid,

                    F2ButtonID: "otherratetypeF2" + e.node.rowIndex,

                }}

            />

        );

    }



    function handlecellrenderLaboutRateTypeHelp(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(inWardGridref, e)



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: FilterAPI?.RateTypeForHelp,

                    ["HelpColumnLayout"]: RateTypeLayout,

                    ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "", RateCodeType: "L" },

                    ['SetAddEditData']: setLstItemData,

                    ['AddEditData']: lstitemData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "LabourRateName",

                    ['ID']: "LabourCode",

                    ['MultiAttribute']: { LabourRateName: "RateTypeName", LabourCode: "RateType", LabourRateType: "RateType" },

                    ['InputID']: `${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: inWardGridref,

                    ["defvalue"]: e?.data?.LabourRateName,

                    ["PreviousID"]: `${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "InpAccID",

                    GridRef: LaboutRateTypeHelpRefInGrid,

                    F2ButtonID: "laboutratetypeF2" + e.node.rowIndex,

                }}

            />

        );

    }


    function handlecellrenderLaboutRateTypeHelpInOtherItem(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(OtherItemGridRef, e)



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: FilterAPI?.RateTypeForHelp,

                    ["HelpColumnLayout"]: RateTypeLayout,

                    ["APIInput"]: { PageSize: 999, PageNo: 0, Search: "", RateCodeType: "L" },

                    ['SetAddEditData']: setLstOtherData,

                    ['AddEditData']: lstotherData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "LabourRateName",

                    ['ID']: "LabourCode",

                    ['MultiAttribute']: { LabourRateName: "RateTypeName", LabourCode: "RateType", LabourRateType: "RateType" },

                    ['InputID']: `other${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `other${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: OtherItemGridRef,

                    ["defvalue"]: e?.data?.LabourRateName,

                    ["PreviousID"]: `other${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "InpAccID",

                    GridRef: LaboutRateTypeHelpRefInOtherItemGrid,

                    F2ButtonID: "otherlaboutratetypeF2" + e.node.rowIndex,

                }}

            />

        );

    }


    function handlecellrenderTaxHelp(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(inWardGridref, e)



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: FilterAPI?.TaxForHelp,

                    ["HelpColumnLayout"]: TaxHelpLayout,

                    ['SetAddEditData']: setLstItemData,

                    ['AddEditData']: lstitemData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "TaxName",

                    ['ID']: "TaxID",

                    ['MultiAttribute']: InwardChallanAddEdit?.GstType === 'I' ? { TaxPrc3: "Tax3Prc", TaxID: "TaxID", TaxName: "TaxName" } : { TaxPrc1: "Tax1Prc", TaxPrc2: "Tax2Prc", TaxID: "TaxID", TaxName: "TaxName" },

                    // ['MultiAttribute']: InwardChallanAddEdit?.GstType === 'G' ? { TaxPrc1: "Tax1Prc", TaxPrc2: "Tax2Prc", TaxID: "TaxID", TaxName: "TaxName" } : { TaxPrc1: "Tax3Prc", TaxID: "TaxID", TaxName: "TaxName" },

                    // ['MultiAttribute']: { TaxPrc1: "Tax1Prc", TaxPrc2: "Tax2Prc", TaxPrc3: "Tax3Prc", TaxPrc4: "Tax4Prc", TaxPrc5: "Tax5Prc", TaxPrc6: "Tax6Prc", TaxID: "TaxID", TaxName: "TaxName" },

                    ['InputID']: `${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: inWardGridref,

                    ["defvalue"]: e?.data?.TaxName,

                    ["PreviousID"]: `${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "InpAccID",

                    GridRef: TaxHelpRefInGrid,

                    F2ButtonID: "taxF2" + e.node.rowIndex,

                }}

            />

        );

    }



    function handlecellrenderTaxHelpInOtherGrid(e) {

        const { NextFiledName, CurrentFiledName, PrevFiledName } = FindNextCell(OtherItemGridRef, e)



        return (

            <GridModelcolumnHelp

                MultiColumnObj={{

                    ...DefaultCellRenderHelpObj,

                    ["HelpAPI"]: FilterAPI?.TaxForHelp,

                    ["HelpColumnLayout"]: TaxHelpLayout,

                    ['SetAddEditData']: setLstOtherData,

                    ['AddEditData']: lstotherData,

                    ['Index']: e.node.rowIndex,

                    ['InputName']: "TaxName",

                    ['ID']: "TaxID",

                    ['MultiAttribute']: InwardChallanAddEdit?.GstType === 'I' ? { TaxPrc3: "Tax3Prc", TaxID: "TaxID", TaxName: "TaxName" } : { TaxPrc1: "Tax1Prc", TaxPrc2: "Tax2Prc", TaxID: "TaxID", TaxName: "TaxName" },

                    // ['MultiAttribute']: InwardChallanAddEdit?.GstType === 'G' ? { TaxPrc1: "Tax1Prc", TaxPrc2: "Tax2Prc", TaxID: "TaxID", TaxName: "TaxName" } : { TaxPrc1: "Tax3Prc", TaxID: "TaxID", TaxName: "TaxName" },

                    ['InputID']: `other${CurrentFiledName}id${e.node.rowIndex}`,

                    ['NextID']: `other${NextFiledName}id${e.node.rowIndex}`,

                    ['NextGridID']: OtherItemGridRef,

                    ["defvalue"]: e?.data?.TaxName,

                    ["PreviousID"]: `other${PrevFiledName}id${e.node.rowIndex}`,

                    ["LastPrevID"]: "InpAccID",

                    GridRef: TaxHelpRefInGridInOtherItemGrid,

                    F2ButtonID: "othertaxF2" + e.node.rowIndex,

                }}

            />

        );

    }


    function handlerendererTouchPrc(e) {

        return (

            <AlpPercentage

                className="form-control text-end"

                value={inWardGridref.current.props.rowData[e.node.rowIndex]?.Touch >= 0 ? inWardGridref.current.props.rowData[e.node.rowIndex]?.Touch.toFixed(2) : parseFloat(0).toFixed(2)}

                placeholder="0.00"

                name="Touch"

                id={`touchid${e.node.rowIndex}`}

                onChange={(value) => {

                    // purchaseBaseRate[e.node.rowIndex] = value.target.value

                }}

                // onKeyDown={(value) => {

                // // if (e.shiftKey && e.keyCode === 9) {

                // // setTimeout(() => {

                // // WorkTypeRef.current.focus();

                // // }, 5);

                // // } else if (e.keyCode === 13 || e.keyCode === 9) {

                // // e.preventDefault();

                // // setFooterFlag(false);

                // // PurRateTypeRef.current.focus();

                // // }



                // if (value.shiftKey === true && value.keyCode === 9) {

                // // const nextF2Id = document.getElementById(`inputid${e.node.rowIndex}`)



                // // if (nextF2Id) {

                // // setTimeout(() => {

                // // document.getElementById(`inputid${e.node.rowIndex}`).focus()

                // // }, 100);

                // // }



                // const currentCell = inWardGridref.current.api.getFocusedCell()



                // if (currentCell.column.colId === "ROFType") {

                // inWardGridref.current.api.setFocusedCell(e.node.rowIndex, currentCell.column.colId)

                // inWardGridref.current.api.startEditingCell({

                // rowIndex: currentCell.rowIndex,

                // colKey: currentCell.column.colId

                // })

                // }

                // } else if (value.keyCode === 13) {

                // value.preventDefault()



                // inWardGridref.current.api.tabToNextCell()

                // inWardGridref.current.api.setFocusedCell(e.node.rowIndex, "SalesBaseRatePrc")



                // setTimeout(() => {

                // document.querySelector(":focus")?.blur();

                // document.getElementById(`SalesBaseRatePrc-${e.node.rowIndex}`).focus()

                // document.getElementById(`SalesBaseRatePrc-${e.node.rowIndex}`).select()

                // }, 200);

                // }

                // else if (value.keyCode === 9) {

                // console.log(value, "onclick valuee 2")



                // // value.preventDefault()

                // setTimeout(() => {

                // document.getElementById(`SalesBaseRatePrc-${e.node.rowIndex}`).focus()

                // }, 200);

                // }

                // }}

                // onClick={(value) => {

                // // document.getElementById("Touch").select();

                // }}

                onBlur={(value) => {

                    const tempArr = []



                    inWardGridref.current.props.rowData.map((val, index) => {



                        if (index === e.node.rowIndex) {

                            tempArr.push({ ...val, ["Touch"]: parseFloat(value.target.value) })

                            // if (value.target.value > 0 && val.SalesBaseRatePrc <= 0) {

                            // tempArr.push({ ...val, ["SrNo"]: index + 1, ["PurchaseBaseRatePrc"]: parseFloat(value.target.value), ["SalesBaseRatePrc"]: parseFloat(value.target.value) })

                            // } else {

                            // tempArr.push({ ...val, ["SrNo"]: index + 1, ["PurchaseBaseRatePrc"]: parseFloat(value.target.value) })

                            // }

                        } else {

                            tempArr.push({ ...val, })

                        }

                    })



                    // setSrNo(tempArr.length + 1)

                    setLstItemData(tempArr)



                    // const currentFocusCell = inWardGridref.current.api.getFocusedCell()



                    // if (currentFocusCell.column.colId === "ItemGroup") {

                    // setTimeout(() => {

                    // document.getElementById(`inputid${currentFocusCell.rowIndex}`).focus()

                    // }, 200);

                    // } else {

                    // if (document.getElementById(`${currentFocusCell.column.colId}-${currentFocusCell.rowIndex}`) !== null) {

                    // setTimeout(() => {

                    // document.getElementById(`${currentFocusCell.column.colId}-${currentFocusCell.rowIndex}`).focus()

                    // }, 205);

                    // } else {

                    // inWardGridref.current.api.setFocusedCell(currentFocusCell.rowIndex, currentFocusCell.column.colId)



                    // setTimeout(() => {

                    // inWardGridref.current.api.startEditingCell({

                    // rowIndex: currentFocusCell.rowIndex,

                    // colKey: currentFocusCell.column.colId

                    // })

                    // }, 100);

                    // }

                    // }

                }}

            />

        )

    }


    function handlerendererTouchPrcInOtherGrid(e) {

        return (

            <AlpPercentage

                className="form-control text-end"

                value={OtherItemGridRef.current.props.rowData[e.node.rowIndex]?.Touch >= 0 ? OtherItemGridRef.current.props.rowData[e.node.rowIndex]?.Touch.toFixed(2) : parseFloat(0).toFixed(2)}

                placeholder="0.00"

                name="Touch"

                id={`othertouchid${e.node.rowIndex}`}

                onChange={(value) => {

                    // purchaseBaseRate[e.node.rowIndex] = value.target.value

                }}



                onBlur={(value) => {

                    const tempArr = []



                    OtherItemGridRef.current.props.rowData.map((val, index) => {



                        if (index === e.node.rowIndex) {

                            tempArr.push({ ...val, ["Touch"]: parseFloat(value.target.value) })

                        } else {

                            tempArr.push({ ...val, })

                        }

                    })



                    setLstOtherData(tempArr)

                }}

            />

        )

    }

    function handlerendererWstPrc(e) {



        return (

            <AlpPercentage

                className="form-control text-end"

                value={inWardGridref.current.props.rowData[e.node.rowIndex]?.WastagePrc >= 0 ? inWardGridref.current.props.rowData[e.node.rowIndex]?.WastagePrc.toFixed(2) : parseFloat(0).toFixed(2)}

                placeholder="0.00"

                name="WastagePrc"

                id={`wastageprcid${e.node.rowIndex}`}

                onChange={(value) => {

                    // purchaseBaseRate[e.node.rowIndex] = value.target.value

                }}

                onKeyDown={(value) => {

                    if (value.key === 'Enter') {

                        value.preventDefault();

                    }

                }}

                onBlur={(value) => {

                    try {

                        const {

                            NetWt = 0,

                            Touch = 0,

                            ProcessLossFineWt = 0,

                            RofFineWt = 0,

                        } = e?.data || {};

                        let precision = 3;

                        let resultOfFineWt = 0;

                        let netwt = parseFloat(NetWt);

                        let touch = parseFloat(Touch);

                        let processlossfwt = parseFloat(ProcessLossFineWt) || 0;

                        let WstPrc = parseFloat(value.target.value)

                        let roffwt = parseFloat(RofFineWt) || 0;







                        if (netwt && touch && WstPrc && (WstPrc || processlossfwt)) {

                            resultOfFineWt = parseFloat(((netwt * (touch + WstPrc) / 100) - processlossfwt) + (roffwt))?.toFixed(precision);

                        }

                        // else if (netwt && touch && WstPrc) {

                        // resultOfFineWt = parseFloat((netwt * (touch + WstPrc) / 100) - processlossfwt).toFixed(precision);

                        // }

                        else if (netwt && touch) {

                            resultOfFineWt = parseFloat((((netwt * touch) / 100) - processlossfwt) + (roffwt))?.toFixed(precision);

                        }

                        else {

                            resultOfFineWt = parseFloat(0).toFixed(precision);

                        }



                        let tempData = [...lstitemData];

                        const updatedRow = { ...e?.data, ['WastagePrc']: WstPrc, ['FineWt']: resultOfFineWt }

                        tempData[e?.node?.rowIndex] = updatedRow;

                        setLstItemData(tempData);

                    }

                    catch (e) {

                        console.log(e, "error in on blur wastage percentage in inward grid lstitems")

                    }



                }}

            />

        )

    }


    function handlerendererWstPrcInOtherGrid(e) {

        return (

            <AlpPercentage

                className="form-control text-end"

                value={OtherItemGridRef.current.props.rowData[e.node.rowIndex]?.WastagePrc >= 0 ? OtherItemGridRef.current.props.rowData[e.node.rowIndex]?.WastagePrc.toFixed(2) : parseFloat(0).toFixed(2)}

                placeholder="0.00"

                name="WastagePrc"

                id={`otherwastageprcid${e.node.rowIndex}`}

                onChange={(value) => {

                    // purchaseBaseRate[e.node.rowIndex] = value.target.value

                }}



                onBlur={(value) => {

                    const tempArr = []



                    OtherItemGridRef.current.props.rowData.map((val, index) => {



                        if (index === e.node.rowIndex) {

                            tempArr.push({ ...val, ["WastagePrc"]: parseFloat(value.target.value) })



                        } else {

                            tempArr.push({ ...val, })

                        }

                    })



                    // setSrNo(tempArr.length + 1)

                    setLstOtherData(tempArr)





                }}

            />

        )

    }


    function handlerendererVariationPrcInOtherGrid(e) {

        return (

            <AlpPercentage

                className="form-control text-end"

                value={OtherItemGridRef.current.props.rowData[e.node.rowIndex]?.VariationPrc >= 0 ? OtherItemGridRef.current.props.rowData[e.node.rowIndex]?.VariationPrc.toFixed(2) : parseFloat(0).toFixed(2)}

                placeholder="0.00"

                name="VariationPrc"

                id={`othervariationprcid${e.node.rowIndex}`}

                onChange={(value) => {

                    // purchaseBaseRate[e.node.rowIndex] = value.target.value

                }}

                onKeyDown={(value) => {

                    if (value.key === 'Enter') {

                        value.preventDefault();

                    }

                }}



                onBlur={(value) => {





                    try {



                        const {

                            ActualWeight = 0,

                        } = e?.data || {};



                        const actualweight = parseFloat(ActualWeight) || 0;

                        const variationprc = parseFloat(value.target.value) || 0;

                        let resultOfVarWt = 0;

                        let precision = 3;



                        if (actualweight || variationprc) {

                            resultOfVarWt = parseFloat(parseFloat((actualweight * variationprc) / 100)?.toFixed(precision));

                        }

                        else {

                            resultOfVarWt = parseFloat(parseFloat(0).toFixed(precision));

                        }





                        let updatedLstOtherData = [...lstotherData];

                        const updatedRow = { ...e?.data, ['VariationPrc']: variationprc, ['VariationWt']: resultOfVarWt }

                        updatedLstOtherData[e?.node?.rowIndex] = updatedRow;

                        setLstOtherData(updatedLstOtherData);



                        // Update lstitem for the selected row

                        const updatedlstitemData = [...lstitemData];

                        updatedlstitemData[InwardGridRowIndex].LstOther = updatedLstOtherData;

                        setLstItemData(updatedlstitemData);



                    }

                    catch (e) {

                        console.log(e, "Error in handlerendererVariationPrcInOtherGrid")

                    }





                }}

            />

        )

    }



    function DeleteLstItem(e) {

        Swal.fire({

            title: "Are you sure?",

            text: "You won't be able to revert this!",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#3085d6",

            cancelButtonColor: "#d33",

            confirmButtonText: "Yes, delete it!",

        }).then((result) => {

            if (result.isConfirmed) {

                if (inWardGridref?.current?.props?.rowData?.length > 1) {

                    let filterDeletedItemsArr = [];

                    inWardGridref?.current?.api?.forEachNode(function (node) {

                        if (e?.node?.rowIndex !== node?.rowIndex) {

                            filterDeletedItemsArr.push(node.data);

                        }

                    });

                    setLstItemData(filterDeletedItemsArr);

                }

            }

        });



    }



    const ActionDeleteLstItem = {

        ...ActionColumn,

        ["cellRenderer"]: (e) => {

            return action(e, DeleteLstItem, true);

        },

        cellStyle: (params) => {

            if (params?.node?.rowPinned) {

                return { display: 'none' }; // Hide checkbox for pinned rows

            }

            return {}; // Show checkbox for non-pinned rows

        }

    };


    function DeleteOtherLstItem(e) {

        Swal.fire({

            title: "Are you sure?",

            text: "You won't be able to revert this!",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#3085d6",

            cancelButtonColor: "#d33",

            confirmButtonText: "Yes, delete it!",

        }).then((result) => {

            if (result.isConfirmed) {



                if (OtherItemGridRef?.current?.props?.rowData?.length > 1) {

                    let filterDeletedItemsArr = [];

                    OtherItemGridRef?.current?.api?.forEachNode(function (node) {

                        if (e?.node?.rowIndex !== node?.rowIndex) {

                            filterDeletedItemsArr.push(node.data);

                        }

                    });

                    setLstOtherData(filterDeletedItemsArr);

                }

            }

        });



    }

    const ActionDeleteOtherLstItem = {

        ...ActionColumn,

        ["cellRenderer"]: (e) => {

            return action(e, DeleteOtherLstItem, true);

        },

        cellStyle: (params) => {

            if (params?.node?.rowPinned) {

                return { display: 'none' }; // Hide checkbox for pinned rows

            }

            return {}; // Show checkbox for non-pinned rows

        }

    };



    function CheckNaN(func) {

        if (isNaN(func)) {

            return "";

        }

        return func;

    }


    function CalculateNetWt(data, precision = 3) {

        try {

            const {

                GrossWt = 0,

                LessWt = 0,

            } = data || {};



            const grosswt = parseFloat(GrossWt);

            const lesswt = parseFloat(LessWt);



            if (grosswt && lesswt) {

                return parseFloat(parseFloat(grosswt - lesswt)?.toFixed(precision));

            }

            else if (grosswt) {

                return parseFloat(parseFloat(grosswt)?.toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateNetWt function Inward Challan")

        }

    }



    function CalculateFineWt(data, precision = 3) {

        try {

            const {

                NetWt = 0,

                Touch = 0,

                WastagePrc = 0,

                ProcessLossFineWt = 0,

                RofFineWt = 0,

            } = data || {};



            const netweight = parseFloat(NetWt);

            const touch = parseFloat(Touch);

            const wstprc = parseFloat(WastagePrc);

            const processlossfwt = parseFloat(ProcessLossFineWt) || 0;

            const roffwt = parseFloat(RofFineWt) || 0;





            if (netweight && touch && (wstprc || processlossfwt)) {

                return parseFloat(parseFloat(((netweight * (touch + wstprc) / 100) - processlossfwt) + (roffwt))?.toFixed(precision));

            }

            else if (netweight && touch) {

                return parseFloat(parseFloat((((netweight * touch) / 100) - processlossfwt) + (roffwt))?.toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateFineWt function Inward Challan")

        }

    }



    function CalculateProcessFwt(data, precision = 3) {

        try {

            const {

                ProcessLossNetWt = 0,

                Touch = 0,

            } = data || {};



            const touch = parseFloat(Touch);

            const proceelossnwt = parseFloat(ProcessLossNetWt)



            if (proceelossnwt && touch) {

                return parseFloat(parseFloat((proceelossnwt * touch) / 100)?.toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateProcessFwt function Inward Challan")

        }



    }



    function CalculateProcessNwt(data, precision = 3) {

        try {

            const {

                ProcessLossFineWt = 0,

                Touch = 0

            } = data || {};



            const touch = parseFloat(Touch);

            const proceelossfwt = parseFloat(ProcessLossFineWt)



            if (proceelossfwt && touch > 0) {

                return parseFloat(parseFloat((proceelossfwt * 100) / touch)?.toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateProcessNwt function Inward Challan")

        }



    }



    function CalculatePkgWithWt(data, precision = 3) {

        try {

            const { PackingWeight = 0, NetWt = 0 } = data || {};

            const netwt = parseFloat(NetWt);

            const pkgwt = parseFloat(PackingWeight)



            if (netwt && pkgwt) {

                return parseFloat(parseFloat(netwt + pkgwt)?.toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculatePkgWithWt function Inward Challan")

        }

    }



    function CalculateAmountBasedOnRateType(data, precision = 2) {

        try {



            const {

                RateType,

                GrossWt2 = 0,

                GrossWt = 0,

                FineWt = 0,

                NetWt = 0,

                Pcs = 0,

                Labels = 0,

                Rate = 0,

                Amount = 0,

            } = data || {};



            const grosswt2 = parseFloat(GrossWt2);

            const grosswt = parseFloat(GrossWt);

            const finewt = parseFloat(FineWt);

            const netwt = parseFloat(NetWt);

            const pcs = parseInt(Pcs);

            const labels = parseInt(Labels);

            const rate = parseFloat(Rate);

            const amount = parseFloat(Amount);



            if (rate > 0) {

                if (RateType === 'F') {

                    return parseFloat(parseFloat(finewt * rate)?.toFixed(precision));

                }

                else if (RateType === 'G') {

                    return parseFloat(parseFloat(grosswt * rate)?.toFixed(precision));

                }

                else if (RateType === 'L') {

                    return parseFloat(parseFloat(labels * rate)?.toFixed(precision));

                }

                else if (RateType === 'N') {

                    return parseFloat(parseFloat(netwt * rate)?.toFixed(precision));

                }

                else if (RateType === 'P') {

                    return parseFloat(parseFloat(pcs * rate)?.toFixed(precision));

                }

                else {

                    return parseFloat(parseFloat(amount)?.toFixed(precision));

                }

            }



        }

        catch (e) {

            console.log(e, "Error in CalculateAmountBasedOnRateType function Inward Challan")

        }



    }



    function CalculateRateBasedOnAmount(data, precision = 2) {

        try {



            const {

                RateType,

                GrossWt2 = 0,

                GrossWt = 0,

                FineWt = 0,

                NetWt = 0,

                Pcs = 0,

                Labels = 0,

                Rate = 0,

                Amount = 0,

            } = data || {};



            const grosswt2 = parseFloat(GrossWt2);

            const grosswt = parseFloat(GrossWt);

            const finewt = parseFloat(FineWt);

            const netwt = parseFloat(NetWt);

            const pcs = parseInt(Pcs);

            const labels = parseInt(Labels);

            const rate = parseFloat(Rate);

            const amount = parseFloat(Amount);



            if (amount > 0) {

                if (RateType === 'F' && finewt > 0) {

                    return parseFloat(parseFloat(amount / finewt)?.toFixed(precision));

                }

                else if (RateType === 'G' && grosswt > 0) {

                    return parseFloat(parseFloat(amount / grosswt)?.toFixed(precision));

                }

                else if (RateType === 'L' && labels > 0) {

                    return parseFloat(parseFloat(amount / labels)?.toFixed(precision));

                }

                else if (RateType === 'N' && netwt > 0) {

                    return parseFloat(parseFloat(amount / netwt)?.toFixed(precision));

                }

                else if (RateType === 'P' && pcs > 0) {

                    return parseFloat(parseFloat(amount / pcs)?.toFixed(precision));

                }

                else if (RateType === 'FA') {

                    return parseFloat(parseFloat(0)?.toFixed(precision));

                }

                else {

                    return parseFloat(parseFloat(rate)?.toFixed(precision));

                }

            }

        }

        catch (e) {

            console.log(e, "Error in CalculateRateBasedOnAmount function Inward Challan")

        }

    }



    function CalculateLabourAmtInOtherItem(data, precision = 2) {

        try {



            const {

                LabourCode,

                GrossWt2 = 0,

                GrossWt = 0,

                FineWt = 0,

                NetWt = 0,

                Pcs = 0,

                Labels = 0,

                LabourRate = 0,

                Amount = 0,

            } = data || {};



            const grosswt2 = parseFloat(GrossWt2);

            const grosswt = parseFloat(GrossWt);

            const finewt = parseFloat(FineWt);

            const netwt = parseFloat(NetWt);

            const pcs = parseInt(Pcs);

            const labels = parseInt(Labels);

            const labourrate = parseFloat(LabourRate);

            const amount = parseFloat(Amount);



            if (labourrate > 0) {

                if (LabourCode === 'F') {

                    return parseFloat(parseFloat(finewt * labourrate)?.toFixed(precision));

                }

            }



        }

        catch (e) {

            console.log(e, "Error in CalculateAmountBasedOnLabourRateTypeInOtherItem Inward Challan")

        }



    }





    function CalculateFineWtInOtherItem(data, precision = 3) {

        try {



            const {

                OtherRateTypeCode,

                GrossWt2 = 0,

                GrossWt = 0,

                FineWt = 0,

                NetWt = 0,

                Pcs = 0,

                Labels = 0,

                Rate = 0,

                Amount = 0,

                Weight = 0,

                Touch = 0

            } = data || {};



            const grosswt2 = parseFloat(GrossWt2);

            const grosswt = parseFloat(GrossWt);

            const finewt = parseFloat(FineWt);

            const netwt = parseFloat(NetWt);

            const pcs = parseInt(Pcs);

            const labels = parseInt(Labels);

            const rate = parseFloat(Rate);

            const weight = parseFloat(Weight);

            const touch = parseFloat(Touch) || 0;



            if (weight && touch) {

                return parseFloat(parseFloat(weight * touch / 100)?.toFixed(precision));

            }

            return parseFloat(parseFloat(0)?.toFixed(3))

        }

        catch (e) {

            console.log(e, "Error in CalculateAmountBasedOnRateType function Inward Challan")

        }



    }





    function CalculationLaboutAmtBasedOnLabourType(data, precision = 2) {

        try {



            const {

                LabourCode,

                GrossWt2 = 0,

                GrossWt = 0,

                FineWt = 0,

                NetWt = 0,

                Pcs = 0,

                Labels = 0,

                LabourRate = 0,

                LabourAmount = 0,

                Amount = 0,

            } = data || {};



            const grosswt2 = parseFloat(GrossWt2);

            const grosswt = parseFloat(GrossWt);

            const finewt = parseFloat(FineWt);

            const netwt = parseFloat(NetWt);

            const pcs = parseInt(Pcs);

            const labels = parseInt(Labels);

            const laboutrate = parseFloat(LabourRate);

            const amount = parseFloat(Amount);



            if (LabourCode === 'F') {

                return parseFloat(parseFloat(finewt * laboutrate)?.toFixed(precision));

            }

            else if (LabourCode === 'G') {

                return parseFloat(parseFloat(grosswt * laboutrate)?.toFixed(precision));

            }

            else if (LabourCode === 'L') {

                return parseFloat(parseFloat(labels * laboutrate)?.toFixed(precision));

            }

            else if (LabourCode === 'N') {

                return parseFloat(parseFloat(netwt * laboutrate)?.toFixed(precision));

            }

            else if (LabourCode === 'P') {

                return parseFloat(parseFloat(pcs * laboutrate)?.toFixed(precision));

            }

            else if (LabourCode === 'PA') {

                return parseFloat(parseFloat((amount * laboutrate) / 100)?.toFixed(precision))

            }

            else {

                return parseFloat(parseFloat(LabourAmount)?.toFixed(precision));

            }

        }

        catch (e) {

            console.log(e, "Error in CalculationLaboutAmtBasedOnLabourType function Inward Challan")

        }



    }



    function CalculateLabourDiscAmount(e, precision = 2) {



        try {



            const {

                LabourDiscPrc = 0,

                LabourAmount = 0

            } = e?.data;



            const labourdiscprc = parseFloat(LabourDiscPrc);

            const labouramt = parseFloat(LabourAmount);



            if (labourdiscprc > 0 && labouramt) {

                return parseFloat(parseFloat((labouramt * labourdiscprc) / 100)?.toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));



        }

        catch (e) {

            console.log(e, "Error in CalculateLabourDiscAmount")

        }





    }



    function CalculateNetLabourAmount(e, precision = 2) {

        try {



            const {

                LabourAmount = 0,

                LabourDiscAmount = 0

            } = e?.data;



            if (LabourDiscAmount && LabourAmount) {

                return parseFloat(parseFloat(LabourAmount - LabourDiscAmount)?.toFixed(precision));

            }

            else if (LabourAmount) {

                return parseFloat(parseFloat(LabourAmount - LabourDiscAmount)?.toFixed(precision));

            }



        }

        catch (e) {

            console.log(e, "Error in CalculateNetLabourAmount")

        }

    }



    function CalculateTaxableAmount(data, precision = 2) {

        try {



            const {

                Amount = 0,

                NetLabourAmount = 0,

                OtherAmount = 0,

                RofAmount = 0,

                OtherTaxableAmount = 0,

            } = data || {};



            const amount = parseFloat(Amount);

            const netlabouramt = parseFloat(NetLabourAmount);

            const otheramt = parseFloat(OtherAmount);

            const rofamt = parseFloat(RofAmount);

            const othertaxableamt = parseFloat(OtherTaxableAmount);





            if (amount && (netlabouramt || otheramt || rofamt)) {

                return parseFloat(parseFloat((amount + netlabouramt + otheramt - othertaxableamt) + (rofamt))?.toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateTaxableAmount")

        }

    }



    function calculateTaxableAmtInOther(data, precision = 2) {

        try {



            const {

                Amount = 0,

                LabourAmount = 0,

                TaxPrc1,

            } = data || {};



            const amount = parseFloat(Amount) || 0;

            const labourAmt = parseFloat(LabourAmount) || 0;

            const taxprc1 = parseFloat(TaxPrc1);



            if (taxprc1 !== "" && taxprc1 !== null && taxprc1 !== undefined && taxprc1 > 0) {

                if (amount || labourAmt) {

                    return parseFloat(parseFloat(amount + labourAmt)?.toFixed(precision));

                }

                return parseFloat(parseFloat(0).toFixed(precision));

            }

            else {

                return parseFloat(parseFloat(0).toFixed(precision));

            }



        }

        catch (e) {

            console.log(e, "Error in calculateTaxableAmtInOther")

        }

    }



    function CalculateTaxAmt(data, taxprc, precision = 2) {

        try {



            const {

                TaxableAmount = 0,

            } = data || {};



            const taxpercentage = parseFloat(data[taxprc]) || 0;

            const taxableamt = parseFloat(TaxableAmount) || 0;





            if (taxpercentage && taxableamt) {

                return parseFloat(parseFloat((taxableamt * taxpercentage) / 100).toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateTaxAmt")

        }

    }



    function CalculateTaxAmtInOther(data, taxprc, precision = 2) {

        try {



            const {

                Amount = 0,

            } = data || {};



            const taxpercentage = parseFloat(data[taxprc]) || 0;

            const amount = parseFloat(Amount) || 0;



            if (taxpercentage && amount) {

                return parseFloat(parseFloat((amount * taxpercentage) / 100).toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateTaxAmt")

        }

    }



    function CalculateTotalTaxAmt(data, precision = 2) {

        try {



            const {

                TaxROFAmount = 0,

                TaxAmount6 = 0,

                TaxAmount5 = 0,

                TaxAmount4 = 0,

                TaxAmount3 = 0,

                TaxAmount2 = 0,

                TaxAmount1 = 0

            } = data || {};



            const taxamt1 = parseFloat(TaxAmount1) || 0;

            const taxamt2 = parseFloat(TaxAmount2) || 0;

            const taxamt3 = parseFloat(TaxAmount3) || 0;

            const taxamt4 = parseFloat(TaxAmount4) || 0;

            const taxamt5 = parseFloat(TaxAmount5) || 0;

            const taxamt6 = parseFloat(TaxAmount6) || 0;

            const taxrofamt = parseFloat(TaxROFAmount) || 0;



            if (taxamt1 || taxamt2 || taxamt3 || taxamt4 || taxamt5 || taxamt6 || taxrofamt) {

                return parseFloat(parseFloat((taxamt1 + taxamt2 + taxamt3 + taxamt4 + taxamt5 + taxamt6) + (taxrofamt)).toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateTotalTaxAmt")

        }

    }



    function CalculateTotalNetAmt(data, precision = 2) {

        try {



            const {

                TaxableAmount = 0,

                TotalTaxAmount = 0,

            } = data || {};



            const taxableAmt = parseFloat(TaxableAmount) || 0;

            const totaltaxamount = parseFloat(TotalTaxAmount) || 0;





            if (taxableAmt || totaltaxamount) {

                return parseFloat(parseFloat(taxableAmt + totaltaxamount).toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateTotalNetAmt")

        }

    }



    function CalculateVariationWtInOtherItem(data, precision = 3) {

        try {



            const {

                VariationPrc = 0,

                ActualWeight = 0,

            } = data || {};



            const actualweight = parseFloat(ActualWeight) || 0;

            const variationprc = parseFloat(VariationPrc) || 0;



            if (actualweight || variationprc) {

                return parseFloat(parseFloat((actualweight * variationprc) / 100)?.toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateVariationWtInOtherItem")

        }

    }



    function CalculateWeightInOtherItem(data, precision = 3) {

        try {



            const {

                ActualWeight = 0,

                VariationWt = 0,

            } = data || {};



            const actualweight = parseFloat(ActualWeight) || 0;

            const variationwt = parseFloat(VariationWt) || 0;



            if (actualweight || variationwt) {

                return parseFloat(parseFloat(actualweight - variationwt)?.toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateWeightInOtherItemCalculateWeightInOtherItem")

        }

    }



    function CalculateWeightInGrmOtherItem(data, precision = 3) {

        try {



            const {

                Weight = 0,

                MetalType = "O"

            } = data || {};



            const weight = parseFloat(Weight) || 0;



            if (weight > 0) {

                if (MetalType === 'D' || MetalType === 'C') {

                    return parseFloat(parseFloat(weight / 5)?.toFixed(precision));

                }

                else {

                    return parseFloat(parseFloat(weight)?.toFixed(precision));

                }

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateWeightInGrmOtherItem")

        }

    }



    function CalculateAmountBasedOnRateTypeInOtherItem(data, precision = 2) {

        try {



            const {

                Rate = 0,

                FineWt = 0,

                Pcs = 0,

                OtherRateType,

            } = data || {};



            const rate = parseFloat(Rate) || 0;

            const finewt = parseFloat(FineWt) || 0;

            const pcs = parseFloat(Pcs) || 0;

            if (rate > 0) {

                if (OtherRateType === 'F') {

                    return parseFloat(parseFloat(rate * finewt)?.toFixed(precision));

                }

                else if (OtherRateType === 'P') {

                    return parseFloat(parseFloat(rate * pcs).toFixed(precision))

                }

                return parseFloat(parseFloat(0).toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateWeightInGrmOtherItem")

        }

    }



    function CalculateAmountWithTaxInOtherItem(data, precision = 2) {

        try {



            const {

                TaxableAmount = 0,

                TaxAmount6 = 0,

                TaxAmount5 = 0,

                TaxAmount4 = 0,

                TaxAmount3 = 0,

                TaxAmount2 = 0,

                TaxAmount1 = 0

            } = data || {};



            const taxamt1 = parseFloat(TaxAmount1) || 0;

            const taxamt2 = parseFloat(TaxAmount2) || 0;

            const taxamt3 = parseFloat(TaxAmount3) || 0;

            const taxamt4 = parseFloat(TaxAmount4) || 0;

            const taxamt5 = parseFloat(TaxAmount5) || 0;

            const taxamt6 = parseFloat(TaxAmount6) || 0;

            const taxableamt = parseFloat(TaxableAmount) || 0;



            if (taxamt1 || taxamt2 || taxamt3 || taxamt4 || taxamt5 || taxamt6) {

                return parseFloat(parseFloat((taxamt1 + taxamt2 + taxamt3 + taxamt4 + taxamt5 + taxamt6) + (taxableamt)).toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateTotalTaxAmt")

        }

    }



    function CalculateTotalOtherInOtherItem(data, precision = 2) {

        try {



            const {

                Amount = 0,

                LabourAmount = 0

            } = data || {};



            const amount = parseFloat(Amount) || 0;

            const labouramount = parseFloat(LabourAmount) || 0;



            if (amount || labouramount) {

                return parseFloat(parseFloat(amount + labouramount)?.toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateTotalOtherInOtherItem")

        }

    }



    function CalculateTotalAmtWithTax(data, precision = 2) {

        try {

            const {

                Amount = 0,

                OtherAmountWithTax = 0

            } = data || {};



            const amount = parseFloat(Amount) || 0;

            const otheramountwithtax = parseFloat(OtherAmountWithTax) || 0;



            if (amount || otheramountwithtax) {

                return parseFloat(parseFloat(amount + otheramountwithtax)?.toFixed(precision));

            }

            return parseFloat(parseFloat(0).toFixed(precision));

        }

        catch (e) {

            console.log(e, "Error in CalculateTotalAmtWithTax")

        }

    }



    const dependencyMapInWardGrid = {

        GrossWt: (data) => {

            const NetWtResult = CheckNaN(CalculateNetWt(data));

            const AfterNetWt = { ...data, ['NetWt']: NetWtResult }

            const PkgWithWtResult = CheckNaN(CalculatePkgWithWt(AfterNetWt));

            const AfterPkgWithWt = { ...AfterNetWt, ['WithPackingWeight']: PkgWithWtResult }

            const FineWtResult = CheckNaN(CalculateFineWt(AfterPkgWithWt));

            return { ...AfterPkgWithWt, ['FineWt']: FineWtResult }

        },

        LessWt: (data) => {

            const NetWtResult = CheckNaN(CalculateNetWt(data));

            const AfterNetWt = { ...data, ['NetWt']: NetWtResult }

            const PkgWithWtResult = CheckNaN(CalculatePkgWithWt(AfterNetWt));

            const AfterPkgWithWt = { ...AfterNetWt, ['WithPackingWeight']: PkgWithWtResult }

            const FineWtResult = CheckNaN(CalculateFineWt(AfterNetWt));

            return { ...AfterPkgWithWt, ['FineWt']: FineWtResult }

        },

        ProcessLossNetWt: (data) => {

            const ProcessFwtResult = CheckNaN(CalculateProcessFwt(data));

            const AfterPfwt = { ...data, ['ProcessLossFineWt']: ProcessFwtResult }

            const FineWtResult = CheckNaN(CalculateFineWt(AfterPfwt));

            return { ...AfterPfwt, ['FineWt']: FineWtResult }

        },

        ProcessLossFineWt: (data) => {

            const ProcessNwtResult = CheckNaN(CalculateProcessNwt(data));

            const AfterPnwt = { ...data, ['ProcessLossNetWt']: ProcessNwtResult }

            const FineWtResult = CheckNaN(CalculateFineWt(AfterPnwt));

            return { ...AfterPnwt, ['FineWt']: FineWtResult }

        },

        WastagePrc: (data) => {

            const FineWtResult = CheckNaN(CalculateFineWt(data));

            return { ...data, ['FineWt']: FineWtResult }

        },

        PackingWeight: (data) => {

            const PkgWithWtResult = CheckNaN(CalculatePkgWithWt(data));

            return { ...data, ['WithPackingWeight']: PkgWithWtResult }

        },

        Rate: (data) => {

            const AmoutCalc = CheckNaN(CalculateAmountBasedOnRateType(data))

            const AfterAddAmt = { ...data, ['Amount']: AmoutCalc }

            const TaxableAmtResult = CheckNaN(CalculateTaxableAmount(AfterAddAmt))

            return { ...AfterAddAmt, ['TaxableAmount']: TaxableAmtResult }

        },

        Amount: (data) => {

            const RateResult = CheckNaN(CalculateRateBasedOnAmount(data))

            const AfterCalcRate = { ...data, ['Rate']: RateResult }

            const TaxableAmtResult = CheckNaN(CalculateTaxableAmount(AfterCalcRate))

            return { ...AfterCalcRate, ['TaxableAmount']: TaxableAmtResult }

        },

        LabourRate: (data) => {

            const result = CheckNaN(CalculateTaxableAmount(data))

            return { ...data, ['TaxableAmount']: result }

        },

        LabourDiscPrc: (data) => {

            const result = CheckNaN(CalculateTaxableAmount(data))

            return { ...data, ['TaxableAmount']: result }

        },

        OtherAmount: (data) => {

            const TaxableResult = CheckNaN(CalculateTaxableAmount(data))

            return { ...data, ['TaxableAmount']: TaxableResult }

        },

        OtherTaxableAmount: (data) => {

            const TaxableResult = CheckNaN(CalculateTaxableAmount(data))

            return { ...data, ['TaxableAmount']: TaxableResult }

        },

        RofAmount: (data) => {

            const result = CheckNaN(CalculateTaxableAmount(data))

            return { ...data, ['TaxableAmount']: result }

        },

        RofFineWt: (data) => {

            const FineWtResult = CheckNaN(CalculateFineWt(data));

            return { ...data, ['FineWt']: FineWtResult }

        },

        TaxROFAmount: (data) => {

            const afterCalculateTotalTax = CheckNaN(CalculateTotalTaxAmt(data));

            return { ...data, ['TotalTaxAmount']: afterCalculateTotalTax }

        },

        OtherAmountWithTax: (data) => {

            const AmtWithTaxResult = CheckNaN(CalculateTotalAmtWithTax(data));

            return { ...data, ['TotalAmtWithTax']: AmtWithTaxResult }

        }

    };



    const dependencyMapotheritemGrid = {

        VariationPrc: (data) => {

            const VariationWtResult = CheckNaN(CalculateVariationWtInOtherItem(data));

            const VariationAddResult = { ...data, ['VariationWt']: VariationWtResult }

            const WeightCalcResult = CheckNaN(CalculateWeightInOtherItem(VariationAddResult));

            const AfterweigthAdd = { ...VariationAddResult, ['Weight']: WeightCalcResult }

            const WeightGrmCalcResult = CheckNaN(CalculateWeightInGrmOtherItem(AfterweigthAdd))

            const AfterCalcWeightInGrm = { ...AfterweigthAdd, ['WeightGrm']: WeightGrmCalcResult }

            const FineWtResult = CheckNaN(CalculateFineWtInOtherItem(AfterCalcWeightInGrm))

            return { ...AfterCalcWeightInGrm, ['FineWt']: FineWtResult }



        },

        ActualWeight: (data) => {

            const VariationWtResult = CheckNaN(CalculateVariationWtInOtherItem(data));

            const VariationAddResult = { ...data, ['VariationWt']: VariationWtResult }

            const WeightCalcResult = CheckNaN(CalculateWeightInOtherItem(VariationAddResult));

            const AfterweigthAdd = { ...VariationAddResult, ['Weight']: WeightCalcResult }

            const WeightGrmCalcResult = CheckNaN(CalculateWeightInGrmOtherItem(AfterweigthAdd))

            return { ...AfterweigthAdd, ['WeightGrm']: WeightGrmCalcResult }

        },

        LabourRate: (data) => {

            const LabourAmoutCalc = CheckNaN(CalculateLabourAmtInOtherItem(data))

            return { ...data, ['LabourAmount']: LabourAmoutCalc }

        },

        Rate: (data) => {

            const AmountResult = CheckNaN(CalculateAmountBasedOnRateTypeInOtherItem(data))

            const AfterAmountAdd = { ...data, ['Amount']: AmountResult }

            const TotalOtherResult = CheckNaN(CalculateTotalOtherInOtherItem(AfterAmountAdd))

            return { ...AfterAmountAdd, ['TotalOther']: TotalOtherResult }

        }



    };



    function calculateDependenciesDynamicInWardGrid(data, field, value) {

        const updatedData = { ...data, [field]: value };

        if (dependencyMapInWardGrid[field]) {

            return { ...updatedData, ...dependencyMapInWardGrid[field](updatedData) };

        }

        return updatedData;

    };


    const calculateDependenciesDynamicOtherItemGrid = (data, field, value) => {

        const updatedData = { ...data, [field]: value };

        if (dependencyMapotheritemGrid[field]) {

            return { ...updatedData, ...dependencyMapotheritemGrid[field](updatedData) };

        }

        return updatedData;

    };



    function InwardGridCellValueChange(e) {

        const {

            colDef, newValue, data

        } = e;

        const validatedValue = newValue;



        const updatedRow = calculateDependenciesDynamicInWardGrid(data, colDef?.field, validatedValue);

        let updatedLstItemData = [...lstitemData];

        updatedLstItemData[e?.node?.rowIndex] = { ...updatedRow, ['SrNo']: (e?.node?.rowIndex + 1) };

        // inWardGridref?.current?.api?.setGridOption("rowData", updatedLstItemData);

        setLstItemData(updatedLstItemData);

        setTotalOfItemGrid();

    }



    function OtherItemGridCellValueChange(e) {

        const {

            colDef, newValue, data

        } = e;

        const validatedValue = newValue;



        const updatedRow = calculateDependenciesDynamicOtherItemGrid(data, colDef?.field, validatedValue);

        let updatedLstOther = [...lstotherData];

        updatedLstOther[e?.node?.rowIndex] = { ...updatedRow, ['SrNo']: (e?.node?.rowIndex + 1) };

        // OtherItemGridRef?.current?.api?.setGridOption("rowData", updatedLstOther);

        setLstOtherData(updatedLstOther);





        // Update lstitem for the selected row

        const updatedlstitemData = [...lstitemData];

        updatedlstitemData[InwardGridRowIndex].LstOther = updatedLstOther;

        // setLstItemData(updatedlstitemData)



        const sumofColumnsInOther = calculateTotalForOtherItemGrid(updatedLstOther);

        updatedlstitemData[InwardGridRowIndex] = { ...updatedlstitemData[InwardGridRowIndex], ['LessWt']: sumofColumnsInOther?.TotalWeightGrm, ['OtherTaxableAmount']: sumofColumnsInOther?.TotalTaxableAmount, ['OtherAmountWithTax']: sumofColumnsInOther?.TotalAmountWithTax, ['OtherAmount']: sumofColumnsInOther?.TotalOfTotalOther }

        // inWardGridref?.current?.api?.setGridOption("rowData", updatedlstitemData);

        setLstItemData(updatedlstitemData)





    }



    function handleSubmit(e) {

        e?.preventDefault();

        const updatedAddEdit = {

            ...InwardChallanAddEdit,

            ['Lstitem']: lstitemData,

        };



        if (

            AddEdit(updatedAddEdit, TransactionAPI?.KarigarAddEdit,

                true

            ) === false

        ) {

            navigate(`/${window.location.pathname.split("/")[1]}/InwardChallan`, { replace: true })

        }

    }



    function handleCancel(e) {

        e?.preventDefault();

        setLstItemData([]);

        setLstOtherData([]);

        setAddEditInwardChallan([]);

        navigate(`/${window.location.pathname.split("/")[1]}/InwardChallan`, { replace: true })

    }

    const calculateTotalForItemGrid = (lstitemData) => {

        const sumOfColumns = lstitemData?.reduce((acc, row) => {

            acc.TotalNetWt += row?.NetWt || 0;

            acc.TotalFineWt += row?.FineWt || 0;

            acc.TotalLabels += row?.Labels || 0;

            acc.TotalPcs += row?.Pcs || 0;

            acc.TotalGrossWt += row?.GrossWt || 0;

            acc.TotalGrossWt2 += row?.GrossWt2 || 0;

            acc.TotalLessWt += row?.LessWt || 0;

            acc.TotalTagNetWt += row?.TagNetWt || 0;

            acc.TotalProcessLossNetWt += row?.ProcessLossNetWt || 0;

            acc.TotalProcessLossFineWt += row?.ProcessLossFineWt || 0;

            acc.TotalPackingWeight += row?.PackingWeight || 0;

            acc.TotalWithPackingWeight += row?.WithPackingWeight || 0;

            acc.TotalAmount += row?.Amount || 0;

            acc.TotalLabourAmount += row?.LabourAmount || 0;

            acc.TotalLabourDiscAmount += row?.LabourDiscAmount || 0;

            acc.TotalNetLabourAmount += row?.NetLabourAmount || 0;

            acc.TotalOtherAmount += row?.OtherAmount || 0;

            acc.TotalTaxableAmount += row?.TaxableAmount || 0;

            acc.TotalTaxAmount1 += row?.TaxAmount1 || 0;

            acc.TotalTaxAmount2 += row?.TaxAmount2 || 0;

            acc.TotalTaxAmount3 += row?.TaxAmount3 || 0;

            acc.TotalTaxAmount4 += row?.TaxAmount4 || 0;

            acc.TotalTaxAmount5 += row?.TaxAmount5 || 0;

            acc.TotalTaxAmount6 += row?.TaxAmount6 || 0;

            acc.TotalItemNetAmount += row?.ItemNetAmount || 0;

            acc.TotalOtherTaxableAmt += row?.OtherTaxableAmount || 0;

            acc.TotalOtherAmtWithTax += row?.OtherAmountWithTax || 0;

            acc.TotalOfTotalAmtWithTax += row?.TotalAmtWithTax || 0;

            acc.TotalOfTotalNetAmt += row?.TotalNetAmt || 0;

            acc.TotalOfTotalTaxAmount += row?.TotalTaxAmount || 0;

            acc.TotalRofAmount += row?.RofAmount || 0;

            return acc;



        }, {

            TotalNetWt: 0,

            TotalFineWt: 0,

            TotalLabels: 0,

            TotalPcs: 0,

            TotalGrossWt: 0,

            TotalGrossWt2: 0,

            TotalLessWt: 0,

            TotalTagNetWt: 0,

            TotalProcessLossNetWt: 0,

            TotalProcessLossFineWt: 0,

            TotalPackingWeight: 0,

            TotalWithPackingWeight: 0,

            TotalAmount: 0,

            TotalLabourAmount: 0,

            TotalLabourDiscAmount: 0,

            TotalNetLabourAmount: 0,

            TotalOtherAmount: 0,

            TotalTaxableAmount: 0,

            TotalTaxAmount1: 0,

            TotalTaxAmount2: 0,

            TotalTaxAmount3: 0,

            TotalTaxAmount4: 0,

            TotalTaxAmount5: 0,

            TotalTaxAmount6: 0,

            TotalItemNetAmount: 0,

            TotalOtherTaxableAmt: 0,

            TotalOtherAmtWithTax: 0,

            TotalOfTotalAmtWithTax: 0,

            TotalOfTotalNetAmt: 0,

            TotalOfTotalTaxAmount: 0,

            TotalRofAmount: 0

        });



        // setTotalsOfItemGrid((prev) => {

        // return {

        // ...prev,

        // ['TotalNetWt']: sumOfColumns?.TotalNetWt || 0,

        // ['TotalFineWt']: sumOfColumns?.TotalFineWt || 0,

        // ['TotalLabels']: sumOfColumns?.TotalLabels || 0,

        // ['TotalPcs']: sumOfColumns?.TotalPcs || 0,

        // ['TotalGrossWt']: sumOfColumns?.TotalGrossWt || 0,

        // ['TotalGrossWt2']: sumOfColumns?.TotalGrossWt2 || 0,

        // ['TotalLessWt']: sumOfColumns?.TotalLessWt || 0,

        // ['TotalTagNetWt']: sumOfColumns?.TotalTagNetWt || 0,

        // ['TotalProcessLossNetWt']: sumOfColumns?.TotalProcessLossNetWt || 0,

        // ['TotalProcessLossFineWt']: sumOfColumns?.TotalProcessLossFineWt || 0,

        // ['TotalPackingWeight']: sumOfColumns?.TotalPackingWeight || 0,

        // ['TotalWithPackingWeight']: sumOfColumns?.TotalWithPackingWeight || 0,

        // ['TotalAmount']: sumOfColumns?.TotalAmount || 0,

        // ['TotalLabourAmount']: sumOfColumns?.TotalLabourAmount || 0,

        // ['TotalLabourDiscAmount']: sumOfColumns?.TotalLabourDiscAmount || 0,

        // ['TotalNetLabourAmount']: sumOfColumns?.TotalNetLabourAmount || 0,

        // ['TotalOtherAmount']: sumOfColumns?.TotalOtherAmount || 0,

        // ['TotalTaxableAmount']: sumOfColumns?.TotalTaxableAmount || 0,

        // ['TotalTaxAmount1']: sumOfColumns?.TotalTaxAmount1 || 0,

        // ['TotalTaxAmount2']: sumOfColumns?.TotalTaxAmount2 || 0,

        // ['TotalTaxAmount3']: sumOfColumns?.TotalTaxAmount3 || 0,

        // ['TotalTaxAmount4']: sumOfColumns?.TotalTaxAmount4 || 0,

        // ['TotalTaxAmount5']: sumOfColumns?.TotalTaxAmount5 || 0,

        // ['TotalTaxAmount6']: sumOfColumns?.TotalTaxAmount6 || 0,

        // ['TotalItemNetAmount']: sumOfColumns?.TotalItemNetAmount || 0,

        // ['TotalOtherTaxableAmt']: sumOfColumns?.TotalOtherTaxableAmt || 0,

        // ['TotalOtherAmtWithTax']: sumOfColumns?.TotalOtherAmtWithTax || 0,

        // ['TotalOfTotalAmtWithTax']: sumOfColumns?.TotalOfTotalAmtWithTax || 0,

        // ['TotalOfTotalNetAmt']: sumOfColumns?.TotalOfTotalNetAmt || 0,

        // ['TotalOfTotalTaxAmount']: sumOfColumns?.TotalOfTotalTaxAmount || 0,

        // ['TotalRofAmount']: sumOfColumns?.TotalRofAmount || 0,



        // }

        // })



        return sumOfColumns;

    };



    // const pinnedBottomRowDataInwardGrid = useMemo(() => {

    // const sumOfColumns = lstitemData?.reduce((acc, row) => {

    // acc.TotalNetWt += row?.NetWt || 0;

    // acc.TotalFineWt += row?.FineWt || 0;

    // acc.TotalLabels += row?.Labels || 0;

    // acc.TotalPcs += row?.Pcs || 0;

    // acc.TotalGrossWt += row?.GrossWt || 0;

    // acc.TotalGrossWt2 += row?.GrossWt2 || 0;

    // acc.TotalLessWt += row?.LessWt || 0;

    // acc.TotalTagNetWt += row?.TagNetWt || 0;

    // acc.TotalProcessLossNetWt += row?.ProcessLossNetWt || 0;

    // acc.TotalProcessLossFineWt += row?.ProcessLossFineWt || 0;

    // acc.TotalPackingWeight += row?.PackingWeight || 0;

    // acc.TotalWithPackingWeight += row?.WithPackingWeight || 0;

    // acc.TotalAmount += row?.Amount || 0;

    // acc.TotalLabourAmount += row?.LabourAmount || 0;

    // acc.TotalLabourDiscAmount += row?.LabourDiscAmount || 0;

    // acc.TotalNetLabourAmount += row?.NetLabourAmount || 0;

    // acc.TotalOtherAmount += row?.OtherAmount || 0;

    // acc.TotalTaxableAmount += row?.TaxableAmount || 0;

    // acc.TotalTaxAmount1 += row?.TaxAmount1 || 0;

    // acc.TotalTaxAmount2 += row?.TaxAmount2 || 0;

    // acc.TotalTaxAmount3 += row?.TaxAmount3 || 0;

    // acc.TotalTaxAmount4 += row?.TaxAmount4 || 0;

    // acc.TotalTaxAmount5 += row?.TaxAmount5 || 0;

    // acc.TotalTaxAmount6 += row?.TaxAmount6 || 0;

    // acc.TotalItemNetAmount += row?.ItemNetAmount || 0;

    // acc.TotalOtherTaxableAmt += row?.OtherTaxableAmount || 0;

    // acc.TotalOtherAmtWithTax += row?.OtherAmountWithTax || 0;

    // acc.TotalOfTotalAmtWithTax += row?.TotalAmtWithTax || 0;

    // acc.TotalOfTotalNetAmt += row?.TotalNetAmt || 0;

    // acc.TotalOfTotalTaxAmount += row?.TotalTaxAmount || 0;

    // acc.TotalRofAmount += row?.RofAmount || 0;

    // return acc;



    // }, {

    // TotalNetWt: 0,

    // TotalFineWt: 0,

    // TotalLabels: 0,

    // TotalPcs: 0,

    // TotalGrossWt: 0,

    // TotalGrossWt2: 0,

    // TotalLessWt: 0,

    // TotalTagNetWt: 0,

    // TotalProcessLossNetWt: 0,

    // TotalProcessLossFineWt: 0,

    // TotalPackingWeight: 0,

    // TotalWithPackingWeight: 0,

    // TotalAmount: 0,

    // TotalLabourAmount: 0,

    // TotalLabourDiscAmount: 0,

    // TotalNetLabourAmount: 0,

    // TotalOtherAmount: 0,

    // TotalTaxableAmount: 0,

    // TotalTaxAmount1: 0,

    // TotalTaxAmount2: 0,

    // TotalTaxAmount3: 0,

    // TotalTaxAmount4: 0,

    // TotalTaxAmount5: 0,

    // TotalTaxAmount6: 0,

    // TotalItemNetAmount: 0,

    // TotalOtherTaxableAmt: 0,

    // TotalOtherAmtWithTax: 0,

    // TotalOfTotalAmtWithTax: 0,

    // TotalOfTotalNetAmt: 0,

    // TotalOfTotalTaxAmount: 0,

    // TotalRofAmount: 0

    // });



    // return (

    // [

    // {

    // NetWt: sumOfColumns?.TotalNetWt || 0,

    // FineWt: sumOfColumns?.TotalFineWt || 0,

    // Labels: sumOfColumns?.TotalLabels || 0,

    // Pcs: sumOfColumns?.TotalPcs || 0,

    // GrossWt: sumOfColumns?.TotalGrossWt || 0,

    // GrossWt2: sumOfColumns?.TotalGrossWt2 || 0,

    // LessWt: sumOfColumns?.TotalLessWt || 0,

    // TagNetWt: sumOfColumns?.TotalTagNetWt || 0,

    // ProcessLossNetWt: sumOfColumns?.TotalProcessLossNetWt || 0,

    // ProcessLossFineWt: sumOfColumns?.TotalProcessLossFineWt || 0,

    // PackingWeight: sumOfColumns?.TotalPackingWeight || 0,

    // WithPackingWeight: sumOfColumns?.TotalWithPackingWeight || 0,

    // Amount: sumOfColumns?.TotalAmount || 0,

    // LabourAmount: sumOfColumns?.TotalLabourAmount || 0,

    // LabourDiscAmount: sumOfColumns?.TotalLabourDiscAmount || 0,

    // NetLabourAmount: sumOfColumns?.TotalNetLabourAmount || 0,

    // OtherAmount: sumOfColumns?.TotalOtherAmount || 0,

    // TaxableAmount: sumOfColumns?.TotalTaxableAmount || 0,

    // TaxAmount1: sumOfColumns?.TotalTaxAmount1 || 0,

    // TaxAmount2: sumOfColumns?.TotalTaxAmount2 || 0,

    // TaxAmount3: sumOfColumns?.TotalTaxAmount3 || 0,

    // TaxAmount4: sumOfColumns?.TotalTaxAmount4 || 0,

    // TaxAmount5: sumOfColumns?.TotalTaxAmount5 || 0,

    // TaxAmount6: sumOfColumns?.TotalTaxAmount6 || 0,

    // ItemNetAmount: sumOfColumns?.TotalItemNetAmount || 0,

    // OtherTaxableAmount: sumOfColumns?.TotalOtherTaxableAmt || 0,

    // OtherAmountWithTax: sumOfColumns?.TotalOtherAmtWithTax || 0,

    // TotalAmtWithTax: sumOfColumns?.TotalOfTotalAmtWithTax || 0,

    // TotalNetAmt: sumOfColumns?.TotalOfTotalNetAmt || 0,

    // TotalAmountWithTax: sumOfColumns?.TotalOfTotalAmountWithTax || 0,

    // RofAmount: sumOfColumns?.TotalRofAmount || 0,

    // },

    // ]

    // )

    // }, [lstitemData])





    const calculateTotalForOtherItemGrid = (lstotherData) => {

        const sumOfColumns = lstotherData?.reduce((acc, row) => {

            acc.TotalActualWeight += row?.ActualWeight || 0;

            acc.TotalPcs += row?.Pcs || 0;

            acc.TotalVariationWt += row?.VariationWt || 0;

            acc.TotalWeight += row?.Weight || 0;

            acc.TotalWeightGrm += row?.WeightGrm || 0;

            acc.TotalFineWt += row?.FineWt || 0;

            acc.TotalAmount += row?.Amount || 0;

            acc.TotalLabourAmount += row?.LabourAmount || 0;

            acc.TotalTaxableAmount += row?.TaxableAmount || 0;

            acc.TotalAmountWithTax += row?.AmountWithTax || 0;

            acc.TotalTaxAmount1 += row?.TaxAmount1 || 0;

            acc.TotalTaxAmount2 += row?.TaxAmount2 || 0;

            acc.TotalTaxAmount3 += row?.TaxAmount3 || 0;

            acc.TotalTaxAmount4 += row?.TaxAmount4 || 0;

            acc.TotalTaxAmount5 += row?.TaxAmount5 || 0;

            acc.TotalTaxAmount6 += row?.TaxAmount6 || 0;

            acc.TotalOfTotalOther += row?.TotalOther;

            return acc;



        }, {

            TotalActualWeight: 0,

            TotalPcs: 0,

            TotalVariationWt: 0,

            TotalWeight: 0,

            TotalWeightGrm: 0,

            TotalFineWt: 0,

            TotalAmount: 0,

            TotalLabourAmount: 0,

            TotalTaxableAmount: 0,

            TotalAmountWithTax: 0,

            TotalTaxAmount1: 0,

            TotalTaxAmount2: 0,

            TotalTaxAmount3: 0,

            TotalTaxAmount4: 0,

            TotalTaxAmount5: 0,

            TotalTaxAmount6: 0,

            TotalOfTotalOther: 0,

        });





        // setTotalsOtherItemGrid((prev) => {

        // return {

        // ...prev,

        // ['TotalActualWeight']: sumOfColumns?.TotalActualWeight || 0,

        // ['TotalPcs']: sumOfColumns?.TotalPcs || 0,

        // ['TotalVariationWt']: sumOfColumns?.TotalVariationWt || 0,

        // ['TotalWeight']: sumOfColumns?.TotalWeight || 0,

        // ['TotalWeightGrm']: sumOfColumns?.TotalWeightGrm || 0,

        // ['TotalFineWt']: sumOfColumns?.TotalFineWt || 0,

        // ['TotalAmount']: sumOfColumns?.TotalAmount || 0,

        // ['TotalLabourAmount']: sumOfColumns?.TotalLabourAmount || 0,

        // ['TotalTaxableAmount']: sumOfColumns?.TotalTaxableAmount || 0,

        // ['TotalAmountWithTax']: sumOfColumns?.TotalAmountWithTax || 0,

        // ['TotalTaxAmount1']: sumOfColumns?.TotalTaxAmount1 || 0,

        // ['TotalTaxAmount2']: sumOfColumns?.TotalTaxAmount2 || 0,

        // ['TotalTaxAmount3']: sumOfColumns?.TotalTaxAmount3 || 0,

        // ['TotalTaxAmount4']: sumOfColumns?.TotalTaxAmount4 || 0,

        // ['TotalTaxAmount5']: sumOfColumns?.TotalTaxAmount5 || 0,

        // ['TotalTaxAmount6']: sumOfColumns?.TotalTaxAmount6 || 0,

        // ['TotalOfTotalOther']: sumOfColumns?.TotalOfTotalOther || 0,

        // }

        // })



        return sumOfColumns;

    }



    // const pinnedBottomRowDataOtherItem = useMemo(() => {

    // const sumofColumnsInOther = lstotherData?.reduce((acc, row) => {



    // acc.TotalActualWeight += row?.ActualWeight || 0;

    // acc.TotalPcs += row?.Pcs || 0;

    // acc.TotalVariationWt += row?.VariationWt || 0;

    // acc.TotalWeight += row?.Weight || 0;

    // acc.TotalWeightGrm += row?.WeightGrm || 0;

    // acc.TotalFineWt += row?.FineWt || 0;

    // acc.TotalAmount += row?.Amount || 0;

    // acc.TotalLabourAmount += row?.LabourAmount || 0;

    // acc.TotalTaxableAmount += row?.TaxableAmount || 0;

    // acc.TotalAmountWithTax += row?.AmountWithTax || 0;

    // acc.TotalTaxAmount1 += row?.TaxAmount1 || 0;

    // acc.TotalTaxAmount2 += row?.TaxAmount2 || 0;

    // acc.TotalTaxAmount3 += row?.TaxAmount3 || 0;

    // acc.TotalTaxAmount4 += row?.TaxAmount4 || 0;

    // acc.TotalTaxAmount5 += row?.TaxAmount5 || 0;

    // acc.TotalTaxAmount6 += row?.TaxAmount6 || 0;

    // acc.TotalOfTotalOther += row?.TotalOther;

    // return acc;



    // }, {

    // TotalActualWeight: 0,

    // TotalPcs: 0,

    // TotalVariationWt: 0,

    // TotalWeight: 0,

    // TotalWeightGrm: 0,

    // TotalFineWt: 0,

    // TotalAmount: 0,

    // TotalLabourAmount: 0,

    // TotalTaxableAmount: 0,

    // TotalAmountWithTax: 0,

    // TotalTaxAmount1: 0,

    // TotalTaxAmount2: 0,

    // TotalTaxAmount3: 0,

    // TotalTaxAmount4: 0,

    // TotalTaxAmount5: 0,

    // TotalTaxAmount6: 0,

    // TotalOfTotalOther: 0,

    // });



    // console.log(sumofColumnsInOther, "sumofColumnsInOther")



    // return (

    // [

    // {

    // ActualWeight: sumofColumnsInOther?.TotalActualWeight || 0,

    // Pcs: sumofColumnsInOther?.TotalPcs || 0,

    // VariationWt: sumofColumnsInOther?.TotalVariationWt || 0,

    // Weight: sumofColumnsInOther?.TotalWeight || 0,

    // WeightGrm: sumofColumnsInOther?.TotalWeightGrm || 0,

    // FineWt: sumofColumnsInOther?.TotalFineWt || 0,

    // Amount: sumofColumnsInOther?.TotalAmount || 0,

    // LabourAmount: sumofColumnsInOther?.TotalLabourAmount || 0,

    // TaxableAmount: sumofColumnsInOther?.TotalTaxableAmount || 0,

    // AmountWithTax: sumofColumnsInOther?.TotalAmountWithTax || 0,

    // TaxAmount1: sumofColumnsInOther?.TotalTaxAmount1 || 0,

    // TaxAmount2: sumofColumnsInOther?.TotalTaxAmount2 || 0,

    // TaxAmount3: sumofColumnsInOther?.TotalTaxAmount3 || 0,

    // TaxAmount4: sumofColumnsInOther?.TotalTaxAmount4 || 0,

    // TaxAmount5: sumofColumnsInOther?.TotalTaxAmount5 || 0,

    // TaxAmount6: sumofColumnsInOther?.TotalTaxAmount6 || 0,

    // TotalOther: sumofColumnsInOther?.TotalOfTotalOther || 0,

    // },

    // ]

    // )



    // }, [lstotherData])





    const IRTypeHelp = [{ label: "Receipt", value: "R" }, { label: "Issue", value: "I" }, { label: "Dr Fine Rate Cut", value: "DF" }, { label: "Cr Fine Rate Cut", value: "CF" }]



    function setTotalOfOtherItemGrid() {



        const sumofColumnsInOther = calculateTotalForOtherItemGrid(lstitemData[InwardGridRowIndex]?.LstOther || [])



        setpinnedBottomRowDataOtherItem([

            {

                ActualWeight: sumofColumnsInOther?.TotalActualWeight || 0,

                Pcs: sumofColumnsInOther?.TotalPcs || 0,

                VariationWt: sumofColumnsInOther?.TotalVariationWt || 0,

                Weight: sumofColumnsInOther?.TotalWeight || 0,

                WeightGrm: sumofColumnsInOther?.TotalWeightGrm || 0,

                FineWt: sumofColumnsInOther?.TotalFineWt || 0,

                Amount: sumofColumnsInOther?.TotalAmount || 0,

                LabourAmount: sumofColumnsInOther?.TotalLabourAmount || 0,

                TaxableAmount: sumofColumnsInOther?.TotalTaxableAmount || 0,

                AmountWithTax: sumofColumnsInOther?.TotalAmountWithTax || 0,

                TaxAmount1: sumofColumnsInOther?.TotalTaxAmount1 || 0,

                TaxAmount2: sumofColumnsInOther?.TotalTaxAmount2 || 0,

                TaxAmount3: sumofColumnsInOther?.TotalTaxAmount3 || 0,

                TaxAmount4: sumofColumnsInOther?.TotalTaxAmount4 || 0,

                TaxAmount5: sumofColumnsInOther?.TotalTaxAmount5 || 0,

                TaxAmount6: sumofColumnsInOther?.TotalTaxAmount6 || 0,

                TotalOther: sumofColumnsInOther?.TotalOfTotalOther || 0,

            },

        ]);





        // let updatedLstitem = [...lstitemData];

        // updatedLstitem[InwardGridRowIndex] = { ...updatedLstitem[InwardGridRowIndex], ['LessWt']: sumofColumnsInOther?.TotalWeightGrm, ['OtherTaxableAmount']: sumofColumnsInOther?.TotalTaxableAmount, ['OtherAmountWithTax']: sumofColumnsInOther?.TotalAmountWithTax, ['OtherAmount']: sumofColumnsInOther?.TotalOfTotalOther }

        // let ReCalculateInWardGrid = {

        // ...calculateDependenciesDynamicInWardGrid(updatedLstitem[InwardGridRowIndex], "LessWt", sumofColumnsInOther?.TotalWeightGrm),

        // // ...calculateDependenciesDynamicInWardGrid(updatedLstitem[InwardGridRowIndex], "OtherAmount", sumofColumnsInOther?.TotalOfTotalOther),

        // // ...calculateDependenciesDynamicInWardGrid(updatedLstitem[InwardGridRowIndex], "OtherTaxableAmount", sumofColumnsInOther?.TotalTaxableAmount),

        // // ...calculateDependenciesDynamicInWardGrid(updatedLstitem[InwardGridRowIndex], "OtherAmountWithTax", sumofColumnsInOther?.TotalAmountWithTax),

        // }



        // console.log(ReCalculateInWardGrid, "ReCalculateInWardGrid")

        // updatedLstitem[InwardGridRowIndex] = ReCalculateInWardGrid;

        // inWardGridref?.current?.api?.setGridOption("rowData", updatedLstitem);

        // setLstItemData(updatedLstitem)

    }



    function setTotalOfItemGrid() {

        const sumOfColumns = calculateTotalForItemGrid(lstitemData);



        setpinnedBottomRowDataInwardGrid([

            {

                NetWt: sumOfColumns?.TotalNetWt || 0,

                FineWt: sumOfColumns?.TotalFineWt || 0,

                Labels: sumOfColumns?.TotalLabels || 0,

                Pcs: sumOfColumns?.TotalPcs || 0,

                GrossWt: sumOfColumns?.TotalGrossWt || 0,

                GrossWt2: sumOfColumns?.TotalGrossWt2 || 0,

                LessWt: sumOfColumns?.TotalLessWt || 0,

                TagNetWt: sumOfColumns?.TotalTagNetWt || 0,

                ProcessLossNetWt: sumOfColumns?.TotalProcessLossNetWt || 0,

                ProcessLossFineWt: sumOfColumns?.TotalProcessLossFineWt || 0,

                PackingWeight: sumOfColumns?.TotalPackingWeight || 0,

                WithPackingWeight: sumOfColumns?.TotalWithPackingWeight || 0,

                Amount: sumOfColumns?.TotalAmount || 0,

                LabourAmount: sumOfColumns?.TotalLabourAmount || 0,

                LabourDiscAmount: sumOfColumns?.TotalLabourDiscAmount || 0,

                NetLabourAmount: sumOfColumns?.TotalNetLabourAmount || 0,

                OtherAmount: sumOfColumns?.TotalOtherAmount || 0,

                TaxableAmount: sumOfColumns?.TotalTaxableAmount || 0,

                TaxAmount1: sumOfColumns?.TotalTaxAmount1 || 0,

                TaxAmount2: sumOfColumns?.TotalTaxAmount2 || 0,

                TaxAmount3: sumOfColumns?.TotalTaxAmount3 || 0,

                TaxAmount4: sumOfColumns?.TotalTaxAmount4 || 0,

                TaxAmount5: sumOfColumns?.TotalTaxAmount5 || 0,

                TaxAmount6: sumOfColumns?.TotalTaxAmount6 || 0,

                ItemNetAmount: sumOfColumns?.TotalItemNetAmount || 0,

                OtherTaxableAmount: sumOfColumns?.TotalOtherTaxableAmt || 0,

                OtherAmountWithTax: sumOfColumns?.TotalOtherAmtWithTax || 0,

                TotalAmtWithTax: sumOfColumns?.TotalOfTotalAmtWithTax || 0,

                TotalNetAmt: sumOfColumns?.TotalOfTotalNetAmt || 0,

                TotalAmountWithTax: sumOfColumns?.TotalOfTotalAmountWithTax || 0,

                RofAmount: sumOfColumns?.TotalRofAmount || 0,

            },

        ])

    }







    /* InwardchallanGridColDef */

    const InwardchallanGridColDef = [

        {

            field: "SrNo",

            headerName: "Sr. No.",

            width: 80,

            valueGetter: (e) => {

                if (e?.node?.rowPinned !== "bottom") {

                    return e.node.rowIndex + 1

                } else if (e?.node?.rowPinned === "bottom") {

                    return 'Total'

                }



            },

            editable: false,

        },

        {

            field: "IRType",

            headerName: "Type",

            cellEditor: "agRichSelectCellEditor",

            cellEditorParams: {

                // values: LabourType.map((val) => val.RateType),

                // values: ["Recipt", "Issue", "Dr Fine Rate Cut", "Cr Fine Rate Cut"],

                values: IRTypeHelp?.map((item) => { return item?.value?.toString() }),

                searchType: "matchAny",

                valuePlaceholder: "Type",

                allowTyping: true,

                filterList: true,

                highlightMatch: true,

                valueListMaxHeight: 115,

                valueListMaxWidth: 200,

                editable: true,

                sortable: false,

            },

            valueFormatter: (e) => {

                return ValueFormmaterForDropDown(e, 'Type', IRTypeHelp)

            },

            editable: true,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "AccountingStockType",

            headerName: "Stock Type",

            type: "input",

            ID: "AccountingStockType",

            editable: false,

            cellRenderer: handlecellrenderStockTypeHelp,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "ItemGroupName",

            headerName: "Item Group",

            type: "input",

            ID: "ItemGroupName",

            width: 100,

            editable: false,

            cellRenderer: handlecellrenderitemGroup,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "ItemName",

            headerName: "Item Name",

            width: 100,

            editable: false,

            cellRenderer: handlecellrenderitem,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }



        },

        {

            field: "ItemCodeName",

            headerName: "Item Code",

            width: 100,

            editable: false,

            cellRenderer: handlecellrenderitemcode,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "ItemDescription",

            headerName: "Item Desc.",

            width: 100,

            editable: true,

            valueGetter: (e) => {

                if (e?.data?.ItemName !== undefined && e?.data?.ItemName !== null && e?.data?.ItemName !== "" && e?.data?.ItemDescription === "") {

                    return e?.data?.ItemName;

                }

                else if (e?.data?.ItemName === "") {

                    return e?.data?.ItemName;

                }

                else {

                    return e?.data?.ItemDescription

                }

            },

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }



        },

        {

            field: "TagNoGenerateID",

            headerName: "Lot/Tag No.",

            width: 100,

            editable: true,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "HsnCode",

            headerName: "HSN Code",

            width: 100,

            editable: false,

            cellRenderer: handlecellrenderHSNCode,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "DesignNo",

            headerName: "Design No.",

            width: 100,

            editable: true,

            // cellEditor: "agNumberCellEditor",

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            },

            valueGetter: (e) => {

                return e?.data?.DesignNo

            }

        },

        {

            field: "SizeName",

            headerName: "Size",

            width: 100,

            editable: false,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            },

            cellRenderer: handlecellrenderSizeHelp

        },

        {

            field: "MakingTypeAtrib",

            headerName: "Atrib 1 (Making Type)",

            width: 100,

            editable: true,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "SubItemAtrib",

            headerName: "Atrib 2 (Subitem Name)",

            width: 100,

            editable: true,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "StyleAtrib",

            headerName: "Atrib 3 (Style Name)",

            width: 100,

            editable: true,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "Diamond Color",

            headerName: "Diamond Color",

            width: 100,

            editable: true,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "Diamond Shape",

            headerName: "Diamond Shape",

            width: 100,

            editable: true,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "Diamond Size",

            headerName: "Diamond Size",

            width: 100,

            editable: true,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "Labels",

            headerName: "Label",

            width: 100,

            editable: true,

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

        },

        {

            field: "Pcs",

            headerName: "Pcs",

            width: 100,

            editable: true,

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

        },

        {

            field: "GrossWt",

            headerName: "Gross Wt.",

            width: 100,

            editable: true,

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(e?.value).toFixed(3)

                }

            }

        },

        {

            field: "LessWt",

            headerName: "Less Wt.",

            dependentCol: "NetWt",

            width: 100,

            editable: false,

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(e?.value).toFixed(3);

                }

            },

            // valueGetter:(e)=>{

            // if(e?.node?.rowPinned){

            // return (e?.data?.LessWt || 0)

            // }

            // else{

            // if (OtherItemGridRef?.current) {

            // const gridApi = OtherItemGridRef?.current?.api;

            // const rowData = [];

            // gridApi?.forEachNode((node) => rowData.push(node?.data));



            // console.log('Pinned Bottom Row Data', rowData);

            // }

            // }

            // }

        },

        {

            field: "NetWt",

            headerName: "Net Wt.",

            width: 100,

            editable: false,

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.NetWt;

                }

                else {

                    e.data.NetWt = CheckNaN(CalculateNetWt(e?.data));

                    return CheckNaN(CalculateNetWt(e?.data));

                }

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(3))

                }

            }

        },

        {

            field: "IsOther",

            headerName: "Other",

            width: 100,

            cellEditor: "agCheckboxCellEditor",

            cellRenderer: "agCheckboxCellRenderer",

            suppressMovable: true,

            cellClass: "suppress-movable-col",

            editable: true,

            suppressColumnsToolPanel: true,

            valueSetter: (e) => {

                if (e) {

                    e.data.IsOther = e?.newValue;

                }

            },

            // cellStyle: (params) => {

            // if (params?.node?.rowPinned) {

            // return { display: 'none' }; // Hide checkbox for pinned rows

            // }

            // return {}; // Show checkbox for non-pinned rows

            // }

        },

        {

            field: "FineWt",

            headerName: "Fine Wt.",

            width: 100,

            editable: false,

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.FineWt;

                }

                else {

                    e.data.FineWt = CheckNaN(CalculateFineWt(e?.data))

                    return CheckNaN(CalculateFineWt(e?.data));

                }

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(e?.value).toFixed(3);

                }

            }

        },

        {

            field: "Touch",

            headerName: "Touch(%)",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            cellRenderer: handlerendererTouchPrc,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "WastagePrc",

            headerName: "Wst.(%)",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            cellRenderer: handlerendererWstPrc

        },

        {

            field: "ProcessLossNetWt",

            headerName: "Process Loss N.Wt.",

            width: 120,

            editable: true,

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            // valueGetter: CalculateProcessNwt,

            // valueformatter: (e) => {

            // if (e) {

            // valueformatter(e, 'wt', 'ProcessLossNetWt')

            // }

            // }



        },

        {

            field: "ProcessLossFineWt",

            headerName: "Process Loss F.Wt.",

            width: 100,

            editable: true,

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            // valueGetter: (e) => {

            // return CalculateProcessFwt(e)

            // },

            // valueformatter: (e) => {

            // if (e) {

            // valueformatter(e, 'wt', 'ProcessLossFineWt')

            // }

            // }

        },

        {

            field: "PackingWeight",

            headerName: "Packing Wt.",

            width: 100,

            editable: true,

            // cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

        },

        {

            field: "WithPackingWeight",

            headerName: "With Pack Wt.",

            width: 100,

            editable: true,

            // cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

        },

        {

            field: "RateType",

            headerName: "Rate Type",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            cellRenderer: handlecellrenderRateTypeHelp,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "Rate",

            headerName: "Rate",

            width: 100,

            editable: (e) => {

                if (e?.data) {

                    const { RateType } = e?.data || {};

                    if (RateType === 'FA') {

                        e.data.Rate = parseFloat(0).toFixed(2);

                        return false;

                    }

                    else {

                        return true;

                    }

                }

            },

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

            // valueFormatter: (e) => {

            // if (e?.value) {

            // return parseFloat(e?.value).toFixed(2)

            // }

            // },

            // valueGetter: (e) => {

            // if (e && e?.data?.RateType !== 'FA') {

            // e?.data?.Rate = CheckNaN(CalculateRateBasedOnAmount(e))

            // return CheckNaN(CalculateRateBasedOnAmount(e))

            // }

            // }

        },

        {

            field: "Amount",

            headerName: "Amount",

            width: 100,

            editable: true,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(e?.value).toFixed(2);

                }

            },

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.Amount;

                }

                else {

                    if (e) {

                        e.data.Amount = CheckNaN(CalculateAmountBasedOnRateType(e?.data))

                        return CheckNaN(CalculateAmountBasedOnRateType(e?.data))

                    }

                }

            }

        },

        {

            field: "LabourCode",

            headerName: "Labour Code",

            width: 100,

            editable: true,

            cellEditor: "agNumberCellEditor",

            hide: true,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "LabourRateName",

            // field: "LabourRateType",

            headerName: "Labour Rate Type",

            width: 150,

            editable: false,

            cellRenderer: handlecellrenderLaboutRateTypeHelp,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }



        },

        {

            field: "LabourRate",

            headerName: "Labour Rate",

            width: 100,

            editable: true,

            // cellRenderer: (e) => { return BankF2(e) },

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(e?.value).toFixed(2)

                }

            },

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "LabourAmount",

            headerName: "Labour Amount",

            width: 120,

            editable: false,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueGetter: (e) => {

                if (e) {

                    e.data.LabourAmount = CheckNaN(CalculationLaboutAmtBasedOnLabourType(e?.data));

                    return CheckNaN(CalculationLaboutAmtBasedOnLabourType(e?.data))

                }

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(e?.value).toFixed(2)

                }

            }

        },

        {

            field: "LabourDiscPrc",

            headerName: "Labour Disc Prc.",

            width: 150,

            editable: true,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(e?.value).toFixed(2)

                }

            },

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "LabourDiscAmount",

            headerName: "Labour Disc Amount",

            width: 150,

            editable: false,

            cellEditor: "agNumberCellEditor",

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.LabourDiscAmount;

                }

                else {

                    if (e) {

                        e.data.LabourDiscAmount = CheckNaN(CalculateLabourDiscAmount(e));

                        return CheckNaN(CalculateLabourDiscAmount(e))

                    }

                }

            },

            valueFormatter: (e) => {

                if (e) {

                    return parseFloat(e?.value).toFixed(2)

                }

            }

        },

        {

            field: "NetLabourAmount",

            headerName: "Net Labour Amount",

            width: 100,

            editable: true,

            cellEditor: "agNumberCellEditor",

            valueGetter: (e) => {

                if (e) {

                    e.data.NetLabourAmount = CalculateNetLabourAmount(e);

                    return CalculateNetLabourAmount(e);

                }

            }

        },

        {

            field: "OtherAmount",

            headerName: "Other Amount",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e) {

                    return parseFloat(parseFloat(e?.value).toFixed(2))

                }

            }

        },

        {

            field: "RofAmount",

            headerName: "ROF Amount",

            width: 100,

            editable: true,

            cellEditor: "agNumberCellEditor",

        },

        {

            field: "RofFineWt",

            headerName: "ROF Fine Wt.",

            width: 100,

            editable: true,

            // cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(e?.value).toFixed(3)

                }

            },

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

        },

        {

            field: "TaxableAmount",

            headerName: "Taxable Amount",

            width: 100,

            editable: true,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueGetter: (e) => {

                if (e) {

                    e.data.TaxableAmount = CheckNaN(CalculateTaxableAmount(e?.data))

                    return CheckNaN(CalculateTaxableAmount(e?.data));

                }

            },

            valueFormatter: (e) => {

                if (e) {

                    return parseFloat(e?.value).toFixed(2)

                }

            }

        },

        {

            field: "TaxID",

            headerName: "Tax ID",

            width: 100,

            editable: false,

            cellRenderer: handlecellrenderTaxHelp,

            // cellEditor: "agNumberCellEditor",

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            },

            valueGetter: (e) => {

                if (e?.data) {

                    const { TaxName } = e?.data || {};

                    if (TaxName === "" || TaxName === null || TaxName === undefined) {

                        e.data.TaxID = 0;

                        e.data.TaxPrc1 = 0;

                        e.data.TaxPrc2 = 0;

                        e.data.TaxPrc3 = 0;

                        e.data.TaxPrc4 = 0;

                        e.data.TaxPrc5 = 0;

                        e.data.TaxPrc6 = 0;

                        e.data.TaxAmount1 = 0;

                        e.data.TaxAmount2 = 0;

                        e.data.TaxAmount3 = 0;

                        e.data.TaxAmount4 = 0;

                        e.data.TaxAmount5 = 0;

                        e.data.TaxAmount6 = 0;

                    }

                }

            }



        },

        {

            field: "TaxPrc1",

            // headerName: `${TaxTypeHelp?.Tax1Name ? TaxTypeHelp?.Tax1Name : "Tax1 %"}`,

            // headerName: `${InwardChallanAddEdit?.GstType === 'G' ? "SGST" : "Tax1 %"}`,

            headerName: "Tax1 %",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            // cellRenderer: handlerendererTaxPrc1,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    e.data.TaxPrc1 = parseFloat(parseFloat(e?.value).toFixed(2))

                    return parseFloat(parseFloat(e?.value).toFixed(2)) + '%'

                }

            }

        },

        {

            field: "TaxAmount1",

            // headerName: `${TaxTypeHelp?.Tax1Name ? TaxTypeHelp?.Tax1Name : "Tax1"} Amt.`,

            // headerName: `${InwardChallanAddEdit?.GstType === 'G' ? "SGST" : "Tax1"} Amt.`,

            headerName: "Tax1 Amt.",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TaxAmount1

                }

                else {

                    if (e) {

                        e.data.TaxAmount1 = CheckNaN(CalculateTaxAmt(e?.data, 'TaxPrc1'))

                        return CheckNaN(CalculateTaxAmt(e?.data, 'TaxPrc1'))

                    }



                }

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(2))

                }

            }

        },

        {

            field: "TaxPrc2",

            // headerName: `${TaxTypeHelp?.Tax2Name ? TaxTypeHelp?.Tax2Name : "Tax2 %"}`,

            // headerName: `${InwardChallanAddEdit?.GstType === 'G' ? "CGST" : "Tax2 %"}`,

            headerName: "Tax2 %",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            // cellRenderer: handlerendererTaxPrc2,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    e.data.TaxPrc2 = parseFloat(parseFloat(e?.value).toFixed(2))

                    return parseFloat(parseFloat(e?.value).toFixed(2)) + '%'

                }

            }

        },

        {

            field: "TaxAmount2",

            // headerName: `${TaxTypeHelp?.Tax2Name ? TaxTypeHelp?.Tax2Name : "Tax2"} Amt.`,

            // headerName: `${InwardChallanAddEdit?.GstType === 'G' ? "CGST" : "Tax2"} Amt.`,

            headerName: "Tax2 Amt.",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(2))

                }

            },

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TaxAmount2

                }

                else {

                    if (e) {

                        e.data.TaxAmount2 = CheckNaN(CalculateTaxAmt(e?.data, 'TaxPrc2'))

                        return CheckNaN(CalculateTaxAmt(e?.data, 'TaxPrc2'))

                    }

                }

            },

        },

        {

            field: "TaxPrc3",

            // headerName: `${InwardChallanAddEdit?.GstType === 'I' ? "IGST" : "Tax3 %"}`,

            headerName: "Tax3 %",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            // cellRenderer: handlerendererTaxPrc3,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    e.data.TaxPrc3 = parseFloat(parseFloat(e?.value).toFixed(2))

                    return parseFloat(parseFloat(e?.value).toFixed(2)) + '%'

                }

            }



        },

        {

            field: "TaxAmount3",

            // headerName: `${InwardChallanAddEdit?.GstType === 'I' ? "IGST" : "Tax3"} Amt.`,

            headerName: "Tax3 Amt.",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(2))

                }

            },

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TaxAmount3

                }

                else {

                    if (e) {

                        e.data.TaxAmount3 = CheckNaN(CalculateTaxAmt(e?.data, 'TaxPrc3'))

                        return CheckNaN(CalculateTaxAmt(e?.data, 'TaxPrc3'))

                    }

                }

            },

        },

        {

            field: "TaxPrc4",

            headerName: "Tax4 %",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            // cellRenderer: handlerendererTaxPrc4,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    e.data.TaxPrc4 = parseFloat(parseFloat(e?.value).toFixed(2))

                    return parseFloat(parseFloat(e?.value).toFixed(2)) + '%'

                }

            }

        },

        {

            field: "TaxAmount4",

            headerName: "Tax4 Amt.",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(2))

                }

            },

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TaxAmount4

                }

                else {

                    if (e) {

                        e.data.TaxAmount4 = CheckNaN(CalculateTaxAmt(e?.data, 'TaxPrc4'))

                        return CheckNaN(CalculateTaxAmt(e?.data, 'TaxPrc4'))

                    }

                }

            },

        },

        {

            field: "TaxPrc5",

            headerName: "Tax5 %",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            // cellRenderer: handlerendererTaxPrc5,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    e.data.TaxPrc5 = parseFloat(parseFloat(e?.value).toFixed(2))

                    return parseFloat(parseFloat(e?.value).toFixed(2)) + '%'

                }

            }

        },

        {

            field: "TaxAmount5",

            headerName: "Tax5 Amt.",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(2))

                }

            },

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TaxAmount5

                }

                else {

                    if (e) {

                        e.data.TaxAmount5 = CheckNaN(CalculateTaxAmt(e?.data, 'TaxPrc5'))

                        return CheckNaN(CalculateTaxAmt(e?.data, 'TaxPrc5'))

                    }

                }

            },

        },

        {

            field: "TaxPrc6",

            headerName: "Tax6 %",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            // cellRenderer: handlerendererTaxPrc6,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    e.data.TaxPrc6 = parseFloat(parseFloat(e?.value).toFixed(2))

                    return parseFloat(parseFloat(e?.value).toFixed(2)) + '%'

                }

            }

        },

        {

            field: "TaxAmount6",

            headerName: "Tax6 Amt.",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(2))

                }

            },

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TaxAmount6

                }

                else {

                    if (e) {

                        e.data.TaxAmount6 = CheckNaN(CalculateTaxAmt(e?.data, 'TaxPrc6'))

                        return CheckNaN(CalculateTaxAmt(e?.data, 'TaxPrc6'))

                    }

                }

            },

        },

        {

            field: "TaxROFAmount",

            headerName: "Tax ROF Amount",

            width: 100,

            editable: true,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(e?.value).toFixed(2)

                }

            },

        },

        {

            field: "TotalTaxAmount",

            headerName: "Total Tax Amt.",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TotalTaxAmount

                }

                else {

                    if (e) {

                        e.data.TotalTaxAmount = CheckNaN(CalculateTotalTaxAmt(e?.data))

                        return CheckNaN(CalculateTotalTaxAmt(e?.data));

                    }

                }

            }

        },

        {

            field: "TotalNetAmt",

            headerName: "Total Net Amt.",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(e?.value).toFixed(2)

                }

            },

            valueGetter: (e) => {

                if (e) {

                    e.data.TotalNetAmt = CheckNaN(CalculateTotalNetAmt(e?.data))

                    return CheckNaN(CalculateTotalNetAmt(e?.data));

                }

            }

        },

        {

            field: "ItemNetAmount",

            headerName: "Item Net Amount",

            width: 100,

            editable: true,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueGetter: (e) => {

                if (e) {

                    e.data.ItemNetAmount = parseFloat(parseFloat(e?.data?.Amount || 0).toFixed(2))

                    return parseFloat(parseFloat(e?.data?.Amount || 0).toFixed(2));

                }

            }

        },

        {

            field: "ConvertTaxableAmt",

            headerName: "Convert Taxable Amt.",

            width: 100,

            editable: true,

            cellEditor: "agNumberCellEditor",

            hide: true,

        },

        {

            field: "ConvertAmtWithTax",

            headerName: "Convert Amt. With Tax",

            width: 150,

            editable: true,

            cellEditor: "agNumberCellEditor",

            hide: true,

        },

        {

            field: "OtherTaxableAmount",

            headerName: "Other Taxable Amt.",

            width: 150,

            editable: false,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

        },

        {

            field: "OtherAmountWithTax",

            headerName: "Other Amt. With Tax",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

        },

        {

            field: "CounterName",

            headerName: "Counter Name",

            width: 100,

            editable: false,

            cellRenderer: handlecellrenderCounterHelp,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "RackId",

            headerName: "Rack Id",

            width: 100,

            editable: false,

            cellRenderer: handlecellrenderCounterHelp,

            hide: true,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "DesignCode",

            headerName: "Design Code",

            width: 100,

            editable: false,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "GrossWt2",

            headerName: "Gross Wt.2",

            width: 100,

            editable: true,

            // cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            cellEditor: "agNumberCellEditor",

            // cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(3))

                }

            },

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.GrossWt2;

                }

                else {

                    if (e) {

                        const { GrossWt = 0 } = e?.data;

                        if (GrossWt) {

                            e.data.GrossWt2 = parseFloat(parseFloat(GrossWt).toFixed(3));

                            return parseFloat(parseFloat(GrossWt).toFixed(3));

                        }

                        else {

                            e.data.GrossWt2 = parseFloat(parseFloat(0).toFixed(3));

                            return parseFloat(parseFloat(0).toFixed(3));

                        }

                    }

                }

            }

        },

        {

            field: "TagNetWt",

            headerName: "Tag Net Wt.",

            width: 100,

            editable: true,

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TagNetWt;

                }

                else {

                    return e?.data?.TagNetWt;

                }

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(3))

                }

            },

        },

        {

            field: "TotalAmtWithTax",

            headerName: "Total Amt With Tax",

            width: 150,

            editable: false,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(2))

                }

            },

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TotalAmtWithTax;

                }

                else {

                    if (e) {

                        e.data.TotalAmtWithTax = CheckNaN(CalculateTotalAmtWithTax(e?.data));

                        return CheckNaN(CalculateTotalAmtWithTax(e?.data));

                    }

                }

            },

        },

        {

            field: "SalesmanName",

            headerName: "Salesman Name",

            width: 100,

            editable: false,

            cellRenderer: handlecellrenderSalesManHelp,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "ItemRemarks",

            headerName: "Remarks",

            width: 200,

            editable: true,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        }

    ]


    /* other item grid col def */

    const otherItemColDefs = [

        {

            field: "SrNo",

            headerName: "Sr. No.",

            width: 80,

            // valueGetter: "node.rowIndex + 1",

            editable: false,

            valueGetter: (e) => {

                if (e?.node?.rowPinned !== "bottom") {

                    return e.node.rowIndex + 1

                } else if (e?.node?.rowPinned === "bottom") {

                    return 'Total'

                }



            },

        },

        {

            field: "ItemGroup",

            headerName: "Item Group",

            width: 80,

            editable: false,

            cellRenderer: cellrenderitemGroupInOtherGrid,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "Item",

            headerName: "Item Name",

            width: 100,

            editable: false,

            cellRenderer: handlecellrenderitemInOtherGrid,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "ItemCode",

            headerName: "Item Code",

            width: 100,

            editable: false,

            cellRenderer: handlecellrenderitemcodeInOtherGrid,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "SizeName",

            headerName: "Size",

            width: 100,

            editable: false,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            },

            cellRenderer: handlecellrenderSizeHelpInOtherGrid

        },

        {

            field: "Pcs",

            headerName: "Pcs",

            width: 100,

            editable: true,

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.Pcs;

                }

                else {

                    if (e) {

                        // e.data.ActualPcs = (e?.data?.Pcs || 0)

                        return e?.data?.Pcs

                    }

                }

            }

        },

        {

            field: "ActualPcs",

            headerName: "Actual Pcs",

            width: 100,

            editable: true,

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.ActualPcs;

                }

                else {

                    if (e) {

                        return e?.data?.ActualPcs

                    }

                }

            }

        },

        {

            field: "ActualWeight",

            headerName: "Act Wt.",

            width: 100,

            editable: true,

            // cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return parseFloat(parseFloat(e?.data?.ActualWeight).toFixed(3))

                }

                else {

                    return e?.data?.ActualWeight

                }

            },

            // valueformatter: (e) => {

            // if (e?.value) {

            // return parseFloat(parseFloat(e?.value).toFixed(3))

            // }

            // }

        },

        {

            field: "VariationPrc",

            headerName: "Variation (%)",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            cellRenderer: handlerendererVariationPrcInOtherGrid,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "VariationWt",

            headerName: "Variation Wt.",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            // valueformatter: (e) => {

            // if (e?.value) {

            // return parseFloat(parseFloat(e?.value).toFixed(3))

            // }

            // }

        },

        {

            field: "Weight",

            headerName: "Weight",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e) {

                    e.data.Weight = CheckNaN(CalculateWeightInOtherItem(e?.data))

                    return CheckNaN(CalculateWeightInOtherItem(e?.data))

                }

            },

            // valueformatter: (e) => {

            // if (e?.value) {

            // return parseFloat(e?.value).toFixed(3)

            // }

            // }

        },

        {

            field: "WeightGrm",

            headerName: "Weight (Grm)",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            // valueformatter: (e) => {

            // if (e?.value) {

            // return parseFloat(parseFloat(e?.value).toFixed(3))

            // }

            // },

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return parseFloat(parseFloat(e?.data?.WeightGrm).toFixed(3));

                }

                else {

                    if (e) {

                        e.data.WeightGrm = CheckNaN(CalculateWeightInGrmOtherItem(e?.data))

                        return CheckNaN(CalculateWeightInGrmOtherItem(e?.data))

                    }

                }

            },

        },

        {

            field: "Touch",

            headerName: "Touch",

            width: 100,

            editable: false,

            cellRenderer: handlerendererTouchPrcInOtherGrid,

            // cellEditor: "agNumberCellEditor",

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "WastagePrc",

            headerName: "Wastage",

            width: 100,

            editable: false,

            cellRenderer: handlerendererWstPrcInOtherGrid,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "FineWt",

            headerName: "Fine Wt.",

            width: 100,

            editable: true,

            // cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 3

            },

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.FineWt;

                }

                else {

                    if (e) {

                        e.data.FineWt = CheckNaN(CalculateFineWtInOtherItem(e?.data));

                        return CheckNaN(CalculateFineWtInOtherItem(e?.data));

                    }

                }

            },

            // valueformatter: (e) => {

            // if (e?.value) {

            // return parseFloat(e?.value).toFixed(3)

            // }

            // }

        },

        {

            field: "OtherRateTypeName",

            // field: "OtherRateType",

            headerName: "OtherRate Type",

            width: 100,

            editable: false,

            cellRenderer: handlecellrenderRateTypeHelpInOtherItem,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "Rate",

            headerName: "Rate",

            width: 100,

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            editable: (e) => {

                if (e?.data) {

                    const { OtherRateType } = e?.data || {};

                    if (OtherRateType === 'FA') {

                        return false;

                    }

                    else return true;

                }

            },

            valueFormatter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.Rate

                }

                else {

                    // if (e) {

                    // const amount = CheckNaN(CalculateAmountBasedOnRateTypeInOtherItem(e?.data));

                    // e.data.Amount = amount

                    // lstitemData[InwardGridRowIndex].OtherAmount = amount;

                    // setLstItemData(lstitemData);

                    // }

                }

            },

            cellEditor: "agNumberCellEditor",

        },

        {

            field: "Amount",

            headerName: "Amount",

            width: 100,

            editable: true,

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.Amount;

                } else {

                    if (e) {

                        e.data.Amount = CheckNaN(CalculateAmountBasedOnRateTypeInOtherItem(e?.data));

                        return CheckNaN(CalculateAmountBasedOnRateTypeInOtherItem(e?.data));

                    }

                }

            },

            // valueformatter: (e) => {

            // if (e?.value) {

            // return parseFloat(parseFloat(e?.value).toFixed(2))

            // }

            // }

        },

        {

            field: "LabourRateName",

            // field: "LabourRateType",

            headerName: "Labour Rate Type",

            width: 150,

            editable: false,

            cellRenderer: handlecellrenderLaboutRateTypeHelpInOtherItem,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "LabourRate",

            headerName: "Labour Rate",

            width: 120,

            editable: true,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return { "text-align": "right" }; // Show checkbox for non-pinned rows

            }

        },

        {

            field: "LabourAmount",

            headerName: "Labour Amount",

            width: 150,

            editable: true,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            // valueFormatter: (e) => {

            // if (e?.value) {

            // return parseFloat(parseFloat(e?.value).toFixed(2))

            // }

            // },

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.LabourAmount;

                }

                else {

                    if (e) {

                        e.data.LabourAmount = CheckNaN(CalculateLabourAmtInOtherItem(e?.data))

                        return CheckNaN(CalculateLabourAmtInOtherItem(e?.data))

                    }

                }

            }



        },

        {

            field: "Remarks",

            headerName: "Remarks",

            width: 200,

            editable: true,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            }

        },



        {

            field: "TaxableAmount",

            headerName: "Taxable Amt.",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TaxableAmount;

                }

                else {

                    if (e) {

                        e.data.TaxableAmount = CheckNaN(calculateTaxableAmtInOther(e?.data))

                        return CheckNaN(calculateTaxableAmtInOther(e?.data))

                    }

                }

            },

            // valueformatter: (e) => {

            // if (e?.value) {

            // return parseFloat(parseFloat(e?.value).toFixed(2))

            // }

            // }

        },

        {

            field: "TotalOther",

            headerName: "Total Other",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TotalOther;

                }

                else {

                    if (e) {

                        e.data.TotalOther = CheckNaN(CalculateTotalOtherInOtherItem(e?.data));

                        return CheckNaN(CalculateTotalOtherInOtherItem(e?.data));

                    }

                }

            },

            // valueFormatter: (e) => {

            // if (e?.value) {

            // return parseFloat(parseFloat(e?.value).toFixed(2))

            // }

            // }

        },

        {

            field: "TaxID",

            headerName: "Tax ID",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            cellRenderer: handlecellrenderTaxHelpInOtherGrid,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return {}; // Show checkbox for non-pinned rows

            },

            valueGetter: (e) => {

                if (e?.data) {

                    const { TaxName } = e?.data || {};

                    if (TaxName === "" || TaxName === null || TaxName === undefined) {

                        e.data.TaxID = 0;

                        e.data.TaxPrc1 = 0;

                        e.data.TaxPrc2 = 0;

                        e.data.TaxPrc3 = 0;

                        e.data.TaxPrc4 = 0;

                        e.data.TaxPrc5 = 0;

                        e.data.TaxPrc6 = 0;

                        e.data.TaxAmount1 = 0;

                        e.data.TaxAmount2 = 0;

                        e.data.TaxAmount3 = 0;

                        e.data.TaxAmount4 = 0;

                        e.data.TaxAmount5 = 0;

                        e.data.TaxAmount6 = 0;

                    }

                }

            }

        },

        {

            field: "TaxPrc1",

            headerName: "Tax1 %",

            // headerName: "Tax1 %",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            // cellRenderer: handlerendererTaxPrc1InOtherGrid,

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return { "text-align": "right" }; // Show checkbox for non-pinned rows

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            // valueFormatter: (e) => {

            // if (e?.value) {

            // e.data.TaxPrc1 = parseFloat(parseFloat(e?.value).toFixed(2))

            // return parseFloat(parseFloat(e?.value).toFixed(2)) + '%'

            // }

            // }

        },

        {

            field: "TaxAmount1",

            headerName: "Tax1 Amt.",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TaxAmount1;

                }

                else {

                    if (e) {

                        e.data.TaxAmount1 = CheckNaN(CalculateTaxAmtInOther(e?.data, 'TaxPrc1'))

                        return CheckNaN(CalculateTaxAmtInOther(e?.data, 'TaxPrc1'))

                    }

                }

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(2))

                }

            }

        },

        {

            field: "TaxPrc2",

            headerName: "Tax2 %",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            // cellRenderer: handlerendererTaxPrc2InOtherGrid,

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return { "text-align": "right" }; // Show checkbox for non-pinned rows

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    e.data.TaxPrc2 = parseFloat(parseFloat(e?.value).toFixed(2))

                    return parseFloat(parseFloat(e?.value).toFixed(2)) + '%'

                }

            }

        },

        {

            field: "TaxAmount2",

            headerName: "Tax2 Amt.",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TaxAmount2;

                }

                else {

                    if (e) {

                        e.data.TaxAmount2 = CheckNaN(CalculateTaxAmtInOther(e?.data, 'TaxPrc2'))

                        return CheckNaN(CalculateTaxAmtInOther(e?.data, 'TaxPrc2'))

                    }

                }

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(2))

                }

            }

        },

        {

            field: "TaxPrc3",

            headerName: "Tax3 %",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            // cellRenderer: handlerendererTaxPrc3InOtherGrid,

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return { "text-align": "right" }; // Show checkbox for non-pinned rows

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    e.data.TaxPrc3 = parseFloat(parseFloat(e?.value).toFixed(2))

                    return parseFloat(parseFloat(e?.value).toFixed(2)) + '%'

                }

            }

        },

        {

            field: "TaxAmount3",

            headerName: "Tax3 Amt.",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TaxAmount3;

                } else {

                    if (e) {

                        e.data.TaxAmount3 = CheckNaN(CalculateTaxAmtInOther(e?.data, 'TaxPrc3'))

                        return CheckNaN(CalculateTaxAmtInOther(e?.data, 'TaxPrc3'))

                    }

                }

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(2))

                }

            }

        },

        {

            field: "TaxPrc4",

            headerName: "Tax4 %",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            // cellRenderer: handlerendererTaxPrc4InOtherGrid,

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return { "text-align": "right" }; // Show checkbox for non-pinned rows

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    e.data.TaxPrc4 = parseFloat(parseFloat(e?.value).toFixed(2))

                    return parseFloat(parseFloat(e?.value).toFixed(2)) + '%'

                }

            }

        },

        {

            field: "TaxAmount4",

            headerName: "Tax4 Amt.",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TaxAmount4;

                } else {

                    if (e) {

                        e.data.TaxAmount4 = CheckNaN(CalculateTaxAmtInOther(e?.data, 'TaxPrc4'))

                        return CheckNaN(CalculateTaxAmtInOther(e?.data, 'TaxPrc4'))

                    }

                }

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(2))

                }

            }

        },

        {

            field: "TaxPrc5",

            headerName: "Tax5 %",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            // cellRenderer: handlerendererTaxPrc5InOtherGrid,

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return { "text-align": "right" }; // Show checkbox for non-pinned rows

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    e.data.TaxPrc5 = parseFloat(parseFloat(e?.value).toFixed(2))

                    return parseFloat(parseFloat(e?.value).toFixed(2)) + '%'

                }

            }

        },

        {

            field: "TaxAmount5",

            headerName: "Tax5 Amt.",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TaxAmount5;

                } else {

                    if (e) {

                        e.data.TaxAmount5 = CheckNaN(CalculateTaxAmtInOther(e?.data, 'TaxPrc5'))

                        return CheckNaN(CalculateTaxAmtInOther(e?.data, 'TaxPrc5'))

                    }

                }

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(2))

                }

            }

        },

        {

            field: "TaxPrc6",

            headerName: "Tax6 %",

            width: 100,

            editable: false,

            // cellEditor: "agNumberCellEditor",

            // cellRenderer: handlerendererTaxPrc6InOtherGrid,

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            cellStyle: (params) => {

                if (params?.node?.rowPinned) {

                    return { display: 'none' }; // Hide checkbox for pinned rows

                }

                return { "text-align": "right" }; // Show checkbox for non-pinned rows

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    e.data.TaxPrc6 = parseFloat(parseFloat(e?.value).toFixed(2))

                    return parseFloat(parseFloat(e?.value).toFixed(2)) + '%'

                }

            }



        },

        {

            field: "TaxAmount6",

            headerName: "Tax6 Amt.",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.TaxAmount6;

                } else {

                    if (e) {

                        e.data.TaxAmount6 = CheckNaN(CalculateTaxAmtInOther(e?.data, 'TaxPrc6'))

                        return CheckNaN(CalculateTaxAmtInOther(e?.data, 'TaxPrc6'))

                    }

                }

            },

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(parseFloat(e?.value).toFixed(2))

                }

            }

        },

        {

            field: "AmountWithTax",

            headerName: "Amt. With Tax",

            width: 100,

            editable: false,

            cellEditor: "agNumberCellEditor",

            cellStyle: { "text-align": "right" },

            cellClass: "ag-grid-input-field-custom-class",

            ["cellEditorParams"]: {

                ["precision"]: 2

            },

            valueFormatter: (e) => {

                if (e?.value) {

                    return parseFloat(e?.value).toFixed(2)

                }

            },

            valueGetter: (e) => {

                if (e?.node?.rowPinned) {

                    return e?.data?.AmountWithTax;

                }

                else {

                    if (e) {

                        e.data.AmountWithTax = CheckNaN(CalculateAmountWithTaxInOtherItem(e?.data));

                        return CheckNaN(CalculateAmountWithTaxInOtherItem(e?.data))

                    }

                }

            }

        },

    ]


    return (

        <div className="page-wrapper">

            <CollumnGroupModal

                id={ID}

                setReRenderGrid={setReRenderGrid}

                BalanceSheetID={setID}

                SetID={setID}

                Show={Flag}

                SetShow={setFlag}

            // rights={BalanceSheetRights}

            />

            <ReportType

                id={ID}

                setReRenderGrid={setReRenderGrid}

                BalanceSheetID={setID}

                SetID={setID}

                Show={Show}

                SetShow={SetShow}

            // rights={BalanceSheetRights}

            />





            <form onSubmit={handleSubmit}>

                <div className="content content_100vh">

                    <div className="table-top_header table-top_header-responsive">

                        <div className="page-header page-header-responsive page-commonheader headertitle-header-responsive page-master-header">

                            <div className="add-item">

                                <div className="page-master-title">

                                    {/* <h4>Inward Challan</h4> */}

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-xl-12 col-lg-12 col-12">

                            <div className="card table-list-card p-0">

                                <div className="card-body">

                                    <div className="table-top_header table-top_header-responsive page-recepit">

                                        <div className="row">

                                            <div className="col-xxl-4 col-xl-4 col-lg-9 col-md-12 col-sm-12 col-10">

                                                <div className="row align-items-center mfield mdaybook">

                                                    <label className="margin-bottom-daybook-page form-label col-xxl-3 col-xl-3 col-lg-2 col-md-2 col-sm-2 col-12">Daybook</label>

                                                    <div className="col-xxl-9 col-xl-9 col-lg-6 col-md-4 col-sm-4 col-12 db-dropdown">

                                                        <Select

                                                            tabSelectsValue

                                                            ref={daybookref}

                                                            styles={customStyles}

                                                            classNamePrefix="react-select from-control"

                                                            className="daybook-customdropdown-option common-dropdown"

                                                            options={DaybookHelp}

                                                            autoFocus

                                                            openMenuOnFocus={InoutGetById > 0 ? false : true}

                                                            required

                                                            placeholder={''}

                                                            onChange={(e) => {

                                                                setAddEditInwardChallan((prev) => {

                                                                    return {

                                                                        ...prev,

                                                                        ['DayBookID']: e?.DayBookID,

                                                                        ['DayBookGroup']: e?.DayBookGroup

                                                                    }

                                                                })

                                                                setVoucherNoInput((prev) => {

                                                                    return { ...prev, ['DayBookID']: e?.DayBookID }

                                                                })

                                                            }}

                                                            onKeyDown={(e) => {

                                                                if (e.keyCode === 13) {

                                                                    e.stopPropagation();

                                                                    document?.getElementById("VoucherReview")?.focus();

                                                                }

                                                                if (e.keyCode === 9) {

                                                                    document?.getElementById("VoucherReview")?.focus();

                                                                }

                                                            }}

                                                        />

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-2 col-2 btnsetting-inwardchallan settingbtn">

                                                <button

                                                    autoFocus={false}

                                                    onClick={() => setFlag(true)}

                                                    className="btn btn-added addbtncustom -btn addhelpBtn Setting-btn " type="button">

                                                    <span className="feather-add-icon">

                                                        <i data-feather="trash-2" class="feather feather-settings "></i>

                                                    </span>

                                                </button>

                                            </div>

                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">

                                                <div className="row align-items-center mfield">

                                                    <label class="form-label col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 party_vh-transaction-pe">Voucher No.</label>

                                                    <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 party_vh-transaction-pe-field">

                                                        <div className="input-group party_vh-transaction-option">

                                                            <AlpVoucherNo

                                                                isrequired={true}

                                                                readOnly={true}

                                                                options={vchdropdown}

                                                                // className="form-control vch-no-text"

                                                                voucherDetails={voucherDetails}

                                                                setvoucherDetails={setvoucherDetails}

                                                                defaultSelectedOption="A"

                                                                MultiColumnObj={MultiColumnObjVoucherno}

                                                            />

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-xxl-5 col-xl-5 col-lg-8 col-md-6 col-sm-6 col-12">

                                                <div className="row align-items-center mfield">

                                                    <label className="form-label col-xxl-3 col-xl-3 col-lg-2 col-md-4 col-sm-4 col-12 vocherdate-inwardchallan-field">Voucher Date</label>

                                                    <div className="col-xxl-9 col-xl-9 col-lg-10 col-md-8 col-sm-8 col-12 vocherdate-inwardchallan vchdate-right">

                                                        <div className="d-flex justify-content-between">

                                                            <div className="two-block-input-date-inchallan">

                                                                {/* <input

id="voucherdate"

type="date"

className="form-control right_border_remove input-date vch-Dates"

autoComplete="off"

/> */}

                                                                <AlpDate

                                                                    autoFocus={false}

                                                                    isrequired={true}

                                                                    id="voucherdate"

                                                                    name="VoucherDate"

                                                                    className="form-control right_border_remove input-date vch-Dates"

                                                                    max='9999-12-31'

                                                                    onChange={(e) => {

                                                                        onInputChange(e)

                                                                    }}

                                                                    value={InwardChallanAddEdit?.VoucherDate ? InwardChallanAddEdit?.VoucherDate?.split('T')[0] : today.toISOString().split('T')[0]}

                                                                    onBlur={(e) => {



                                                                    }}

                                                                    onKeyDown={(e) => {

                                                                        if (e?.keyCode === 13) {

                                                                            e?.preventDefault();

                                                                            document.querySelector(':focus').blur();

                                                                            document.getElementById('partybillno')?.focus();

                                                                        }

                                                                        else if (e?.keyCode === 9 && e.shiftKey === false) {

                                                                            e?.preventDefault();

                                                                            document.querySelector(':focus').blur();

                                                                            document.getElementById('partybillno')?.focus();

                                                                        }

                                                                        else if (e?.keyCode === 9 && e.shiftKey === true) {

                                                                            e?.preventDefault();

                                                                            document.querySelector(':focus').blur();

                                                                            document.getElementById('VoucherReview')?.focus();

                                                                        }

                                                                    }}

                                                                />

                                                                <input

                                                                    autoFocus={false}

                                                                    type="text"

                                                                    id="voucherDay"

                                                                    className="form-control br-0 Blr-0 vch-Days"

                                                                    placeholder=""

                                                                    value={InwardChallanAddEdit?.VoucherDate ? new Date(InwardChallanAddEdit?.VoucherDate).toLocaleDateString("en-US", { weekday: "long" }) : ""}

                                                                    autoComplete="off"

                                                                    readOnly

                                                                />

                                                                <input

                                                                    autoFocus={false}

                                                                    type="text"

                                                                    className="form-control vch-date vch-date-left"

                                                                    placeholder=""

                                                                    value={InwardChallanAddEdit?.AddDate ? new Date(InwardChallanAddEdit?.AddDate).toLocaleTimeString('en-US', {

                                                                        hour: '2-digit',

                                                                        minute: '2-digit',

                                                                        hour12: true

                                                                    })

                                                                        : new Date().toLocaleTimeString('en-US', {

                                                                            hour: '2-digit',

                                                                            minute: '2-digit',

                                                                            hour12: true

                                                                        })}

                                                                    autoComplete="off"

                                                                    readOnly

                                                                />



                                                            </div>





                                                        </div>

                                                    </div>

                                                </div>

                                            </div>







                                            {/* <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1">

<div className="row align-items-center mfield justify-content-end me-2">

 

 

</div>

</div> */}

                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">

                                                <div className="row align-items-center mfield">

                                                    <label className="form-label col-md-4 col-sm-4 col-12 party_vh-transaction-pe">Party Ch. No.</label>

                                                    <div className="col-lg-8 col-md-8 col-sm-8 col-12">

                                                        <input

                                                            id="partybillno"

                                                            type="text"

                                                            className="form-control"

                                                            placeholder=""

                                                            autoComplete="off"

                                                            autoFocus={false}

                                                            name="PartyBillNo"

                                                            value={InwardChallanAddEdit?.PartyBillNo ? InwardChallanAddEdit?.PartyBillNo : ""}

                                                            onChange={(e) => onInputChange(e)}

                                                            onKeyDown={(e) => {

                                                                if (e?.keyCode === 13) {

                                                                    e?.preventDefault();

                                                                    document.querySelector(':focus').blur();

                                                                    document.getElementById('partybilldate')?.focus();

                                                                }

                                                                else if (e?.keyCode === 9 && e.shiftKey === false) {

                                                                    e?.preventDefault();

                                                                    document.querySelector(':focus').blur();

                                                                    document.getElementById('partybilldate')?.focus();

                                                                }

                                                                else if (e?.keyCode === 9 && e.shiftKey === true) {

                                                                    e?.preventDefault();

                                                                    document.querySelector(':focus').blur();

                                                                    document.getElementById('voucherdate')?.focus();

                                                                }

                                                            }}

                                                        />

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">

                                                <div className="row align-items-center mfield">

                                                    <label className="form-label col-md-4 col-sm-4 col-12 transaction-acc-name-label">Party Ch. Date</label>

                                                    <div className="col-lg-8 col-md-8 col-sm-8 col-12">

                                                        <input

                                                            id="partybilldate"

                                                            type="date"

                                                            name="PartyBillDate"

                                                            className="form-control"

                                                            placeholder=" "

                                                            autoComplete="off"

                                                            autoFocus={false}

                                                            max='9999-12-31'

                                                            onChange={(e) => onInputChange(e)}

                                                            value={InwardChallanAddEdit?.PartyBillDate ? InwardChallanAddEdit?.PartyBillDate.split('T')[0] : ""}

                                                            onKeyDown={(e) => {

                                                                if (e?.keyCode === 13) {

                                                                    e?.preventDefault();

                                                                    document.querySelector(':focus')?.blur();

                                                                    reportTypeRef?.current?.focus();

                                                                }

                                                                else if (e?.keyCode === 9 && e.shiftKey === false) {

                                                                    e?.preventDefault();

                                                                    document.querySelector(':focus')?.blur();

                                                                    reportTypeRef?.current?.focus();

                                                                }

                                                                else if (e?.keyCode === 9 && e.shiftKey === true) {

                                                                    e?.preventDefault();

                                                                    document.querySelector(':focus')?.blur();

                                                                    document.getElementById('partybillno').focus();

                                                                }

                                                            }}

                                                        />

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">

                                                <div className="row align-items-center mfield ">

                                                    <label className="form-label col-md-4 col-sm-4 col-12">Report Type</label>

                                                    <div className="col-lg-8 col-md-8 col-sm-8 col-12">

                                                        <div className="input-group branch-master-box-width border-right-drowdrop reporttype-inwardchallan">

                                                            <Select

                                                                ref={reportTypeRef}

                                                                tabSelectsValue

                                                                openMenuOnFocus

                                                                styles={customStyles}

                                                                classNamePrefix="react-select from-control"

                                                                options={reporttype}

                                                                defaultValue={{ value: "1", label: "Basic" }}

                                                                placeholder=""

                                                                onKeyDown={(e) => {

                                                                    if (e.keyCode === 13) {

                                                                        e.stopPropagation();

                                                                        document.getElementById('InpAccID')?.focus();

                                                                    }

                                                                    else if (e.keyCode === 9 && e.shiftKey === false) {

                                                                        document.getElementById('InpAccID')?.focus();

                                                                    }

                                                                    else if (e.keyCode === 9 && e.shiftKey === true) {

                                                                        setTimeout(() => {

                                                                            document.getElementById('partybilldate')?.focus();

                                                                        }, 0);

                                                                    }



                                                                }}



                                                            />

                                                            <div className="input-group cust-input-block-trans me-0">



                                                                <button

                                                                    onClick={() => SetShow(true)}

                                                                    className="btn btn-added addbtncustom -btn addhelpBtn " type="button">



                                                                    <span className="feather-add-icon">

                                                                        <i data-feather="trash-2" class="feather feather-plus-circle"></i>

                                                                    </span>

                                                                </button>

                                                            </div>

                                                        </div>



                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">

                                                <div className="row align-items-center mfield">

                                                    <label className="form-label col-md-4 col-sm-4 col-12 inward-gsttype">GST Type</label>

                                                    <div className="col-lg-8 col-md-8 col-sm-8 col-12">

                                                        <Select

                                                            ref={gstTypeHelpRef}

                                                            styles={customStyles}

                                                            className="gsttype-inwardchallan"

                                                            autoFocus={false}

                                                            tabSelectsValue

                                                            onChange={(e) => {

                                                                setAddEditInwardChallan((prev) => {

                                                                    return {

                                                                        ...prev,

                                                                        ['GstType']: e?.ShortName

                                                                    }

                                                                })

                                                            }}

                                                            onKeyDown={(e) => {

                                                                if (e.keyCode === 13) {

                                                                    e.stopPropagation();

                                                                    document.getElementById('InpAccID')?.focus();

                                                                }

                                                                if (e.keyCode === 9) {

                                                                    document.getElementById('InpAccID')?.focus();

                                                                }

                                                            }}

                                                            openMenuOnFocus

                                                            defaultValue={{ ShortName: 'G', Name: 'GST' }}

                                                            required

                                                            placeholder={''}

                                                            classNamePrefix="react-select from-control T"

                                                            options={gsttypeType}

                                                            name="gsttypeType"

                                                            getOptionLabel={(option) => `${option.Name}`}

                                                            getOptionValue={(option) => option.ShortName}

                                                            components={{

                                                                Option: CustomOption,

                                                                Menu: (props) => (

                                                                    <components.Menu {...props}>

                                                                        <CustomHeader /> {/* Add custom header here */}

                                                                        {props.children}

                                                                    </components.Menu>

                                                                ),

                                                            }}



                                                        />

                                                    </div>

                                                </div>

                                            </div>



                                            <div className="col-xxl-6 col-xl-6 col-lg-8 col-md-12 col-sm-12 col-12">

                                                <div className="row align-items-center mfield">

                                                    <label className="form-label col-lg-2 col-md-2 col-sm-2 col-12 transaction-acc-name-label">Account Name</label>

                                                    <div className="col-xxl-10 col-xl-10 col-lg-9 col-md-9 col-sm-9 col-12 transaction-acc-name">



                                                        <AlpAccountMasterHelp MultiColumnObj={MultiColumnHelpObjAcc} />



                                                    </div>

                                                </div>

                                            </div>



                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">

                                                <div className="row align-items-center mfield">

                                                    <label className="form-label col-md-4 col-sm-4 col-12">A/C Balance</label>

                                                    <div className="col-lg-8 col-md-8 col-sm-8 col-12">

                                                        <div className="two-block-input">

                                                            <input

                                                                type="text"

                                                                className="form-control right_border_remove"

                                                                placeholder=""

                                                                autoComplete="off"

                                                            />

                                                            <div className="input-group cust-input-block-trans me-0">

                                                                <button

                                                                    className="dr-crbtnfield border_remove"

                                                                    type="button"

                                                                >

                                                                    Dr

                                                                </button>

                                                            </div>

                                                            <div className="input-group cust-input-block-trans me-0">

                                                                <button

                                                                    className="btn btn-primary help-btn info-help border_remove"

                                                                    type="button"

                                                                >

                                                                    <span className="feather-add-icon">

                                                                        <i data-feather="trash-2" class="feather feather-alert-circle"></i>

                                                                    </span>

                                                                </button>

                                                            </div>



                                                            <button

                                                                className="btn btn-primary help-btn "

                                                                type="button"

                                                                style={{ width: "50px" }}

                                                            >

                                                                <span className="feather-add-icon">

                                                                    <i data-feather="trash-2" class="feather feather-eye"></i>

                                                                </span>

                                                            </button>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">

                                                <div className="row align-items-center mfield">

                                                    <label className="form-label col-md-4 col-sm-4 col-12 transaction-credit-vch-label">Credit Days</label>

                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-12">

                                                        <input

                                                            type="text"

                                                            className="form-control"

                                                            placeholder=" "

                                                            autoComplete="off"

                                                            value={InwardChallanAddEdit?.CreditDays}

                                                        />

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>



                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-2">

                            <div className="table-list-card modal-ledger-table-br">

                                <div className="accordion accordions-items-seperate" id="OthersSection">

                                    <div className="accordion-item accordion-border-item">

                                        <div className="table-top_header table-top_header-responsive">

                                            <div className="card-body">

                                                <div className="F2__Overlay">

                                                    <div className="table-responsive">

                                                        <div className="ag-theme-quartz InwardchallanMode_table modal-grid-border">

                                                            <AgGridReact

                                                                // domLayout="autoHeight"

                                                                ref={inWardGridref}

                                                                columnDefs={[...InwardchallanGridColDef, ...[ActionDeleteLstItem]]}

                                                                rowData={lstitemData}

                                                                defaultColDef={{

                                                                    resizable: true,

                                                                    filter: false,

                                                                    editable: true,

                                                                    suppressHeaderMenuButton: true,

                                                                    // suppressMovable: true,

                                                                }}

                                                                isactionrequired

                                                                // enableRangeSelection={true}

                                                                // enableCellChangeFlash={false}

                                                                // enableCharts={true}

                                                                rowHeight={27}

                                                                headerHeight={22}

                                                                suppressRowClickSelection={true}

                                                                suppressContextMenu={false}

                                                                singleClickEdit={true}

                                                                suppressHeaderFocus={true}

                                                                popupParent={document.querySelector("body")}

                                                                pinnedBottomRowData={pinnedBottomRowDataInwardGrid}

                                                                onRowClicked={(e) => {

                                                                    if (InoutGetById > 0) {

                                                                        setInwardGridRowIndex(e?.rowIndex);

                                                                        setLstOtherData(lstitemData[e?.rowIndex]?.lstOther || [])

                                                                    }

                                                                    else if (e) {

                                                                        setInwardGridRowIndex(e?.rowIndex);

                                                                    }

                                                                }}

                                                                onCellFocused={(e) => {

                                                                    if (InoutGetById > 0) {

                                                                        setInwardGridRowIndex(e?.rowIndex);

                                                                        setLstOtherData(lstitemData[e?.rowIndex]?.lstOther || [])

                                                                    }

                                                                    else if (e) {

                                                                        setInwardGridRowIndex(e?.rowIndex);

                                                                    }



                                                                    if (e?.column?.colDef.type && e?.column?.colDef.type === 'input') {

                                                                        console.log(e, "inside condition")

                                                                        setTimeout(() => {

                                                                            document.getElementById(`${e?.column?.colDef.field}id${e.rowIndex}`)?.focus();

                                                                        }, 10);

                                                                    }

                                                                }}

                                                                onCellKeyDown={(e) => {

                                                                    inWardGridEnterKeyEvent(e);

                                                                }}

                                                                onCellValueChanged={(e) => {

                                                                    InwardGridCellValueChange(e, inWardGridref);

                                                                }}

                                                            // onColumnResized={(e) => {

                                                            // if (Layoutunlock1 == true) {

                                                            // if (e.finished == true) {

                                                            // HandleSaveGrid(

                                                            // Layoutunlock1,

                                                            // inWardGridref,

                                                            // // setGridcolumnName,

                                                            // { shortcut: ShortCutKey },

                                                            // [],

                                                            // { ...GridInput, ["layoutID"]: GridLayoutID }

                                                            // );

                                                            // }

                                                            // } else {

                                                            // if (e.finished == true) {

                                                            // UpdateGridOnState(

                                                            // inWardGridref,

                                                            // // setGridcolumnName,

                                                            // { shortcut: ShortCutKey },

                                                            // // GridcolumnName

                                                            // );

                                                            // }

                                                            // }

                                                            // }}

                                                            // onColumnVisible={(e) => {

                                                            // if (Layoutunlock1 == true) {

                                                            // // setTimeout(() => {

                                                            // HandleSaveGrid(

                                                            // Layoutunlock1,

                                                            // inWardGridref,

                                                            // // setGridcolumnName,

                                                            // { shortcut: ShortCutKey },

                                                            // [],

                                                            // { ...GridInput, ["layoutID"]: GridLayoutID }

                                                            // );



                                                            // } else {

                                                            // UpdateGridOnState(

                                                            // inWardGridref,

                                                            // // setGridcolumnName,

                                                            // { shortcut: ShortCutKey },

                                                            // GridcolumnName

                                                            // );

                                                            // }

                                                            // }}

                                                            // onColumnMoved={(e) => {

                                                            // if (e.finished == true) {

                                                            // if (Layoutunlock1 == true) {

                                                            // HandleSaveGrid(

                                                            // Layoutunlock1,

                                                            // inWardGridref,

                                                            // // setGridcolumnName,

                                                            // { shortcut: ShortCutKey },

                                                            // [],

                                                            // { ...GridInput, ["layoutID"]: GridLayoutID }

                                                            // );

                                                            // } else {

                                                            // UpdateGridOnState(

                                                            // inWardGridref,

                                                            // // setGridcolumnName,

                                                            // { shortcut: ShortCutKey },

                                                            // GridcolumnName

                                                            // );

                                                            // }

                                                            // }

                                                            // }}

                                                            />

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-2">

                            <div className="table-list-card modal-ledger-table-br">

                                <div className="accordion accordions-items-seperate" id="OthersSection">

                                    <div className="accordion-item accordion-border-item">

                                        <div className="table-top_header table-top_header-responsive">

                                            <div className="card-body">

                                                <div className="table-responsive">

                                                    <div className="ag-theme-quartz Inwardchallan-otherMode_table modal-grid-border">

                                                        <AgGridReact

                                                            // domLayout="autoHeight"

                                                            ref={OtherItemGridRef}

                                                            columnDefs={[...otherItemColDefs, ...[ActionDeleteOtherLstItem]]}

                                                            rowData={lstotherData}

                                                            defaultColDef={{

                                                                resizable: true,

                                                                filter: false,

                                                                editable: true,

                                                                suppressHeaderMenuButton: true,

                                                                // suppressMovable: true,

                                                            }}

                                                            singleClickEdit={true}

                                                            isactionrequired

                                                            // enableRangeSelection={true}

                                                            // enableCellChangeFlash={true}

                                                            // enableCharts={true}

                                                            rowHeight={27}

                                                            headerHeight={22}

                                                            suppressRowClickSelection={true}

                                                            suppressContextMenu={true}

                                                            suppressHeaderFocus={true}

                                                            popupParent={document.querySelector("body")}

                                                            pinnedBottomRowData={pinnedBottomRowDataOtherItem}

                                                            onCellValueChanged={(e) => {

                                                                OtherItemGridCellValueChange(e, OtherItemGridRef);

                                                            }}

                                                            onCellKeyDown={(e) => {

                                                                OtherItemGridEnterKeyEvent(e);



                                                            }}

                                                        />

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="row inwardchallan-card-me mt-2">

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                                <div className="card table-list-card">

                                    <div className="card-body">

                                        <div className="table-top_header table-top_header-responsive page-inwardchallan">



                                            <div className="row inwardchallan-mb">



                                                <div className="col-xl-2 col-lg-4 col-md-3 col-sm-3 col-12 inwardchallan-cardimg-mb">

                                                    <div className="card">

                                                        <div className="card-body">

                                                            <div className="row">

                                                                <div className="text-editor add-list add pt-0">

                                                                    <div className="col-lg-12">

                                                                        <div className="add-transaction-form">

                                                                            <div className="image-transaction-form">

                                                                                <img src={Noimage} alt="" className="no_img" />

                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                </div>

                                                            </div>



                                                            <div className="upload_transaction_img_Icon">

                                                                <div type="button" className="upload_img_Icon_btn">

                                                                    <input type="file" />

                                                                    <div className="upload_img">

                                                                        <img src={mobileapp} alt="" />

                                                                    </div>

                                                                </div>

                                                                <div type="button" className="upload_img_Icon_btn">

                                                                    <input type="file" id="UploadImage" />

                                                                    <div className="upload_img">

                                                                        <img src={Folder} alt="" />

                                                                    </div>

                                                                </div>

                                                                <div type="button" className="upload_img_Icon_btn" >

                                                                    <div className="upload_img">

                                                                        <img src={camera1} alt="" />

                                                                    </div>

                                                                </div>

                                                            </div>





                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="col-xl-10 col-lg-8 col-md-9 col-sm-9 col-12">

                                                    <div className="row">

                                                        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">

                                                            <div className="inward-purchase-amt">

                                                                <div className="row">

                                                                    <div className="col-xl-6 col-md-6 col-sm-6 col-12">



                                                                        <div className="row align-items-center mfield">

                                                                            <label className="form-label col-md-5 col-sm-5 col-12">Gross Amt.</label>

                                                                            <div className="col-lg-7 col-md-7 col-sm-7 col-12">

                                                                                <div className="two-block-input">

                                                                                    <input

                                                                                        type="text"

                                                                                        className="form-control right_border_remove"

                                                                                        placeholder=""

                                                                                        autoComplete="off"

                                                                                    />

                                                                                    <button

                                                                                        className="dr-crbtnfield "

                                                                                        type="button"

                                                                                    >

                                                                                        Dr

                                                                                    </button>

                                                                                </div>

                                                                            </div>

                                                                        </div>



                                                                        <div className="row align-items-center mfield">

                                                                            <label className="form-label col-md-5 col-sm-5 col-12">GST Amt.</label>

                                                                            <div className="col-lg-7 col-md-7 col-sm-7 col-12">

                                                                                <div className="two-block-input">

                                                                                    <input

                                                                                        type="text"

                                                                                        className="form-control right_border_remove"

                                                                                        placeholder=""

                                                                                        autoComplete="off"

                                                                                    />

                                                                                    <button

                                                                                        className="dr-crbtnfield dr-crbtnfield-rightborder-remove border_remove"

                                                                                        type="button"

                                                                                    >

                                                                                        Dr

                                                                                    </button>

                                                                                    <div className="input-group cust-input-block-trans me-0">

                                                                                        <button

                                                                                            className="btn btn-primary help-btn info-help"

                                                                                            type="button"

                                                                                        >

                                                                                            <span className="feather-add-icon">

                                                                                                <i data-feather="trash-2" class="feather feather-alert-circle"></i>

                                                                                            </span>

                                                                                        </button>

                                                                                    </div>

                                                                                </div>



                                                                            </div>

                                                                        </div>



                                                                        <div className="row align-items-center mfield">

                                                                            <label className="form-label col-md-5 col-sm-5 col-12">TCS Amt.</label>

                                                                            <div className="col-lg-7 col-md-7 col-sm-7 col-12">

                                                                                <div className="two-block-input">

                                                                                    <input

                                                                                        type="text"

                                                                                        className="form-control"

                                                                                        placeholder=""

                                                                                        autoComplete="off"

                                                                                    />

                                                                                </div>

                                                                            </div>

                                                                        </div>



                                                                        <div className="row align-items-center mfield">

                                                                            <label className="form-label col-md-5 col-sm-5 col-12">ROF Amt.</label>

                                                                            <div className="col-lg-7 col-md-7 col-sm-7 col-12 rofamt_field">

                                                                                <div className="input-group ROFamtborderradius">

                                                                                    <CustomDropdown options={RofDrop} placeholder="auto" className='ROFamtdropdown' />

                                                                                    <input

                                                                                        type="text"

                                                                                        className="form-control vch-no-text "

                                                                                        autoComplete="off"

                                                                                    />



                                                                                </div>

                                                                            </div>

                                                                        </div>



                                                                        <div className="row align-items-center mfield">

                                                                            <label className="form-label col-md-5 col-sm-5 col-12">Total Amt.</label>

                                                                            <div className="col-lg-7 col-md-7 col-sm-7 col-12">

                                                                                <div className="two-block-input">

                                                                                    <input

                                                                                        type="text"

                                                                                        className="form-control right_border_remove"

                                                                                        placeholder=""

                                                                                        autoComplete="off"

                                                                                    />

                                                                                    <button

                                                                                        className="dr-crbtnfield "

                                                                                        type="button"

                                                                                    >

                                                                                        Dr

                                                                                    </button>

                                                                                </div>

                                                                            </div>

                                                                        </div>



                                                                    </div>

                                                                    <div className="col-xl-6 col-md-6 col-sm-6 col-12">

                                                                        <div className="row align-items-center mfield">

                                                                            <label className="form-label col-md-5 col-sm-5 col-12">TDS Amt.</label>

                                                                            <div className="col-lg-7 col-md-7 col-sm-7 col-12">

                                                                                <div className="two-block-input">

                                                                                    <input

                                                                                        type="text"

                                                                                        className="form-control right_border_remove"

                                                                                        placeholder=""

                                                                                        autoComplete="off"

                                                                                    />

                                                                                    <div className="input-group cust-input-block-trans me-0">

                                                                                        <button

                                                                                            className="btn btn-primary help-btn info-help"

                                                                                            type="button"

                                                                                        >

                                                                                            F2

                                                                                        </button>

                                                                                    </div>

                                                                                </div>

                                                                            </div>

                                                                        </div>



                                                                        <div className="row align-items-center mfield">

                                                                            <label className="form-label col-md-5 col-sm-5 col-12 payment-transaction-pe">Cash Payment</label>

                                                                            <div className="col-lg-7 col-md-7 col-sm-7 col-12">

                                                                                <div className="two-block-input">

                                                                                    <input

                                                                                        type="text"

                                                                                        className="form-control"

                                                                                        placeholder=""

                                                                                        autoComplete="off"

                                                                                    />

                                                                                </div>

                                                                            </div>

                                                                        </div>



                                                                        <div className="row align-items-center mfield">

                                                                            <label className="form-label col-md-5 col-sm-5 col-12 party_vh-transaction-pe">Cash Receipt</label>

                                                                            <div className="col-lg-7 col-md-7 col-sm-7 col-12">

                                                                                <div className="two-block-input">

                                                                                    <input

                                                                                        type="text"

                                                                                        className="form-control"

                                                                                        placeholder=""

                                                                                        autoComplete="off"

                                                                                    />

                                                                                </div>

                                                                            </div>

                                                                        </div>



                                                                        <div className="row align-items-center mfield">

                                                                            <label className="form-label col-md-5 col-sm-5 col-12 payment-transaction-pe">Bank Payment</label>

                                                                            <div className="col-lg-7 col-md-7 col-sm-7 col-12">

                                                                                <div className="two-block-input">

                                                                                    <input

                                                                                        type="text"

                                                                                        className="form-control right_border_remove"

                                                                                        placeholder=""

                                                                                        autoComplete="off"

                                                                                    />

                                                                                    <div className="input-group cust-input-block-trans me-0">

                                                                                        <button

                                                                                            className="btn btn-primary help-btn info-help"

                                                                                            type="button"

                                                                                        >

                                                                                            F7

                                                                                        </button>

                                                                                    </div>

                                                                                </div>

                                                                            </div>

                                                                        </div>



                                                                        <div className="row align-items-center mfield">

                                                                            <label className="form-label col-md-5 col-sm-5 col-12 party_vh-transaction-pe">Bank Receipt</label>

                                                                            <div className="col-lg-7 col-md-7 col-sm-7 col-12">

                                                                                <div className="two-block-input">

                                                                                    <input

                                                                                        type="text"

                                                                                        className="form-control right_border_remove"

                                                                                        placeholder=""

                                                                                        autoComplete="off"

                                                                                    />

                                                                                    <div className="input-group cust-input-block-trans me-0">

                                                                                        <button

                                                                                            className="btn btn-primary help-btn info-help"

                                                                                            type="button"

                                                                                        >

                                                                                            F8

                                                                                        </button>

                                                                                    </div>

                                                                                </div>

                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>

                                                        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">

                                                            <div className="row">

                                                                <div className="col-xl-6 col-md-6 col-sm-6 col-12">

                                                                    <div className="row align-items-center mfield">

                                                                        <label className="form-label col-md-5 col-sm-5 col-12">Vch. Amt</label>

                                                                        <div className="col-lg-7 col-md-7 col-sm-7 col-12">

                                                                            <div className="two-block-input">

                                                                                <input

                                                                                    type="text"

                                                                                    className="form-control right_border_remove"

                                                                                    placeholder=""

                                                                                    autoComplete="off"

                                                                                />

                                                                                <button

                                                                                    className="dr-crbtnfield "

                                                                                    type="button"

                                                                                >

                                                                                    Dr

                                                                                </button>

                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                    <div className="row align-items-center mfield">

                                                                        <label className="form-label col-md-5 col-sm-5 col-12">Vch. G.Wt.</label>

                                                                        <div className="col-lg-7 col-md-7 col-sm-7 col-12">

                                                                            <div className="two-block-input">

                                                                                <input

                                                                                    type="text"

                                                                                    className="form-control right_border_remove"

                                                                                    placeholder=""

                                                                                    autoComplete="off"

                                                                                />

                                                                                <button

                                                                                    className="dr-crbtnfield "

                                                                                    type="button"

                                                                                >

                                                                                    Dr

                                                                                </button>

                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                    <div className="row align-items-center mfield">

                                                                        <label className="form-label col-md-5 col-sm-5 col-12">Vch. S.Wt.</label>

                                                                        <div className="col-lg-7 col-md-7 col-sm-7 col-12">

                                                                            <div className="two-block-input">

                                                                                <input

                                                                                    type="text"

                                                                                    className="form-control right_border_remove"

                                                                                    placeholder=""

                                                                                    autoComplete="off"

                                                                                />

                                                                                <button

                                                                                    className="dr-crbtnfield "

                                                                                    type="button"

                                                                                >

                                                                                    Dr

                                                                                </button>

                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                </div>

                                                                <div className="col-xl-6 col-md-6 col-sm-6 col-12">

                                                                    <div className="row align-items-center mfield">

                                                                        <label className="form-label col-md-5 col-sm-5 col-12">Ledger Amt</label>

                                                                        <div className="col-lg-7 col-md-7 col-sm-7 col-12">

                                                                            <div className="two-block-input">

                                                                                <input

                                                                                    type="text"

                                                                                    className="form-control right_border_remove"

                                                                                    placeholder=""

                                                                                    autoComplete="off"

                                                                                />

                                                                                <button

                                                                                    className="dr-crbtnfield "

                                                                                    type="button"

                                                                                >

                                                                                    Dr

                                                                                </button>

                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                    <div className="row align-items-center mfield">

                                                                        <label className="form-label col-md-5 col-sm-5 col-12 party_vh-transaction-pe">Ledger G.F.Wt.</label>

                                                                        <div className="col-lg-7 col-md-7 col-sm-7 col-12">

                                                                            <div className="two-block-input">

                                                                                <input

                                                                                    type="text"

                                                                                    className="form-control right_border_remove"

                                                                                    placeholder=""

                                                                                    autoComplete="off"

                                                                                />

                                                                                <button

                                                                                    className="dr-crbtnfield "

                                                                                    type="button"

                                                                                >

                                                                                    Dr

                                                                                </button>

                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                    <div className="row align-items-center mfield">

                                                                        <label className="form-label col-md-5 col-sm-5 col-12 party_vh-transaction-pe">Ledger S.F.Wt.</label>

                                                                        <div className="col-lg-7 col-md-7 col-sm-7 col-12">

                                                                            <div className="two-block-input">

                                                                                <input

                                                                                    type="text"

                                                                                    className="form-control right_border_remove"

                                                                                    placeholder=""

                                                                                    autoComplete="off"

                                                                                />

                                                                                <button

                                                                                    className="dr-crbtnfield "

                                                                                    type="button"

                                                                                >

                                                                                    Dr

                                                                                </button>

                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                </div>

                                                                <div className="col-xl-6 col-md-6 col-sm-6 col-12">

                                                                    <div className="row align-items-center mfield">

                                                                        <label className="form-label col-md-2 col-sm-2 col-12">Remarks</label>

                                                                        <div className="col-lg-10 col-sm-10 col-12">

                                                                            <textarea maxLength={255} rows={2} className="form-control-textarea transactioninward-remarks" aria-label="With textarea" required={Required.includes('68')}

                                                                                name="Remarks"

                                                                                autoComplete="off"

                                                                                onChange={(e) => onInputChange(e)}

                                                                            />

                                                                        </div>

                                                                    </div>



                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>



                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* </div> */}

                {/* other */}

                <div className="fixed-bottom mt-1">

                    <div className="card card-body footer-color">

                        <div className="transaction-footer">

                            <div class="pagination-container new-pagination">

                                <div class="d-flex row align-items-end">

                                    <div class="first_arrow" style={{ width: "auto" }}>

                                        <div className="row">

                                            <button class="pagination-extreme pagination-left">

                                                <i class="fa-solid fa-angles-left pe-1"></i>

                                                {/* <span>First</span> */}

                                            </button>

                                            <button class="pagination-extreme pagination-left-one ">

                                                <i class="fa-solid fa-angle-left pe-1"></i>

                                                {/* <span>Prev</span> */}

                                            </button>

                                        </div>

                                    </div>

                                    <div

                                        class="second_arrow"

                                        style={{

                                            width: "auto",

                                            // marginLeft: "2rem"

                                        }}

                                    >

                                        <div className="row">

                                            <button class="pagination-extreme pagination-right-one">

                                                {/* <span>Next</span> */}

                                                <i class="fa-solid fa-angle-right ps-1"></i>

                                            </button>

                                            <button class="pagination-extreme pagination-right">

                                                {/* <span>Last</span> */}

                                                <i class="fa-solid fa-angles-right ps-1"></i>

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="btn-addproduct prodt-formbtn transactionfooterbtn p-0">

                                <div class="btn-style-1 footer-btn">

                                    <AlpButton

                                        className={"button-primary btn_Blue camera_btn"}

                                        icons={

                                            <img

                                                width="22"

                                                height="22"

                                                src={camera}

                                                className="camera-icon"

                                                alt="camera Icon"

                                            />

                                        }

                                    />

                                    <AlpButton

                                        label={"Voucher Img"}

                                        className={"btn_Blue"}

                                        icons={

                                            <svg

                                                width="22"

                                                height="22"

                                                class="icon"

                                                id="Layer_1"

                                                viewBox="0 0 100 100"

                                                xmlns="http://www.w3.org/2000/svg"

                                            >

                                                <g id="XMLID_617_" fill="rgb(256,256,256)">

                                                    <path

                                                        id="XMLID_621_"

                                                        d="m23.0292969 62.9291992h17.8447266c1.3808594 0 2.5-1.1191406 2.5-2.5s-1.1191406-2.5-2.5-2.5h-17.8447266c-1.3808594 0-2.5 1.1191406-2.5 2.5s1.1191406 2.5 2.5 2.5z"

                                                    />

                                                    <path

                                                        id="XMLID_629_"

                                                        d="m23.0292969 71.0512695h17.8447266c1.3808594 0 2.5-1.1191406 2.5-2.5s-1.1191406-2.5-2.5-2.5h-17.8447266c-1.3808594 0-2.5 1.1191406-2.5 2.5s1.1191406 2.5 2.5 2.5z"

                                                    />

                                                    <path

                                                        id="XMLID_638_"

                                                        d="m95 38.7304688h-24.7402344v-16.291504c0-.6479492-.2514648-1.2705078-.7016602-1.7368164l-11.7998046-12.2197265c-.4711914-.487793-1.1201172-.7631836-1.7983398-.7631836h-45.7900391c-4.2290039 0-7.6699219 3.4360351-7.6699219 7.659668v56.1298828c0 4.2236328 3.440918 7.6601563 7.6699219 7.6601563h45.3105469v10.6118164c0 1.3808594 1.1191406 2.5 2.5 2.5h37.0195312c1.3808594 0 2.5-1.1191406 2.5-2.5v-48.550293c0-1.3808594-1.1191406-2.5-2.5-2.5zm-77.8779297-26.0112305h29.6591797v7.1821289h-29.6591797zm29.6591797 61.449707h-29.6591797v-19.3623047h29.6591797zm8.6992188-32.9384765v32.9384766h-3.6992188v-21.8623048c0-1.3808594-1.1191406-2.5-2.5-2.5h-34.6591797c-1.3808594 0-2.5 1.1191406-2.5 2.5v21.8623047h-1.9521484c-1.472168 0-2.6699219-1.1933594-2.6699219-2.6601562v-56.1298828c0-1.4663086 1.1977539-2.659668 2.6699219-2.659668h1.9521484v9.6821289c0 1.3808594 1.1191406 2.5 2.5 2.5h34.6591797c1.3808594 0 2.5-1.1191406 2.5-2.5v-9.6821289h3.1176758l10.3608398 10.7299805v15.28125h-7.2792969c-1.3808593 0-2.4999999 1.1191406-2.4999999 2.5zm37.0195312 46.0502929h-32.0195312v-43.550293h32.0195312z"

                                                    />

                                                    <path

                                                        id="XMLID_642_"

                                                        d="m67.4902344 53.3740234h18c1.3808594 0 2.5-1.1191406 2.5-2.5s-1.1191406-2.5-2.5-2.5h-18c-1.3808594 0-2.5 1.1191406-2.5 2.5s1.1191406 2.5 2.5 2.5z"

                                                    />

                                                    <path

                                                        id="XMLID_643_"

                                                        d="m67.4902344 63.3740234h18c1.3808594 0 2.5-1.1191406 2.5-2.5s-1.1191406-2.5-2.5-2.5h-18c-1.3808594 0-2.5 1.1191406-2.5 2.5s1.1191406 2.5 2.5 2.5z"

                                                    />

                                                    <path

                                                        id="XMLID_644_"

                                                        d="m67.4902344 73.3740234h9.6347656c1.3808594 0 2.5-1.1191406 2.5-2.5s-1.1191406-2.5-2.5-2.5h-9.6347656c-1.3808594 0-2.5 1.1191406-2.5 2.5s1.1191406 2.5 2.5 2.5z"

                                                    />

                                                </g>

                                            </svg>

                                        }

                                    />

                                    <AlpButton

                                        label={"Cheq Print"}

                                        className={"btn_Blue"}

                                        icons={

                                            <svg

                                                width="22"

                                                height="22"

                                                class="icon"

                                                id="_x31__px"

                                                enable-background="new 0 0 24 24"

                                                viewBox="0 0 24 24"

                                                xmlns="http://www.w3.org/2000/svg"

                                            >

                                                <g id="XMLID_617_" fill="rgb(256,256,256)">

                                                    <path d="m21.5 18h-3c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3c.827 0 1.5-.673 1.5-1.5v-7c0-.827-.673-1.5-1.5-1.5h-19c-.827 0-1.5.673-1.5 1.5v7c0 .827.673 1.5 1.5 1.5h3c.276 0 .5.224.5.5s-.224.5-.5.5h-3c-1.379 0-2.5-1.122-2.5-2.5v-7c0-1.378 1.121-2.5 2.5-2.5h19c1.379 0 2.5 1.122 2.5 2.5v7c0 1.378-1.121 2.5-2.5 2.5z" />

                                                    <path d="m14.5 21h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z" />

                                                    <path d="m14.5 19h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z" />

                                                    <path d="m10.5 17h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5s-.224.5-.5.5z" />

                                                    <path d="m18.5 7c-.276 0-.5-.224-.5-.5v-4c0-.827-.673-1.5-1.5-1.5h-9c-.827 0-1.5.673-1.5 1.5v4c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-4c0-1.378 1.121-2.5 2.5-2.5h9c1.379 0 2.5 1.122 2.5 2.5v4c0 .276-.224.5-.5.5z" />

                                                    <path d="m16.5 24h-9c-1.379 0-2.5-1.122-2.5-2.5v-8c0-.276.224-.5.5-.5h13c.276 0 .5.224.5.5v8c0 1.378-1.121 2.5-2.5 2.5zm-10.5-10v7.5c0 .827.673 1.5 1.5 1.5h9c.827 0 1.5-.673 1.5-1.5v-7.5z" />

                                                </g>

                                            </svg>

                                        }

                                    />

                                    <AlpButton

                                        label={"Print"}

                                        className={"btn_Blue"}

                                        icons={

                                            <svg

                                                width="22"

                                                height="22"

                                                class="icon"

                                                id="Icons"

                                                viewBox="0 0 60 60"

                                                xmlns="http://www.w3.org/2000/svg"

                                            >

                                                <g id="XMLID_617_" fill="rgb(256,256,256)">

                                                    <path d="m58 14.001h-48.101c-.465-2.279-2.484-4-4.899-4-2.756 0-5 2.243-5 5v26c0 5.551 3.449 9 9 9h45c1.103 0 2-.897 2-2v-2h2c1.103 0 2-.897 2-2v-28c0-1.103-.897-2-2-2zm-48 26v-24h5v24zm-8-25c0-1.654 1.346-3 3-3s3 1.346 3 3v22.002c-.836-.629-1.875-1.002-3-1.002s-2.164.373-3 1.002zm52 33h-45c-4.448 0-7-2.552-7-7 0-1.654 1.346-3 3-3s3 1.346 3 3v3c0 1.103.897 2 2 2h44zm4-4h-48v-2h48zm0-4h-41v-24h41l.002 24z" />

                                                    <path d="m53 27.001h-10c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4c0-1.103-.897-2-2-2zm-10 6v-4h10l.002 4z" />

                                                    <path d="m54 21.001h-33c-.553 0-1 .447-1 1s.447 1 1 1h33c.553 0 1-.447 1-1s-.447-1-1-1z" />

                                                    <path d="m37 27.001h-16c-.553 0-1 .447-1 1s.447 1 1 1h16c.553 0 1-.447 1-1s-.447-1-1-1z" />

                                                    <path d="m37 33.001h-16c-.553 0-1 .447-1 1s.447 1 1 1h16c.553 0 1-.447 1-1s-.447-1-1-1z" />

                                                </g>

                                            </svg>

                                        }

                                    />

                                    <AlpButton

                                        label={"Save Print"}

                                        className={"btn_Blue"}

                                        icons={

                                            <svg

                                                width="22"

                                                height="22"

                                                class="icon"

                                                id="Layer_1"

                                                viewBox="0 0 100 100"

                                                xmlns="http://www.w3.org/2000/svg"

                                            >

                                                <g id="XMLID_617_" fill="rgb(256,256,256)">

                                                    <path

                                                        id="XMLID_621_"

                                                        d="m23.0292969 62.9291992h17.8447266c1.3808594 0 2.5-1.1191406 2.5-2.5s-1.1191406-2.5-2.5-2.5h-17.8447266c-1.3808594 0-2.5 1.1191406-2.5 2.5s1.1191406 2.5 2.5 2.5z"

                                                    />

                                                    <path

                                                        id="XMLID_629_"

                                                        d="m23.0292969 71.0512695h17.8447266c1.3808594 0 2.5-1.1191406 2.5-2.5s-1.1191406-2.5-2.5-2.5h-17.8447266c-1.3808594 0-2.5 1.1191406-2.5 2.5s1.1191406 2.5 2.5 2.5z"

                                                    />

                                                    <path

                                                        id="XMLID_638_"

                                                        d="m95 38.7304688h-24.7402344v-16.291504c0-.6479492-.2514648-1.2705078-.7016602-1.7368164l-11.7998046-12.2197265c-.4711914-.487793-1.1201172-.7631836-1.7983398-.7631836h-45.7900391c-4.2290039 0-7.6699219 3.4360351-7.6699219 7.659668v56.1298828c0 4.2236328 3.440918 7.6601563 7.6699219 7.6601563h45.3105469v10.6118164c0 1.3808594 1.1191406 2.5 2.5 2.5h37.0195312c1.3808594 0 2.5-1.1191406 2.5-2.5v-48.550293c0-1.3808594-1.1191406-2.5-2.5-2.5zm-77.8779297-26.0112305h29.6591797v7.1821289h-29.6591797zm29.6591797 61.449707h-29.6591797v-19.3623047h29.6591797zm8.6992188-32.9384765v32.9384766h-3.6992188v-21.8623048c0-1.3808594-1.1191406-2.5-2.5-2.5h-34.6591797c-1.3808594 0-2.5 1.1191406-2.5 2.5v21.8623047h-1.9521484c-1.472168 0-2.6699219-1.1933594-2.6699219-2.6601562v-56.1298828c0-1.4663086 1.1977539-2.659668 2.6699219-2.659668h1.9521484v9.6821289c0 1.3808594 1.1191406 2.5 2.5 2.5h34.6591797c1.3808594 0 2.5-1.1191406 2.5-2.5v-9.6821289h3.1176758l10.3608398 10.7299805v15.28125h-7.2792969c-1.3808593 0-2.4999999 1.1191406-2.4999999 2.5zm37.0195312 46.0502929h-32.0195312v-43.550293h32.0195312z"

                                                    />

                                                    <path

                                                        id="XMLID_642_"

                                                        d="m67.4902344 53.3740234h18c1.3808594 0 2.5-1.1191406 2.5-2.5s-1.1191406-2.5-2.5-2.5h-18c-1.3808594 0-2.5 1.1191406-2.5 2.5s1.1191406 2.5 2.5 2.5z"

                                                    />

                                                    <path

                                                        id="XMLID_643_"

                                                        d="m67.4902344 63.3740234h18c1.3808594 0 2.5-1.1191406 2.5-2.5s-1.1191406-2.5-2.5-2.5h-18c-1.3808594 0-2.5 1.1191406-2.5 2.5s1.1191406 2.5 2.5 2.5z"

                                                    />

                                                    <path

                                                        id="XMLID_644_"

                                                        d="m67.4902344 73.3740234h9.6347656c1.3808594 0 2.5-1.1191406 2.5-2.5s-1.1191406-2.5-2.5-2.5h-9.6347656c-1.3808594 0-2.5 1.1191406-2.5 2.5s1.1191406 2.5 2.5 2.5z"

                                                    />

                                                </g>

                                            </svg>

                                        }

                                    />

                                    <AlpButton

                                        id="Submit"

                                        onClick={handleSubmit}

                                        label={"Save"}

                                        className={"btn_green "}

                                        icons={

                                            <svg

                                                width="22"

                                                height="22"

                                                class="icon"

                                                xmlns="http://www.w3.org/2000/svg"

                                                id="Object"

                                                viewBox="0 0 32 32"

                                            >

                                                <g fill="rgb(256,256,256)">

                                                    <path d="M30.71,7.29l-6-6A1,1,0,0,0,24,1H4A3,3,0,0,0,1,4V28a3,3,0,0,0,3,3H28a3,3,0,0,0,3-3V8A1,1,0,0,0,30.71,7.29ZM20,3V9H12V3ZM8,29V22a1,1,0,0,1,1-1H23a1,1,0,0,1,1,1v7Zm21-1a1,1,0,0,1-1,1H26V22a3,3,0,0,0-3-3H9a3,3,0,0,0-3,3v7H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3h6V9a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V3h1.59L29,8.41Z" />

                                                </g>

                                            </svg>

                                        }

                                    />



                                    <AlpButton

                                        onClick={handleCancel}

                                        label={"Cancel"}

                                        className={"btn_red"}

                                        icons={

                                            <svg

                                                width="22"

                                                height="22"

                                                class="icon"

                                                fill="none"

                                                viewBox="0 0 512 512"

                                                xmlns="http://www.w3.org/2000/svg"

                                            >

                                                <g fill="rgb(256,256,256)">

                                                    <path d="m255.575 476.292c-28.978.054-57.68-5.62-84.458-16.694s-51.103-27.331-71.5785-47.836c-86.0513-86.051-86.0513-226.057 0-312.108 20.4445-20.5595 44.7645-36.8599 71.5515-47.9576 26.786-11.0978 55.508-16.7725 84.503-16.6956 58.95 0 114.37 22.9517 156.036 64.6532 41.684 41.684 64.653 97.103 64.653 156.054s-22.952 114.37-64.653 156.054c-20.479 20.505-44.808 36.762-71.588 47.836-26.781 11.074-55.486 16.747-84.466 16.694zm.018-405.9809c-24.357-.0691-48.485 4.6953-70.987 14.0174s-42.931 23.0165-60.103 40.2895c-35.0103 35.011-54.2898 81.567-54.2898 131.09s19.2795 96.062 54.2898 131.09c72.28 72.28 189.899 72.298 262.162 0 35.01-35.01 54.307-81.567 54.307-131.09s-19.28-96.062-54.307-131.09c-17.173-17.268-37.599-30.9588-60.097-40.2806-22.499-9.3218-46.622-14.0892-70.975-14.0263z" />

                                                    <path d="m180.677 348.25c-3.495.008-6.914-1.023-9.822-2.961-2.908-1.939-5.175-4.698-6.512-7.927-1.338-3.229-1.685-6.783-1-10.21.686-3.427 2.375-6.573 4.852-9.039l149.804-149.804c1.639-1.639 3.585-2.939 5.727-3.827 2.141-.887 4.437-1.343 6.755-1.343s4.614.456 6.755 1.343c2.142.888 4.088 2.188 5.727 3.827s2.94 3.585 3.827 5.727 1.344 4.437 1.344 6.755-.457 4.614-1.344 6.756c-.887 2.141-2.188 4.087-3.827 5.726l-149.804 149.805c-1.635 1.645-3.58 2.949-5.723 3.837-2.142.888-4.44 1.342-6.759 1.335z" />

                                                    <path d="m330.491 348.25c-2.319.003-4.615-.453-6.757-1.341-2.143-.887-4.088-2.19-5.725-3.831l-149.805-149.805c-1.639-1.639-2.939-3.585-3.826-5.726-.887-2.142-1.344-4.438-1.344-6.756s.457-4.613 1.344-6.755 2.187-4.088 3.826-5.727c1.64-1.639 3.586-2.939 5.727-3.827 2.142-.887 4.438-1.343 6.756-1.343s4.613.456 6.755 1.343c2.142.888 4.088 2.188 5.727 3.827l149.804 149.804c2.477 2.466 4.166 5.612 4.851 9.039.686 3.427.338 6.981-.999 10.21-1.338 3.229-3.604 5.988-6.512 7.927-2.909 1.938-6.327 2.969-9.822 2.961z" />

                                                </g>

                                            </svg>

                                        }

                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </form>



        </div>

    );

}

export default PageInwardchallan;