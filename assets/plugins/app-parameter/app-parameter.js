function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = '<a class="btn btn-primary text-white border-0 mb-1" href="add-new-app-parameter.html">Edit</a>';

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
        { field: 'AppParamID', maxWidth: 200 },
        { field: 'AppParamName', maxWidth: 200 },
        { field: 'AppParamDesc', maxWidth: 200 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 150,
        }
    ],
    rowData: [
        { AppParamID: "005", AppParamName: "AA_DBLink 1", AppParamDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "True" },
        { AppParamID: "006", AppParamName: "AA_DBLink 2", AppParamDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "True" },
        { AppParamID: "007", AppParamName: "AA_DBLink 3", AppParamDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "True" },
        { AppParamID: "008", AppParamName: "AA_DBLink 4", AppParamDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "True" },
        { AppParamID: "008", AppParamName: "AA_DBLink 5", AppParamDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "True" }
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