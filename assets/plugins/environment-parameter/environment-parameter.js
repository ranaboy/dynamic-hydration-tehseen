function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = '<a class="btn btn-primary text-white border-0 mb-1" href="add-new-environment-parameter.html">Edit</a>';

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
        { field: 'EnvName', maxWidth: 200 },
        { field: 'AppParamID', minWidth: 150 },
        { field: 'AppParamValue', minWidth: 150 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 150,
        }
    ],
    rowData: [
        { EnvName: "ILT", AppParamID: "1", AppParamValue: "3", Action: "True" },
        { EnvName: "AIG", AppParamID: "2", AppParamValue: "4", Action: "True" },
        { EnvName: "DDT", AppParamID: "2", AppParamValue: "3", Action: "True" },
        { EnvName: "SVG", AppParamID: "3", AppParamValue: "2", Action: "True" },
        { EnvName: "OBD", AppParamID: "1", AppParamValue: "4", Action: "True" },
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