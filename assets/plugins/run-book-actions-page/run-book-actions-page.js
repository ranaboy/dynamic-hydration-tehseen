function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = '<a class="btn btn-primary text-white border-0 mb-1" href="add-new-run-book-actions-page.html">Edit</a>';

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
        { field: 'RunBookID', maxWidth: 200 },
        { field: 'RunNo', minWidth: 150 },
        { field: 'ActionNo', minWidth: 150 },
        { field: 'ActionName', minWidth: 150 },
        { field: 'AxisBatchName', minWidth: 150 },
        { field: 'ActionParameters', minWidth: 150 },
        { field: 'ParameterID', minWidth: 150 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 150,
        }
    ],
    rowData: [
        { RunBookID: "1", RunNo: "LDTI", ActionNo: "-1339", ActionName: "AIG", AxisBatchName: "Valuation", ActionParameters: "1", ParameterID: "2", Action: "True" },
        { RunBookID: "2", RunNo: "LDTI", ActionNo: "-1339", ActionName: "AIG", AxisBatchName: "Valuation Interest Rate", ActionParameters: "3", ParameterID: "2", Action: "True" },
        { RunBookID: "1", RunNo: "LDTI", ActionNo: "-1339", ActionName: "AIG", AxisBatchName: "Valuation Interest", ActionParameters: "4", ParameterID: "3", Action: "True" },
        { RunBookID: "2", RunNo: "LDTI", ActionNo: "-1339", ActionName: "AIG", AxisBatchName: "Valuation Interest Type", ActionParameters: "2", ParameterID: "3", Action: "True" },
        { RunBookID: "3", RunNo: "LDTI", ActionNo: "-1339", ActionName: "AIG", AxisBatchName: "Valuation", ActionParameters: "21", ParameterID: "2", Action: "True" },
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