function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = '<a class="btn btn-primary text-white border-0 mb-1" href="add-new-dynmod-run-book-actions-template.html">Edit</a>';

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
        { field: 'TemplateTokenID', maxWidth: 200 },
        { field: 'Run_No', minWidth: 150 },
        { field: 'ActionNo', maxWidth: 200 },
        { field: 'ActionName', maxWidth: 200 },
        { field: 'AxisBatchName', maxWidth: 200 },
        { field: 'ActionParameters', maxWidth: 200 },
        { field: 'ParameterID', maxWidth: 200 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 150,
        }
    ],
    rowData: [
        { TemplateTokenID: "005", Run_No: "12", ActionNo: "2", ActionName: "Update Dataset", AxisBatchName: "NULL", ActionParameters: "3-1, Without Spread", ParameterID: "3", Action: "True" },
        { TemplateTokenID: "006", Run_No: "23", ActionNo: "2", ActionName: "Update Dataset", AxisBatchName: "NULL", ActionParameters: "-1, Q1", ParameterID: "2", Action: "True" },
        { TemplateTokenID: "007", Run_No: "23", ActionNo: "1", ActionName: "Update Dataset", AxisBatchName: "GA - Populate Dataset", ActionParameters: "Dev_Life,200,1,2400", ParameterID: "1", Action: "True" },
        { TemplateTokenID: "008", Run_No: "12", ActionNo: "3", ActionName: "Update Dataset", AxisBatchName: "UL007.01.50 - Overrides", ActionParameters: "-1, No Margin", ParameterID: "2", Action: "True" },
        { TemplateTokenID: "008", Run_No: "12", ActionNo: "1", ActionName: "Update Dataset", AxisBatchName: "NULL", ActionParameters: "1", ParameterID: "1", Action: "True" }
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