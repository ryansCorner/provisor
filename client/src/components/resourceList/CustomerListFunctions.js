export default class CustomerListFunctions {
    handlePreviousPage() {
        // const items = fetchCustomers();
        // Todo: figure out how to determine if items represent
        // first or last page.
        this.setState({ items, isFirstPage: true, isLastPage: false });
    }

    handleNextPage() {
        // const items = fetchCustomers();
        // Todo: figure out how to determine if items represent
        // first or last page.
        this.setState({ items, isFirstPage: false, isLastPage: true });
    }

    handleFiltersChange(appliedFilters) {
        // const items = fetchCustomers();
        this.setState({ items, appliedFilters });
    }

    handleSearchChange(searchValue) {
        // const items = fetchCustomers();
        this.setState({ items, searchValue });
    }

    handleSortChange(sortValue) {
        // const items = fetchCustomers();
        this.setState({ items, sortValue });
    }

    handleSelectionChange(selectedItems) {
        this.setState({ selectedItems });
    }

    handleBulkEdit() {
        console.log('Opening bulk editor…');
    }

    handleBulkAddTags() {
        console.log('Asynchronously adding tags to customers…');
        // A Flash message should be displayed to confirm that async process
        // has started.
    }

    handleBulkRemoveTags() {
        console.log('Removing tags from customers…');
    }

    handleBulkDelete() {
        console.log('Handling bulk customer deletion…');
        // Since this action destroys resources in bulk, show a
        // confirmation modal (“Are you sure you want to delete {n}
        // customers”) before completing the action.
    }

    handleSaveFilters() {
        console.log('Saving current filters…');
    }
}