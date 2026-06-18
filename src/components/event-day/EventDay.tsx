'use client'

import { Breadcrumb } from "../layout/Breadcrumb"

const EventDayContent = () => {
    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Control Center', href: '/' },
                    { label: 'Event Day', href: '/event-day' },
                ]}
            />
            EventDay
        </div>
    )
}

export default EventDayContent