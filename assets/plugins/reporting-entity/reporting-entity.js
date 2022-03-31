function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = '<a class="btn btn-primary text-white border-0 mb-1" href="add-new-reporting-entity.html">Edit</a>';

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
        { field: 'ReportingEntityID', maxWidth: 200 },
        { field: 'ReportingEntityType', minWidth: 150 },
        { field: 'ReportingEntityDesc', maxWidth: 200 },
        { field: 'RunTyoeID', maxWidth: 200 },
        { field: 'ProductId', maxWidth: 200 },
        { field: 'EntityID', maxWidth: 200 },
        { field: 'ReportingLOBID', maxWidth: 200 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 150,
        }
    ],
    rowData: [
        { ReportingEntityID: "005", ReportingEntityType: "Fund", ReportingEntityDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", RunTyoeID: "1", ProductId: "1", EntityID: "3", ReportingLOBID: "3", Action: "True" },
        { ReportingEntityID: "006", ReportingEntityType: "Fund", ReportingEntityDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", RunTyoeID: "2", ProductId: "2", EntityID: "2", ReportingLOBID: "2", Action: "True" },
        { ReportingEntityID: "007", ReportingEntityType: "Fund", ReportingEntityDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", RunTyoeID: "3", ProductId: "1", EntityID: "1", ReportingLOBID: "1", Action: "True" },
        { ReportingEntityID: "008", ReportingEntityType: "Fund", ReportingEntityDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", RunTyoeID: "1", ProductId: "2", EntityID: "2", ReportingLOBID: "2", Action: "True" },
        { ReportingEntityID: "008", ReportingEntityType: "Fund", ReportingEntityDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", RunTyoeID: "2", ProductId: "3", EntityID: "1", ReportingLOBID: "1", Action: "True" }
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