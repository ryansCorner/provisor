import React from 'react'
import {
    ResourceList,
    Avatar,
    TextStyle, ExceptionList, Button,
} from '@shopify/polaris'
import '../../CustomerListItem.css'


export default function CustomerListItem(props) {
    // console.log('customer list item props', props)
    const { avatarSource,
        Name,
        Profession,
        Region,
        Email,
        note,
        openOrderCount,
        openOrdersUrl,
        latestOrderUrl,
        ...rest } = props;

    const media = (
        <Avatar customer size="medium" name={Name} source={avatarSource} />
    );

    const profile = (
        <div className="CustomerListItem__Profile">
            <h3 className="CustomerListItem__Title">{Name}</h3>
            <div className="CustomerListItem__Location">{Profession}</div>
        </div>
    );

    const orders = (
        <div className="CustomerListItem__Orders">
            <div className="CustomerListItem__OrderCount">
                {Region}
            </div>
            <div className="CustomerListItem__TotalSpent">
                {Email}
            </div>
        </div>
    );

    let exceptions = [];
    let conditionalAction = null;

    if (note) {
        exceptions.push({ icon: 'notes', summary: note });
    }

    if (openOrderCount !== undefined) {
        const label = openOrderCount === 1 ? 'order' : 'orders';
        const summary = `${openOrderCount} open ${label}`;
        exceptions.push({ status: 'warning', icon: 'alert', summary });
        conditionalAction = (
            <Button plain url={openOrdersUrl} external>
                View open orders
      </Button>
        );
    }

    const exceptionList = exceptions.length
        ? (
            <div className="CustomerListItem__Exceptions">
                <ExceptionList items={exceptions} />
            </div>
        )
        : null;

    const conditionalActions = conditionalAction
        ? (
            <div className="CustomerListItem__ConditionalActions">
                {conditionalAction}
            </div>
        )
        : null;

    const shortcutActions = openOrdersUrl
        ? [{ content: 'View latest order', url: openOrdersUrl }]
        : null;

    return (
        <div className="CustomerListItem">
            <ResourceList.Item
                {...rest}
                media={media}
                shortcutActions={shortcutActions}
                accessibilityLabel={`View details for ${Name}`}
            >
                <div className="CustomerListItem__Main">
                    {profile}
                    {orders}
                </div>
                {exceptionList}
                {conditionalActions}
            </ResourceList.Item>
        </div>
    );

}