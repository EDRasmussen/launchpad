import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/')({ component: App })

function App() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <div className="min-h-screen container mx-auto py-32 space-y-6">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
                Good Evening!
            </h1>

            <div className="flex flex-row w-full gap-6">
                <div className="basis-1/3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Calendar</CardTitle>
                            <CardDescription>Today's events</CardDescription>
                            <CardAction>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="ml-2 text-green-500"
                                >
                                    Private
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <Calendar
                                mode="single"
                                weekStartsOn={1}
                                selected={date}
                                onSelect={setDate}
                                className="border w-full"
                                captionLayout="dropdown"
                            />
                        </CardContent>
                        <CardFooter>
                            <div className="space-y-1 text-sm">
                                <CardTitle>2026-02-26 - Week 9 - 11:13</CardTitle>
                                <div className="text-muted-foreground">
                                    09:30 - Standup - Microsoft Teams Meeting
                                </div>
                                <div className="text-muted-foreground">
                                    10:30 - Meeting - Trommesalen 5
                                </div>
                                <div>12:30 - Lunch with John - Restaurant</div>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <div className="basis-2/3">
                    <Card>
                        <CardHeader>
                            <CardTitle>News</CardTitle>
                            <CardDescription>Today's events</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 text-sm">
                                <div className="space-y-1 text-sm">
                                    <CardTitle>
                                        Microsoft announces new AI-powered features in
                                        Office 365
                                    </CardTitle>
                                    <div className="text-muted-foreground">
                                        Microsoft has unveiled a range of new
                                        AI-powered features for its Office 365 suite,
                                        aimed at enhancing productivity and user
                                        experience. The new features include an AI
                                        assistant that can help users with tasks such as
                                        scheduling meetings, drafting emails, and
                                        creating presentations.
                                    </div>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <CardTitle>
                                        Apple releases new iPhone 15 with groundbreaking
                                        features
                                    </CardTitle>
                                    <div className="text-muted-foreground">
                                        Apple has announced the release of the iPhone 15,
                                        which comes with a range of groundbreaking
                                        features. The new iPhone includes a faster
                                        processor, improved camera capabilities, and a
                                        longer-lasting battery. Additionally, it features
                                        a new design and enhanced security features.
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
