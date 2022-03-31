function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = '<a class="btn btn-primary text-white border-0 mb-1" href="add-new-parameter-page.html">Edit</a>';

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
        { field: 'ParameterID', maxWidth: 200 },
        { field: 'ParameterName', minWidth: 150 },
        { field: 'ParameterCategoryID', minWidth: 150 },
        { field: 'AxisGPName', minWidth: 150 },
        { field: 'ActiveFlag', minWidth: 150 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 150,
        }
    ],
    rowData: [
        { ParameterID: "1339", ParameterName: "Skew Lapse", ParameterCategoryID: "5", AxisGPName: "AA_SkewLapse_Iteration_No 1", ActiveFlag: "1", Action: "True" },
        { ParameterID: "101", ParameterName: "Skew Lapse Two", ParameterCategoryID: "1", AxisGPName: "AA_SkewLapse_Iteration_No 2", ActiveFlag: "0", Action: "True" },
        { ParameterID: "102", ParameterName: "Skew Lapse Three", ParameterCategoryID: "2", AxisGPName: "AA_SkewLapse_Iteration_No 3", ActiveFlag: "1", Action: "True" },
        { ParameterID: "103", ParameterName: "Skew Lapse Four", ParameterCategoryID: "2", AxisGPName: "AA_SkewLapse_Iteration_No 4", ActiveFlag: "1", Action: "True" },
        { ParameterID: "009", ParameterName: "Skew Lapse Five", RuParameterCategoryIDTypeID: "5", AxisGPName: "AA_SkewLapse_Iteration_No 5", ActiveFlag: "0", Action: "True" },
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