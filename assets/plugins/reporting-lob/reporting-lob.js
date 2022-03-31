function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = '<a class="btn btn-primary text-white border-0 mb-1" href="add-new-reporting-lob.html">Edit</a>';

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
        { field: 'ReportingLOBID', maxWidth: 200 },
        { field: 'ReportingLOBCD', minWidth: 150 },
        { field: 'ReportingLOBDesc', maxWidth: 200 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 150,
        }
    ],
    rowData: [
        { ReportingLOBID: "005", ReportingLOBCD: "other", ReportingLOBDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "True" },
        { ReportingLOBID: "006", ReportingLOBCD: "other", ReportingLOBDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "True" },
        { ReportingLOBID: "007", ReportingLOBCD: "other", ReportingLOBDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "True" },
        { ReportingLOBID: "008", ReportingLOBCD: "other", ReportingLOBDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "True" },
        { ReportingLOBID: "008", ReportingLOBCD: "other", ReportingLOBDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", Action: "True" }
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