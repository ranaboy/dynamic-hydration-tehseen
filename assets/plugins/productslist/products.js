function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = '<a class="btn btn-primary text-white border-0 mb-1" href="add-new-product.html">Edit</a>';

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
        { field: 'productID', maxWidth: 200 },
        { field: 'productCD', minWidth: 150 },
        { field: 'ProductDesc', maxWidth: 200 },
        { field: 'ProductFlag', minWidth: 150 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 150,
        }
    ],
    rowData: [
        { productID: "005", productCD: "VA", ProductDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ProductFlag: "True", Action: "True" },
        { productID: "006", productCD: "VA", ProductDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ProductFlag: "False", Action: "True" },
        { productID: "007", productCD: "VA", ProductDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ProductFlag: "True", Action: "True" },
        { productID: "008", productCD: "VA", ProductDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ProductFlag: "False", Action: "True" },
        { productID: "008", productCD: "VA", ProductDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ProductFlag: "False", Action: "True" }
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