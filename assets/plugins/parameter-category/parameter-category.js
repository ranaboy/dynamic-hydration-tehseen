function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = '<a class="btn btn-primary text-white border-0 mb-1" href="add-new-parameter-category.html">Edit</a>';

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
        { field: 'ParameterCategoryID', maxWidth: 200 },
        { field: 'ParameterCategoryName', minWidth: 150 },
        { field: 'ActiveFlag', minWidth: 150 },
        { field: 'AppParamId', minWidth: 150 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 150,
        }
    ],
    rowData: [
        { ParameterCategoryID: "005", ParameterCategoryName: "Actuarial Assumption", ActiveFlag: "1", AppParamId: "1", Action: "True" },
        { ParameterCategoryID: "006", ParameterCategoryName: "Actuarial Assumption two", ActiveFlag: "0", AppParamId: "2", Action: "True" },
        { ParameterCategoryID: "007", ParameterCategoryName: "Actuarial Assumption three", ActiveFlag: "1", AppParamId: "2", Action: "True" },
        { ParameterCategoryID: "008", ParameterCategoryName: "Actuarial Assumption four", ActiveFlag: "1", AppParamId: "3", Action: "True" },
        { ParameterCategoryID: "009", ParameterCategoryName: "Actuarial Assumption five", ActiveFlag: "0", AppParamId: "1", Action: "True" },
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