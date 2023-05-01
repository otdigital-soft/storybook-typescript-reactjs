/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NotificationList } from './NotificationList';

export type PaginatedNotificationListList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<NotificationList>;
};
