function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = '<a class="btn btn-primary text-white border-0 mb-1" href="add-new-run-book-parameter.html">Edit</a>';

    this.btnClickedHandler = this.btnClickedHandler.bind(this);
    this.eGui.addEventListener('click', this.btnClickedHandler);
}

BtnCellRenderer.prototype.getGui = function() {
    return this.eGui;
}

BtnCellRenderer.prototype.destroy = function() {
    this.eGui.removeEventListener('click', this.btnClickedHandler);
}

BtnCellRenderer.prototype.btnClickedHandler = function(event) {
    this.params.clicked(this.params.value);
}

var gridOptions = {
    columnDefs: [
        { field: 'ProductCD', maxWidth: 200 },
        { field: 'RunType', minWidth: 150 },
        { field: 'RunBookId', minWidth: 150 },
        { field: 'ParameterID', minWidth: 150 },
        { field: 'ParameterName', minWidth: 150 },
        { field: 'ParameterCategoryID', minWidth: 150 },
        { field: 'ParameterCategoryName', minWidth: 150 },
        { field: 'AxisGPName', minWidth: 150 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 150,
        }
    ],
    rowData: [
        { ProductCD: "TL", RunType: "LDTI", RunBookId: "-1339", ParameterID: "1", ParameterName: "Valuation", ParameterCategoryID: "1", ParameterCategoryName: "Actuarial Assumption", AxisGPName: "AA_Valuation_Iteration_No", Action: "True" },
        { ProductCD: "TL", RunType: "LDTI", RunBookId: "-1339", ParameterID: "2", ParameterName: "Valuation Interest Rate", ParameterCategoryID: "3", ParameterCategoryName: "Actuarial Assumption", AxisGPName: "AA_Valuation_Iteration_No", Action: "True" },
        { ProductCD: "TL", RunType: "LDTI", RunBookId: "-1339", ParameterID: "3", ParameterName: "Valuation Interest", ParameterCategoryID: "4", ParameterCategoryName: "Actuarial Assumption", AxisGPName: "AA_Valuation_Iteration_No", Action: "True" },
        { ProductCD: "TL", RunType: "LDTI", RunBookId: "-1339", ParameterID: "4", ParameterName: "Valuation Interest Typ;e", ParameterCategoryID: "2", ParameterCategoryName: "Actuarial Assumption", AxisGPName: "AA_Valuation_Iteration_No", Action: "True" },
        { ProductCD: "TL", RunType: "LDTI", RunBookId: "-1339", ParameterID: "5", ParameterName: "Valuation", ParameterCategoryID: "21", ParameterCategoryName: "Actuarial Assumption", AxisGPName: "AA_Valuation_Iteration_No", Action: "True" },
    ],
    defaultColDef: {
        flex: 1,
        minWidth: 100,
    },
    components: {
        btnCellRenderer: BtnCellRenderer,
    },
};

var gridDiv = document.querySelector('#myGrid');
new agGrid.Grid(gridDiv, gridOptions);