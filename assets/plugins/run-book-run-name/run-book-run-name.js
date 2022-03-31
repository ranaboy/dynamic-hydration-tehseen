function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = '<a class="btn btn-primary text-white border-0 mb-1" href="add-new-run-book-run-name-page.html">Edit</a>';

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
        { field: 'RunTypeID', maxWidth: 200 },
        { field: 'RunNo', minWidth: 150 },
        { field: 'RunName', minWidth: 150 },
        { field: 'RunDesc', minWidth: 150 },
        { field: 'MstrRunName', minWidth: 150 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 150,
        }
    ],
    rowData: [
        { RunTypeID: "005", RunNo: "21", RunName: "21", RunDesc: "Other LTD Action", MstrRunName: "LTD", Action: "True" },
        { RunTypeID: "006", RunNo: "22", RunName: "21", RunDesc: "Other LTD Action", MstrRunName: "LTD", Action: "True" },
        { RunTypeID: "007", RunNo: "23", RunName: "21", RunDesc: "Other LTD Action", MstrRunName: "LTD", Action: "True" },
        { RunTypeID: "008", RunNo: "1", RunName: "21", RunDesc: "Other LTD Action", MstrRunName: "LTD", Action: "True" },
        { RunTypeID: "009", RunNo: "2", RunName: "21", RunDesc: "Other LTD Action", MstrRunName: "LTD", Action: "True" },
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