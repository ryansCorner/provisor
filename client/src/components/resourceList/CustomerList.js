import React from 'react'
import { Card, ResourceList, TextStyle, FilterType, Avatar, Page, Pagination } from '@shopify/polaris'
import CustomerListItem from './CustomerListItem'
import CustomerListFooter from './CustomerListFooter'
import ClientService from '../../services/ClientService'
import axios from 'axios'
import { filter } from 'rsvp';
import { withRouter } from 'react-router-dom'
import jsonfile from 'jsonfile'

const file = '/tmp/data.json'
// const obj = { name: 'JP' }

const sortOptions = [
    { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
    { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
    { label: 'Most spent', value: 'TOTAL_SPENT_DESC' },
    { label: 'Most orders', value: 'ORDER_COUNT_DESC' },
    { label: 'Last name A–Z', value: 'ALPHABETICAL_ASC' },
    { label: 'Last name Z–A', value: 'ALPHABETICAL_DESC' },
];

const availableFilters = [

    {
        key: 'Profession',
        label: 'Profession',
        operatorText: 'is',
        type: FilterType.Select,
        options: [
            'Accounting',
            'Attorney',
            'Banking & Finance',
            'Consulting Service',
            'Financial Service',
            'Human Resources',
            'Information Technology',
            'Insurance',
            'Insurance Agent',
            'Investment Advisor',
            'Marketing',
            'Real Estate',
            'Teaching',

        ],
    },
    {
        key: 'Region',
        label: 'Region',
        operatorText: 'is',
        type: FilterType.Select,
        options: [
            'Beverly Hills',
            'Boston',
            'Century City',
            'Chicago',
            'Downtown Los Angeles',
            'Emeritas',
            'Glendale - Pasadena',
            'Inland Empire',
            'Long Beach',
            'Orange County',
            'San Diego County',
            'San Fernando Valley',
            'Santa Barbara',
            'Santa Clarita',
            'SF Bay Area',
            'South Bay - Los Angeles',
            'Ventura County',
            'Westlake Village',
            'Westside - Los Angeles',


        ],
    },
    {
        key: 'emailSubscriberFilter',
        label: 'Is an email subscriber',
        type: FilterType.Select,
        options: [
            'Yes',
            'No',
        ],
    },
    {
        key: 'tagsFilter',
        label: 'Tagged with',
        type: FilterType.TextField,
    },

];
function fetchCustomers(keyword) {
    console.log('fetching customers')
    axios.get(`/server/server.js/client/keyword`, keyword)
        .then(response => (response))
        .catch(error => (error))
}

class CustomerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedItems: [],
            allItems: '',
            sortValue: 'DATE_MODIFIED_DESC',
            displayedItems: this.props.customers || '',

            searchValue: '',
            appliedFilters: [],
            isFirstPage: true,
            isLastPage: false,
            todos: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'],
            currentPage: 1,
            todosPerPage: 9
        };
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleBulkEdit = this.handleBulkEdit.bind(this);
        this.handleBulkAddTags = this.handleBulkAddTags.bind(this);
        this.handleBulkRemoveTags = this.handleBulkRemoveTags.bind(this);
        this.handleBulkDelete = this.handleBulkDelete.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleFiltersChange = this.handleFiltersChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSaveFilters = this.handleSaveFilters.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    fetchCustomers = (keyword) => {

        const searchFor = [keyword.searchValue, keyword.appliedFilters]
        console.log('search for:...', searchFor)
        ClientService.clientSearch(keyword, this.onSearchSuccess, this.onSearchError)
    }

    filterCustomers = (filter) => {
        console.log('filter items state', this.state.items)
    }

    onSearchSuccess = event => {
        console.log('search success', event)
        // this.writeFile(event.data)
        this.setState({
            displayedItems: event.data,
            todos: event.data
        })

    }

    onSearchError = error => {
        console.log('search error', error)
    }

    // writeFile = data => {
    //     jsonfile.writeFile(file, data, { spaces: 2 })
    //         .then(res => {
    //             console.log('Write complete')
    //         })
    //         .catch(error => console.error(error))
    // }

    handleBulkEdit = () => {
        console.log('Opening bulk editor…');
    }

    handleBulkAddTags = () => {
        console.log('Asynchronously adding tags to customers…');
        // A Flash message should be displayed to confirm that async process
        // has started.
    }

    handleBulkRemoveTags = () => {
        console.log('Removing tags from customers…');
    }

    handleBulkDelete = () => {
        console.log('Handling bulk customer deletion…');
        // Since this action destroys resources in bulk, show a
        // confirmation modal before completing the action.
    }

    handleSelectionChange = (selectedItems) => {
        this.setState({
            ...this.state,
            selectedItems
        });
    }

    handleSearchChange = (searchValue) => {
        this.setState({
            ...this.state,
            searchValue
        });

    };

    filterByRegion = (filter, item) => {
        if (item.region.includes(filter)) {
            return true
        }
        return false
    }

    handleFiltersChange = (appliedFilters) => {
        console.log('applied filters', appliedFilters[0].value)
        const filterVal = appliedFilters[0].value
        const filterCat = appliedFilters[0].key
        console.log('applied filters displayedItems state: ', this.state.displayedItems)
        console.log('filterCat', filterCat)
        const filteredSearch = this.state.displayedItems.filter(items => items[filterCat].includes(filterVal))
        // {
        // // console.log('filtered search items: ', items)
        // const myArr = []
        // for (var i = 0; i < items.length - 1; i++) {
        //     const filterArr = []

        //     return console.log('item')
        // }

        // }
        // return items // items.map(clients => clients.includes(appliedFilters[0].value))

        console.log("filtered search:", filteredSearch)
        this.setState({
            ...this.state,
            displayedItems: filteredSearch,
            appliedFilters
        });
        console.log(
            // `Applied filters changed to ${this.state}.`,
            'Todo: use setState to apply this change.',
            this.state
        );
    };

    handleSortChange = (sortValue) => {
        // const items = fetchCustomers();
        this.setState({
            ...this.state,
            sortValue
        });
    }
    handlePreviousPage = () => {
        // const items = fetchCustomers();
        // Todo: figure out how to determine if items represent
        // first or last page.
        this.setState({ isFirstPage: true, isLastPage: false });
    }

    handleNextPage = () => {
        // const items = fetchCustomers();
        // Todo: figure out how to determine if items represent
        // first or last page.
        this.setState({ isFirstPage: false, isLastPage: true });
    }
    handleSaveFilters = () => {
        const data = this.state.searchValue
        console.log('Saving current filters…', data);
        return this.fetchCustomers(data)
    }

    renderItem = (item) => {

        const { id, url, name, location } = item;
        const media = <Avatar customer size="medium" name={name} />;

        return (
            <ResourceList.Item id={id} url={url} media={media} accessibilityLabel={`View details for ${name}`}>
                <h3>
                    <TextStyle variation="strong">{name}</TextStyle>
                </h3>
                <div>{location}</div>
            </ResourceList.Item>
        );
    }
    paginationMarkup = () => {


        return (<CustomerListFooter>
            <Pagination
                hasPrevious={!this.state.isFirstPage}
                hasNext={!this.state.isLastPage}
                onPrevious={this.handlePreviousPage}
                onNext={this.handleNextPage}
            />
        </CustomerListFooter>)
    }


    render() {
        const {
            displayedItems,
            allItems,
            selectedItems,
            sortValue,
            appliedFilters,
            searchValue,
            isFirstPage,
            isLastPage,
            todos,
            currentPage,
            todosPerPage
        } = this.state;
        const customers = this.props.customers;
        console.log('our customers in the customer list', customers)
        console.log('this state', this.state)
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((todo, index) => {
            console.log('todo', todo)
            const { id, url, name, location } = todo;
            const media = <Avatar customer size="medium" name={todo.name} />;

            return (
                <ResourceList.Item id={todo.id} url={url} media={media} accessibilityLabel={`View details for ${name}`}>
                    <h3>
                        hi   <TextStyle variation="strong">{todo.Name}</TextStyle>
                    </h3>
                    <div>{todo.Region}</div>
                </ResourceList.Item>
            );
        })

        const paginationMarkup =
            displayedItems.length > 0 ? (
                <CustomerListFooter>
                    <Pagination
                        hasPrevious={!isFirstPage}
                        hasNext={!isLastPage}
                        onPrevious={this.handlePreviousPage}
                        onNext={this.handleNextPage}
                    />
                </CustomerListFooter>
            ) : null;

        const resourceName = {
            singular: 'customer',
            plural: 'customers',
        };




        const filterControl = (
            <ResourceList.FilterControl
                filters={availableFilters}
                appliedFilters={appliedFilters}
                onFiltersChange={this.handleFiltersChange}
                searchValue={searchValue}
                onSearchChange={this.handleSearchChange}
                additionalAction={{

                    content: 'Save',
                    onAction: () => this.handleSaveFilters()
                    // onAction: () => axios.get(`/server/server.js/client/${searchValue}`, this.state)
                    //     .then(response => {
                    //         console.log('this is our search response', response)
                    //         console.log('***************', this.state)
                    //         this.setState({
                    //             displayedItems: response.data
                    //         })
                    //     })
                    //     .catch(error => {
                    //         console.log('this is our search error', error)
                    //     })
                }}
            />
        );
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });
        return (
            <Page title="Customers">
                <Card>
                    <ResourceList
                        resourceName={resourceName}
                        items={currentTodos}
                        renderItem={(customer) => <CustomerListItem {...customer} />}
                        selectedItems={selectedItems}
                        onSelectionChange={this.handleSelectionChange}
                        promotedBulkActions={[
                            { content: 'Edit customers', onAction: this.handleBulkEdit },
                        ]}
                        bulkActions={[
                            { content: 'Add tags', onAction: this.handleBulkAddTags },
                            { content: 'Remove tags', onAction: this.handleBulkRemoveTags },
                            { content: 'Delete customers', onAction: this.handleBulkDelete },
                        ]}
                        sortOptions={sortOptions}
                        sortValue={sortValue}
                        onSortChange={this.handleSortChange}
                        filterControl={filterControl}
                        loading={displayedItems.length > 0 ? false : true}

                        hasMoreItems
                    />
                    <ul id="page-numbers">
                        {renderPageNumbers}
                    </ul>
                    {paginationMarkup}
                </Card>
            </Page>
        );
    }


}


export default withRouter(CustomerList);
